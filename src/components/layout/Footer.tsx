import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 회사 정보 */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">ALMAN</h3>
            <p className="text-primary-foreground/70 text-sm">
              세련된 남성 패션을 만나보세요. 
              정장부터 캐주얼까지, 당신만의 스타일을 완성하세요.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* 쇼핑 */}
          <div className="space-y-4">
            <h4 className="font-semibold">쇼핑</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/category/suits" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  정장
                </Link>
              </li>
              <li>
                <Link href="/category/casual" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  캐주얼
                </Link>
              </li>
              <li>
                <Link href="/category/shoes" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  신발
                </Link>
              </li>
              <li>
                <Link href="/category/accessories" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  액세서리
                </Link>
              </li>
              <li>
                <Link href="/category/sportswear" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  스포츠웨어
                </Link>
              </li>
            </ul>
          </div>

          {/* 고객 서비스 */}
          <div className="space-y-4">
            <h4 className="font-semibold">고객 서비스</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  문의하기
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  배송 안내
                </Link>
              </li>
              <li>
                <Link href="/return-exchange" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  반품/교환
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  사이즈 가이드
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  자주 묻는 질문
                </Link>
              </li>
            </ul>
          </div>

          {/* 연락처 */}
          <div className="space-y-4">
            <h4 className="font-semibold">연락처</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-primary-foreground/70">000-0000</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-primary-foreground/70">dslqoehf@gmail.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span className="text-primary-foreground/70">
                 경기도 성남시 수정구 모란로<br />
                  1층
                </span>
                </div>
                <div className="text-primary-foreground/70">
                 사업자 대표: 김인배
                </div>
              
            </div>
          </div>
        </div>

        {/* 하단 구분선 */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-primary-foreground/70">
              © {currentYear} ALMAN. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                개인정보처리방침
              </Link>
              <Link href="/terms" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                이용약관
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 