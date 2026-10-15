import { useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'
import { Field, validate } from '../components/EnquiryForm'
import Icon from '../components/Icon'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import SectionTitle from '../components/SectionTitle'
import VideoTour from '../components/VideoTour'
import { SITE } from '../config'
import { COUNTRIES, IMAGES } from '../data'

const STEPS = [
  { icon: 'share', title: 'Refer', text: 'Share the details of a friend or family member looking for a home on lease.' },
  { icon: 'phone', title: 'We Connect', text: 'Our leasing team contacts them and arranges a site visit.' },
  { icon: 'gift', title: 'You Earn', text: 'Receive your referral reward once the lease agreement is signed.' },
]

const EMPTY = {
  referrer_name: '', referrer_mobile: '', referrer_email: '',
  friend_name: '', friend_mobile: '', friend_email: '',
  country: 'India', message: '',
}

export default function ReferEarn() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [agree, setAgree] = useState(false)
  const [status, setStatus] = useState({ state: 'idle', message: '' })

  const onChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }))
    setErrors((er) => ({ ...er, [e.target.name]: undefined }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(values, ['referrer_name', 'referrer_mobile', 'friend_name', 'friend_mobile', 'country'])
    if (!agree) errs.agree = 'Please accept the terms'
    setErrors(errs)
    if (Object.keys(errs).length) return
    setStatus({ state: 'loading', message: '' })
    try {
      await api.submitReferral(values)
      setValues(EMPTY)
      setAgree(false)
      setStatus({ state: 'success', message: 'Thank you for your referral! We will reach out to your friend soon.' })
    } catch (err) {
      setStatus({ state: 'error', message: err.message })
    }
  }

  const f = (name, label, props = {}) => (
    <Field label={label} name={name} value={values[name]} onChange={onChange} error={errors[name]} {...props} />
  )

  return (
    <>
      <PageHero title="Refer & Earn" subtitle="Share a home. Earn a reward." image={IMAGES.flat2.hall} />

      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="How it Works" title="Refer in 3 Simple Steps" />
          <div className="steps">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} className="step" delay={i * 100}>
                <span className="step__num">0{i + 1}</span>
                <span className="amenity__icon"><Icon name={s.icon} size={26} /></span>
                <h4>{s.title}</h4>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <SectionTitle eyebrow="Videos" title="Share These With Your Friends" text="Show them the building and the 2 BHK apartment before they visit." />
          <div className="video-pair">
            <div>
              <VideoTour src={SITE.videos.elevation} poster={IMAGES.elevation1} label="Elevation Video" />
              <h4>Elevation Video</h4>
            </div>
            <div>
              <VideoTour src={SITE.videos.flat} poster={IMAGES.flat1.hall} label="2 BHK Video" />
              <h4>2 BHK Apartment Video</h4>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <SectionTitle eyebrow="Referral Form" title="Refer a Friend" text="Fill in your details and the details of the person you are referring." />
          <form className="card form" onSubmit={onSubmit} noValidate>
            <h3 className="form__legend"><Icon name="user" size={18} /> Your Details</h3>
            <div className="form__grid">
              {f('referrer_name', 'Your Name *', { placeholder: 'Your full name' })}
              {f('referrer_mobile', 'Your Mobile *', { placeholder: '+91 98xxx xxxxx', inputMode: 'tel' })}
              {f('referrer_email', 'Your Email', { type: 'email', placeholder: 'you@example.com' })}
              <Field label="Country *" name="country" as="select" value={values.country} onChange={onChange} error={errors.country}>
                {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
              </Field>
            </div>

            <h3 className="form__legend"><Icon name="users" size={18} /> Friend's Details</h3>
            <div className="form__grid">
              {f('friend_name', "Friend's Name *", { placeholder: "Friend's full name" })}
              {f('friend_mobile', "Friend's Mobile *", { placeholder: '+91 98xxx xxxxx', inputMode: 'tel' })}
              {f('friend_email', "Friend's Email", { type: 'email', placeholder: 'friend@example.com' })}
              {f('message', 'Requirement / Notes', { as: 'textarea', rows: 3, className: 'field--full', placeholder: 'E.g. looking for 2 BHK from Jan 2029' })}
            </div>

            <label className={`check ${errors.agree ? 'check--error' : ''}`}>
              <input type="checkbox" checked={agree} onChange={(e) => { setAgree(e.target.checked); setErrors((er) => ({ ...er, agree: undefined })) }} />
              <span>I agree to the <Link to="/terms">Terms &amp; Conditions</Link> of the referral programme.</span>
            </label>

            {status.state === 'error' && <p className="alert alert--error">{status.message}</p>}
            {status.state === 'success' && <p className="alert alert--success"><Icon name="check" size={18} /> {status.message}</p>}

            <button className="btn btn--primary btn--block" disabled={status.state === 'loading'}>
              {status.state === 'loading' ? 'Submitting…' : 'Submit Referral'}
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
