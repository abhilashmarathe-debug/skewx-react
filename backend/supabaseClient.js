const { createClient } = require("@supabase/supabase-js")

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY

if (!SUPABASE_URL) {
console.error("❌ SUPABASE_URL missing in .env")
process.exit(1)
}

if (!SUPABASE_SERVICE_KEY) {
console.error("❌ SUPABASE_SERVICE_KEY missing in .env")
process.exit(1)
}

console.log("✅ Supabase URL Loaded")
console.log(
"✅ Service Key Loaded:",
SUPABASE_SERVICE_KEY.substring(0, 15) + "..."
)

const supabase = createClient(
SUPABASE_URL,
SUPABASE_SERVICE_KEY,
{
auth: {
persistSession: false,
autoRefreshToken: false,
},
}
)

async function saveLead(leadData) {
  try {
    console.log("\n========== SAVING LEAD ==========")
    console.log(JSON.stringify(leadData, null, 2))

    const cleanLead = {}

    Object.entries(leadData).forEach(([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        value !== ""
      ) {
        cleanLead[key] = value
      }
    })

    console.log("\n========== UPSERT DATA ==========")
    console.log(JSON.stringify(cleanLead, null, 2))

    const { data, error } = await supabase
      .from("skewx_leads")
      .upsert(cleanLead, {
        onConflict: "session_id",
      })
      .select()

    if (error) {
      console.error("\n❌ SUPABASE UPSERT ERROR")
      console.error(error)

      return {
        ok: false,
        error: error.message,
      }
    }

    console.log("\n✅ LEAD UPSERT SUCCESS")
    console.log(data)

    return {
      ok: true,
      id: data?.[0]?.id || null,
    }

  } catch (err) {
    console.error("\n❌ SAVE LEAD EXCEPTION")
    console.error(err)

    return {
      ok: false,
      error: err.message,
    }
  }
}


async function logChatMessage(messageData) {
try {
const { error } = await supabase
.from("skewx_chat_logs")
.insert([messageData])


if (error) {
  console.log(
    "Chat log skipped:",
    error.message
  )
}


} catch (err) {
console.log(
"Chat log exception:",
err.message
)
}
}

async function testConnection() {
try {
const { error } = await supabase
.from("skewx_leads")
.select("*")
.limit(1)


if (error) {
  console.error(
    "❌ Supabase Connection Failed"
  )
  console.error(error.message)
  return false
}

console.log("✅ Supabase Connected")
return true


} catch (err) {
console.error(
"❌ Supabase Test Failed"
)
console.error(err.message)
return false
}
}

testConnection()

module.exports = {
supabase,
saveLead,
logChatMessage,
}
