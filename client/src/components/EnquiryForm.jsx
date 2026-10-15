import { useState } from 'react'
import { api } from '../api'
import { SITE, whatsappLink } from '../config'
import { COUNTRIES } from '../data'
import Icon, { WhatsAppIcon } from './Icon'

const EMPTY = { name: '', email: '', mobile: '', country: 'India', message: '' }

export function validate(values, required) {
  const errors = {}
  required.forEach((k) => { if (!String(values[k] || '').trim()) errors[k] = 'This field is required' })
  Object.entries(values).forEach(([k, v]) => {
    if (!v) return
    if (k.includes('email') && !/^\S+@\S+\.\S+$/.test(v)) errors[k] = 'Enter a valid email'
    if (k.includes('mobile') && !/^\+?[\d\s-]{8,16}$/.test(v)) errors[k] = 'Enter a valid mobile number'
  })
  return errors
}

export function Field({ label, name, error, as = 'input', children, ...props }) {
  const Tag = as
  return (
    <label className={`field ${error ? 'field--error' : ''}`}>
      <span>{label}</span>
      <Tag name={name} {...props}>{children}</Tag>
      {error && <small>{error}</small>}
    </label>
  )
}

export default function EnquiryForm({ compact = false }) {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ state: 'idle', message: '' })
  const [sent, setSent] = useState(null)

  const onChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }))
    setErrors((er) => ({ ...er, [e.target.name]: undefined }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(values, ['name', 'mobile', 'email', 'country'])
    setErrors(errs)
    if (Object.keys(errs).length) return
    setStatus({ state: 'loading', message: '' })
    try {
      await api.submitEnquiry(values)
      setSent(values)
      setValues(EMPTY)
      setStatus({ state: 'success', message: 'Thank you! Your enquiry has been received. Our team will contact you shortly.' })
    } catch (err) {
      setStatus({ state: 'error', message: err.message })
    }
  }

  const waText = sent
    ? `New enquiry – ${SITE.name}\nName: ${sent.name}\nMobile: ${sent.mobile}\nEmail: ${sent.email}\nCountry: ${sent.country}${sent.message ? `\nMessage: ${sent.message}` : ''}`
    : ''

  return (
    <form className={`form ${compact ? 'form--compact' : ''}`} onSubmit={onSubmit} noValidate>
      <div className="form__grid">
        <Field label="Full Name *" name="name" value={values.name} onChange={onChange} error={errors.name} placeholder="Your name" />
        <Field label="Mobile Number *" name="mobile" value={values.mobile} onChange={onChange} error={errors.mobile} placeholder="+91 98xxx xxxxx" inputMode="tel" />
        <Field label="Email *" name="email" type="email" value={values.email} onChange={onChange} error={errors.email} placeholder="you@example.com" />
        <Field label="Country *" name="country" as="select" value={values.country} onChange={onChange} error={errors.country}>
          {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
        </Field>
        <Field
          label="Message"
          name="message"
          as="textarea"
          rows={compact ? 3 : 4}
          value={values.message}
          onChange={onChange}
          placeholder="Tell us your requirement, preferred move-in date…"
          className="field--full"
        />
      </div>

      {status.state === 'error' && <p className="alert alert--error">{status.message}</p>}
      {status.state === 'success' && (
        <div className="alert alert--success">
          <Icon name="check" size={18} /> {status.message}
          <a className="btn btn--wa btn--sm" href={whatsappLink(SITE.whatsapp, waText)} target="_blank" rel="noreferrer">
            <WhatsAppIcon size={16} /> Send on WhatsApp
          </a>
        </div>
      )}

      <button className="btn btn--primary btn--block" disabled={status.state === 'loading'}>
        {status.state === 'loading' ? 'Sending…' : 'Submit Enquiry'}
      </button>
    </form>
  )
}
