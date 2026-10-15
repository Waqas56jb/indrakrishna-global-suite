import { useCallback, useEffect, useState } from 'react'
import { PAGE_SIZES } from '../api'
import { whatsappLink } from '../config'
import { useLockBodyScroll } from '../hooks'
import { Field } from './EnquiryForm'
import Icon, { WhatsAppIcon } from './Icon'

const fmtDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : ''

const cellValue = (row, c) => (c.key === 'created_at' ? fmtDate(row.created_at) : row[c.key])

function toCsv(rows, columns) {
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`
  const head = ['S.No', ...columns.map((c) => c.label)].map(esc).join(',')
  const body = rows.map((r, i) => [i + 1, ...columns.map((c) => cellValue(r, c))].map(esc).join(','))
  return '﻿' + [head, ...body].join('\r\n')
}

function EditModal({ row, columns, onClose, onSave }) {
  const editable = columns.filter((c) => c.key !== 'created_at')
  const [values, setValues] = useState(() => Object.fromEntries(editable.map((c) => [c.key, row[c.key] ?? ''])))
  const [state, setState] = useState({ saving: false, error: '' })
  useLockBodyScroll(true)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const submit = async (e) => {
    e.preventDefault()
    setState({ saving: true, error: '' })
    try {
      await onSave(row.id, values)
    } catch (err) {
      setState({ saving: false, error: err.message })
    }
  }

  return (
    <div className="modal" role="dialog" aria-modal="true" onClick={onClose}>
      <form className="modal__card" onClick={(e) => e.stopPropagation()} onSubmit={submit}>
        <div className="modal__head">
          <h3>Edit – {row.name || `#${row.id}`}</h3>
          <button type="button" className="modal__close" onClick={onClose} aria-label="Close"><Icon name="close" size={22} /></button>
        </div>
        <div className="modal__body form__grid">
          {editable.map((c) => (
            <Field
              key={c.key}
              label={c.label}
              name={c.key}
              as={c.options ? 'select' : c.type === 'textarea' ? 'textarea' : 'input'}
              type={c.options || c.type === 'textarea' ? undefined : c.type || 'text'}
              rows={c.type === 'textarea' ? 3 : undefined}
              className={c.type === 'textarea' ? 'field--full' : ''}
              value={values[c.key]}
              onChange={(e) => setValues((v) => ({ ...v, [c.key]: e.target.value }))}
            >
              {c.options ? [<option key="" value="">—</option>, ...c.options.map((o) => <option key={o}>{o}</option>)] : undefined}
            </Field>
          ))}
        </div>
        {state.error && <p className="alert alert--error">{state.error}</p>}
        <div className="modal__foot">
          <button type="button" className="btn btn--ghost btn--sm" onClick={onClose}>Cancel</button>
          <button className="btn btn--primary btn--sm" disabled={state.saving}>{state.saving ? 'Saving…' : 'Save Changes'}</button>
        </div>
      </form>
    </div>
  )
}

