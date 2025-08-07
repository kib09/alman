'use client';

import { useEffect, useState } from 'react';

export default function SkipLink() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        setIsVisible(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        // 포커스가 스킵 링크에서 벗어나면 숨김
        setTimeout(() => {
          const activeElement = document.activeElement;
          if (activeElement && !activeElement.classList.contains('skip-link')) {
            setIsVisible(false);
          }
        }, 100);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="skip-links">
      <a
        href="#main-content"
        className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded z-50"
        onClick={() => setIsVisible(false)}
      >
        메인 콘텐츠로 건너뛰기
      </a>
      <a
        href="#navigation"
        className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-16 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded z-50"
        onClick={() => setIsVisible(false)}
      >
        네비게이션으로 건너뛰기
      </a>
    </div>
  );
}
