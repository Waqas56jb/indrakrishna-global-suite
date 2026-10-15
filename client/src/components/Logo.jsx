export default function Logo({ light = false }) {
  return (
    <span className={`logo ${light ? 'logo--light' : ''}`}>
      <svg className="logo__mark" viewBox="0 0 48 48" aria-hidden="true">
        <rect width="48" height="48" rx="10" fill="currentColor" className="logo__bg" />
        <path d="M11 35V18l13-8 13 8v17" fill="none" stroke="#d4a24c" strokeWidth="3" strokeLinejoin="round" />
        <text x="24" y="33" textAnchor="middle" fontFamily="Playfair Display, Georgia, serif" fontSize="13" fontWeight="700" fill="#fff">
          IK
        </text>
      </svg>
      <span className="logo__text">
        <strong>IndraKrishna</strong>
        <small>Global Suite</small>
      </span>
    </span>
  )
}
