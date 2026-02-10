import { memo } from 'react'

interface SkeletonProps {
  rows?: number
}

function SkeletonInner({ rows = 5 }: SkeletonProps) {
  return (
    <div className="overflow-hidden" role="status" aria-label="Yükleniyor">
      <div className="bg-gray-50 px-6 py-3">
        <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200" />
      </div>
      <div className="divide-y divide-gray-200 bg-white">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-6 py-4">
            <div className="h-4 w-1/4 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-1/6 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-1/5 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-1/6 animate-pulse rounded bg-gray-200" />
            <div className="ml-auto h-4 w-20 animate-pulse rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  )
}

export const Skeleton = memo(SkeletonInner)
