import { useState } from 'react'
import Icon from './Icon'

// Plays a client video from public/videos; shows a "coming soon" poster until the file exists.
export default function VideoTour({ src, poster, label }) {
  const [playing, setPlaying] = useState(false)
  const [missing, setMissing] = useState(false)

  return (
    <div className="video">
      {playing && !missing ? (
        <video src={src} poster={poster} controls autoPlay playsInline onError={() => setMissing(true)} />
      ) : (
        <button className="video__poster" onClick={() => setPlaying(true)} style={{ backgroundImage: `url(${poster})` }}>
          <span className="video__play"><Icon name="play" size={34} /></span>
          <span className="video__label">{missing ? 'Video coming soon' : label}</span>
        </button>
      )}
    </div>
  )
}
