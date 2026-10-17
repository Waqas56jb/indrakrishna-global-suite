import { useState } from 'react'
import { Link } from 'react-router-dom'
import Gallery from '../components/Gallery'
import Icon from '../components/Icon'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import SectionTitle from '../components/SectionTitle'
import VideoTour from '../components/VideoTour'
import { SITE } from '../config'
import { FAQS, FEATURES, FLATS, GALLERY, IMAGES, LEASE_TERM, SPECIFICATIONS, STATUS_LINE, TRUST_LINE, WORKFLOW } from '../data'

const FACTS = [
  ['Flats', '6 Semi-Furnished 2-BHK'],
  ['Sizes', '610 & 1200 Sq.ft'],
  ['Floors', 'Stilt + 2 Floors'],
  ['Lease', LEASE_TERM],
  ['Approval', 'Approved'],
  ['Possession', 'Ready to Occupy by Nov 2028'],
]

function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <div className="faq">
      {FAQS.map(([q, a], i) => (
        <div key={q} className={`faq__item ${open === i ? 'is-open' : ''}`}>
          <button className="faq__q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
            <span>{q}</span>
            <Icon name="chevron" size={20} />
          </button>
          <div className="faq__a" hidden={open !== i}><p>{a}</p></div>
        </div>
      ))}
    </div>
  )
}

export default function Project() {
  return (
    <>
      <PageHero title="Project" subtitle={STATUS_LINE} image={IMAGES.elevation2} />

      <section className="section">
        <div className="container split">
          <Reveal className="split__body">
            <SectionTitle
              center={false}
              eyebrow="IndraKrishna Global Suite"
              title="Lifestyle, Budget-Wise Living"
              text={`IndraKrishna Global Suite presents a lifestyle, budget-wise property with affordable living tailored for comfort and elegance. Explore independent flats for lease in ${SITE.location}, offering spacious living and modern amenities at a prime location. Don't miss the opportunity to live in your dream flat at IndraKrishna Global Suite.`}
            />
            <p className="trust-line">{TRUST_LINE}</p>
            <div className="facts">
              {FACTS.map(([k, v]) => (
                <div key={k} className="fact">
                  <span>{k}</span>
                  <strong>{v}</strong>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal className="split__media" delay={120}>
            <img src={IMAGES.elevation1} alt="Project elevation" />
          </Reveal>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <SectionTitle eyebrow="Highlights" title="Project Features" />
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

      {/* Apartments – client's 2 BHK flat pictures */}
      <section className="section" id="apartments">
        <div className="container">
          <SectionTitle eyebrow="Apartments" title="2-BHK Flat Interiors" text="Click any picture to view it larger." />
          <nav className="flat-tabs">
            {FLATS.map((f) => (
              <a key={f.id} href={`#${f.id}`} className="chip">{f.short} · {f.type.split('– ')[1]}</a>
            ))}
          </nav>
        </div>

        {FLATS.map((f, idx) => (
          <div key={f.id} id={f.id} className="flat">
            <div className="container">
              <div className={`flat__intro ${idx % 2 ? 'flat__intro--rev' : ''}`}>
                <Reveal className="flat__cover">
                  <img src={f.cover} alt={f.type} loading="lazy" />
                  <span className="apartment__badge">For Lease</span>
                </Reveal>
                <Reveal className="flat__body" delay={120}>
                  <span className="eyebrow">{f.floor}</span>
                  <h3>{f.type}</h3>
                  <p>{f.text}</p>
                  <ul className="ticks ticks--sm">
                    {f.features.map((x) => <li key={x}><Icon name="check" size={16} /> {x}</li>)}
                  </ul>
                  <Link to="/contact" className="btn btn--primary btn--sm">Enquire for Lease</Link>
                </Reveal>
              </div>
              <Gallery items={f.photos.map((p) => ({ ...p, tag: f.type }))} filters={false} />
            </div>
          </div>
        ))}
      </section>

      <section className="section section--cream" id="video">
        <div className="container">
          <SectionTitle eyebrow="Video" title="2-BHK Apartment Video" />
          <VideoTour src={SITE.videos.flat} poster={IMAGES.flat2.hall} label="Watch the 2-BHK Video" />
        </div>
      </section>

      {/* Specifications – client sample style */}
      <section className="section specs">
        <div className="container">
          <SectionTitle light title="Specifications" />
          <div className="specs__grid">
            {SPECIFICATIONS.map((s, i) => (
              <Reveal key={s.title} className="spec" delay={(i % 3) * 100}>
                <div className="spec__img"><img src={s.image} alt={s.title} loading="lazy" /></div>
                <h3>{s.title}</h3>
                <dl>
                  {s.items.map(([k, v]) => (
                    <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
                  ))}
                </dl>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="How We Build" title="Our 3-Step Execution Workflow" />
          <div className="steps">
            {WORKFLOW.map((s, i) => (
              <Reveal key={s.title} className="step step--left" delay={i * 100}>
                <span className="step__big">0{i + 1}</span>
                <h4>{s.title}</h4>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--cream" id="gallery">
        <div className="container">
          <SectionTitle eyebrow="Gallery" title="All Pictures" />
          <Gallery items={GALLERY} />
        </div>
      </section>

      <section className="section" id="faq">
        <div className="container narrow">
          <SectionTitle eyebrow="FAQ" title="Frequently Asked Questions" />
          <Faq />
        </div>
      </section>

      <section className="section section--cream">
        <div className="container split">
          <Reveal className="split__body">
            <SectionTitle center={false} eyebrow="Site Location" title="West Mambalam, Chennai" />
            <ul className="nearby">
              <li><span><Icon name="pin" size={16} /> {SITE.siteAddress}</span></li>
              <li><span><Icon name="home" size={16} /> {SITE.landmark}</span></li>
              <li><span><Icon name="ruler" size={16} /> Plot ~3080 sq.ft · Built-up ~2700 sq.ft</span></li>
            </ul>
            <div className="btn-row">
              <a href={SITE.mapLink} target="_blank" rel="noreferrer" className="btn btn--outline">Open in Google Maps</a>
            </div>
          </Reveal>
          <Reveal className="map-frame" delay={120}>
            <iframe title="Project location" src={SITE.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </Reveal>
        </div>
      </section>
    </>
  )
}
