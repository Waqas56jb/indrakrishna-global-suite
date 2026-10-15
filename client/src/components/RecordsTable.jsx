import { useCallback, useEffect, useState } from 'react'
import { PER_PAGE } from '../api'
import { whatsappLink } from '../config'
import Icon, { WhatsAppIcon } from './Icon'

const fmtDate = (iso) =>
  new Date(iso).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })

export default function RecordsTable({ fetcher, columns, waNumber, waMessage, emptyText }) {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [field, setField] = useState('all')
  const [date, setDate] = useState('')
  const [query, setQuery] = useState({ search: '', field: 'all', date: '' })
  const [result, setResult] = useState({ data: [], total: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      setResult(await fetcher({ page, ...query }))
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [fetcher, page, query])

  useEffect(() => { load() }, [load])

  const pages = Math.max(1, Math.ceil(result.total / PER_PAGE))
  const onSearch = (e) => {
    e.preventDefault()
    setPage(1)
    setQuery({ search, field, date })
  }
  const reset = () => {
    setSearch(''); setField('all'); setDate(''); setPage(1)
    setQuery({ search: '', field: 'all', date: '' })
  }

  return (
    <div className="records">
      <form className="records__filters" onSubmit={onSearch}>
        <div className="records__search">
          <Icon name="search" size={18} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, mobile or country…" />
        </div>
        <select value={field} onChange={(e) => setField(e.target.value)} aria-label="Search by">
          <option value="all">All fields</option>
          <option value="name">Name</option>
          <option value="mobile">Mobile No.</option>
          <option value="country">Country</option>
        </select>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} aria-label="Filter by date" />
        <button className="btn btn--primary btn--sm">Search</button>
        <button type="button" className="btn btn--ghost btn--sm" onClick={reset}>Reset</button>
      </form>

      <div className="records__meta">
        {loading ? 'Loading…' : `${result.total} record${result.total === 1 ? '' : 's'} found`}
      </div>

      {error && <p className="alert alert--error">{error}</p>}

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              {columns.map((c) => <th key={c.key}>{c.label}</th>)}
              <th>Date</th>
              <th>WhatsApp</th>
            </tr>
          </thead>
          <tbody>
            {!loading && result.data.length === 0 && (
              <tr><td colSpan={columns.length + 3} className="table__empty">{emptyText}</td></tr>
            )}
            {result.data.map((row, i) => (
              <tr key={row.id}>
                <td data-label="#">{(page - 1) * PER_PAGE + i + 1}</td>
                {columns.map((c) => (
                  <td key={c.key} data-label={c.label}>{row[c.key] || '—'}</td>
                ))}
                <td data-label="Date">{fmtDate(row.created_at)}</td>
                <td data-label="WhatsApp">
                  {waNumber(row) ? (
                    <a className="btn btn--wa btn--xs" href={whatsappLink(waNumber(row), waMessage(row))} target="_blank" rel="noreferrer">
                      <WhatsAppIcon size={14} /> Message
                    </a>
                  ) : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pager">
        <button className="btn btn--ghost btn--sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
          <Icon name="arrowL" size={16} /> Prev
        </button>
        <span>Page {page} of {pages}</span>
        <button className="btn btn--ghost btn--sm" disabled={page >= pages} onClick={() => setPage((p) => p + 1)}>
          Next <Icon name="arrowR" size={16} />
        </button>
      </div>
    </div>
  )
}
