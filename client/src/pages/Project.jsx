import { Link } from 'react-router-dom'
import Gallery from '../components/Gallery'
import Icon from '../components/Icon'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import SectionTitle from '../components/SectionTitle'
import VideoTour from '../components/VideoTour'
import { SITE } from '../config'
import { AMENITIES, FLATS, GALLERY, IMAGES, NEARBY, SPECIFICATIONS, STATUS_LINE } from '../data'

const FACTS = [
  ['Project', SITE.name],
  ['Location', SITE.location],
  ['Apartments', '2 BHK'],
  ['Purpose', 'For Lease'],
  ['Status', 'Under Construction'],
  ['Possession', 'Ready to Occupy by Nov 2028'],
]

export default function Project() {
  return (
    <>
      <PageHero title="Project" subtitle={STATUS_LINE} image={IMAGES.elevation2} />

      <section className="section">
        <div className="container split">
          <Reveal className="split__body">
            <SectionTitle
              center={false}
              eyebrow="Project Overview"
              title="Modern Living, Timeless Comfort"
              text={`${SITE.name} brings together contemporary design and practical living. With a striking elevation, warm interiors and quality specifications, each 2 BHK apartment is crafted for families and professionals looking for a premium lease in ${SITE.location}.`}
            />
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

      {/* Apartments – client's 2 BHK flat pictures */}
      <section className="section section--cream" id="apartments">
        <div className="container">
          <SectionTitle eyebrow="Apartments" title="2 BHK Apartments" text="Take a look inside both 2 BHK flat layouts. Click any picture to view it larger." />
          <nav className="flat-tabs">
            {FLATS.map((f) => (
              <a key={f.id} href={`#${f.id}`} className="chip">{f.type}</a>
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

      <section className="section" id="video">
        <div className="container">
          <SectionTitle eyebrow="Video" title="2 BHK Apartment Video" text="A guided walkthrough of the 2 BHK flat – hall, kitchen, bedrooms and balcony." />
          <VideoTour src={SITE.videos.flat} poster={IMAGES.flat2.hall} label="Watch the 2 BHK Video" />
        </div>
      </section>

      <section className="section specs">
        <div className="container">
          <SectionTitle light title="Specifications" />
          <div className="specs__list">
            {SPECIFICATIONS.map((s) => (
              <Reveal key={s.title} className="specs__row">
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
          <SectionTitle eyebrow="Facilities" title="Amenities & Facilities" />
          <div className="facility-banner">
            <img src={IMAGES.flat2.lobby} alt="Lobby with lift" loading="lazy" />
            <div>
              <h3>Premium Lobby with Lift</h3>
              <p>Marble-finish lobby with a branded passenger lift and power backup for effortless access to every floor.</p>
            </div>
          </div>
          <div className="amenities">
            {AMENITIES.map((a) => (
              <Reveal key={a.title} className="amenity">
                <span className="amenity__icon"><Icon name={a.icon} size={26} /></span>
                <h4>{a.title}</h4>
                <p>{a.text}</p>
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

      <section className="section">
        <div className="container split">
          <Reveal className="split__body">
            <SectionTitle center={false} eyebrow="Location" title="Everything Within Reach" text={`Located in ${SITE.location}, one of Chennai's most well-connected residential neighbourhoods.`} />
            <ul className="nearby">
              {NEARBY.map(([place, dist]) => (
                <li key={place}><span><Icon name="pin" size={16} /> {place}</span><strong>{dist}</strong></li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="map-frame" delay={120}>
            <iframe title="Project location" src={SITE.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </Reveal>
        </div>
      </section>
    </>
  )
}
