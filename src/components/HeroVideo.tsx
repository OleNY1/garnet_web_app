import { Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

/**
 * Decorative looping background video for the hero. A scrim keeps text
 * readable on top of it. Users who prefer reduced motion get the static
 * gradient background instead, and everyone gets a pause control
 * (WCAG 2.2.2 for auto-playing motion).
 */
export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
  )
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    const media = window.matchMedia(REDUCED_MOTION_QUERY)
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  if (reducedMotion) return null

  const toggle = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      void video.play().catch(() => {})
    } else {
      video.pause()
    }
  }

  const label = playing ? 'Pause background video' : 'Play background video'

  return (
    <>
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          className="size-full object-cover"
          src="/hero-background.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          tabIndex={-1}
          disablePictureInPicture
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        <div className="hero-scrim absolute inset-0" />
      </div>
      <button
        type="button"
        onClick={toggle}
        aria-label={label}
        title={label}
        className="absolute right-4 bottom-4 z-10 flex size-11 cursor-pointer items-center justify-center rounded-full border border-line bg-surface/90 text-ink backdrop-blur-sm transition-colors hover:bg-brand-soft sm:right-6 sm:bottom-6"
      >
        {playing ? (
          <Pause aria-hidden="true" className="size-5" />
        ) : (
          <Play aria-hidden="true" className="size-5" />
        )}
      </button>
    </>
  )
}
