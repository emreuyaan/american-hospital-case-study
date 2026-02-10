import { memo, type ReactNode } from 'react'

type BadgeVariant = 'admin' | 'doctor' | 'patient' | 'permission'

interface BadgeProps {
  variant: BadgeVariant
  children: ReactNode
}

const variantClasses: Record<BadgeVariant, string> = {
  admin: 'bg-purple-100 text-purple-800',
  doctor: 'bg-blue-100 text-blue-800',
  patient: 'bg-green-100 text-green-800',
  permission: 'bg-gray-100 text-gray-600',
}

function BadgeInner({ variant, children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant]}`}
    >
      {children}
    </span>
  )
}

export const Badge = memo(BadgeInner)
