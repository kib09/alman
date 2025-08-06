'use client';

import { useState } from 'react';
import { X, Copy, Link as LinkIcon, Facebook, Twitter, Instagram, MessageCircle, MessageSquare } from 'lucide-react';
import { useToast } from '@/contexts/ToastContext';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productUrl: string;
  productImage?: string;
}

const ShareModal = ({
  isOpen,
  onClose,
  productName,
  productUrl,
  productImage
}: ShareModalProps) => {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(productUrl);
      setCopied(true);
      showToast('링크가 복사되었습니다!', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      showToast('링크 복사에 실패했습니다.', 'error');
    }
  };

  const handleShare = async (platform: string) => {
    const shareText = `${productName} - ALMAN에서 확인해보세요!`;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(productUrl)}`;
        break;
      case 'instagram':
        // Instagram은 웹에서 직접 공유가 제한적이므로 링크 복사 안내
        showToast('Instagram에서는 링크를 복사하여 사용해주세요.', 'info');
        return;
      case 'kakao':
        // 카카오톡 공유 (카카오 SDK가 필요하지만 여기서는 링크 복사로 대체)
        showToast('카카오톡에서 링크를 붙여넣어 공유해주세요.', 'info');
        return;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: productName,
          text: `${productName} - ALMAN에서 확인해보세요!`,
          url: productUrl,
        });
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          showToast('공유에 실패했습니다.', 'error');
        }
      }
    } else {
      // 네이티브 공유가 지원되지 않는 경우 링크 복사
      handleCopyLink();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* 모달 */}
      <div className="relative bg-background border border-border rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">
            공유하기
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* 내용 */}
        <div className="p-6">
          {/* 상품 정보 */}
          <div className="mb-6">
            <h4 className="font-medium text-foreground mb-2">{productName}</h4>
            <p className="text-sm text-muted-foreground">{productUrl}</p>
          </div>

          {/* 공유 옵션들 */}
          <div className="space-y-4">
            {/* 네이티브 공유 (모바일) */}
            <button
              onClick={handleNativeShare}
              className="w-full flex items-center gap-3 p-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              <span>공유하기</span>
            </button>

            {/* 링크 복사 */}
            <button
              onClick={handleCopyLink}
              className="w-full flex items-center gap-3 p-3 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
            >
              <Copy className="h-5 w-5" />
              <span>{copied ? '복사됨!' : '링크 복사'}</span>
            </button>

            {/* 소셜 미디어 공유 */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleShare('facebook')}
                className="flex flex-col items-center gap-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="text-xs">Facebook</span>
              </button>
              
              <button
                onClick={() => handleShare('twitter')}
                className="flex flex-col items-center gap-2 p-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="text-xs">Twitter</span>
              </button>
            </div>

            {/* 추가 공유 옵션 */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleShare('instagram')}
                className="flex flex-col items-center gap-2 p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="text-xs">Instagram</span>
              </button>
              
              <button
                onClick={() => handleShare('kakao')}
                className="flex flex-col items-center gap-2 p-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors"
              >
                <MessageSquare className="h-5 w-5" />
                <span className="text-xs">카카오톡</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal; 