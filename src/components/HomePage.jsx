import { useState } from "react";
import { doctors } from "../data/doctors";
import DoctorModal from "./DoctorModal";

const DoctorAvatar = ({ initials, color }) => (
  <div
    className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-white text-xl md:text-2xl font-bold shadow-lg ${color}`}
  >
    {initials}
  </div>
);

const HowItWorks = () => (
  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">

    <div className="flex flex-col gap-4">
      {[
        {
          step: "01",
          icon: (
            <svg className="w-6 h-6 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
          ),
          title: "의사 선택",
          desc: "전문 분야와 프로필을 보고 원하는 선생님을 선택하세요.",
        },
        {
          step: "02",
          icon: (
            <svg className="w-6 h-6 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          ),
          title: "날짜·시간 예약",
          desc: "편한 날짜와 시간대를 선택해 온라인으로 예약하세요.",
        },
        {
          step: "03",
          icon: (
            <svg className="w-6 h-6 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" />
            </svg>
          ),
          title: "화상 진료",
          desc: "예약 시간에 링크를 클릭하면 바로 한국어 진료가 시작됩니다.",
        },
        {
          step: "04",
          icon: (
            <svg className="w-6 h-6 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
            </svg>
          ),
          title: "처방전 수령",
          desc: "필요 시 처방전이 전자로 발급되어 가까운 약국에서 수령하세요.",
        },
      ].map((item, i) => (
        <div key={i} className="flex items-start gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-600 text-white text-xs font-black flex items-center justify-center">
            {item.step}
          </div>
          <div className="bg-teal-50 rounded-xl p-3 flex items-start gap-3 flex-1 border border-teal-100">
            <div className="flex-shrink-0">{item.icon}</div>
            <div>
              <p className="font-bold text-slate-800 text-sm">{item.title}</p>
              <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const HomePage = ({ onReserve, onReserveWithDoctor }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  return (
    <div className="space-y-10 md:space-y-16">
      {selectedDoctor && (
        <DoctorModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
          onReserve={onReserve}
        />
      )}

      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 rounded-2xl text-white px-6 md:px-12 py-10 md:py-16 shadow-xl overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg viewBox="0 0 800 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <circle cx="700" cy="50" r="200" fill="white" />
            <circle cx="100" cy="350" r="150" fill="white" />
          </svg>
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-5 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse"></span>
            지금 바로 온라인 진료 예약 가능
          </div>
          <div className="mb-6">
            <p className="text-teal-200 text-xs md:text-sm font-semibold tracking-widest uppercase mb-3">
              Korean Virtual Doctor Service
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-none tracking-tight">
              K Doctor<span className="text-teal-300">.</span>Online
            </h1>
            <p className="text-teal-100 text-base md:text-xl font-semibold mt-4 leading-relaxed">
              한국어로 화상 진료,집에서 편하게
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onReserve}
              className="inline-flex items-center justify-center gap-2 bg-white text-teal-700 font-bold text-base md:text-lg px-8 md:px-10 py-3 md:py-4 rounded-xl shadow-lg hover:bg-teal-50 hover:shadow-xl transition-all active:scale-95"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" />
              </svg>
              화상 진료 예약하기
            </button>
            <div className="inline-flex items-center justify-center gap-2 bg-white/10 text-white text-sm px-6 py-3 rounded-xl border border-white/20 backdrop-blur-sm">
              <svg className="w-4 h-4 text-green-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              보험 적용 가능 · HIPAA 보안
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works + Doctors ── */}
      <section>
        <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-start">
          {/* How It Works */}
          <HowItWorks />

          {/* Doctor Cards */}
          <div className="grid grid-cols-1 gap-3 md:gap-4">
            
            {doctors.map((doc) => (
              <div
                key={doc.name}
                className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md hover:border-teal-200 transition-all flex flex-row items-center gap-4"
              >
                <DoctorAvatar initials={doc.initials} color={doc.color} />
                <div className="flex flex-col flex-1 gap-2.5">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-slate-800 text-sm md:text-base">{doc.name}</p>
                      <span className="bg-green-100 text-green-700 text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-green-200">온라인</span>
                    </div>
                    <p className="text-teal-600 text-xs font-medium mt-0.5">{doc.specialty}</p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {doc.services.slice(0, 2).map((s, i) => (
                      <span
                        key={i}
                        className="bg-teal-50 text-teal-700 text-[10px] font-medium px-2 py-0.5 rounded-full border border-teal-100 leading-snug"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => setSelectedDoctor(doc)}
                      className="text-[10px] font-semibold text-slate-500 bg-slate-100 rounded-md px-2.5 py-1 hover:bg-slate-200 transition-colors"
                    >
                      상세보기
                    </button>
                    <button
                      onClick={() => onReserveWithDoctor ? onReserveWithDoctor(doc) : onReserve()}
                      className="text-[10px] font-semibold text-white bg-teal-500 rounded-md px-2.5 py-1 hover:bg-teal-600 transition-colors shadow-sm"
                    >
                      예약하기
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        {[
          {
            icon: (
              <svg className="w-7 h-7 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" />
              </svg>
            ),
            title: "화상 진료",
            sub: "집에서 받는 온라인 진료",
            desc: "스마트폰이나 PC로 언제 어디서나 한국어 화상 진료를 받으세요.",
          },
          {
            icon: (
              <svg className="w-7 h-7 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            ),
            title: "한국어 진료",
            sub: "모국어로 편하게 상담",
            desc: "한국어를 구사하는 의사 선생님과 편하게 증상을 설명하고 치료를 받으세요.",
          },
          {
            icon: (
              <svg className="w-7 h-7 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            ),
            title: "HIPAA 보안",
            sub: "개인정보 완벽 보호",
            desc: "미국 의료법 기준의 최고 수준 보안으로 모든 진료 정보를 안전하게 보호합니다.",
          },
        ].map((f) => (
          <div
            key={f.title}
            className="bg-white rounded-xl p-5 md:p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-teal-200 transition-all"
          >
            <div className="bg-teal-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              {f.icon}
            </div>
            <h3 className="font-bold text-slate-800 text-sm md:text-base">{f.title}</h3>
            <p className="text-teal-600 text-xs font-medium mt-0.5">{f.sub}</p>
            <p className="text-slate-500 text-xs md:text-sm mt-2">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-slate-800 rounded-2xl text-white px-6 md:px-12 py-8 md:py-12 text-center">
        <h2 className="text-xl md:text-2xl font-bold mb-2">
          지금 바로 화상 진료를 예약하세요
        </h2>
        <p className="text-slate-400 text-sm md:text-base mb-6">
          원하시는 날짜와 시간을 선택하고 한국어로 편하게 진료 받으세요
        </p>
        <button
          onClick={onReserve}
          className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-bold text-sm md:text-base px-8 py-3 rounded-xl shadow-lg transition-all active:scale-95"
        >
          예약 일정 보기 →
        </button>
      </section>
    </div>
  );
};

export default HomePage;
