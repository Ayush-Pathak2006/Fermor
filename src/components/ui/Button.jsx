// A button in one of three roles. Give it an `href` or a `productId` and it becomes a SmartLink.
import clsx from 'clsx'
import SmartLink from './SmartLink.jsx'

const BASE =
  'inline-flex items-center justify-center rounded-xl border font-medium transition-[background-color,border-color,transform] duration-150 active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100 disabled:opacity-60'

const VARIANTS = {
  // Fermor's mint fill with dark text (13.6:1). The green border keeps the edge visible on paper.
  primary: 'border-brand-600 bg-brand-400 text-ink-900 hover:bg-brand-500',
  secondary: 'border-line-strong bg-surface text-ink-900 hover:border-ink-900',
  ghost: 'border-transparent bg-transparent text-brand-700 hover:bg-brand-50',
}

const SIZES = {
  md: 'min-h-11 px-4 text-sm',
  lg: 'min-h-12 px-6 text-base',
}

/**
 * Props: `variant` ("primary" | "secondary" | "ghost"), `size` ("md" | "lg"), and either `href` / `productId`
 * (renders a link) or nothing (renders a <button>).
 * Usage: <Button href="#waitlist">Join the waitlist</Button>
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  productId,
  type = 'button',
  className,
  children,
  ...rest
}) {
  const classes = clsx(BASE, VARIANTS[variant], SIZES[size], className)

  if (href || productId) {
    return (
      <SmartLink
        href={href}
        productId={productId}
        className={classes}
        {...rest}
      >
        {children}
      </SmartLink>
    )
  }

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  )
}
