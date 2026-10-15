import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'

export default function HeroSlider({ slides, interval = 5500 }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const go = useCallback((i) => setIndex((i + slides.length) % slides.length), [slides.length])

  useEffect(() => {
    if (paused) return
    const t = setTimeout(() => go(index + 1), interval)
    return () => clearTimeout(t)
  }, [index, paused, interval, go])

  return (
    <section
      className="hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      {slides.map((s, i) => (
        <div key={s.title} className={`hero__slide ${i === index ? 'is-active' : ''}`} aria-hidden={i !== index}>
          <img src={s.image} alt={s.title} className="hero__img" loading={i === 0 ? 'eager' : 'lazy'} />
          <div className="hero__overlay" />
          <div className="container hero__content">
            <span className="eyebrow eyebrow--light">{s.eyebrow}</span>
            <h1>{s.title}</h1>
            <p>{s.text}</p>
            <div className="hero__cta">
              <Link to="/contact" className="btn btn--primary">Enquire Now</Link>
              <Link to="/project" className="btn btn--outline-light">View Project</Link>
            </div>
          </div>
        </div>
      ))}

      <div className="hero__badge">
        <span>Apartments for Lease</span>
        <strong>Ready to Occupy by Nov 2028</strong>
      </div>

      <button className="hero__arrow hero__arrow--prev" onClick={() => go(index - 1)} aria-label="Previous slide">
        <Icon name="arrowL" size={26} />
      </button>
      <button className="hero__arrow hero__arrow--next" onClick={() => go(index + 1)} aria-label="Next slide">
        <Icon name="arrowR" size={26} />
      </button>
      <div className="hero__dots">
        {slides.map((s, i) => (
          <button
            key={s.title}
            className={i === index ? 'is-active' : ''}
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
