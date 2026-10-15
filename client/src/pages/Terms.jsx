import PageHero from '../components/PageHero'
import { SITE } from '../config'
import { IMAGES } from '../data'

const SECTIONS = [
  {
    title: '1. General',
    body: [
      `This website is operated by ${SITE.company} for ${SITE.name}. By using this website you agree to these Terms & Conditions.`,
      'All images, renders and videos are artistic impressions for representation only and may differ from the actual property.',
    ],
  },
  {
    title: '2. Lease Information',
    body: [
      'Apartments are offered on lease only. Possession is expected by November 2028, subject to approvals and unforeseen circumstances.',
      'Lease rent, deposit, maintenance charges and tenure will be shared on enquiry and confirmed only through a signed lease agreement.',
      'Specifications, amenities and layouts are indicative and may be changed by the management without prior notice.',
    ],
  },
  {
    title: '3. Enquiries & Privacy',
    body: [
      'Details submitted through the Enquiry and Referral forms are stored securely and used only to respond to your enquiry.',
      'By submitting a form you consent to being contacted by phone, email or WhatsApp regarding this project.',
      'We do not sell or share your personal information with third parties.',
    ],
  },
  {
    title: '4. Refer & Earn Programme',
    body: [
      'The referral reward is applicable only when the referred person signs a lease agreement for an apartment at the project.',
      'The referred person must not already be in contact with our team at the time of referral.',
      'Reward amount, mode and timeline of payment will be decided by the management and communicated to the referrer.',
      'The management reserves the right to modify or withdraw the programme at any time.',
    ],
  },
  {
    title: '5. Limitation of Liability',
    body: [
      'While we try to keep the information on this website accurate, we make no warranties about its completeness or accuracy.',
      'The company is not liable for any loss arising from the use of this website or reliance on its contents.',
    ],
  },
  {
    title: '6. Contact',
    body: [`For any questions about these terms, email us at ${SITE.email}.`],
  },
]

export default function Terms() {
  return (
    <>
      <PageHero title="Terms & Conditions" image={IMAGES.interior} />
      <section className="section">
        <div className="container narrow prose">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2>{s.title}</h2>
              <ul>{s.body.map((p) => <li key={p}>{p}</li>)}</ul>
            </div>
          ))}
          <p className="muted">Last updated: {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
        </div>
      </section>
    </>
  )
}
