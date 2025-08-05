'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Truck, Clock, MapPin, CreditCard, Shield, Package } from 'lucide-react'

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* 페이지 헤더 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">배송안내</h1>
            <p className="text-muted-foreground">
              ALMAN의 배송 서비스에 대해 자세히 알아보세요
            </p>
          </div>

          {/* 배송 방법 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Truck className="h-6 w-6 text-primary" />
              배송 방법
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-secondary p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">일반 배송</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• 배송비: 3,000원</li>
                  <li>• 배송 기간: 2-3일</li>
                  <li>• 주문 후 1-2일 내 출고</li>
                  <li>• 전국 모든 지역 배송 가능</li>
                </ul>
              </div>
              
              <div className="bg-secondary p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">무료 배송</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• 10만원 이상 구매 시 무료</li>
                  <li>• 배송 기간: 2-3일</li>
                  <li>• 주문 후 1-2일 내 출고</li>
                  <li>• 전국 모든 지역 배송 가능</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 배송 지역 및 제한 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <MapPin className="h-6 w-6 text-primary" />
              배송 지역 및 제한
            </h2>
            
            <div className="bg-secondary p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-green-600">배송 가능 지역</h3>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• 전국 모든 지역</li>
                    <li>• 제주도 및 도서산간 지역</li>
                    <li>• 해외 배송 (일부 국가)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-red-600">배송 제한 지역</h3>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• 군부대 및 군사시설</li>
                    <li>• 교도소 및 구치소</li>
                    <li>• 출입이 제한된 특수 지역</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 배송 절차 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Package className="h-6 w-6 text-primary" />
              배송 절차
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">주문 접수</h3>
                <p className="text-sm text-muted-foreground">
                  주문 완료 후 즉시 접수 처리
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">상품 준비</h3>
                <p className="text-sm text-muted-foreground">
                  주문 후 1-2일 내 상품 준비 완료
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">배송 시작</h3>
                <p className="text-sm text-muted-foreground">
                  택배사 수령 후 배송 시작
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold">4</span>
                </div>
                <h3 className="font-semibold mb-2">배송 완료</h3>
                <p className="text-sm text-muted-foreground">
                  2-3일 내 고객님께 도착
                </p>
              </div>
            </div>
          </section>

          {/* 배송비 안내 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <CreditCard className="h-6 w-6 text-primary" />
              배송비 안내
            </h2>
            
            <div className="bg-secondary p-6 rounded-lg">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold">구분</th>
                      <th className="text-left py-3 px-4 font-semibold">배송비</th>
                      <th className="text-left py-3 px-4 font-semibold">배송 기간</th>
                      <th className="text-left py-3 px-4 font-semibold">비고</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-3 px-4">10만원 미만</td>
                      <td className="py-3 px-4">3,000원</td>
                      <td className="py-3 px-4">2-3일</td>
                      <td className="py-3 px-4 text-muted-foreground">일반 배송</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 px-4">10만원 이상</td>
                      <td className="py-3 px-4 text-green-600 font-semibold">무료</td>
                      <td className="py-3 px-4">2-3일</td>
                      <td className="py-3 px-4 text-muted-foreground">무료 배송</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">제주도 및 도서산간</td>
                      <td className="py-3 px-4">추가 3,000원</td>
                      <td className="py-3 px-4">3-5일</td>
                      <td className="py-3 px-4 text-muted-foreground">추가 배송비</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 배송 관련 주의사항 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              배송 관련 주의사항
            </h2>
            
            <div className="bg-secondary p-6 rounded-lg">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">배송 시간</h3>
                  <p className="text-muted-foreground">
                    평일 오전 9시 이전 주문 건은 당일 출고되며, 이후 주문 건은 다음 영업일에 출고됩니다. 
                    주말 및 공휴일 주문 건은 다음 영업일에 출고됩니다.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">부재 시 배송</h3>
                  <p className="text-muted-foreground">
                    배송 당일 부재 시, 택배사에서 재배송을 시도합니다. 
                    3회 시도 후에도 부재 시, 고객센터로 연락하여 재배송을 요청해주세요.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">배송 추적</h3>
                  <p className="text-muted-foreground">
                    주문 후 마이페이지에서 배송 현황을 실시간으로 확인할 수 있습니다. 
                    배송 시작 시 SMS로 알림을 드립니다.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">상품 검수</h3>
                  <p className="text-muted-foreground">
                    배송받은 상품은 반드시 택배기사 앞에서 검수 후 수령해주세요. 
                    외부 포장이 손상되었거나 상품에 문제가 있을 경우 즉시 거부해주세요.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 고객센터 안내 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Clock className="h-6 w-6 text-primary" />
              고객센터 안내
            </h2>
            
            <div className="bg-secondary p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">전화 문의</h3>
                  <p className="text-lg font-bold text-primary">1588-1234</p>
                  <p className="text-sm text-muted-foreground">평일 09:00 - 18:00</p>
                  <p className="text-sm text-muted-foreground">토요일 09:00 - 13:00</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">이메일 문의</h3>
                  <p className="text-lg font-bold text-primary">support@alman.com</p>
                  <p className="text-sm text-muted-foreground">24시간 접수 가능</p>
                  <p className="text-sm text-muted-foreground">1-2일 내 답변</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
} 