export default function SectionTitle({ eyebrow, title, text, light = false, center = true }) {
  return (
    <div className={`section-title ${center ? 'section-title--center' : ''} ${light ? 'section-title--light' : ''}`}>
      {eyebrow && <span className={`eyebrow ${light ? 'eyebrow--light' : ''}`}>{eyebrow}</span>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  )
}
