import { Link } from 'react-router-dom'
import { SITE, tel, whatsappLink } from '../config'
import Icon, { WhatsAppIcon } from './Icon'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <Logo light />
          <p className="footer__about">
            Purely residential 2-BHK suite apartments in {SITE.location} for Corporate Companies, Staff Quarters and Guest Houses.
            Ready to occupy by Nov 2028.
          </p>
          <div className="footer__social">
            <a href={SITE.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">f</a>
            <a href={SITE.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">ig</a>
            <a href={SITE.social.youtube} target="_blank" rel="noreferrer" aria-label="YouTube">▶</a>
            <a href={whatsappLink(SITE.whatsapp, SITE.waGreeting)} target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <WhatsAppIcon size={16} />
            </a>
          </div>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/project">Project</Link></li>
            <li><Link to="/refer-and-earn">Refer &amp; Earn</Link></li>
            <li><Link to="/loan-assistance">Loan Assistance</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/terms">Terms &amp; Conditions</Link></li>
          </ul>
        </div>
        <div>
          <h4>Site Address</h4>
          <p><Icon name="pin" size={16} /> {SITE.siteAddress}</p>
          <p className="footer__muted">{SITE.landmark}</p>
        </div>
        <div>
          <h4>Lease Enquiries</h4>
          <p><a href={tel(SITE.phone)}><Icon name="phone" size={16} /> {SITE.phone}</a></p>
          <p><a href={`mailto:${SITE.email}`}><Icon name="mail" size={16} /> {SITE.email}</a></p>
          <h4 className="mt">Referrals</h4>
          <p><a href={tel(SITE.referral.phone)}><Icon name="phone" size={16} /> {SITE.referral.phone}</a></p>
          <p><a href={`mailto:${SITE.referral.email}`}><Icon name="mail" size={16} /> {SITE.referral.email}</a></p>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span>
            © {new Date().getFullYear()} {SITE.company} ·{' '}
            <a href={SITE.companySite} target="_blank" rel="noreferrer">www.indrakrishna.com</a>
          </span>
          <Link to="/terms">Terms &amp; Conditions</Link>
        </div>
      </div>
    </footer>
  )
}
