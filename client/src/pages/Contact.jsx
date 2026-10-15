import EnquiryForm from '../components/EnquiryForm'
import Icon, { WhatsAppIcon } from '../components/Icon'
import PageHero from '../components/PageHero'
import SectionTitle from '../components/SectionTitle'
import { SITE, whatsappLink } from '../config'
import { IMAGES } from '../data'

export default function Contact() {
  return (
    <>
      <PageHero title="Contact Us" subtitle="Visit the site or send us an enquiry" image={IMAGES.elevation1} />

      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Site Location" title="Find Us on the Map" />
          <div className="map-frame map-frame--wide">
            <iframe title="Site location map" src={SITE.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
          </div>
          <div className="info-cards">
            <a className="info-card" href={SITE.mapLink} target="_blank" rel="noreferrer">
              <span className="amenity__icon"><Icon name="pin" size={24} /></span>
              <h4>Site Address</h4>
              <p>{SITE.siteAddress}</p>
            </a>
            <a className="info-card" href={`tel:${SITE.phone.replace(/\s/g, '')}`}>
              <span className="amenity__icon"><Icon name="phone" size={24} /></span>
              <h4>Call Us</h4>
              <p>{SITE.phone}</p>
            </a>
            <a className="info-card" href={`mailto:${SITE.email}`}>
              <span className="amenity__icon"><Icon name="mail" size={24} /></span>
              <h4>Email</h4>
              <p>{SITE.email}</p>
            </a>
            <a className="info-card" href={whatsappLink(SITE.whatsapp)} target="_blank" rel="noreferrer">
              <span className="amenity__icon amenity__icon--wa"><WhatsAppIcon size={24} /></span>
              <h4>WhatsApp</h4>
              <p>Chat with our team</p>
            </a>
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container narrow">
          <SectionTitle
            eyebrow="Enquiry Form"
            title="Send Us an Enquiry"
            text="Share your name, mobile number, email and message. It is saved securely and sent to our team by email and WhatsApp."
          />
          <div className="card"><EnquiryForm /></div>
        </div>
      </section>
    </>
  )
}
