import { memo } from 'react'

interface EmptyStateProps {
  message?: string
}

function EmptyStateInner({ message = 'Sonuç bulunamadı.' }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 py-12">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mb-3 h-10 w-10 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  )
}

export const EmptyState = memo(EmptyStateInner)
