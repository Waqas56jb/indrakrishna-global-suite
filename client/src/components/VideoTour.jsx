import { useState } from 'react'
import { SITE } from '../config'
import { IMAGES } from '../data'
import Icon from './Icon'

// Plays the apartment video once the client supplies it (public/videos/apartment.mp4).
export default function VideoTour() {
  const [playing, setPlaying] = useState(false)
  const [missing, setMissing] = useState(false)

  return (
    <div className="video">
      {playing && !missing ? (
        <video src={SITE.video} poster={IMAGES.elevation1} controls autoPlay onError={() => setMissing(true)} />
      ) : (
        <button className="video__poster" onClick={() => setPlaying(true)} style={{ backgroundImage: `url(${IMAGES.elevation3})` }}>
          <span className="video__play"><Icon name="play" size={34} /></span>
          <span className="video__label">{missing ? 'Apartment video coming soon' : 'Watch the Apartment Walkthrough'}</span>
        </button>
      )}
    </div>
  )
}
