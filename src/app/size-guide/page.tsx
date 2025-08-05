'use client';

import { useState } from 'react';
import { Ruler, Shirt, Footprints, Watch, ChevronDown, ChevronUp } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const sizeCategories = [
  {
    id: 'clothing',
    name: '의류',
    icon: Shirt,
    description: '상의, 하의, 정장 사이즈',
  },
  {
    id: 'shoes',
    name: '신발',
    icon: Footprints,
    description: '운동화, 정장화, 부츠 사이즈',
  },
  {
    id: 'accessories',
    name: '액세서리',
    icon: Watch,
    description: '시계, 벨트, 넥타이 사이즈',
  },
];

const clothingSizes = [
  { size: 'XS', chest: '88-92', waist: '76-80', length: '64-66' },
  { size: 'S', chest: '92-96', waist: '80-84', length: '66-68' },
  { size: 'M', chest: '96-100', waist: '84-88', length: '68-70' },
  { size: 'L', chest: '100-104', waist: '88-92', length: '70-72' },
  { size: 'XL', chest: '104-108', waist: '92-96', length: '72-74' },
  { size: 'XXL', chest: '108-112', waist: '96-100', length: '74-76' },
];

const shoeSizes = [
  { kr: '250', us: '7', eu: '40', uk: '6.5' },
  { kr: '255', us: '7.5', eu: '40.5', uk: '7' },
  { kr: '260', us: '8', eu: '41', uk: '7.5' },
  { kr: '265', us: '8.5', eu: '41.5', uk: '8' },
  { kr: '270', us: '9', eu: '42', uk: '8.5' },
  { kr: '275', us: '9.5', eu: '42.5', uk: '9' },
  { kr: '280', us: '10', eu: '43', uk: '9.5' },
  { kr: '285', us: '10.5', eu: '43.5', uk: '10' },
  { kr: '290', us: '11', eu: '44', uk: '10.5' },
];

const measurementGuide = [
  {
    title: '가슴둘레',
    description: '겨드랑이 아래 가장 넓은 부분을 수평으로 측정',
    image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=300&h=200&fit=crop',
  },
  {
    title: '허리둘레',
    description: '배꼽 높이에서 수평으로 측정',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
  },
  {
    title: '팔길이',
    description: '어깨 끝에서 손목까지 측정',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=200&fit=crop',
  },
];

export default function SizeGuidePage() {
  const [activeCategory, setActiveCategory] = useState('clothing');
  const [openMeasurement, setOpenMeasurement] = useState<number | null>(null);

  const toggleMeasurement = (index: number) => {
    setOpenMeasurement(openMeasurement === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* 페이지 헤더 */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">사이즈 가이드</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              정확한 사이즈를 선택하기 위해 사이즈 가이드를 참고하세요. 
              측정 방법과 사이즈 표를 확인하여 최적의 핏을 찾아보세요.
            </p>
          </div>

          {/* 카테고리 선택 */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {sizeCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                <category.icon className="h-5 w-5" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          {/* 사이즈 표 */}
          <div className="mb-12">
            {activeCategory === 'clothing' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">의류 사이즈</h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-border">
                    <thead>
                      <tr className="bg-secondary">
                        <th className="border border-border px-4 py-3 text-left">사이즈</th>
                        <th className="border border-border px-4 py-3 text-left">가슴둘레 (cm)</th>
                        <th className="border border-border px-4 py-3 text-left">허리둘레 (cm)</th>
                        <th className="border border-border px-4 py-3 text-left">총장 (cm)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clothingSizes.map((size) => (
                        <tr key={size.size} className="hover:bg-secondary/50">
                          <td className="border border-border px-4 py-3 font-medium">{size.size}</td>
                          <td className="border border-border px-4 py-3">{size.chest}</td>
                          <td className="border border-border px-4 py-3">{size.waist}</td>
                          <td className="border border-border px-4 py-3">{size.length}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeCategory === 'shoes' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">신발 사이즈</h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-border">
                    <thead>
                      <tr className="bg-secondary">
                        <th className="border border-border px-4 py-3 text-left">한국 (mm)</th>
                        <th className="border border-border px-4 py-3 text-left">미국 (US)</th>
                        <th className="border border-border px-4 py-3 text-left">유럽 (EU)</th>
                        <th className="border border-border px-4 py-3 text-left">영국 (UK)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {shoeSizes.map((size) => (
                        <tr key={size.kr} className="hover:bg-secondary/50">
                          <td className="border border-border px-4 py-3 font-medium">{size.kr}</td>
                          <td className="border border-border px-4 py-3">{size.us}</td>
                          <td className="border border-border px-4 py-3">{size.eu}</td>
                          <td className="border border-border px-4 py-3">{size.uk}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeCategory === 'accessories' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">액세서리 사이즈</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-secondary p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">벨트 사이즈</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>허리둘레 28-30인치</span>
                        <span>벨트 사이즈 85cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>허리둘레 30-32인치</span>
                        <span>벨트 사이즈 90cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>허리둘레 32-34인치</span>
                        <span>벨트 사이즈 95cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>허리둘레 34-36인치</span>
                        <span>벨트 사이즈 100cm</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-secondary p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">넥타이 사이즈</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>일반</span>
                        <span>길이 145cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>긴 길이</span>
                        <span>길이 155cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>짧은 길이</span>
                        <span>길이 135cm</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 측정 방법 가이드 */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">측정 방법</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {measurementGuide.map((guide, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleMeasurement(index)}
                    className="w-full p-4 text-left flex items-center justify-between hover:bg-secondary transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Ruler className="h-5 w-5 text-accent" />
                      <span className="font-medium">{guide.title}</span>
                    </div>
                    {openMeasurement === index ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                  {openMeasurement === index && (
                    <div className="p-4 border-t">
                      <p className="text-muted-foreground mb-3">{guide.description}</p>
                      <div className="relative h-32 rounded-lg overflow-hidden">
                        <img
                          src={guide.image}
                          alt={guide.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 사이즈 팁 */}
          <div className="bg-secondary p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">사이즈 선택 팁</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">정확한 측정을 위한 팁</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• 편안한 상태에서 측정하세요</li>
                  <li>• 테이프를 너무 조이거나 느슨하게 하지 마세요</li>
                  <li>• 거울을 보며 수평을 유지하세요</li>
                  <li>• 여러 번 측정하여 평균값을 사용하세요</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">사이즈 선택 시 고려사항</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• 브랜드마다 사이즈가 다를 수 있습니다</li>
                  <li>• 소재에 따라 핏이 달라질 수 있습니다</li>
                  <li>• 개인적인 선호도(슬림핏, 루즈핏)를 고려하세요</li>
                  <li>• 의심스러우면 한 사이즈 크게 선택하세요</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 