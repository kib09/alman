'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Shield, Eye, Lock, Trash2, Calendar, Users } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* 페이지 헤더 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">개인정보처리방침</h1>
            <p className="text-muted-foreground">
              ALMAN은 고객의 개인정보 보호를 최우선으로 합니다
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              시행일자: 2024년 1월 1일
            </p>
          </div>

          {/* 개인정보 수집 및 이용 목적 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Eye className="h-6 w-6 text-primary" />
              개인정보 수집 및 이용 목적
            </h2>
            
            <div className="bg-secondary p-6 rounded-lg">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold">수집 항목</th>
                      <th className="text-left py-3 px-4 font-semibold">이용 목적</th>
                      <th className="text-left py-3 px-4 font-semibold">보유 기간</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-3 px-4">이름, 이메일, 비밀번호</td>
                      <td className="py-3 px-4">회원가입 및 로그인</td>
                      <td className="py-3 px-4">회원 탈퇴 시까지</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 px-4">전화번호</td>
                      <td className="py-3 px-4">주문 및 배송 연락</td>
                      <td className="py-3 px-4">회원 탈퇴 시까지</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 px-4">배송지 정보</td>
                      <td className="py-3 px-4">상품 배송</td>
                      <td className="py-3 px-4">회원 탈퇴 시까지</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 px-4">결제 정보</td>
                      <td className="py-3 px-4">상품 구매 및 결제</td>
                      <td className="py-3 px-4">5년 (관련 법령)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">서비스 이용 기록</td>
                      <td className="py-3 px-4">서비스 개선 및 통계</td>
                      <td className="py-3 px-4">3년</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 개인정보 수집 방법 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              개인정보 수집 방법
            </h2>
            
            <div className="bg-secondary p-6 rounded-lg">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">회원가입 시</h3>
                  <p className="text-muted-foreground">
                    웹사이트 회원가입 폼을 통해 이름, 이메일, 비밀번호, 전화번호를 수집합니다.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">주문 시</h3>
                  <p className="text-muted-foreground">
                    상품 주문 과정에서 배송지 정보, 결제 정보를 수집합니다.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">고객센터 문의 시</h3>
                  <p className="text-muted-foreground">
                    고객센터를 통한 문의 시 연락처 정보를 수집할 수 있습니다.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">자동 수집</h3>
                  <p className="text-muted-foreground">
                    서비스 이용 시 자동으로 생성되는 IP 주소, 쿠키, 서비스 이용 기록 등을 수집합니다.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 개인정보 보호 조치 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Lock className="h-6 w-6 text-primary" />
              개인정보 보호 조치
            </h2>
            
            <div className="bg-secondary p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">기술적 보호 조치</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 개인정보 암호화 저장</li>
                    <li>• 해킹 등 외부 침입 방지</li>
                    <li>• 접속 기록 보관 및 위변조 방지</li>
                    <li>• 백신 프로그램 설치 및 주기적 업데이트</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">관리적 보호 조치</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 개인정보 접근 권한 최소화</li>
                    <li>• 개인정보 취급 직원 교육</li>
                    <li>• 개인정보 보호책임자 지정</li>
                    <li>• 정기적인 보안 점검</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 개인정보 제3자 제공 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              개인정보 제3자 제공
            </h2>
            
            <div className="bg-secondary p-6 rounded-lg">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">제3자 제공 원칙</h3>
                  <p className="text-muted-foreground">
                    ALMAN은 원칙적으로 고객의 개인정보를 제3자에게 제공하지 않습니다. 
                    다만, 다음의 경우에는 예외로 합니다.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">제3자 제공 사유</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 고객이 사전에 동의한 경우</li>
                    <li>• 법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
                    <li>• 배송업무를 위해 택배사에 최소한의 정보 제공 (이름, 전화번호, 주소)</li>
                    <li>• 결제업무를 위해 결제대행사에 최소한의 정보 제공 (결제 정보)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">제3자 제공 시 고지사항</h3>
                  <p className="text-muted-foreground">
                    개인정보를 제3자에게 제공하는 경우, 제공받는 자, 제공 목적, 제공하는 개인정보 항목, 
                    보유 및 이용기간을 사전에 고지하고 동의를 받습니다.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 개인정보 보유 및 이용기간 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Calendar className="h-6 w-6 text-primary" />
              개인정보 보유 및 이용기간
            </h2>
            
            <div className="bg-secondary p-6 rounded-lg">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">일반 원칙</h3>
                  <p className="text-muted-foreground">
                    개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">보유 기간</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 회원 정보: 회원 탈퇴 시까지</li>
                    <li>• 주문 정보: 5년 (전자상거래법)</li>
                    <li>• 결제 정보: 5년 (전자상거래법)</li>
                    <li>• 서비스 이용 기록: 3년</li>
                    <li>• 고객센터 문의: 3년</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">보유 기간 연장</h3>
                  <p className="text-muted-foreground">
                    관계법령의 규정에 의하여 보존할 필요가 있는 경우, 해당 법령에서 정한 기간 동안 보관됩니다.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 개인정보 파기 절차 및 방법 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Trash2 className="h-6 w-6 text-primary" />
              개인정보 파기 절차 및 방법
            </h2>
            
            <div className="bg-secondary p-6 rounded-lg">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">파기 절차</h3>
                  <p className="text-muted-foreground">
                    개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 
                    지체없이 해당 개인정보를 파기합니다.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">파기 방법</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 전자적 파일 형태: 복구 불가능한 방법으로 영구 삭제</li>
                    <li>• 종이에 출력된 개인정보: 분쇄기로 분쇄하거나 소각</li>
                    <li>• 데이터베이스: 복구 불가능한 방법으로 영구 삭제</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 개인정보 처리 위탁 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              개인정보 처리 위탁
            </h2>
            
            <div className="bg-secondary p-6 rounded-lg">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold">수탁업체</th>
                      <th className="text-left py-3 px-4 font-semibold">위탁업무</th>
                      <th className="text-left py-3 px-4 font-semibold">위탁기간</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-3 px-4">택배사</td>
                      <td className="py-3 px-4">상품 배송</td>
                      <td className="py-3 px-4">배송 완료 시까지</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 px-4">결제대행사</td>
                      <td className="py-3 px-4">결제 처리</td>
                      <td className="py-3 px-4">결제 완료 시까지</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">클라우드 서비스 업체</td>
                      <td className="py-3 px-4">데이터 저장 및 관리</td>
                      <td className="py-3 px-4">서비스 계약 기간</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 개인정보 처리방침 변경 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Calendar className="h-6 w-6 text-primary" />
              개인정보 처리방침 변경
            </h2>
            
            <div className="bg-secondary p-6 rounded-lg">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">변경 고지</h3>
                  <p className="text-muted-foreground">
                    이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 
                    삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">변경 이력</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 2024년 1월 1일: 최초 시행</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 개인정보 보호책임자 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              개인정보 보호책임자
            </h2>
            
            <div className="bg-secondary p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">개인정보 보호책임자</h3>
                  <p className="text-muted-foreground">
                    <strong>이름:</strong> 홍길동<br />
                    <strong>직책:</strong> 개인정보보호책임자<br />
                    <strong>연락처:</strong> 1588-1234<br />
                    <strong>이메일:</strong> privacy@alman.com
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">개인정보 보호담당자</h3>
                  <p className="text-muted-foreground">
                    <strong>이름:</strong> 김철수<br />
                    <strong>직책:</strong> 개인정보보호담당자<br />
                    <strong>연락처:</strong> 1588-1234<br />
                    <strong>이메일:</strong> privacy@alman.com
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 개인정보 열람, 정정, 삭제, 처리정지 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Eye className="h-6 w-6 text-primary" />
              개인정보 열람, 정정, 삭제, 처리정지
            </h2>
            
            <div className="bg-secondary p-6 rounded-lg">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">개인정보 처리에 대한 권리</h3>
                  <p className="text-muted-foreground">
                    고객은 개인정보 처리에 대해 다음과 같은 권리를 가집니다.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">권리 내용</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 개인정보 처리에 대한 동의 철회</li>
                    <li>• 개인정보의 열람</li>
                    <li>• 개인정보의 정정·삭제</li>
                    <li>• 개인정보의 처리정지</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">권리 행사 방법</h3>
                  <p className="text-muted-foreground">
                    위 권리를 행사하려면 개인정보 보호책임자에게 서면, 전화, 전자우편, 모사전송(FAX) 등을 
                    통하여 연락하시면 지체 없이 조치하겠습니다.
                  </p>
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