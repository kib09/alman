import { Skeleton } from './Skeleton'

export function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* 이미지 섹션 */}
        <div className="space-y-4">
          {/* 메인 이미지 */}
          <Skeleton className="aspect-square w-full rounded-lg" />
          
          {/* 썸네일 이미지들 */}
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="aspect-square rounded-lg" />
            ))}
          </div>
        </div>

        {/* 상품 정보 섹션 */}
        <div className="space-y-6">
          {/* 카테고리 */}
          <Skeleton className="w-20 h-4" />
          
          {/* 상품명 */}
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-3/4 h-6" />
          
          {/* 평점 */}
          <div className="flex items-center gap-2">
            <Skeleton className="w-24 h-4" />
            <Skeleton className="w-16 h-4" />
          </div>
          
          {/* 가격 */}
          <div className="space-y-2">
            <Skeleton className="w-32 h-8" />
            <Skeleton className="w-24 h-6" />
          </div>
          
          {/* 색상 선택 */}
          <div className="space-y-3">
            <Skeleton className="w-16 h-4" />
            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="w-12 h-12 rounded-full" />
              ))}
            </div>
          </div>
          
          {/* 사이즈 선택 */}
          <div className="space-y-3">
            <Skeleton className="w-20 h-4" />
            <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="w-16 h-10 rounded-lg" />
              ))}
            </div>
          </div>
          
          {/* 수량 선택 */}
          <div className="space-y-3">
            <Skeleton className="w-16 h-4" />
            <div className="flex items-center gap-4">
              <Skeleton className="w-32 h-12 rounded-lg" />
            </div>
          </div>
          
          {/* 버튼들 */}
          <div className="flex gap-4">
            <Skeleton className="flex-1 h-12 rounded-lg" />
            <Skeleton className="w-12 h-12 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
} 