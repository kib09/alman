import { Skeleton } from './Skeleton'

export function CategoryCardSkeleton() {
  return (
    <div className="group relative h-80 overflow-hidden rounded-lg">
      <Skeleton className="w-full h-full" />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Skeleton className="w-24 h-8 bg-white/20" />
      </div>
    </div>
  )
} 