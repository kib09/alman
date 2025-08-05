import { Skeleton } from './Skeleton'

export function ProductCardSkeleton() {
  return (
    <div className="group relative bg-background border rounded-lg overflow-hidden">
      {/* 상품 이미지 스켈레톤 */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Skeleton className="w-full h-full" />
        
        {/* 배지 스켈레톤 */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          <Skeleton className="w-12 h-6" />
          <Skeleton className="w-16 h-6" />
        </div>

        {/* 위시리스트 버튼 스켈레톤 */}
        <div className="absolute top-2 right-2">
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>

        {/* 장바구니 버튼 스켈레톤 */}
        <div className="absolute bottom-2 left-2 right-2">
          <Skeleton className="w-full h-10 rounded-lg" />
        </div>
      </div>

      {/* 상품 정보 스켈레톤 */}
      <div className="p-4">
        <Skeleton className="w-16 h-3 mb-1" />
        <Skeleton className="w-full h-4 mb-2" />
        <Skeleton className="w-3/4 h-4 mb-2" />
        
        {/* 평점 스켈레톤 */}
        <Skeleton className="w-20 h-3 mb-2" />
        
        {/* 가격 스켈레톤 */}
        <div className="flex items-center gap-2">
          <Skeleton className="w-20 h-5" />
          <Skeleton className="w-16 h-4" />
        </div>
      </div>
    </div>
  )
} 