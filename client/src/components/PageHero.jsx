import { Link } from 'react-router-dom'

export default function PageHero({ title, subtitle, image }) {
  return (
    <section className="page-hero" style={{ backgroundImage: `url(${image})` }}>
      <div className="page-hero__overlay" />
      <div className="container page-hero__content">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <span>{title}</span>
        </nav>
      </div>
    </section>
  )
}
