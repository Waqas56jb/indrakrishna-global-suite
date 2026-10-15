import { Link } from 'react-router-dom'
import LeadForm from '../components/EnquiryForm'
import Gallery from '../components/Gallery'
import HeroSlider from '../components/HeroSlider'
import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import SectionTitle from '../components/SectionTitle'
import VideoTour from '../components/VideoTour'
import { SITE, tel } from '../config'
import { FEATURES, FLATS, GALLERY, HIGHLIGHTS, IMAGES, LEASE_TERM, SECTORS, SLIDES, STATUS_LINE } from '../data'

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
              We are constructing 2-BHK flats on a 3000 sq.feet plot with 2 floors at West Mambalam, Chennai. The ground floor
              has a covered car park, and a lift serves both floors. The First Floor has 4 flats of 610 sq.feet and the Second
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
              <p>Companies worldwide with an office in India – as guest houses.</p>
            </Reveal>
            <Reveal className="audience__card" delay={200}>
              <Icon name="users" size={28} />
              <h4>4 – 5 Clients</h4>
              <p>Take 1, 2 or all 6 flats in the apartment.</p>
            </Reveal>
          </div>
          <h3 className="sectors__title">Pure Residential Accommodation Ideal for Working Professionals From</h3>
          <div className="sectors">
            {SECTORS.map((s) => <span key={s} className="sector">{s}</span>)}
          </div>
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
              <li><Icon name="check" size={18} /> NRI tenants welcome – no restriction on number of flats</li>
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

      {/* Gallery */}
      <section className="section section--cream">
        <div className="container">
          <SectionTitle eyebrow="Gallery" title="Elevation & 2-BHK Interiors" />
          <Gallery items={[GALLERY[0], GALLERY[1], ...GALLERY.filter((g) => /Hall|Kitchen|Balcony|Lobby/.test(g.caption))].slice(0, 6)} filters={false} />
          <div className="center mt-lg">
            <Link to="/project" className="btn btn--outline">View All Pictures</Link>
          </div>
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
              <a href={`mailto:${SITE.email}`}><Icon name="mail" /> {SITE.email}</a>
              <span><Icon name="pin" /> {SITE.siteAddress}</span>
            </div>
          </div>
          <div className="card"><LeadForm type="enquiry" compact /></div>
        </div>
      </section>
    </>
  )
}
