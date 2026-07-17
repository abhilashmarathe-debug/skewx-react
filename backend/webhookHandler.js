const { saveLead } = require("./supabaseClient")

function getParam(params, key) {
  if (!params || !params[key]) return null

  const value = params[key]

  if (Array.isArray(value)) {
    return value[0]?.name || value[0] || null
  }

  return value
}

function extractLeadData(queryResult) {
  const contexts = queryResult.outputContexts || []

  const lead = {
    name: null,
    phone: null,
    email: null,
    company: null,
    company_size: null,
    interest: null,
    timezone: null,
    challenge: null,
    demo: null,
  }

  console.log("\n========== CONTEXT DATA ==========")

  for (const context of contexts) {
    const contextName =
      context.name?.split("/").pop()

    console.log("\nContext:", contextName)
    console.log(
      JSON.stringify(
        context.parameters || {},
        null,
        2
      )
    )

    const params = context.parameters || {}

    lead.name =
      lead.name ||
      getParam(params, "person_name") ||
      getParam(params, "name")

    lead.phone =
      lead.phone ||
      getParam(params, "phone")

    lead.email =
      lead.email ||
      getParam(params, "email")

    lead.company =
      lead.company ||
      getParam(params, "company")

    lead.company_size =
      lead.company_size ||
      getParam(params, "company_size")

    lead.interest =
      lead.interest ||
      getParam(params, "interest")

    lead.timezone =
      lead.timezone ||
      getParam(params, "timezone")

    lead.challenge =
      lead.challenge ||
      getParam(params, "challenge")

    lead.demo =
      lead.demo ||
      getParam(params, "demo")
  }

  const current = queryResult.parameters || {}

  lead.name =
    getParam(current, "person_name") ||
    getParam(current, "name") ||
    lead.name

  lead.phone =
    getParam(current, "phone") ||
    lead.phone

  lead.email =
    getParam(current, "email") ||
    lead.email

  lead.company =
    getParam(current, "company") ||
    lead.company

  lead.company_size =
    getParam(current, "company_size") ||
    lead.company_size

  lead.interest =
    getParam(current, "interest") ||
    lead.interest

  lead.timezone =
    getParam(current, "timezone") ||
    lead.timezone

  lead.challenge =
    getParam(current, "challenge") ||
    lead.challenge

  lead.demo =
    getParam(current, "demo") ||
    lead.demo

  return lead
}

async function handleWebhook(req, res) {
  console.log("\n====================================")
  console.log("WEBHOOK HIT")
  console.log("====================================")

  try {
    const body = req.body

    if (!body?.queryResult) {
      return res.status(400).json({
        fulfillmentText: "Invalid webhook request",
      })
    }

    const queryResult = body.queryResult

    const intentName =
      queryResult.intent?.displayName ||
      "Unknown"

    const sessionId =
      body.session?.split("/").pop() ||
      "unknown"

    console.log("Intent:", intentName)
    console.log("Session:", sessionId)

    const saveIntents = [
      "Capture_Name",
      "Capture_Phone",
      "Capture_Email",
      "DEMO_YES_INTENT",
      "DEMO_NO_INTENT",
      "Capture_Company",
      "Capture_Company_Size",
      "Capture_Interest",
      "Capture_Timezone",
      "Capture_Challenges",
    ]

    if (saveIntents.includes(intentName)) {
      const leadData =
        extractLeadData(queryResult)

      console.log("\n========== LEAD DATA ==========")
      console.log(
        JSON.stringify(
          leadData,
          null,
          2
        )
      )

      const lead = {
        session_id: sessionId,
        name: leadData.name,
        phone: leadData.phone,
        email: leadData.email,
        company: leadData.company,
        company_size:
          leadData.company_size,
        interest: leadData.interest,
        timezone: leadData.timezone,
        challenge: leadData.challenge,
        demo: leadData.demo,
        intent: intentName,
        source: "dialogflow",
        status: "new",
      }

      const result =
        await saveLead(lead)

      if (result.ok) {
        console.log(
          `✅ Lead Saved (${result.id})`
        )
      } else {
        console.error(
          `❌ Save Failed: ${result.error}`
        )
      }
    }

    return res.json({})
  } catch (error) {
    console.error(
      "WEBHOOK ERROR:",
      error
    )

    return res.json({
      fulfillmentText:
        "Sorry, something went wrong.",
    })
  }
}

module.exports = {
  handleWebhook,
}