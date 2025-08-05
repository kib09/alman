'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { FileText, AlertTriangle, Shield, Users, CreditCard, Calendar } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* 페이지 헤더 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">이용약관</h1>
            <p className="text-muted-foreground">
              ALMAN 서비스 이용에 대한 약관입니다
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              시행일자: 2024년 1월 1일
            </p>
          </div>

          {/* 제1조 목적 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              제1조 (목적)
            </h2>
            
            <div className="bg-secondary p-6 rounded-lg">
              <p className="text-muted-foreground">
                이 약관은 ALMAN(이하 "회사")이 운영하는 온라인 쇼핑몰에서 제공하는 인터넷 관련 서비스(이하 "서비스")를 
                이용함에 있어 사이버 몰과 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.
              </p>
            </div>
          </section>

          {/* 제2조 정의 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              제2조 (정의)
            </h2>
            
            <div className="bg-secondary p-6 rounded-lg">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">1. "몰"이란</h3>
                  <p className="text-muted-foreground">
                    회사가 재화 또는 용역(이하 "재화 등")을 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 
                    재화 등을 거래할 수 있도록 설정한 가상의 영업장을 말하며, 아울러 사이버몰을 운영하는 사업자의 의미로도 사용합니다.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">2. "이용자"란</h3>
                  <p className="text-muted-foreground">
                    "몰"에 접속하여 이 약관에 따라 "몰"이 제공하는 서비스를 받는 회원 및 비회원을 말합니다.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">3. "회원"이란</h3>
                  <p className="text-muted-foreground">
                    "몰"에 회원등록을 한 자로서, 계속적으로 "몰"이 제공하는 서비스를 이용할 수 있는 자를 말합니다.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">4. "비회원"이란</h3>
                  <p className="text-muted-foreground">
                    회원에 가입하지 않고 "몰"이 제공하는 서비스를 이용하는 자를 말합니다.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 제3조 약관 등의 명시와 설명 및 개정 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              제3조 (약관 등의 명시와 설명 및 개정)
            </h2>
            
            <div className="bg-secondary p-6 rounded-lg">
              <div className="space-y-4">
                <div>
                  <p className="text-muted-foreground">
                    1. "몰"은 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지 주소(소비자의 불만을 처리할 수 있는 곳의 주소를 포함), 
                    전화번호·모사전송번호·전자우편주소, 사업자등록번호, 통신판매업 신고번호, 개인정보보호책임자등을 이용자가 쉽게 알 수 있도록 
                    00 사이버몰의 초기 서비스화면(전면)에 게시합니다.
                  </p>
                </div>
                
                <div>
                  <p className="text-muted-foreground">
                    2. "몰"은 이용자가 약관에 동의하기에 앞서 약관에 정하여져 있는 내용 중 청약철회·배송책임·환불조건 등과 같은 중요한 내용을 
                    이용자가 이해할 수 있도록 별도의 연결화면 또는 팝업화면 등을 제공하여 이용자의 확인을 구하여야 합니다.
                  </p>
                </div>
                
                <div>
                  <p className="text-muted-foreground">
                    3. "몰"은 전자상거래등에서의소비자보호에관한법률, 약관의규제에관한법률, 전자거래기본법, 전자서명법, 정보통신망이용촉진등에관한법률, 
                    방문판매등에관한법률, 소비자보호법 등 관련법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 제4조 서비스의 제공 및 변경 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              제4조 (서비스의 제공 및 변경)
            </h2>
            
            <div className="bg-secondary p-6 rounded-lg">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">1. "몰"은 다음과 같은 업무를 수행합니다.</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 재화 또는 용역에 대한 정보 제공 및 구매계약의 체결</li>
                    <li>• 구매계약이 체결된 재화 또는 용역의 배송</li>
                    <li>• 기타 "몰"이 정하는 업무</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">2. "몰"은 재화 또는 용역의 품절 또는 기술적 사양의 변경 등의 경우에는 장차 체결되는 계약에 의해 제공할 재화 또는 용역의 내용을 변경할 수 있습니다.</h3>
                  <p className="text-muted-foreground">
                    이 경우에는 변경된 재화 또는 용역의 내용 및 제공일자를 명시하여 현재의 재화 또는 용역의 내용을 게시한 곳에 즉시 공지합니다.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 제5조 서비스의 중단 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-primary" />
              제5조 (서비스의 중단)
            </h2>
            
            <div className="bg-secondary p-6 rounded-lg">
              <div className="space-y-4">
                <div>
                  <p className="text-muted-foreground">
                    1. "몰"은 컴퓨터 등 정보통신설비의 보수점검·교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.
                  </p>
                </div>
                
                <div>
                  <p className="text-muted-foreground">
                    2. "몰"은 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로 인하여 이용자 또는 제3자가 입은 손해에 대하여 배상합니다. 
                    단, "몰"이 고의 또는 과실이 없음을 입증하는 경우에는 그러하지 아니합니다.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 제6조 회원가입 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              제6조 (회원가입)
            </h2>
            
            <div className="bg-secondary p-6 rounded-lg">
              <div className="space-y-4">
                <div>
                  <p className="text-muted-foreground">
                    1. 이용자는 "몰"이 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의한다는 의사표시를 함으로서 회원가입을 신청합니다.
                  </p>
                </div>
                
                <div>
                  <p className="text-muted-foreground">
                    2. "몰"은 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각호에 해당하지 않는 한 회원으로 등록합니다.
                  </p>
                  <ul className="space-y-2 text-muted-foreground mt-2">
                    <li>• 가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우, 다만 제7조제2항에 의한 회원자격 상실 후 3년이 경과한 자로서 "몰"의 회원재가입 승낙을 얻은 경우에는 예외로 한다.</li>
                    <li>• 등록 내용에 허위, 기재누락, 오기가 있는 경우</li>
                    <li>• 기타 회원으로 등록하는 것이 "몰"의 기술상 현저히 지장이 있다고 판단되는 경우</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 제7조 회원탈퇴 및 자격 상실 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              제7조 (회원탈퇴 및 자격 상실)
            </h2>
            
            <div className="bg-secondary p-6 rounded-lg">
              <div className="space-y-4">
                <div>
                  <p className="text-muted-foreground">
                    1. 회원은 "몰"에 언제든지 탈퇴를 요청할 수 있으며 "몰"은 즉시 회원탈퇴를 처리합니다.
                  </p>
                </div>
                
                <div>
                  <p className="text-muted-foreground">
                    2. 회원이 다음 각호의 사유에 해당하는 경우, "몰"은 회원자격을 제한 및 정지시킬 수 있습니다.
                  </p>
                  <ul className="space-y-2 text-muted-foreground mt-2">
                    <li>• 가입 신청 시에 허위 내용을 등록한 경우</li>
                    <li>• "몰"을 이용하여 구입한 재화 등의 대금, 기타 "몰"이용에 관련하여 회원이 부담하는 채무를 기일에 지급하지 않는 경우</li>
                    <li>• 다른 사람의 "몰" 이용을 방해하거나 그 정보를 도용하는 등 전자상거래 질서를 위협하는 경우</li>
                    <li>• "몰"을 이용하여 법령 또는 이 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 제8조 회원에 대한 통지 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              제8조 (회원에 대한 통지)
            </h2>
            
            <div className="bg-secondary p-6 rounded-lg">
              <div className="space-y-4">
                <div>
                  <p className="text-muted-foreground">
                    1. "몰"이 회원에 대한 통지를 하는 경우, 회원이 "몰"과 미리 약정하여 지정한 전자우편 주소로 할 수 있습니다.
                  </p>
                </div>
                
                <div>
                  <p className="text-muted-foreground">
                    2. "몰"은 불특정다수 회원에 대한 통지의 경우 1주일이상 "몰" 게시판에 게시함으로서 개별 통지에 갈음할 수 있습니다. 
                    다만, 회원 본인의 거래와 관련하여 중대한 영향을 미치는 사항에 대하여는 개별통지를 합니다.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 제9조 구매신청 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <CreditCard className="h-6 w-6 text-primary" />
              제9조 (구매신청)
            </h2>
            
            <div className="bg-secondary p-6 rounded-lg">
              <div className="space-y-4">
                <div>
                  <p className="text-muted-foreground">
                    "몰"이용자는 "몰"상에서 다음 또는 이와 유사한 방법에 의하여 구매를 신청하며, "몰"은 이용자가 구매신청을 함에 있어서 
                    다음의 각 내용을 알기 쉽게 제공하여야 합니다.
                  </p>
                </div>
                
                <div>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 재화등의 검색 및 선택</li>
                    <li>• 받는 사람의 성명, 주소, 전화번호, 전자우편주소(또는 이동전화번호) 등의 입력</li>
                    <li>• 약관내용, 청약철회권이 제한되는 서비스, 배송료·설치비 등의 비용부담과 관련한 내용에 대한 확인</li>
                    <li>• 이 약관에 동의하고 위 3.호의 사항을 확인하거나 거부하는 표시(예, 마우스 클릭)</li>
                    <li>• 재화등의 구매신청 및 이에 관한 확인 또는 "몰"의 확인에 대한 동의</li>
                    <li>• 결제방법의 선택</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 제10조 계약의 성립 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              제10조 (계약의 성립)
            </h2>
            
            <div className="bg-secondary p-6 rounded-lg">
              <div className="space-y-4">
                <div>
                  <p className="text-muted-foreground">
                    1. "몰"은 제9조와 같은 구매신청에 대하여 다음 각호에 해당하면 승낙하지 않을 수 있습니다. 
                    다만, 미성년자와 계약을 체결하는 경우에는 법정대리인의 동의를 얻지 못하면 미성년자 본인 또는 법정대리인이 계약을 취소할 수 있다는 내용을 고지하여야 합니다.
                  </p>
                  <ul className="space-y-2 text-muted-foreground mt-2">
                    <li>• 신청 내용에 허위, 기재누락, 오기가 있는 경우</li>
                    <li>• 미성년자가 담배, 주류 등 청소년보호법에서 금지하는 재화 및 용역을 구매하는 경우</li>
                    <li>• 기타 구매신청에 승낙하는 것이 "몰" 기술상 현저히 지장이 있다고 판단하는 경우</li>
                  </ul>
                </div>
                
                <div>
                  <p className="text-muted-foreground">
                    2. "몰"의 승낙이 제12조제1항의 수신확인통지형태로 이용자에게 도달한 시점에 계약이 성립한 것으로 봅니다.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 제11조 지급방법 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <CreditCard className="h-6 w-6 text-primary" />
              제11조 (지급방법)
            </h2>
            
            <div className="bg-secondary p-6 rounded-lg">
              <div className="space-y-4">
                <div>
                  <p className="text-muted-foreground">
                    "몰"에서 구매한 재화 또는 용역에 대한 대금지급방법은 다음 각호의 방법중 가용한 방법으로 할 수 있습니다. 
                    단, "몰"은 이용자의 지급방법에 대하여 재화 등의 대금에 어떠한 명목의 수수료도 추가하여 징수할 수 없습니다.
                  </p>
                </div>
                
                <div>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 폰뱅킹, 인터넷뱅킹, 메일 뱅킹 등의 각종 계좌이체</li>
                    <li>• 선불카드, 직불카드, 신용카드 등의 각종 카드 결제</li>
                    <li>• 온라인무통장입금</li>
                    <li>• 전자화폐에 의한 결제</li>
                    <li>• 수령 시 대금지급</li>
                    <li>• 마일리지 등 "몰"이 지급한 포인트에 의한 결제</li>
                    <li>• "몰"과 계약을 맺었거나 "몰"이 인정한 상품권에 의한 결제</li>
                    <li>• 기타 전자적 지급 방법에 의한 대금 지급 등</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 제12조 수신확인통지·구매신청 변경 및 취소 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              제12조 (수신확인통지·구매신청 변경 및 취소)
            </h2>
            
            <div className="bg-secondary p-6 rounded-lg">
              <div className="space-y-4">
                <div>
                  <p className="text-muted-foreground">
                    1. "몰"은 이용자의 구매신청이 있는 경우 이용자에게 수신확인통지를 합니다.
                  </p>
                </div>
                
                <div>
                  <p className="text-muted-foreground">
                    2. 수신확인통지를 받은 이용자는 의사표시의 불일치 등이 있는 경우에는 수신확인통지를 받은 후 즉시 구매신청 변경 및 취소를 요청할 수 있고 
                    "몰"은 배송 전에 이용자의 요청이 있는 경우에는 지체 없이 그 요청에 따라 처리하여야 합니다. 
                    다만 이미 대금을 지불한 경우에는 제15조의 청약철회 등에 관한 규정에 따릅니다.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 제13조 재화등의 공급 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              제13조 (재화등의 공급)
            </h2>
            
            <div className="bg-secondary p-6 rounded-lg">
              <div className="space-y-4">
                <div>
                  <p className="text-muted-foreground">
                    1. "몰"은 이용자와 재화등의 공급시기에 관하여 별도의 약정이 없는 이상, 이용자가 청약을 한 날부터 7일 이내에 재화 등을 배송할 수 있도록 주문제작, 
                    포장 등 기타의 필요한 조치를 취합니다. 다만, "몰"이 이미 재화 등의 대금의 전부 또는 일부를 받은 경우에는 대금의 전부 또는 일부를 받은 날부터 2영업일 이내에 
                    조치를 취합니다. 이때 "몰"은 이용자가 재화등의 공급 절차 및 진행 사항을 확인할 수 있도록 적절한 조치를 합니다.
                  </p>
                </div>
                
                <div>
                  <p className="text-muted-foreground">
                    2. "몰"은 이용자가 구매한 재화에 대해 배송수단, 수단별 배송비용 부담자, 수단별 배송기간 등을 명시합니다. 
                    만약 "몰"이 약정 배송기간을 초과한 경우에는 그로 인한 이용자의 손해를 배상하여야 합니다. 
                    다만 "몰"이 고의·과실이 없음을 입증한 경우에는 그러하지 아니합니다.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 제14조 환급 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <CreditCard className="h-6 w-6 text-primary" />
              제14조 (환급)
            </h2>
            
            <div className="bg-secondary p-6 rounded-lg">
              <div className="space-y-4">
                <div>
                  <p className="text-muted-foreground">
                    "몰"은 이용자가 구매신청한 재화등이 품절 등의 사유로 인도 또는 제공을 할 수 없을 때에는 지체 없이 그 사유를 이용자에게 통지하고 
                    사전에 재화 등의 대금을 받은 경우에는 대금을 받은 날부터 2영업일 이내에 환급하거나 환급에 필요한 조치를 취합니다.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 제15조 청약철회 등 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              제15조 (청약철회 등)
            </h2>
            
            <div className="bg-secondary p-6 rounded-lg">
              <div className="space-y-4">
                <div>
                  <p className="text-muted-foreground">
                    1. "몰"과 재화등의 구매에 관한 계약을 체결한 이용자는 수신확인의 통지를 받은 날부터 7일 이내에는 청약의 철회를 할 수 있습니다.
                  </p>
                </div>
                
                <div>
                  <p className="text-muted-foreground">
                    2. 이용자는 재화등을 배송받은 경우 다음 각호의 1에 해당하는 경우에는 반품 및 교환을 할 수 없습니다.
                  </p>
                  <ul className="space-y-2 text-muted-foreground mt-2">
                    <li>• 이용자에게 책임 있는 사유로 재화 등이 멸실 또는 훼손된 경우(다만, 재화 등의 내용을 확인하기 위하여 포장 등을 훼손한 경우에는 청약철회를 할 수 있습니다)</li>
                    <li>• 이용자의 사용 또는 일부 소비에 의하여 재화 등의 가치가 현저히 감소한 경우</li>
                    <li>• 시간의 경과에 의하여 재판매가 곤란할 정도로 재화등의 가치가 현저히 감소한 경우</li>
                    <li>• 같은 성능을 지는 재화 등으로 복제가 가능한 경우 그 원본인 재화 등의 포장을 훼손한 경우</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 제16조 청약철회 등의 효과 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              제16조 (청약철회 등의 효과)
            </h2>
            
            <div className="bg-secondary p-6 rounded-lg">
              <div className="space-y-4">
                <div>
                  <p className="text-muted-foreground">
                    1. "몰"은 이용자로부터 재화 등을 반환받은 경우 3영업일 이내에 이미 지급받은 재화등의 대금을 환급합니다. 
                    이 경우 "몰"이 이용자에게 재화등의 환급을 지연한 때에는 그 지연기간에 대하여 공정거래위원회가 정하여 고시하는 지연이자율을 곱하여 산정한 지연이자를 지급합니다.
                  </p>
                </div>
                
                <div>
                  <p className="text-muted-foreground">
                    2. "몰"은 위 대금을 환급함에 있어서 이용자가 신용카드 또는 전자화폐 등의 결제수단으로 재화등의 대금을 지급한 때에는 
                    지체 없이 당해 결제수단을 제공한 사업자가 재화등의 대금의 청구를 정지 또는 취소하도록 요청합니다.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 부칙 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Calendar className="h-6 w-6 text-primary" />
              부칙
            </h2>
            
            <div className="bg-secondary p-6 rounded-lg">
              <div className="space-y-4">
                <div>
                  <p className="text-muted-foreground">
                    이 약관은 2024년 1월 1일부터 시행합니다.
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