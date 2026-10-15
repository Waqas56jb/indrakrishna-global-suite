import { Link } from 'react-router-dom'
import EnquiryForm from '../components/EnquiryForm'
import Gallery from '../components/Gallery'
import HeroSlider from '../components/HeroSlider'
import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import SectionTitle from '../components/SectionTitle'
import VideoTour from '../components/VideoTour'
import { SITE } from '../config'
import { AMENITIES, GALLERY, HIGHLIGHTS, IMAGES, LOAN_POINTS, SLIDES, SPECIFICATIONS, STATUS_LINE } from '../data'

export default function Home() {
  return (
    <>
      <HeroSlider slides={SLIDES} />

      {/* Status line under the banner (client requirement) */}
      <div className="status-strip">
        <div className="container status-strip__inner">
          <span className="status-strip__dot" />
          <strong>{STATUS_LINE}</strong>
          <Link to="/contact" className="btn btn--gold btn--sm">Enquire Now</Link>
        </div>
      </div>

      {/* Highlights strip */}
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

      {/* About / elevation */}
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
              eyebrow="Welcome to"
              title={SITE.name}
              text={`A boutique residential address in ${SITE.location}, offering premium 2 BHK apartments for lease with thoughtful layouts, elegant finishes and everyday convenience at your doorstep.`}
            />
            <ul className="ticks">
              <li><Icon name="check" size={18} /> Gated community with landscaped entrance</li>
              <li><Icon name="check" size={18} /> Spacious 2 BHK homes with balconies & ample ventilation</li>
              <li><Icon name="check" size={18} /> Lobby with passenger lift and power backup</li>
              <li><Icon name="check" size={18} /> Loan assistance from leading banks</li>
            </ul>
            <div className="btn-row">
              <Link to="/project" className="btn btn--primary">View Apartments</Link>
              <Link to="/contact" className="btn btn--outline">Book a Site Visit</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Elevation video */}
      <section className="section section--cream">
        <div className="container">
          <SectionTitle eyebrow="Video" title="Elevation Walkthrough" text="See the building from every angle – facade, entrance and gated frontage." />
          <Reveal>
            <VideoTour src={SITE.videos.elevation} poster={IMAGES.elevation2} label="Watch the Elevation Video" />
          </Reveal>
        </div>
      </section>

      {/* Specifications – styled after client sample */}
      <section className="section specs">
        <div className="container">
          <SectionTitle light title="Specifications" text="Quality finishes chosen for comfort, durability and style." />
          <div className="specs__grid">
            {SPECIFICATIONS.map((s, i) => (
              <Reveal key={s.title} className="spec" delay={(i % 3) * 100}>
                <div className="spec__img"><img src={s.image} alt={s.title} loading="lazy" /></div>
                <h3>{s.title}</h3>
                <dl>
                  {s.items.map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="section section--cream">
        <div className="container">
          <SectionTitle eyebrow="Facilities" title="Amenities & Conveniences" text="Everything you need for a secure, comfortable and connected lifestyle." />
          <div className="amenities">
            {AMENITIES.map((a, i) => (
              <Reveal key={a.title} className="amenity" delay={(i % 4) * 80}>
                <span className="amenity__icon"><Icon name={a.icon} size={26} /></span>
                <h4>{a.title}</h4>
                <p>{a.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Loan assistance */}
      <section className="section">
        <div className="container split">
          <Reveal className="split__body">
            <SectionTitle
              center={false}
              eyebrow="Finance Made Easy"
              title="Loan Assistance Available"
              text="Our team helps you get the right loan with minimum hassle – from eligibility check to final approval."
            />
            <ul className="ticks">
              {LOAN_POINTS.map((p) => <li key={p}><Icon name="check" size={18} /> {p}</li>)}
            </ul>
            <div className="btn-row">
              <Link to="/contact" className="btn btn--primary">Ask About Loans</Link>
            </div>
          </Reveal>
          <Reveal className="split__media loan" delay={120}>
            <img src={IMAGES.keys} alt="Loan assistance" loading="lazy" />
            <div className="loan__card">
              <span className="amenity__icon"><Icon name="shield" size={24} /></span>
              <div>
                <strong>Hassle-free Process</strong>
                <span>End-to-end support</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="section section--cream">
        <div className="container">
          <SectionTitle eyebrow="Gallery" title="Elevation & Interiors" />
          <Gallery items={[GALLERY[0], GALLERY[1], ...GALLERY.filter((g) => /Hall|Kitchen|Balcony|Lobby/.test(g.caption))].slice(0, 6)} filters={false} />
          <div className="center mt-lg">
            <Link to="/project" className="btn btn--outline">View All Apartment Pictures</Link>
          </div>
        </div>
      </section>

      {/* Refer CTA */}
      <section className="cta" style={{ backgroundImage: `url(${IMAGES.elevation1})` }}>
        <div className="cta__overlay" />
        <div className="container cta__inner">
          <div>
            <span className="eyebrow eyebrow--light">Refer & Earn</span>
            <h2>Know someone looking for a home?</h2>
            <p>Refer your friends and family to {SITE.name} and earn exciting rewards on every successful lease.</p>
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
              eyebrow="Get in Touch"
              title="Enquire About Leasing"
              text="Share your details and our leasing team will get back to you with availability, pricing and site-visit slots."
            />
            <div className="contact-mini">
              <a href={`tel:${SITE.phone.replace(/\s/g, '')}`}><Icon name="phone" /> {SITE.phone}</a>
              <a href={`mailto:${SITE.email}`}><Icon name="mail" /> {SITE.email}</a>
              <span><Icon name="pin" /> {SITE.siteAddress}</span>
            </div>
          </div>
          <div className="card"><EnquiryForm compact /></div>
        </div>
      </section>
    </>
  )
}
