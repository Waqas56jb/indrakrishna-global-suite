import { Link } from 'react-router-dom'
import Gallery from '../components/Gallery'
import Icon from '../components/Icon'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import SectionTitle from '../components/SectionTitle'
import VideoTour from '../components/VideoTour'
import { SITE } from '../config'
import { AMENITIES, APARTMENTS, GALLERY, IMAGES, NEARBY, SPECIFICATIONS } from '../data'

const FACTS = [
  ['Project', SITE.name],
  ['Location', SITE.location],
  ['Type', 'Residential Apartments'],
  ['Purpose', 'For Lease'],
  ['Structure', 'Stilt + 2 Floors'],
  ['Possession', 'Ready to Occupy by Nov 2028'],
]

export default function Project() {
  return (
    <>
      <PageHero title="Project" subtitle={`${SITE.name} – ${SITE.location}`} image={IMAGES.elevation3} />

      <section className="section">
        <div className="container split">
          <Reveal className="split__body">
            <SectionTitle
              center={false}
              eyebrow="Project Overview"
              title="Modern Living, Timeless Comfort"
              text={`${SITE.name} brings together contemporary design and practical living. With a striking elevation, warm interiors and quality specifications, each apartment is crafted for families and professionals looking for a premium lease in ${SITE.location}.`}
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
            <img src={IMAGES.elevation2} alt="Project elevation" />
          </Reveal>
        </div>
      </section>

      <section className="section section--cream" id="apartments">
        <div className="container">
          <SectionTitle eyebrow="Apartments" title="Choose Your Home" text="Flat pictures and final plans will be updated as the project progresses." />
          <div className="apartments">
            {APARTMENTS.map((a, i) => (
              <Reveal key={a.type} className="apartment" delay={i * 100}>
                <div className="apartment__img">
                  <img src={a.image} alt={a.type} loading="lazy" />
                  <span className="apartment__badge">For Lease</span>
                </div>
                <div className="apartment__body">
                  <h3>{a.type}</h3>
                  <div className="apartment__meta">
                    <span><Icon name="ruler" size={16} /> {a.area}</span>
                    <span><Icon name="layers" size={16} /> {a.floor}</span>
                  </div>
                  <ul className="ticks ticks--sm">
                    {a.features.map((f) => <li key={f}><Icon name="check" size={16} /> {f}</li>)}
                  </ul>
                  <Link to="/contact" className="btn btn--primary btn--block btn--sm">Enquire for Lease</Link>
                </div>
              </Reveal>
            ))}
          </div>
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
          <SectionTitle eyebrow="Features" title="Amenities" />
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
          <SectionTitle eyebrow="Gallery" title="Elevation & Interior Pictures" />
          <Gallery items={GALLERY} />
        </div>
      </section>

      <section className="section" id="video">
        <div className="container">
          <SectionTitle eyebrow="Video" title="Apartment Video" />
          <VideoTour />
        </div>
      </section>

      <section className="section section--cream">
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
