import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cx } from '../lib/cx'

type Variant = 'primary' | 'secondary' | 'inverse' | 'quiet'
type Size = 'md' | 'lg'

const baseClasses =
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-full text-center font-semibold leading-snug transition-colors duration-150'

/* Large tap targets: md is 46px tall, lg is 52px. */
const sizeClasses: Record<Size, string> = {
  md: 'min-h-[2.875rem] px-6 text-[1rem]',
  lg: 'min-h-[3.25rem] px-7 text-[1.0625rem]',
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-btn text-on-brand hover:bg-btn-hover',
  secondary:
    'border-[1.5px] border-brand/40 bg-surface text-brand hover:border-brand/70 hover:bg-brand-soft',
  /* For use on dark teal panels; fixed colors so it works in both themes. */
  inverse: 'bg-white text-[#00495a] hover:bg-[#dff0f4]',
  quiet: 'text-brand hover:bg-brand-soft',
}

type BaseProps = {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

type ButtonAsLink = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
type ButtonAsButton = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }

export type ButtonProps = ButtonAsLink | ButtonAsButton

/**
 * Renders a <button> when no `href` is given. When `href` is given: an
 * internal route (starts with "/") uses React Router's <Link> for instant
 * client-side navigation; anything else (an in-page "#anchor" or an
 * external URL) renders a plain <a>.
 */
export function Button({ variant = 'primary', size = 'lg', className, children, ...rest }: ButtonProps) {
  const classes = cx(baseClasses, sizeClasses[size], variantClasses[variant], className)

  if (typeof rest.href === 'string') {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
    if (href.startsWith('/')) {
      return (
        <Link to={href} className={classes} {...anchorRest}>
          {children}
        </Link>
      )
    }
    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}
