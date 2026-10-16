import LeadForm from '../components/EnquiryForm'
import Icon, { WhatsAppIcon } from '../components/Icon'
import PageHero from '../components/PageHero'
import SectionTitle from '../components/SectionTitle'
import { SITE, tel, whatsappLink } from '../config'
import { IMAGES, LEASE_TERM } from '../data'

export default function Contact() {
  return (
    <>
      <PageHero title="Contact Us" subtitle={`Enquire for Lease – ${LEASE_TERM}`} image={IMAGES.elevation1} />

      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Site Location" title="Find Us on the Map" text={SITE.landmark} />
          <div className="map-frame map-frame--wide">
            <iframe title="Site location map" src={SITE.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
          </div>
          <div className="info-cards">
            <a className="info-card" href={SITE.mapLink} target="_blank" rel="noreferrer">
              <span className="amenity__icon"><Icon name="pin" size={24} /></span>
              <h4>Site Address</h4>
              <p>{SITE.siteAddress}</p>
            </a>
            <a className="info-card" href={tel(SITE.phone)}>
              <span className="amenity__icon"><Icon name="phone" size={24} /></span>
              <h4>Lease Enquiries</h4>
              <p>{SITE.phone}</p>
            </a>
            <a className="info-card" href={`mailto:${SITE.email}`}>
              <span className="amenity__icon"><Icon name="mail" size={24} /></span>
              <h4>Email</h4>
              <p>{SITE.email}</p>
            </a>
            <a className="info-card" href={whatsappLink(SITE.whatsapp, SITE.waGreeting)} target="_blank" rel="noreferrer">
              <span className="amenity__icon amenity__icon--wa"><WhatsAppIcon size={24} /></span>
              <h4>WhatsApp</h4>
              <p>{SITE.phone}</p>
            </a>
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container narrow">
          <SectionTitle
            eyebrow="Enquiry Form"
            title="Enquire for Lease"
            text={`Lease for ${LEASE_TERM}. Your enquiry is sent to our team by email and WhatsApp.`}
          />
          <div className="card"><LeadForm type="enquiry" /></div>
        </div>
      </section>
    </>
  )
}
