import type { ButtonHTMLAttributes, FC } from 'react'
import * as React from 'react'
import { cn } from '@/utils/classnames'

type Variant = 'default' | 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: Size
  className?: string
  children?: React.ReactNode
}

const variantClasses: Record<Variant, string> = {
  default: 'bg-primary text-primary-foreground hover:opacity-90',
  primary: 'bg-primary text-primary-foreground hover:opacity-90',
  secondary: 'bg-secondary text-secondary-foreground hover:opacity-90',
  destructive: 'bg-destructive text-destructive-foreground hover:opacity-90',
  outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
}

const sizeClasses: Record<Size, string> = {
  sm: 'h-8 rounded-md px-3 text-sm',
  md: 'h-10 rounded-md px-4 text-sm',
  lg: 'h-12 rounded-md px-6 text-base',
}

const Button: FC<Props> = ({
  variant = 'default',
  size = 'md',
  className,
  disabled,
  children,
  ...rest
}) => {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center justify-center font-medium transition-opacity disabled:pointer-events-none disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