export default function RecordsTable({ fetcher, update, columns, statuses, waMessage, emptyText, exportName }) {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(PAGE_SIZES[0])
  const [form, setForm] = useState({ search: '', field: 'all', status: '', date: '' })
  const [query, setQuery] = useState(form)
  const [result, setResult] = useState({ data: [], total: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(null)
  const [exporting, setExporting] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      setResult(await fetcher({ page, per_page: perPage, ...query }))
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [fetcher, page, perPage, query])

  useEffect(() => { load() }, [load])

  const pages = Math.max(1, Math.ceil(result.total / perPage))
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const onSearch = (e) => {
    e.preventDefault()
    setPage(1)
    setQuery(form)
  }
  const reset = () => {
    const empty = { search: '', field: 'all', status: '', date: '' }
    setForm(empty)
    setPage(1)
    setQuery(empty)
  }

  const save = async (id, values) => {
    await update(id, values)
    setEditing(null)
    load()
  }

  const exportCsv = async () => {
    setExporting(true)
    try {
      const all = await fetcher({ page: 1, per_page: 100000, ...query })
      const blob = new Blob([toCsv(all.data, columns)], { type: 'text/csv;charset=utf-8' })
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = `${exportName}-${new Date().toISOString().slice(0, 10)}.csv`
      a.click()
      URL.revokeObjectURL(a.href)
    } catch (e) {
      setError(e.message)
    } finally {
      setExporting(false)
    }
  }

  const from = result.total ? (page - 1) * perPage + 1 : 0
  const to = Math.min(page * perPage, result.total)

  return (
    <div className="records">
      <form className="records__filters" onSubmit={onSearch}>
        <div className="records__search">
          <Icon name="search" size={18} />
          <input value={form.search} onChange={set('search')} placeholder="Search Name / Mobile No. / Country…" aria-label="Search" />
        </div>
        <select value={form.field} onChange={set('field')} aria-label="Search by">
          <option value="all">All fields</option>
          <option value="name">Name</option>
          <option value="mobile">Mobile No.</option>
          <option value="country">Country</option>
        </select>
        <select value={form.status} onChange={set('status')} aria-label="Status">
          <option value="">All statuses</option>
          {statuses.map((s) => <option key={s}>{s}</option>)}
        </select>
        <input type="date" value={form.date} onChange={set('date')} aria-label="Filter by date" />
        <button className="btn btn--primary btn--sm"><Icon name="search" size={16} /> Search</button>
        <button type="button" className="btn btn--ghost btn--sm" onClick={reset}>Reset</button>
      </form>

      <div className="records__bar">
        <span className="records__meta">
          {loading ? 'Loading…' : result.total ? `Showing ${from}–${to} of ${result.total} records` : '0 records'}
        </span>
        <div className="records__tools">
          <label className="records__size">
            Show
            <select
              value={perPage}
              onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1) }}
              aria-label="Records per page"
            >
              {PAGE_SIZES.map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
            per page
          </label>
          <button type="button" className="btn btn--ghost btn--sm" onClick={exportCsv} disabled={exporting || !result.total}>
            <Icon name="download" size={16} /> {exporting ? 'Exporting…' : 'Export CSV'}
          </button>
        </div>
      </div>

      {error && <p className="alert alert--error">{error}</p>}

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>S.No</th>
              {columns.map((c) => <th key={c.key}>{c.label}</th>)}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading && result.data.length === 0 && (
              <tr><td colSpan={columns.length + 2} className="table__empty">{emptyText}</td></tr>
            )}
            {result.data.map((row, i) => {
              const wa = row.whatsapp_no || row.contact_no
              return (
                <tr key={row.id}>
                  <td data-label="S.No">{(page - 1) * perPage + i + 1}</td>
                  {columns.map((c) => (
                    <td key={c.key} data-label={c.label} className={c.key === 'message' ? 'table__wide' : ''}>
                      {c.key === 'status' && row.status ? (
                        <span className={`badge badge--${row.status.toLowerCase().replace(/\s+/g, '-')}`}>{row.status}</span>
                      ) : (
                        cellValue(row, c) || '—'
                      )}
                    </td>
                  ))}
                  <td data-label="Actions">
                    <div className="table__actions">
                      {wa && (
                        <a className="btn btn--wa btn--xs" href={whatsappLink(wa, waMessage(row))} target="_blank" rel="noreferrer" aria-label="WhatsApp">
                          <WhatsAppIcon size={14} /> WhatsApp
                        </a>
                      )}
                      <button type="button" className="btn btn--ghost btn--xs" onClick={() => setEditing(row)}>
                        <Icon name="edit" size={14} /> Edit
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
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

      {editing && <EditModal row={editing} columns={columns} onClose={() => setEditing(null)} onSave={save} />}
    </div>
  )
}
