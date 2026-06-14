import { Button, Card } from './common';

const AboutUs = ({ onClose }) => {
  return (
    <Card>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">K Doctor Online</h2>
        <p className="text-slate-500 text-sm mb-6">Korean Virtual Doctor Service</p>

        {/* English Section */}
        <div className="mb-6 md:mb-8">
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">Our Mission</h3>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
            K Doctor Online connects Korean-speaking patients in the United States with licensed Korean
            doctors through secure, convenient video consultations. We believe language should never be
            a barrier to quality healthcare. Our platform makes it easy to see a Korean-speaking doctor
            from the comfort of your home — anytime, anywhere.
          </p>

          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">What We Offer</h3>
          <ul className="list-disc list-inside text-sm md:text-base text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>Video consultations with Korean-speaking licensed physicians</li>
            <li>Online appointment scheduling 24/7</li>
            <li>Electronic prescription delivery to your nearest pharmacy</li>
            <li>Secure, HIPAA-compliant telehealth platform</li>
            <li>Bilingual support (Korean and English)</li>
            <li>Insurance verification and processing</li>
          </ul>

          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">Our Commitment</h3>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
            We are committed to protecting your privacy and ensuring your health information remains
            secure. Our platform is fully HIPAA-compliant and uses industry-standard encryption to
            safeguard every consultation and personal record.
          </p>
        </div>

        {/* Korean Section */}
        <div className="mb-6 md:mb-8 border-t pt-6 md:pt-8">
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">우리의 미션</h3>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
            K Doctor Online은 미국에 거주하는 한인 환자와 한국어를 구사하는 의사 선생님을 안전한 화상 진료로
            연결합니다. 언어가 의료 서비스의 장벽이 되어서는 안 된다고 믿습니다. 집에서 편하게, 모국어로
            진료 받으세요.
          </p>

          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">제공 서비스</h3>
          <ul className="list-disc list-inside text-sm md:text-base text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>한국어를 구사하는 면허 의사와의 화상 진료</li>
            <li>24시간 온라인 예약 서비스</li>
            <li>전자 처방전 발급 및 약국 연계</li>
            <li>HIPAA 준수 안전한 원격진료 플랫폼</li>
            <li>이중 언어 지원 (한국어 및 영어)</li>
            <li>보험 확인 및 처리</li>
          </ul>

          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">우리의 약속</h3>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
            귀하의 개인정보와 진료 기록을 철저히 보호합니다. 저희 플랫폼은 미국 의료법(HIPAA)을 완전히
            준수하며 업계 최고 수준의 암호화로 모든 데이터를 안전하게 관리합니다.
          </p>
        </div>

        {/* Contact Information */}
        <div className="bg-blue-50 p-4 md:p-6 rounded-lg mb-6 border border-blue-100">
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">Contact Us · 연락처</h3>
          <div className="text-sm md:text-base text-gray-700 space-y-2">
            <p><strong>Email · 이메일:</strong> support@kdoctoronline.com</p>
            <p><strong>Phone · 전화:</strong> (800) K-DOCTOR</p>
            <p><strong>Hours · 운영시간:</strong> Monday – Saturday 9:00 AM – 6:00 PM CT · 월–토 오전 9시 – 오후 6시 (중부시간)</p>
            <p><strong>Service Area · 서비스 지역:</strong> All 50 U.S. States · 미국 전역</p>
          </div>
        </div>

        <div className="flex justify-center">
          <Button onClick={onClose} variant="primary" className="px-6 md:px-8 py-2 md:py-3">
            Close · 닫기
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AboutUs;
