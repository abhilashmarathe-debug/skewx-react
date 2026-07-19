/**
 * SkewX Backend Server
 */

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const dialogflow = require("@google-cloud/dialogflow");
const path = require("path");
const fs = require("fs");

const { handleWebhook } = require("./webhookHandler");
const { logChatMessage } = require("./supabaseClient");

/* ────────────────────────────────────────────── */
/* CONFIG */
/* ────────────────────────────────────────────── */

const PORT = process.env.PORT || 3001;
const LANGUAGE_CODE = process.env.LANGUAGE_CODE || "en";

const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:4173",
  process.env.FRONTEND_URL,
  "https://skewx.com",
  "https://www.skewx.com",
  "https://skewx.com/",
  "https://www.skewx.com/"
].filter(Boolean);

/* ────────────────────────────────────────────── */
/* GOOGLE CREDENTIALS */
/* ────────────────────────────────────────────── */

let serviceAccount;

if (process.env.GOOGLE_SERVICE_ACCOUNT) {
  // Render
  serviceAccount = JSON.parse(
    process.env.GOOGLE_SERVICE_ACCOUNT
  );
} else {
  // Local Development
  const SERVICE_ACCOUNT = path.join(
    __dirname,
    "service-account.json"
  );

  if (!fs.existsSync(SERVICE_ACCOUNT)) {
    console.error(
      "\n❌ service-account.json not found"
    );
    process.exit(1);
  }

  serviceAccount = JSON.parse(
    fs.readFileSync(SERVICE_ACCOUNT, "utf8")
  );
}

const PROJECT_ID = serviceAccount.project_id;
console.log(`✅ Project: ${PROJECT_ID}`);

/* ────────────────────────────────────────────── */
/* DIALOGFLOW */
/* ────────────────────────────────────────────── */

const sessionClient =
  new dialogflow.SessionsClient({
    credentials: {
      client_email:
        serviceAccount.client_email,
      private_key:
        serviceAccount.private_key,
    },
    projectId: PROJECT_ID,
  });

/* ────────────────────────────────────────────── */
/* EXPRESS */
/* ────────────────────────────────────────────── */

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        ALLOWED_ORIGINS.includes(origin)
      ) {
        return callback(null, true);
      }

      callback(
        new Error(`CORS blocked: ${origin}`)
      );
    },
  })
);

app.use(express.json());

/* ────────────────────────────────────────────── */
/* CHAT */
/* ────────────────────────────────────────────── */

app.post("/chat", async (req, res) => {
  const {
    sessionId,
    message,
    event,
    languageCode,
  } = req.body;

  if (!sessionId) {
    return res.status(400).json({
      error: "sessionId is required",
    });
  }

  if (!message && !event) {
    return res.status(400).json({
      error: "message or event required",
    });
  }

  try {
    const sessionPath =
      sessionClient.projectAgentSessionPath(
        PROJECT_ID,
        sessionId
      );

    let queryInput;

    if (event) {
      queryInput = {
        event: {
          name: event,
          languageCode:
            languageCode || LANGUAGE_CODE,
        },
      };

      console.log(
        `\n🚀 EVENT: ${event}`
      );
    } else {
      queryInput = {
        text: {
          text: message.trim(),
          languageCode:
            languageCode || LANGUAGE_CODE,
        },
      };

      console.log(
        `\n💬 MESSAGE: ${message}`
      );
    }

    console.log(
      `🆔 SESSION: ${sessionId}`
    );

    const [response] =
      await sessionClient.detectIntent({
        session: sessionPath,
        queryInput,
      });

    const result =
      response.queryResult;

    /* DEBUG LOGS */
    console.log(
      "Fulfillment:",
      result.fulfillmentText
    );

    console.log(
      "Messages:",
      JSON.stringify(
        result.fulfillmentMessages,
        null,
        2
      )
    );

let options = [];

for (const msg of result.fulfillmentMessages || []) {

  // Dialogflow Custom Payload
  if (msg.payload?.fields?.options?.listValue?.values) {

    options =
      msg.payload.fields.options.listValue.values
        .map(v => v.stringValue)
        .filter(Boolean);

  }

}    

    const intentName =
      result.intent?.displayName ||
      "Unknown";

    const confidence =
      result.intentDetectionConfidence || 0;

    console.log(
      `[DF] ${intentName} (${(
        confidence * 100
      ).toFixed(0)}%)`
    );

    console.log(
      "Contexts:",
      result.outputContexts?.map(
        (c) => c.name
      )
    );

    /* parameters */

    let parameters = {};

    if (result.parameters?.fields) {
      parameters = Object.fromEntries(
        Object.entries(
          result.parameters.fields
        ).map(([key, value]) => [
          key,
          value.stringValue ??
            value.numberValue ??
            value.boolValue ??
            value.listValue?.values?.map(
              (v) => v.stringValue
            ) ??
            null,
        ])
      );
    }

    console.log(
      "Parameters:",
      parameters
    );

    /* Supabase log */

    if (message) {
      logChatMessage({
        session_id: sessionId,
        role: "user",
        message,
        intent: intentName,
        confidence,
        source: "chatbot",
      }).catch(console.error);
    }

    return res.json({
      reply:
        result.fulfillmentText ||
        "Sorry, I didn't understand that.",
      intent: intentName,
      confidence,
      parameters,
      options,
    });
  } catch (err) {
    console.error(
      "\n❌ CHAT ERROR"
    );
    console.error(err);

    return res.status(500).json({
      error:
        "Could not reach Dialogflow.",
      detail:
        process.env.NODE_ENV ===
        "development"
          ? err.message
          : undefined,
    });
  }
});

/* ────────────────────────────────────────────── */
/* WEBHOOK */
/* ────────────────────────────────────────────── */

app.post(
  "/webhook",
  handleWebhook
);

/* ────────────────────────────────────────────── */
/* HEALTH */
/* ────────────────────────────────────────────── */

app.get("/health", (_, res) => {
  res.json({
    status: "ok",
    project: PROJECT_ID,
    timestamp:
      new Date().toISOString(),
    supabase:
      !!process.env.SUPABASE_URL,
  });
});

/* ────────────────────────────────────────────── */
/* START */
/* ────────────────────────────────────────────── */

app.listen(PORT, () => {
  console.log(
    `\n🚀 Server running on http://localhost:${PORT}`
  );

  console.log(
    `POST /chat`
  );

  console.log(
    `POST /webhook`
  );

  console.log(
    `GET  /health`
  );

  if (
    process.env.SUPABASE_URL
  ) {
    console.log(
      "✅ Supabase connected"
    );
  } else {
    console.log(
      "⚠️ Supabase disabled"
    );
  }
});