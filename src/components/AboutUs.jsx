import { Button, Card } from './common';

const AboutUs = ({ onClose }) => {
  return (
    <Card>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-green-600 mb-4 md:mb-6">About Us</h2>
        <h3 className="text-xl md:text-2xl font-bold text-green-600 mb-3 md:mb-4">회사 소개</h3>

        {/* English Section */}
        <div className="mb-6 md:mb-8">
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">Our Mission</h3>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
            We are dedicated to providing accessible and efficient healthcare services through our modern
            appointment scheduling platform. Our mission is to make healthcare more convenient and
            patient-centered by simplifying the appointment booking process.
          </p>

          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">What We Offer</h3>
          <ul className="list-disc list-inside text-sm md:text-base text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>Easy online appointment scheduling 24/7</li>
            <li>Real-time availability viewing</li>
            <li>Secure patient information management</li>
            <li>Insurance verification and processing</li>
            <li>Bilingual support (English and Korean)</li>
          </ul>

          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">Our Commitment</h3>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
            We are committed to protecting your privacy and ensuring your health information remains
            secure. Our platform is HIPAA-compliant and uses industry-standard encryption to safeguard
            your personal data.
          </p>
        </div>

        {/* Korean Section */}
        <div className="mb-6 md:mb-8 border-t pt-6 md:pt-8">
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">우리의 미션</h3>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
            저희는 현대적인 예약 시스템을 통해 접근 가능하고 효율적인 의료 서비스를 제공하는 데 전념하고 있습니다.
            예약 과정을 간소화하여 의료 서비스를 더욱 편리하고 환자 중심적으로 만드는 것이 저희의 사명입니다.
          </p>

          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">제공 서비스</h3>
          <ul className="list-disc list-inside text-sm md:text-base text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>24시간 온라인 예약 서비스</li>
            <li>실시간 예약 가능 시간 확인</li>
            <li>안전한 환자 정보 관리</li>
            <li>보험 확인 및 처리</li>
            <li>이중 언어 지원 (영어 및 한국어)</li>
          </ul>

          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">우리의 약속</h3>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
            저희는 귀하의 개인정보를 보호하고 건강 정보를 안전하게 유지하는 데 최선을 다하고 있습니다.
            저희 플랫폼은 HIPAA를 준수하며 업계 표준 암호화를 사용하여 개인 데이터를 보호합니다.
          </p>
        </div>

        {/* Contact Information */}
        <div className="bg-green-50 p-4 md:p-6 rounded-lg mb-6">
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">Contact Us / 연락처</h3>
          <div className="text-sm md:text-base text-gray-700 space-y-2">
            <p><strong>Address / 주소:</strong> 123 Healthcare Ave, Medical City, MC 12345</p>
            <p><strong>Phone / 전화:</strong> (555) 123-4567</p>
            <p><strong>Email / 이메일:</strong> info@doctorappointment.com</p>
            <p><strong>Hours / 운영시간:</strong> Monday-Saturday 9:00 AM - 5:30 PM / 월-토 오전 9시 - 오후 5시 30분</p>
          </div>
        </div>

        <div className="flex justify-center">
          <Button onClick={onClose} variant="primary" className="px-6 md:px-8 py-2 md:py-3">
            Close / 닫기
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AboutUs;
