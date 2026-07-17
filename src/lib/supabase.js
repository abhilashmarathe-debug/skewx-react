import { createClient } from '@supabase/supabase-js'

const url  = import.meta.env.VITE_SUPABASE_URL
const key  = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || !key) {
  console.warn(
    '[Supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. ' +
    'Forms will not submit until you set these in your .env file.'
  )
}

export const supabase = createClient(url || '', key || '')

// ============================================================
// FORM SUBMITTERS
// These mirror the original Django views in website/views.py.
// Each returns { ok: boolean, message: string }.
// ============================================================

function trim(v) { return (v ?? '').toString().trim() }

async function insert(table, row) {
  try {
    const { error } = await supabase.from(table).insert(row)
    if (error) {
      console.error('[Supabase insert error]', error)
      return { ok: false, message: error.message || 'Submission failed.' }
    }
    return { ok: true, message: 'Submitted successfully.' }
  } catch (e) {
    console.error('[Supabase exception]', e)
    return { ok: false, message: 'Network error. Please try again.' }
  }
}

export function submitDemo(f) {
  return insert('demo_requests', {
    name:     trim(f.name),
    email:    trim(f.email),
    company:  trim(f.company),
    size:     trim(f.size),
    interest: trim(f.interest),
    timezone: trim(f.timezone),
    message:  trim(f.message),
  })
}

export function submitROI(f) {
  return insert('roi_reports', {
    name:       trim(f.name),
    email:      trim(f.email),
    company:    trim(f.company),
    industry:   trim(f.industry),
    roi_total:  trim(f.roi_total),
    roi_manual: trim(f.roi_manual),
    roi_error:  trim(f.roi_error),
    roi_net:    trim(f.roi_net),
  })
}

export function submitStart(f) {
  return insert('get_started', {
    name:     trim(f.name),
    email:    trim(f.email),
    company:  trim(f.company),
    size:     trim(f.size),
    billing:  trim(f.billing),
    currency: trim(f.currency),
    usecase:  trim(f.usecase),
  })
}

export function submitSales(f) {
  return insert('sales_contacts', {
    name:    trim(f.name),
    email:   trim(f.email),
    company: trim(f.company),
    title:   trim(f.title),
    size:    trim(f.size),
    budget:  trim(f.budget),
    region:  trim(f.region),
    deploy:  trim(f.deploy),
    message: trim(f.message),
  })
}

export function submitContact(f) {
  return insert('contact_forms', {
    name:    trim(f.name),
    email:   trim(f.email),
    company: trim(f.company),
    size:    trim(f.size),
    region:  trim(f.region),
    budget:  trim(f.budget),
    usecase: trim(f.usecase),
    message: trim(f.message),
  })
}
