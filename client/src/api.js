// API layer. In production the PHP backend lives at VITE_API_BASE (default "/api").
// With VITE_USE_MOCK=true (see .env.development) data is kept in localStorage so the
// UI can be demoed before the PHP/MySQL backend is deployed.

const BASE = import.meta.env.VITE_API_BASE || '/api'
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'
export const PER_PAGE = 10
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

async function request(path, { method = 'GET', body, params } = {}) {
  const url = new URL(`${BASE}/${path}`, window.location.origin)
  if (params) Object.entries(params).forEach(([k, v]) => v !== '' && v != null && url.searchParams.set(k, v))
  const headers = { 'Content-Type': 'application/json' }
  if (auth.token) headers.Authorization = `Bearer ${auth.token}`
  const res = await fetch(url, { method, headers, body: body ? JSON.stringify(body) : undefined })
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

function mockList(key, { page = 1, search = '', field = 'all', date = '' }, fields) {
  const q = search.trim().toLowerCase()
  let rows = mockStore.read(key)
  if (q) {
    const cols = field === 'all' ? Object.values(fields).flat() : fields[field] || []
    rows = rows.filter((r) => cols.some((c) => String(r[c] || '').toLowerCase().includes(q)))
  }
  if (date) rows = rows.filter((r) => r.created_at.slice(0, 10) === date)
  const start = (page - 1) * PER_PAGE
  return { success: true, data: rows.slice(start, start + PER_PAGE), total: rows.length, page, per_page: PER_PAGE }
}

const CUSTOMER_FIELDS = { name: ['name'], mobile: ['mobile'], country: ['country'] }
const REFERRAL_FIELDS = {
  name: ['referrer_name', 'friend_name'],
  mobile: ['referrer_mobile', 'friend_mobile'],
  country: ['country'],
}

// ---------- public API ----------
export const api = {
  async submitEnquiry(payload) {
    if (USE_MOCK) { await delay(); return mockInsert('ikgs_customers', payload) }
    return request('enquiry.php', { method: 'POST', body: payload })
  },
  async submitReferral(payload) {
    if (USE_MOCK) { await delay(); return mockInsert('ikgs_referrals', payload) }
    return request('referral.php', { method: 'POST', body: payload })
  },
  async login(username, password) {
    let data
    if (USE_MOCK) {
      await delay()
      if (username !== 'admin' || password !== 'admin123') throw new Error('Invalid username or password.')
      data = { success: true, token: 'mock-token' }
    } else {
      data = await request('login.php', { method: 'POST', body: { username, password } })
    }
    auth.set(data.token)
    return data
  },
  logout() {
    auth.clear()
  },
  async customers(params) {
    if (USE_MOCK) { await delay(200); return mockList('ikgs_customers', params, CUSTOMER_FIELDS) }
    return request('customers.php', { params })
  },
  async referrals(params) {
    if (USE_MOCK) { await delay(200); return mockList('ikgs_referrals', params, REFERRAL_FIELDS) }
    return request('referrals.php', { params })
  },
}
