import { Link } from 'react-router-dom'
import LeadForm from '../components/EnquiryForm'
import HeroSlider from '../components/HeroSlider'
import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import SectionTitle from '../components/SectionTitle'
import VideoTour from '../components/VideoTour'
import { SITE, tel } from '../config'
import { FEATURES, FLATS, HIGHLIGHTS, IMAGES, LEASE_TERM, SECTORS, SLIDES, STATUS_LINE } from '../data'

export default function Home() {
  return (
    <>
      <HeroSlider slides={SLIDES} />

      {/* Status line under the banner (client requirement) */}
      <div className="status-strip">
        <div className="container status-strip__inner">
          <span className="status-strip__dot" />
          <strong>{STATUS_LINE}</strong>
          <a href={tel(SITE.phone)} className="btn btn--gold btn--sm"><Icon name="phone" size={16} /> {SITE.phone}</a>
          <span className="status-strip__sub">One Tenant / Client can take Multiple Flats on Lease – Total 6 Flats</span>
        </div>
      </div>

      <section className="highlights">
        <div className="container highlights__grid">
          {HIGHLIGHTS.map((h, i) => (
            <Reveal key={h.label} delay={i * 80} className="highlight">
              <strong>{h.value}</strong>
              <span>{h.label}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="section">
        <div className="container split">
          <Reveal className="split__media">
            <img src={IMAGES.elevation3} alt="IndraKrishna Global Suite elevation" />
            <div className="split__tag">
              <span>Ready by</span>
              <strong>Nov 2028</strong>
            </div>
          </Reveal>
          <Reveal className="split__body" delay={120}>
            <SectionTitle
              center={false}
              eyebrow="Premium 2-BHK Suite Apartments"
              title="Purely Residential Apartment for Corporates"
              text="Designed for Corporate Companies, Staff Quarters and Guest Houses."
            />
            <p className="lead">
              We are constructing 2-BHK flats on a 3000 sq.feet area with Stilt + 2 floors at West Mambalam, Chennai. The
              stilt floor has a covered car park, with lift access to both residential floors. The First Floor has 4 flats of 610 sq.feet and the Second
              Floor has 2 flats of 1200 sq.feet – a total of 6 flats.
            </p>
            <p className="lead">
              The flats are offered on lease for <strong>{LEASE_TERM}</strong>. Construction will be completed and ready to
              occupy by Nov 2028.
            </p>
            <div className="btn-row">
              <Link to="/project" className="btn btn--primary">View Project</Link>
              <Link to="/contact" className="btn btn--outline">Enquire for Lease</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Who it's for */}
      <section className="section section--dark">
        <div className="container">
          <SectionTitle
            light
            eyebrow="Who We Are Looking For"
            title="Ideal for Corporate Staff Quarters & Guest Houses"
            text="We are looking for Corporate Companies, Working Professionals and Government organisations who need flats for their employees for around 8–10 years on lease – including clients worldwide with an office in India."
          />
          <div className="audience">
            <Reveal className="audience__card">
              <Icon name="briefcase" size={28} />
              <h4>Corporate Companies</h4>
              <p>Staff quarters for your employees on a long-term lease.</p>
            </Reveal>
            <Reveal className="audience__card" delay={100}>
              <Icon name="globe" size={28} />
              <h4>Global Clients</h4>
              <p>Companies worldwide with an office in India – as staff quarters / guest houses.</p>
            </Reveal>
            <Reveal className="audience__card" delay={200}>
              <Icon name="users" size={28} />
              <h4>1 – 6 Clients</h4>
              <p>Tenants can take 1 / 2 / 4 or 6 flats on lease.</p>
            </Reveal>
          </div>
          <h3 className="sectors__title">Pure Residential Accommodation Ideal for Working Professionals From</h3>
          <div className="sectors">
            {SECTORS.map((s) => <span key={s} className="sector">{s}</span>)}
          </div>
        </div>
      </section>

      {/* NRI tenants (client requirement) */}
      <section className="nri-band">
        <div className="container nri-band__inner">
          <span className="nri-band__icon"><Icon name="globe" size={30} /></span>
          <div>
            <h3>NRI Tenants Welcome</h3>
            <p>There is no restriction on the number of flats to take on lease.</p>
          </div>
          <Link to="/loan-assistance#nri" className="btn btn--gold btn--sm">NRI Details</Link>
        </div>
      </section>

      {/* Flats */}
      <section className="section section--cream">
        <div className="container">
          <SectionTitle eyebrow="6 Semi-Furnished Flats" title="Choose Your Flat Size" />
          <div className="flat-cards">
            {FLATS.map((f, i) => (
              <Reveal key={f.id} className="flat-card" delay={i * 120}>
                <Link to={`/project#${f.id}`} className="flat-card__img">
                  <img src={f.cover} alt={f.type} loading="lazy" />
                  <span className="apartment__badge">For Lease</span>
                </Link>
                <div className="flat-card__body">
                  <span className="eyebrow">{f.floor}</span>
                  <h3>{f.type}</h3>
                  <p>{f.text}</p>
                  <Link to={`/project#${f.id}`} className="btn btn--outline btn--sm">View Pictures</Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Elevation video */}
      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Video" title="Elevation Video" text="See the building from every angle – facade, entrance and gated frontage." />
          <Reveal>
            <VideoTour src={SITE.videos.elevation} poster={IMAGES.elevation2} label="Watch the Elevation Video" />
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section className="section section--cream">
        <div className="container">
          <SectionTitle eyebrow="Features" title="Amenities & Facilities" />
          <div className="amenities">
            {FEATURES.map((a, i) => (
              <Reveal key={a.title} className="amenity" delay={(i % 4) * 80}>
                <span className="amenity__icon"><Icon name={a.icon} size={26} /></span>
                <h4>{a.title}</h4>
                <p>{a.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Loan assistance teaser */}
      <section className="section">
        <div className="container split">
          <Reveal className="split__body">
            <SectionTitle
              center={false}
              eyebrow="Finance Made Easy"
              title="Loan Assistance Available"
              text="For salaried and business customers. Share your documents – after checking eligibility, we shall proceed."
            />
            <ul className="ticks">
              <li><Icon name="check" size={18} /> Salaried – Aadhaar, Address Proof, 6 months Salary Slips, Bank Statement & ITR</li>
              <li><Icon name="check" size={18} /> Business – Aadhaar, Address Proof, 6 months Bank Statement & ITR</li>
              <li><Icon name="check" size={18} /> NRI tenants welcome – there is no restriction on number of flats to take on lease</li>
            </ul>
            <div className="btn-row">
              <Link to="/loan-assistance" className="btn btn--primary">Loan & NRI Details</Link>
            </div>
          </Reveal>
          <Reveal className="split__media loan" delay={120}>
            <img src={IMAGES.keys} alt="Loan assistance" loading="lazy" />
            <div className="loan__card">
              <span className="amenity__icon"><Icon name="bank" size={24} /></span>
              <div>
                <strong>Eligibility Check</strong>
                <span>We guide you end-to-end</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>


      {/* Refer CTA */}
      <section className="cta" style={{ backgroundImage: `url(${IMAGES.elevation1})` }}>
        <div className="cta__overlay" />
        <div className="container cta__inner">
          <div>
            <span className="eyebrow eyebrow--light">Refer & Earn</span>
            <h2>Earn up to {SITE.referral.bonus}</h2>
            <p>Refer your family, friends or colleagues to take a flat on lease for {LEASE_TERM}.</p>
          </div>
          <Link to="/refer-and-earn" className="btn btn--gold">Refer Now</Link>
        </div>
      </section>

      {/* Enquiry */}
      <section className="section">
        <div className="container split split--form">
          <div>
            <SectionTitle
              center={false}
              eyebrow="Lease Enquiries"
              title="Enquire for Lease"
              text={`Lease for ${LEASE_TERM}. Share your details and our team will get back to you.`}
            />
            <div className="contact-mini">
              <a href={tel(SITE.phone)}><Icon name="phone" /> {SITE.phone}</a>
              <span><Icon name="mail" /> {SITE.email}</span>
              <span><Icon name="pin" /> {SITE.siteAddress}</span>
            </div>
          </div>
          <div className="card"><LeadForm type="enquiry" compact /></div>
        </div>
      </section>
    </>
  )
}
