import { useEffect, useState } from 'react'
import Icon from './Icon'

export default function Gallery({ items, filters = true }) {
  const tags = ['All', ...new Set(items.map((i) => i.tag))]
  const [tag, setTag] = useState('All')
  const [open, setOpen] = useState(null)
  const shown = tag === 'All' ? items : items.filter((i) => i.tag === tag)

  useEffect(() => {
    if (open === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') setOpen((o) => (o + 1) % shown.length)
      if (e.key === 'ArrowLeft') setOpen((o) => (o - 1 + shown.length) % shown.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, shown.length])

  return (
    <>
      {filters && (
        <div className="chips">
          {tags.map((t) => (
            <button key={t} className={`chip ${t === tag ? 'is-active' : ''}`} onClick={() => setTag(t)}>
              {t}
            </button>
          ))}
        </div>
      )}
      <div className="gallery">
        {shown.map((g, i) => (
          <button key={g.src + i} className="gallery__item" onClick={() => setOpen(i)}>
            <img src={g.src} alt={g.caption} loading="lazy" />
            <span className="gallery__caption">{g.caption}</span>
          </button>
        ))}
      </div>

      {open !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setOpen(null)}>
          <button className="lightbox__close" aria-label="Close"><Icon name="close" size={28} /></button>
          <button
            className="lightbox__nav lightbox__nav--prev"
            aria-label="Previous"
            onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + shown.length) % shown.length) }}
          >
            <Icon name="arrowL" size={30} />
          </button>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={shown[open].src} alt={shown[open].caption} />
            <figcaption>{shown[open].caption}</figcaption>
          </figure>
          <button
            className="lightbox__nav lightbox__nav--next"
            aria-label="Next"
            onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % shown.length) }}
          >
            <Icon name="arrowR" size={30} />
          </button>
        </div>
      )}
    </>
  )
}
