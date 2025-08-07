'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          문제가 발생했습니다
        </h1>
        <p className="text-muted-foreground mb-8">
          죄송합니다. 예상치 못한 오류가 발생했습니다.
        </p>
        <div className="space-x-4">
          <button
            onClick={reset}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            다시 시도
          </button>
          <Link
            href="/"
            className="inline-block bg-secondary text-secondary-foreground px-6 py-3 rounded-lg hover:bg-secondary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
