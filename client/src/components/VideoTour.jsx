import { useState } from 'react'
import Icon from './Icon'

const youtubeId = (url) =>
  url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/)?.[1]

// Plays a YouTube link or a local video from public/videos.
// Local files show a "coming soon" poster until the file exists.
export default function VideoTour({ src, poster, label }) {
  const [playing, setPlaying] = useState(false)
  const [missing, setMissing] = useState(false)
  const ytId = youtubeId(src)

  let player = null
  if (playing && ytId) {
    player = (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0&playsinline=1&modestbranding=1`}
        title={label}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
      />
    )
  } else if (playing && !missing) {
    player = <video src={src} poster={poster} controls autoPlay playsInline onError={() => setMissing(true)} />
  }

  return (
    <div className="video">
      {player || (
        <button className="video__poster" onClick={() => setPlaying(true)} style={{ backgroundImage: `url(${poster})` }}>
          <span className="video__play"><Icon name="play" size={34} /></span>
          <span className="video__label">{missing ? 'Video coming soon' : label}</span>
        </button>
      )}
    </div>
  )
}
