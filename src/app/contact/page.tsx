'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, ChevronDown, ChevronUp } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const faqData = [
  {
    question: '배송은 얼마나 걸리나요?',
    answer: '일반 배송은 2-3일, 특급 배송은 1일 내에 배송됩니다. 도서산간 지역의 경우 추가 1-2일이 소요될 수 있습니다.',
  },
  {
    question: '반품/교환은 어떻게 하나요?',
    answer: '상품 수령 후 7일 이내에 반품/교환이 가능합니다. 단, 상품의 상태가 구매 시와 동일해야 합니다.',
  },
  {
    question: '사이즈 교환이 가능한가요?',
    answer: '네, 상품 수령 후 7일 이내에 사이즈 교환이 가능합니다. 단, 해당 사이즈의 재고가 있어야 합니다.',
  },
  {
    question: '무료 배송 기준은 어떻게 되나요?',
    answer: '5만원 이상 구매 시 전국 무료 배송입니다. 5만원 미만 구매 시 배송비 3,000원이 추가됩니다.',
  },
  {
    question: '결제 방법은 어떤 것들이 있나요?',
    answer: '신용카드, 체크카드, 계좌이체, 간편결제(카카오페이, 네이버페이, 페이팔)를 지원합니다.',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('문의가 성공적으로 전송되었습니다. 빠른 시일 내에 답변드리겠습니다.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* 페이지 헤더 */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">문의하기</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              궁금한 점이나 문의사항이 있으시면 언제든 연락주세요. 
              빠른 시일 내에 답변드리겠습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* 문의 양식 */}
            <div>
              <h2 className="text-2xl font-bold mb-6">문의 양식</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      이름 *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="홍길동"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      이메일 *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="hong@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    전화번호
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="010-1234-5678"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    문의 유형 *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="">문의 유형을 선택하세요</option>
                    <option value="주문/결제">주문/결제</option>
                    <option value="배송">배송</option>
                    <option value="반품/교환">반품/교환</option>
                    <option value="상품 문의">상품 문의</option>
                    <option value="기타">기타</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    문의 내용 *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                    placeholder="문의하실 내용을 자세히 작성해주세요."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="h-5 w-5" />
                  문의하기
                </button>
              </form>
            </div>

            {/* 연락처 정보 */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">연락처 정보</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-accent mt-1" />
                    <div>
                      <p className="font-medium">고객센터</p>
                      <p className="text-muted-foreground">1588-1234</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-accent mt-1" />
                    <div>
                      <p className="font-medium">이메일</p>
                      <p className="text-muted-foreground">info@alman.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-accent mt-1" />
                    <div>
                      <p className="font-medium">주소</p>
                      <p className="text-muted-foreground">
                        서울특별시 강남구 테헤란로 123<br />
                        ALMAN 빌딩 5층
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-accent mt-1" />
                    <div>
                      <p className="font-medium">운영시간</p>
                      <p className="text-muted-foreground">
                        평일: 09:00 - 18:00<br />
                        토요일: 09:00 - 15:00<br />
                        일요일 및 공휴일 휴무
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 자주 묻는 질문 */}
              <div>
                <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
                <div className="space-y-2">
                  {faqData.map((faq, index) => (
                    <div key={index} className="border rounded-lg">
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-secondary transition-colors"
                      >
                        <span className="font-medium">{faq.question}</span>
                        {openFaq === index ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                      {openFaq === index && (
                        <div className="px-4 pb-3">
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 