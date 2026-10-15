import { useState } from 'react'
import { api } from '../api'
import { SITE, whatsappLink } from '../config'
import { COUNTRIES } from '../data'
import Icon, { WhatsAppIcon } from './Icon'

export function validate(values, required) {
  const errors = {}
  required.forEach((k) => { if (!String(values[k] || '').trim()) errors[k] = 'This field is required' })
  Object.entries(values).forEach(([k, v]) => {
    if (!v) return
    if (k.includes('email') && !/^\S+@\S+\.\S+$/.test(v)) errors[k] = 'Enter a valid email'
    if ((k.endsWith('_no') || k === 'mobile') && !/^\+?[\d\s-]{8,16}$/.test(v)) errors[k] = 'Enter a valid number'
  })
  return errors
}

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
    waTitle: `New Lease Enquiry – ${SITE.name}`,
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
    const errs = validate(values, cfg.required)
    setErrors(errs)
    if (Object.keys(errs).length) return
    setStatus({ state: 'loading', message: '' })
    try {
      await cfg.submit(values)
      setSent(values)
      setValues(empty)
      setStatus({ state: 'success', message: cfg.success })
    } catch (err) {
      setStatus({ state: 'error', message: err.message })
    }
  }

  const waText = sent
    ? [cfg.waTitle, ...Object.entries(sent).filter(([, v]) => v).map(([k, v]) => `${LABELS[k]}: ${v}`)].join('\n')
    : ''

  return (
    <form className={`form ${compact ? 'form--compact' : ''}`} onSubmit={onSubmit} noValidate>
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
