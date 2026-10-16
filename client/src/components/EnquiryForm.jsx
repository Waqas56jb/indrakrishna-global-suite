import { useState } from 'react'
import { api } from '../api'
import { SITE, whatsappLink } from '../config'
import { COUNTRIES } from '../data'
import Icon, { WhatsAppIcon } from './Icon'

export const LIMITS = { name: 60, designation: 60, email: 100, contact_no: 18, whatsapp_no: 18, message: 500 }

export const isValidPhone = (v) => {
  const s = String(v).trim()
  const digits = s.replace(/\D/g, '')
  return /^\+?[\d\s()-]+$/.test(s) && digits.length >= 10 && digits.length <= 13
}

export function validate(values, required, minLengths = {}) {
  const errors = {}
  Object.entries(values).forEach(([k, raw]) => {
    const v = String(raw ?? '').trim()
    if (!v) {
      if (required.includes(k)) errors[k] = 'This field is required'
      return
    }
    if (k === 'name' && !/^[\p{L}][\p{L} .'-]*$/u.test(v)) errors[k] = 'Use letters only'
    else if (k === 'name' && v.length < 2) errors[k] = 'Enter at least 2 letters'
    else if (k.includes('email') && !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v)) errors[k] = 'Enter a valid email address'
    else if ((k.endsWith('_no') || k === 'mobile') && !isValidPhone(v)) errors[k] = 'Enter a valid 10–13 digit number'
    else if (minLengths[k] && v.length < minLengths[k]) errors[k] = `Enter at least ${minLengths[k]} characters`
    else if (LIMITS[k] && v.length > LIMITS[k]) errors[k] = `Maximum ${LIMITS[k]} characters`
  })
  return errors
}

const trimAll = (values) => Object.fromEntries(Object.entries(values).map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v]))

export function Field({ label, name, error, as = 'input', children, className = '', ...props }) {
  const Tag = as
  return (
    <label className={`field ${error ? 'field--error' : ''} ${className}`}>
      <span>{label}</span>
      <Tag name={name} {...props}>{children}</Tag>
      {error && <small>{error}</small>}
    </label>
  )
}

const PHONE = { inputMode: 'tel', placeholder: '+91 98xxx xxxxx', autoComplete: 'tel' }

const FORMS = {
  enquiry: {
    fields: [
      { name: 'name', label: 'Name *', placeholder: 'Your full name', autoComplete: 'name' },
      { name: 'designation', label: 'Designation', placeholder: 'E.g. HR Manager, ABC Bank' },
      { name: 'email', label: 'Mail Id *', type: 'email', placeholder: 'you@company.com', autoComplete: 'email' },
      { name: 'contact_no', label: 'Contact No *', ...PHONE },
      { name: 'whatsapp_no', label: 'WhatsApp No', ...PHONE },
      { name: 'country', label: 'Country', as: 'select', options: COUNTRIES },
      { name: 'message', label: 'Message', as: 'textarea', placeholder: 'No. of flats required, preferred size (610 / 1200 sq.ft), etc.' },
    ],
    required: ['name', 'email', 'contact_no'],
    submit: api.submitEnquiry,
    button: 'Submit Enquiry',
    success: 'Thank you! Your lease enquiry has been received. Our team will contact you shortly.',
    whatsapp: SITE.whatsapp,
    waTitle: SITE.waGreeting,
  },
  referral: {
    fields: [
      { name: 'name', label: 'Name *', placeholder: 'Your full name', autoComplete: 'name' },
      { name: 'email', label: 'Mail Id *', type: 'email', placeholder: 'you@example.com', autoComplete: 'email' },
      { name: 'contact_no', label: 'Contact No *', ...PHONE },
      { name: 'whatsapp_no', label: 'WhatsApp No', ...PHONE },
      { name: 'country', label: 'Country', as: 'select', options: COUNTRIES },
      { name: 'message', label: 'Message', as: 'textarea', placeholder: 'Name & contact of the family / friend / colleague you are referring' },
    ],
    required: ['name', 'email', 'contact_no', 'message'],
    minLengths: { message: 10 },
    submit: api.submitReferral,
    button: 'Submit Referral',
    success: 'Thank you for your referral! Our team will get in touch soon.',
    whatsapp: SITE.referral.whatsapp,
    waTitle: `New Referral – ${SITE.name}`,
  },
}

const LABELS = { name: 'Name', designation: 'Designation', email: 'Mail Id', contact_no: 'Contact No', whatsapp_no: 'WhatsApp No', country: 'Country', message: 'Message' }

export default function LeadForm({ type = 'enquiry', compact = false }) {
  const cfg = FORMS[type]
  const empty = Object.fromEntries(cfg.fields.map((f) => [f.name, f.name === 'country' ? 'India' : '']))
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ state: 'idle', message: '' })
  const [sent, setSent] = useState(null)

  const onChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }))
    setErrors((er) => ({ ...er, [e.target.name]: undefined }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(values, cfg.required, cfg.minLengths)
    setErrors(errs)
    if (Object.keys(errs).length) {
      // Bring the first invalid field into view (important on phones).
      const first = e.currentTarget.querySelector(`[name="${Object.keys(errs)[0]}"]`)
      first?.focus()
      return
    }
    setStatus({ state: 'loading', message: '' })
    const clean = trimAll(values)
    try {
      await cfg.submit({ ...clean, website: e.currentTarget.website.value })
      setSent(clean)
      setValues(empty)
      setStatus({ state: 'success', message: cfg.success })
    } catch (err) {
      if (err.errors) setErrors(err.errors) // field errors from the server
      setStatus({ state: 'error', message: err.message })
    }
  }

  const waText = sent
    ? [cfg.waTitle, ...Object.entries(sent).filter(([, v]) => v).map(([k, v]) => `${LABELS[k]}: ${v}`)].join('\n')
    : ''

  return (
    <form className={`form ${compact ? 'form--compact' : ''}`} onSubmit={onSubmit} noValidate>
      {/* Honeypot: hidden from people, filled in by spam bots */}
      <input type="text" name="website" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="form__grid">
        {cfg.fields.map(({ options, ...f }) => (
          <Field
            key={f.name}
            {...f}
            rows={f.as === 'textarea' ? (compact ? 3 : 4) : undefined}
            className={f.as === 'textarea' ? 'field--full' : ''}
            value={values[f.name]}
            onChange={onChange}
            error={errors[f.name]}
            maxLength={LIMITS[f.name]}
            aria-invalid={errors[f.name] ? 'true' : undefined}
          >
            {options?.map((o) => <option key={o}>{o}</option>)}
          </Field>
        ))}
      </div>

      {status.state === 'error' && <p className="alert alert--error">{status.message}</p>}
      {status.state === 'success' && (
        <div className="alert alert--success">
          <Icon name="check" size={18} /> {status.message}
          <a className="btn btn--wa btn--sm" href={whatsappLink(cfg.whatsapp, waText)} target="_blank" rel="noreferrer">
            <WhatsAppIcon size={16} /> Send on WhatsApp
          </a>
        </div>
      )}

      <button className="btn btn--primary btn--block" disabled={status.state === 'loading'}>
        {status.state === 'loading' ? 'Sending…' : cfg.button}
      </button>
    </form>
  )
}
