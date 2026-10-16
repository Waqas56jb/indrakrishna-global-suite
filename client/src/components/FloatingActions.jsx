import { Link, useLocation } from 'react-router-dom'
import { SITE, whatsappLink } from '../config'
import Icon, { WhatsAppIcon } from './Icon'

export default function FloatingActions() {
  const { pathname } = useLocation()
  if (pathname.startsWith('/admin')) return null
  const tel = `tel:${SITE.phone.replace(/\s/g, '')}`
  const wa = whatsappLink(SITE.whatsapp, SITE.waGreeting)

  return (
    <>
      {/* Tablet & desktop */}
      {pathname !== '/contact' && (
        <Link to="/contact" className="enquire-tab">Enquire Now</Link>
      )}
      <div className="fab">
        <a href={tel} className="fab__btn fab__btn--call" aria-label="Call us">
          <Icon name="phone" size={22} />
        </a>
        <a href={wa} target="_blank" rel="noreferrer" className="fab__btn fab__btn--wa" aria-label="Chat on WhatsApp">
          <WhatsAppIcon size={28} />
        </a>
      </div>

      {/* Phones: sticky bottom action bar */}
      <nav className="mobile-bar" aria-label="Quick actions">
        <a href={tel}><Icon name="phone" size={20} /> Call</a>
        <a href={wa} target="_blank" rel="noreferrer" className="mobile-bar__wa"><WhatsAppIcon size={20} /> WhatsApp</a>
        <Link to="/contact" className="mobile-bar__cta"><Icon name="mail" size={20} /> Enquire</Link>
      </nav>
    </>
  )
}
