'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ChevronDown, ChevronUp, HelpCircle, ShoppingBag, Truck, CreditCard, User, Phone, Mail } from 'lucide-react'

interface FAQItem {
  id: number
  question: string
  answer: string
}

interface FAQCategory {
  id: string
  title: string
  icon: React.ReactNode
  items: FAQItem[]
}

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())

  const toggleItem = (id: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  const faqCategories: FAQCategory[] = [
    {
      id: 'general',
      title: '일반 문의',
      icon: <HelpCircle className="h-5 w-5" />,
      items: [
        {
          id: 1,
          question: 'ALMAN은 어떤 브랜드인가요?',
          answer: 'ALMAN은 세련된 남성 패션을 추구하는 온라인 쇼핑몰입니다. 정장부터 캐주얼까지 다양한 스타일의 의류와 액세서리를 제공하여 남성들의 스타일링을 완성해드립니다.'
        },
        {
          id: 2,
          question: '회원가입은 어떻게 하나요?',
          answer: '웹사이트 우측 상단의 사용자 아이콘을 클릭하거나, 로그인 페이지에서 "회원가입" 버튼을 클릭하여 이메일, 비밀번호, 이름, 전화번호를 입력하시면 됩니다.'
        },
        {
          id: 3,
          question: '비밀번호를 잊어버렸어요.',
          answer: '로그인 페이지에서 "비밀번호 찾기" 기능을 이용하시면 등록된 이메일로 임시 비밀번호를 발송해드립니다. 임시 비밀번호로 로그인 후 새로운 비밀번호로 변경해주세요.'
        }
      ]
    },
    {
      id: 'shopping',
      title: '쇼핑 관련',
      icon: <ShoppingBag className="h-5 w-5" />,
      items: [
        {
          id: 4,
          question: '상품을 어떻게 주문하나요?',
          answer: '원하는 상품을 선택하여 장바구니에 담은 후, 장바구니에서 수량을 확인하고 "주문하기" 버튼을 클릭하세요. 배송지 정보와 결제 방법을 선택하여 주문을 완료할 수 있습니다.'
        },
        {
          id: 5,
          question: '결제 방법은 어떤 것들이 있나요?',
          answer: '신용카드, 계좌이체, 무통장입금, 포인트 결제 등 다양한 결제 방법을 제공합니다. 결제 시에는 안전한 보안 시스템을 통해 개인정보를 보호합니다.'
        },
        {
          id: 6,
          question: '주문 후 결제를 취소할 수 있나요?',
          answer: '주문 후 배송 시작 전까지는 언제든지 주문을 취소할 수 있습니다. 마이페이지에서 주문 내역을 확인하고 "주문 취소" 버튼을 클릭하시면 됩니다.'
        },
        {
          id: 7,
          question: '상품의 재고를 확인할 수 있나요?',
          answer: '상품 상세 페이지에서 실시간 재고 현황을 확인할 수 있습니다. 품절된 상품의 경우 "품절" 표시가 나타나며, 입고 알림 신청이 가능합니다.'
        }
      ]
    },
    {
      id: 'shipping',
      title: '배송 관련',
      icon: <Truck className="h-5 w-5" />,
      items: [
        {
          id: 8,
          question: '배송 기간은 얼마나 걸리나요?',
          answer: '일반 배송의 경우 주문 후 2-3일 내에 배송됩니다. 제주도 및 도서산간 지역의 경우 추가 1-2일이 소요될 수 있습니다.'
        },
        {
          id: 9,
          question: '배송비는 얼마인가요?',
          answer: '10만원 미만 구매 시 3,000원의 배송비가 부과됩니다. 10만원 이상 구매 시 무료 배송을 제공합니다. 제주도 및 도서산간 지역은 추가 배송비가 발생할 수 있습니다.'
        },
        {
          id: 10,
          question: '배송 현황을 어떻게 확인하나요?',
          answer: '마이페이지의 주문 내역에서 배송 현황을 실시간으로 확인할 수 있습니다. 배송 시작 시 SMS로 알림을 드리며, 택배사 웹사이트에서도 추적이 가능합니다.'
        },
        {
          id: 11,
          question: '부재 시 배송은 어떻게 되나요?',
          answer: '배송 당일 부재 시 택배사에서 재배송을 시도합니다. 3회 시도 후에도 부재 시 고객센터로 연락하여 재배송을 요청해주세요.'
        }
      ]
    },
    {
      id: 'return',
      title: '반품/교환',
      icon: <HelpCircle className="h-5 w-5" />,
      items: [
        {
          id: 12,
          question: '반품/교환 기간은 언제까지인가요?',
          answer: '상품 수령일로부터 7일 이내에 반품/교환 신청이 가능합니다. 단순 변심의 경우 7일, 상품 하자의 경우 30일 이내에 신청해주세요.'
        },
        {
          id: 13,
          question: '반품/교환 비용은 얼마인가요?',
          answer: '단순 변심의 경우 5,000원의 반품비가 부과됩니다. 상품 하자나 배송 오류의 경우 무료로 처리됩니다. 10만원 이상 구매 고객은 무료 반품/교환 혜택을 제공합니다.'
        },
        {
          id: 14,
          question: '반품/교환 절차는 어떻게 되나요?',
          answer: '마이페이지에서 반품/교환 신청 후, 상품을 원래 포장에 담아 발송해주세요. 수령 후 1-2일 내 검수를 완료하고 환불 또는 교환 상품을 발송합니다.'
        },
        {
          id: 15,
          question: '환불은 언제 처리되나요?',
          answer: '반품 상품 검수 완료 후 3-5일 내에 환불이 처리됩니다. 신용카드 결제의 경우 카드사 정책에 따라 1-2개월 후 환불될 수 있습니다.'
        }
      ]
    },
    {
      id: 'account',
      title: '회원 관련',
      icon: <User className="h-5 w-5" />,
      items: [
        {
          id: 16,
          question: '회원 탈퇴는 어떻게 하나요?',
          answer: '마이페이지에서 "회원 탈퇴" 메뉴를 선택하여 탈퇴 신청을 할 수 있습니다. 탈퇴 시 모든 개인정보가 삭제되며, 복구가 불가능합니다.'
        },
        {
          id: 17,
          question: '개인정보를 변경할 수 있나요?',
          answer: '마이페이지의 "개인정보 수정"에서 이름, 전화번호, 배송지 정보 등을 변경할 수 있습니다. 이메일 주소 변경은 고객센터로 문의해주세요.'
        },
        {
          id: 18,
          question: '포인트는 어떻게 적립되나요?',
          answer: '상품 구매 시 결제 금액의 1%가 포인트로 적립됩니다. 적립된 포인트는 다음 구매 시 사용할 수 있으며, 유효기간은 적립일로부터 1년입니다.'
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* 페이지 헤더 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">자주 묻는 질문</h1>
            <p className="text-muted-foreground">
              고객님들이 자주 문의하시는 질문들을 모았습니다
            </p>
          </div>

          {/* FAQ 카테고리별 섹션 */}
          <div className="space-y-8">
            {faqCategories.map((category) => (
              <section key={category.id} className="bg-background border rounded-lg overflow-hidden">
                {/* 카테고리 헤더 */}
                <div className="bg-secondary px-6 py-4 border-b">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    {category.icon}
                    {category.title}
                  </h2>
                </div>

                {/* FAQ 아이템들 */}
                <div className="divide-y divide-border">
                  {category.items.map((item) => (
                    <div key={item.id} className="px-6 py-4">
                      <button
                        onClick={() => toggleItem(item.id)}
                        className="w-full text-left flex items-center justify-between hover:bg-muted/50 p-2 rounded-md transition-colors"
                      >
                        <span className="font-medium text-foreground">
                          Q. {item.question}
                        </span>
                        {openItems.has(item.id) ? (
                          <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                        )}
                      </button>
                      
                      {openItems.has(item.id) && (
                        <div className="mt-4 pl-4 border-l-2 border-primary">
                          <p className="text-muted-foreground leading-relaxed">
                            A. {item.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* 추가 문의 안내 */}
          <section className="mt-12 bg-secondary p-6 rounded-lg">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-4">더 궁금한 점이 있으신가요?</h2>
              <p className="text-muted-foreground mb-6">
                위의 FAQ에서 답변을 찾지 못하셨다면, 언제든지 고객센터로 문의해주세요.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                <div className="text-center">
                  <Phone className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="font-semibold">전화 문의</p>
                  <p className="text-sm text-muted-foreground">1588-1234</p>
                  <p className="text-xs text-muted-foreground">평일 09:00 - 18:00</p>
                </div>
                <div className="text-center">
                  <Mail className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="font-semibold">이메일 문의</p>
                  <p className="text-sm text-muted-foreground">support@alman.com</p>
                  <p className="text-xs text-muted-foreground">24시간 접수 가능</p>
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