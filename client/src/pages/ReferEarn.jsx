import { Link } from 'react-router-dom'
import LeadForm from '../components/EnquiryForm'
import Icon from '../components/Icon'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import SectionTitle from '../components/SectionTitle'
import VideoTour from '../components/VideoTour'
import { SITE, tel } from '../config'
import { IMAGES, LEASE_TERM } from '../data'

const STEPS = [
  { icon: 'share', title: 'Refer', text: 'Refer your family, friends or colleagues looking for a flat on lease.' },
  { icon: 'file', title: 'Tenants / Clients / NRI Can take 1 / 2 / 4 or 6 Flats', text: `They take a flat on lease for ${LEASE_TERM}.` },
  { icon: 'gift', title: 'You Earn', text: `Earn up to ${SITE.referral.bonus} per unit as per the referral terms.` },
]

export default function ReferEarn() {
  return (
    <>
      <PageHero title="Refer & Earn" subtitle={`Earn up to ${SITE.referral.bonus}`} image={IMAGES.flat2.hall} />

      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Refer & Earn"
            title={`Refer & Earn up to ${SITE.referral.bonus}/-`}
            text={<>Refer your family, friends or colleagues to take up a flat on lease for <span className="nowrap">{LEASE_TERM}</span> and earn up to <span className="nowrap">Rs. 25,000/-.</span></>}
          />
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
          <div className="note">
            <Icon name="phone" size={22} />
            <p>
              Call us at <a href={tel(SITE.referral.phone)}><strong>{SITE.referral.phone}</strong></a> or mail{' '}
              <strong>{SITE.referral.email}</strong>
            </p>
            <Link to="/terms" className="btn btn--outline btn--sm">Referral Terms</Link>
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <SectionTitle eyebrow="Videos" title="Share These With Your Friends" text="Show them the building and the 2-BHK apartment before they visit." />
          <div className="video-pair">
            <div>
              <VideoTour src={SITE.videos.elevation} poster={IMAGES.elevation1} label="Elevation Video" />
              <h4>Elevation Video</h4>
            </div>
            <div>
              <VideoTour src={SITE.videos.flat} poster={IMAGES.flat1.hall} label="2-BHK Video" />
              <h4>2-BHK Apartment Video</h4>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <SectionTitle eyebrow="Referral Form" title="Refer Now" text="Fill in your details and tell us who you are referring." />
          <div className="card"><LeadForm type="referral" /></div>
        </div>
      </section>
    </>
  )
}
