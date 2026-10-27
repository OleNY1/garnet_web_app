import { cx } from '../../lib/cx'

const sizeClasses = {
  sm: 'max-w-[13rem]',
  md: 'max-w-xs',
  lg: 'max-w-md',
} as const

/**
 * A picture from /public/learn-images, on a white tile so images with white
 * backgrounds also look right in dark mode.
 */
export function Illustration({
  src,
  alt,
  size = 'md',
  className,
  imageClassName,
}: {
  src: string
  alt: string
  size?: keyof typeof sizeClasses
  className?: string
  /** Extra classes for the image itself, e.g. a fixed height so two pictures line up. */
  imageClassName?: string
}) {
  return (
    <div className={cx('mx-auto w-full overflow-hidden rounded-2xl border border-line bg-white p-3', sizeClasses[size], className)}>
      <img src={`${import.meta.env.BASE_URL}learn-images/${src}`} alt={alt} className={cx('mx-auto h-auto w-full', imageClassName)} />
    </div>
  )
}
