'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
  rating?: number;
  reviewCount?: number;
  isWishlisted?: boolean;
}

const ProductCard = ({ 
  id, 
  name, 
  price, 
  originalPrice, 
  image, 
  category, 
  isNew = false, 
  isSale = false,
  rating = 0,
  reviewCount = 0,
  isWishlisted: initialIsWishlisted = false
}: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(initialIsWishlisted);
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { user } = useAuth();
  const { showToast } = useToast();
  const { addToCart } = useCart();

  const discountPercentage = originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const handleWishlistClick = async () => {
    if (!user) {
      showToast('위시리스트를 이용하려면 로그인이 필요합니다.', 'info', 3000);
      return;
    }

    try {
      const response = await fetch('/api/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: id }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsWishlisted(true);
        showToast('위시리스트에 추가되었습니다!', 'success');
      } else {
        if (data.error === '이미 위시리스트에 추가된 상품입니다.') {
          setIsWishlisted(true);
          showToast('이미 위시리스트에 추가된 상품입니다.', 'info');
        } else {
          showToast(data.error || '위시리스트 추가에 실패했습니다.', 'error');
        }
      }
    } catch (error) {
      console.error('위시리스트 추가 오류:', error);
      showToast('위시리스트 추가에 실패했습니다.', 'error');
    }
  };

 

  return (
    <div 
      className="group relative bg-background border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 상품 이미지 */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Link href={`/product/${id}`} className="cursor-pointer">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* 배지들 */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isNew && (
            <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded">
              NEW
            </span>
          )}
          {isSale && discountPercentage > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
              {discountPercentage}% OFF
            </span>
          )}
        </div>

        {/* 위시리스트 버튼 */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-200 cursor-pointer ${
            isWishlisted 
              ? 'bg-red-500 text-white' 
              : 'bg-white/80 text-gray-600 hover:bg-white'
          }`}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        
        
      </div>

      {/* 상품 정보 */}
      <div className="p-4">
        <Link href={`/product/${id}`} className="block cursor-pointer">
          <p className="text-xs text-muted-foreground mb-1">{category}</p>
          <h3 className="font-medium text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors">
            {name}
          </h3>
        </Link>

        {/* 평점 */}
        {rating > 0 && (
          <div className="flex items-center gap-1 mb-2">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-muted-foreground">
              {rating.toFixed(1)} ({reviewCount})
            </span>
          </div>
        )}

        {/* 가격 */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-foreground">
            {price.toLocaleString()}원
          </span>
          {originalPrice && originalPrice > price && (
            <span className="text-sm text-muted-foreground line-through">
              {originalPrice.toLocaleString()}원
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 