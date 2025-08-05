'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { RotateCcw, AlertTriangle, Clock, Package, CreditCard, FileText } from 'lucide-react'

export default function ReturnExchangePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* 페이지 헤더 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">반품/교환 안내</h1>
            <p className="text-muted-foreground">
              ALMAN의 반품/교환 정책에 대해 자세히 알아보세요
            </p>
          </div>

          {/* 반품/교환 기간 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Clock className="h-6 w-6 text-primary" />
              반품/교환 기간
            </h2>
            
            <div className="bg-secondary p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-green-600">반품/교환 가능 기간</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 상품 수령일로부터 <strong className="text-foreground">7일 이내</strong></li>
                    <li>• 단순 변심: 7일 이내</li>
                    <li>• 상품 하자: 30일 이내</li>
                    <li>• 배송 오류: 수령일로부터 7일 이내</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-red-600">반품/교환 불가 사유</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 고객의 책임으로 상품이 멸실/훼손된 경우</li>
                    <li>• 고객의 사용 또는 일부 소비로 상품 가치가 현저히 감소한 경우</li>
                    <li>• 시간 경과로 재판매가 곤란할 정도로 상품 가치가 현저히 감소한 경우</li>
                    <li>• 복제가 가능한 상품의 포장을 훼손한 경우</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 반품/교환 절차 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <RotateCcw className="h-6 w-6 text-primary" />
              반품/교환 절차
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">반품/교환 신청</h3>
                <p className="text-sm text-muted-foreground">
                  마이페이지에서 반품/교환 신청
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">상품 발송</h3>
                <p className="text-sm text-muted-foreground">
                  상품을 원래 포장하여 발송
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">상품 검수</h3>
                <p className="text-sm text-muted-foreground">
                  수령 후 1-2일 내 검수 완료
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold">4</span>
                </div>
                <h3 className="font-semibold mb-2">처리 완료</h3>
                <p className="text-sm text-muted-foreground">
                  환불 또는 교환 상품 발송
                </p>
              </div>
            </div>
          </section>

          {/* 반품/교환 비용 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <CreditCard className="h-6 w-6 text-primary" />
              반품/교환 비용
            </h2>
            
            <div className="bg-secondary p-6 rounded-lg">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold">구분</th>
                      <th className="text-left py-3 px-4 font-semibold">반품비</th>
                      <th className="text-left py-3 px-4 font-semibold">교환비</th>
                      <th className="text-left py-3 px-4 font-semibold">비고</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-3 px-4">단순 변심</td>
                      <td className="py-3 px-4">5,000원</td>
                      <td className="py-3 px-4">5,000원</td>
                      <td className="py-3 px-4 text-muted-foreground">고객 부담</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 px-4">상품 하자</td>
                      <td className="py-3 px-4 text-green-600 font-semibold">무료</td>
                      <td className="py-3 px-4 text-green-600 font-semibold">무료</td>
                      <td className="py-3 px-4 text-muted-foreground">회사 부담</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 px-4">배송 오류</td>
                      <td className="py-3 px-4 text-green-600 font-semibold">무료</td>
                      <td className="py-3 px-4 text-green-600 font-semibold">무료</td>
                      <td className="py-3 px-4 text-muted-foreground">회사 부담</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">10만원 이상 구매</td>
                      <td className="py-3 px-4 text-green-600 font-semibold">무료</td>
                      <td className="py-3 px-4 text-green-600 font-semibold">무료</td>
                      <td className="py-3 px-4 text-muted-foreground">VIP 혜택</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 반품/교환 주의사항 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-primary" />
              반품/교환 주의사항
            </h2>
            
            <div className="bg-secondary p-6 rounded-lg">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">상품 상태</h3>
                  <p className="text-muted-foreground">
                    반품/교환 시 상품은 반드시 미사용 상태로 원래 포장에 담아 발송해주세요. 
                    상품에 향수, 화장품 등의 냄새가 묻거나 사용 흔적이 있는 경우 반품/교환이 거부될 수 있습니다.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">부속품 및 사은품</h3>
                  <p className="text-muted-foreground">
                    상품과 함께 받으신 부속품, 사은품, 상품 설명서 등 모든 구성품을 포함하여 발송해주세요. 
                    구성품이 누락된 경우 반품/교환이 거부될 수 있습니다.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">택배 발송</h3>
                  <p className="text-muted-foreground">
                    반품/교환 상품은 반드시 등기우편이나 택배로 발송해주세요. 
                    발송 후 운송장 번호를 고객센터로 알려주시면 빠른 처리가 가능합니다.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">환불 처리</h3>
                  <p className="text-muted-foreground">
                    반품 상품 검수 완료 후 3-5일 내에 환불이 처리됩니다. 
                    신용카드 결제의 경우 카드사 정책에 따라 1-2개월 후 환불될 수 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 교환 정책 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Package className="h-6 w-6 text-primary" />
              교환 정책
            </h2>
            
            <div className="bg-secondary p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-green-600">교환 가능 사유</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 상품의 하자 또는 불량</li>
                    <li>• 주문과 다른 상품 배송</li>
                    <li>• 사이즈, 컬러 변경 희망</li>
                    <li>• 상품의 품질 문제</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-red-600">교환 제한 사유</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 상품의 재고 부족</li>
                    <li>• 상품의 단종</li>
                    <li>• 고객의 책임으로 상품 훼손</li>
                    <li>• 교환 기간 초과</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 환불 정책 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              환불 정책
            </h2>
            
            <div className="bg-secondary p-6 rounded-lg">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">환불 방법</h3>
                  <p className="text-muted-foreground">
                    결제 수단에 따라 환불 방법이 다릅니다. 신용카드 결제는 카드사로 환불되며, 
                    계좌이체는 고객이 제공한 계좌로 환불됩니다.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">환불 기간</h3>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• 신용카드: 3-5일 (카드사 정책에 따라 1-2개월 소요 가능)</li>
                    <li>• 계좌이체: 3-5일</li>
                    <li>• 포인트: 즉시 환불</li>
                    <li>• 쿠폰: 즉시 복원</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">부분 환불</h3>
                  <p className="text-muted-foreground">
                    주문 상품 중 일부만 반품하는 경우, 배송비는 반품 상품 수량에 따라 
                    비례하여 차감 후 환불됩니다.
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