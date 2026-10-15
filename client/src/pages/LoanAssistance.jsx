import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import SectionTitle from '../components/SectionTitle'
import { SITE, tel, whatsappLink } from '../config'
import { IMAGES, LOAN_DOCS, NRI_DOCS } from '../data'

export default function LoanAssistance() {
  return (
    <>
      <PageHero title="Loan Assistance" subtitle="Documents required & NRI tenants" image={IMAGES.flat1.hall} />

      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Loan Assistance"
            title="Documents Required"
            text="Keep these documents ready. After checking eligibility, we shall proceed."
          />
          <div className="doc-cards">
            {LOAN_DOCS.map((g, i) => (
              <Reveal key={g.title} className="doc-card" delay={i * 120}>
                <div className="doc-card__head">
                  <span className="amenity__icon"><Icon name={g.icon} size={24} /></span>
                  <h3>{g.title}</h3>
                </div>
                <ul className="ticks">
                  {g.docs.map((d) => <li key={d}><Icon name="check" size={18} /> {d}</li>)}
                </ul>
              </Reveal>
            ))}
          </div>
          <div className="note">
            <Icon name="shield" size={22} />
            <p><strong>After checking eligibility, we shall proceed.</strong> Contact us for any clarification on the documents.</p>
            <a href={whatsappLink(SITE.whatsapp, 'Hi, I would like to know about loan assistance for IndraKrishna Global Suite.')} target="_blank" rel="noreferrer" className="btn btn--primary btn--sm">
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="section section--cream" id="nri">
        <div className="container split split--top">
          <Reveal className="split__body">
            <SectionTitle
              center={false}
              eyebrow="NRI Tenants"
              title="Lease from Anywhere in the World"
              text="An NRI (Non-Resident Indian) or a Person of Indian Origin (PIO) can lease our residential flats at IndraKrishna Global Suite, West Mambalam, Chennai, India. There is no restriction on the number of flats they can take on lease."
            />
            <div className="pay-box">
              <h4><Icon name="rupee" size={20} /> Mode of Payment</h4>
              <p>Payment should be in INR, by Cheque / Bank Transfer, as per RBI regulations.</p>
            </div>
            <div className="btn-row">
              <Link to="/contact" className="btn btn--primary">Enquire for Lease</Link>
              <a href={tel(SITE.phone)} className="btn btn--outline">Call {SITE.phone}</a>
            </div>
          </Reveal>
          <Reveal className="card" delay={120}>
            <h3 className="form__legend"><Icon name="file" size={18} /> Salaried NRIs should possess</h3>
            <ul className="ticks ticks--sm nri-list">
              {NRI_DOCS.map((d) => <li key={d}><Icon name="check" size={16} /> {d}</li>)}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  )
}
