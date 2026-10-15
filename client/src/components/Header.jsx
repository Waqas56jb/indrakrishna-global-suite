import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { SITE, tel } from '../config'
import { useLockBodyScroll } from '../hooks'
import Icon from './Icon'
import Logo from './Logo'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/project', label: 'Project' },
  { to: '/refer-and-earn', label: 'Refer & Earn' },
  { to: '/loan-assistance', label: 'Loan Assistance' },
  { to: '/contact', label: 'Contact Us' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const overHero = pathname === '/' && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])
  useLockBodyScroll(open)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const onResize = () => window.innerWidth > 1100 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  return (
    <header className={`header ${overHero ? 'header--clear' : ''} ${open ? 'header--open' : ''}`}>
      <div className="topbar">
        <div className="container topbar__inner">
          <span className="topbar__status">{SITE.tagline}</span>
          <span className="topbar__right">
            <a href={tel(SITE.phone)}>
              <Icon name="phone" size={14} /> Lease Enquiries: {SITE.phone}
            </a>
            <a href={`mailto:${SITE.email}`}>
              <Icon name="mail" size={14} /> {SITE.email}
            </a>
          </span>
        </div>
      </div>
      <div className="container header__inner">
        <Link to="/" className="header__brand" aria-label={SITE.name} onClick={() => setOpen(false)}>
          <Logo light={overHero && !open} />
        </Link>
        <nav className="nav" aria-label="Main">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end className="nav__link" onClick={() => setOpen(false)}>
              {l.label}
            </NavLink>
          ))}
          <NavLink to="/login" className="btn btn--primary btn--sm nav__login" onClick={() => setOpen(false)}>
            <Icon name="lock" size={15} /> Login
          </NavLink>
        </nav>
        {open && <div className="nav__backdrop" onClick={() => setOpen(false)} aria-hidden="true" />}
        <button className="nav__toggle" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu" aria-expanded={open}>
          <Icon name={open ? 'close' : 'menu'} size={26} />
        </button>
      </div>
    </header>
  )
}
