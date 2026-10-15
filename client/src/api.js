// API layer. In production the PHP backend lives at VITE_API_BASE (default "/api").
// With VITE_USE_MOCK=true (see .env.development) data is kept in localStorage so the
// UI can be demoed before the PHP/MySQL backend is deployed.
//
// Endpoints expected from the PHP backend (JSON in / JSON out):
//   POST enquiry.php            -> { success, id }
//   POST referral.php           -> { success, id }
//   POST login.php              { mobile, password } -> { success, token }
//   GET  customers.php          ?page&per_page&search&field&status&date -> { success, data, total }
//                               (field = all|name|mobile|country; mobile search must match digits only)
//   GET  referrals.php          (same params)
//   POST customers.php?id=N     { ...fields } -> { success }   (admin update)
//   POST referrals.php?id=N     { ...fields } -> { success }

const BASE = import.meta.env.VITE_API_BASE || '/api'
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'
export const PAGE_SIZES = [10, 20]
const TOKEN_KEY = 'ikgs_admin_token'

export const auth = {
  get token() {
    try { return sessionStorage.getItem(TOKEN_KEY) } catch { return null }
  },
  set(token) {
    try { sessionStorage.setItem(TOKEN_KEY, token) } catch { /* ignore */ }
  },
  clear() {
    try { sessionStorage.removeItem(TOKEN_KEY) } catch { /* ignore */ }
  },
}

async function request(path, { body, params } = {}) {
  const url = new URL(`${BASE}/${path}`, window.location.origin)
  if (params) Object.entries(params).forEach(([k, v]) => v !== '' && v != null && url.searchParams.set(k, v))
  const headers = { 'Content-Type': 'application/json' }
  if (auth.token) headers.Authorization = `Bearer ${auth.token}`
  const init = body ? { method: 'POST', headers, body: JSON.stringify(body) } : { headers }
  const res = await fetch(url, init)
  const data = await res.json().catch(() => ({}))
  if (!res.ok || data.success === false) {
    if (res.status === 401) auth.clear()
    throw new Error(data.message || 'Something went wrong. Please try again.')
  }
  return data
}

// ---------- mock backend ----------
const mockStore = {
  read(key) {
    try { return JSON.parse(localStorage.getItem(key)) || [] } catch { return [] }
  },
  write(key, rows) {
    try { localStorage.setItem(key, JSON.stringify(rows)) } catch { /* ignore */ }
  },
}
const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms))

function mockInsert(key, payload) {
  const rows = mockStore.read(key)
  const row = { id: (rows[0]?.id || 0) + 1, ...payload, created_at: new Date().toISOString() }
  mockStore.write(key, [row, ...rows])
  return { success: true, id: row.id }
}

function mockUpdate(key, id, payload) {
  mockStore.write(key, mockStore.read(key).map((r) => (r.id === id ? { ...r, ...payload, id } : r)))
  return { success: true }
}

const SEARCH_FIELDS = {
  name: ['name'],
  mobile: ['contact_no', 'whatsapp_no'],
  country: ['country'],
}

function mockList(key, { page = 1, per_page = 10, search = '', field = 'all', status = '', date = '' }) {
  const q = search.trim().toLowerCase()
  let rows = mockStore.read(key)
  if (q) {
    const cols = field === 'all' ? Object.values(SEARCH_FIELDS).flat() : SEARCH_FIELDS[field] || []
    const digits = q.replace(/\D/g, '')
    const isPhone = (c) => SEARCH_FIELDS.mobile.includes(c)
    // Phone numbers are matched on digits only, so "98765 43210" finds "+91 9876543210".
    rows = rows.filter((r) => cols.some((c) =>
      isPhone(c) && digits.length >= 3
        ? String(r[c] || '').replace(/\D/g, '').includes(digits)
        : String(r[c] || '').toLowerCase().includes(q)))
  }
  if (status) rows = rows.filter((r) => r.status === status)
  if (date) rows = rows.filter((r) => r.created_at.slice(0, 10) === date)
  const start = (page - 1) * per_page
  return { success: true, data: rows.slice(start, start + per_page), total: rows.length, page, per_page }
}

// ---------- public API ----------
export const api = {
  async submitEnquiry(payload) {
    const row = { ...payload, status: 'Enquired' }
    if (USE_MOCK) { await delay(); return mockInsert('ikgs_customers', row) }
    return request('enquiry.php', { body: row })
  },
  async submitReferral(payload) {
    const row = { ...payload, status: 'Referred' }
    if (USE_MOCK) { await delay(); return mockInsert('ikgs_referrals', row) }
    return request('referral.php', { body: row })
  },
  async login(mobile, password) {
    let data
    if (USE_MOCK) {
      await delay()
      if (mobile.replace(/\D/g, '').slice(-10) !== '9003280221' || password !== 'admin123') {
        throw new Error('Invalid mobile number or password.')
      }
      data = { success: true, token: 'mock-token' }
    } else {
      data = await request('login.php', { body: { mobile, password } })
    }
    auth.set(data.token)
    return data
  },
  logout() {
    auth.clear()
  },
  async customers(params) {
    if (USE_MOCK) { await delay(200); return mockList('ikgs_customers', params) }
    return request('customers.php', { params })
  },
  async referrals(params) {
    if (USE_MOCK) { await delay(200); return mockList('ikgs_referrals', params) }
    return request('referrals.php', { params })
  },
  async updateCustomer(id, payload) {
    if (USE_MOCK) { await delay(300); return mockUpdate('ikgs_customers', id, payload) }
    return request('customers.php', { params: { id }, body: payload })
  },
  async updateReferral(id, payload) {
    if (USE_MOCK) { await delay(300); return mockUpdate('ikgs_referrals', id, payload) }
    return request('referrals.php', { params: { id }, body: payload })
  },
}
