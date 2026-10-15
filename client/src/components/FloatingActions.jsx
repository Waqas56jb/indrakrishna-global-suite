import { Link, useLocation } from 'react-router-dom'
import { SITE, whatsappLink } from '../config'
import Icon, { WhatsAppIcon } from './Icon'

export default function FloatingActions() {
  const { pathname } = useLocation()
  if (pathname.startsWith('/admin')) return null

  return (
    <>
      {pathname !== '/contact' && (
        <Link to="/contact" className="enquire-tab">Enquire Now</Link>
      )}
      <div className="fab">
        <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="fab__btn fab__btn--call" aria-label="Call us">
          <Icon name="phone" size={22} />
        </a>
        <a
          href={whatsappLink(SITE.whatsapp, `Hi, I'm interested in ${SITE.name} apartments for lease.`)}
          target="_blank"
          rel="noreferrer"
          className="fab__btn fab__btn--wa"
          aria-label="Chat on WhatsApp"
        >
          <WhatsAppIcon size={28} />
        </a>
      </div>
    </>
  )
}
