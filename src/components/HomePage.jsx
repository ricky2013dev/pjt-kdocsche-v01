import { useState } from "react";
import { doctors } from "../data/doctors";
import DoctorModal from "./DoctorModal";

// ── Doctor Avatar ─────────────────────────────────────────────
const DoctorAvatar = ({ initials, color, size = "md" }) => {
  const sz = size === "lg" ? "w-16 h-16 text-2xl" : "w-12 h-12 text-lg";
  return (
    <div className={`${sz} rounded-2xl flex items-center justify-center text-white font-black shadow-md ring-2 ring-white ${color}`}>
      {initials}
    </div>
  );
};

// ── How It Works ─────────────────────────────────────────────
const steps = [
  {
    step: "01",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    ),
    title: "의사 선택",
    desc: "프로필을 보고 원하는 선생님을 선택",
  },
  {
    step: "02",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    title: "날짜·시간 예약",
    desc: "편한 날짜와 시간대를 선택해 예약",
  },
  {
    step: "03",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>
      </svg>
    ),
    title: "화상 진료",
    desc: "링크를 클릭하시면 화상 진료가 시작",
  },
  {
    step: "04",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    title: "처방전 수령",
    desc: "처방전이 전자로 발급되어 가까운 약국에서 수령",
  },
];

const HowItWorks = () => (
  <div className="bg-white rounded-2xl p-5 md:p-7 shadow-sm border border-slate-100">
    <div className="flex items-center gap-2.5 mb-5">
      <div className="bg-blue-600 rounded-xl p-2">
        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
        </svg>
      </div>
      <h2 className="font-bold text-slate-800 text-base">이용 방법</h2>
    </div>
    <div className="flex flex-col gap-3">
      {steps.map((item, i) => (
        <div key={i} className="flex items-start gap-3">
          <div className="flex-shrink-0 flex flex-col items-center">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
              {item.icon}
            </div>
            {i < steps.length - 1 && <div className="w-0.5 h-4 bg-gradient-to-b from-blue-200 to-transparent mt-1" />}
          </div>
          <div className="flex-1 pb-1">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-black text-blue-400 tracking-widest">{item.step}</span>
              <p className="font-bold text-slate-800 text-sm">{item.title}</p>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ── Feature Cards ─────────────────────────────────────────────
const features = [
  {
    gradient: "from-blue-500 to-blue-600",
    icon: (
      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>
      </svg>
    ),
    title: "화상 진료",
    sub: "집에서 받는 온라인 진료",
    desc: "언제 어디서나 한국어 화상 진료를 받으세요.",
  },
  {
    gradient: "from-indigo-500 to-indigo-600",
    icon: (
      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: "한국어 진료",
    sub: "모국어로 편하게 상담",
    desc: "의사 선생님과 한국어를 통해 편하게 증상을 설명하세요.",
  },
  {
    gradient: "from-violet-500 to-violet-600",
    icon: (
      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "HIPAA 보안",
    sub: "개인정보 완벽 보호",
    desc: "최고 수준 보안으로 진료 정보를 안전하게 보호합니다.",
  },
];

// ── Main Component ────────────────────────────────────────────
const HomePage = ({ onReserve, onReserveWithDoctor }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  return (
    <div className="space-y-6 md:space-y-10">
      {selectedDoctor && (
        <DoctorModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
          onReserve={onReserve}
        />
      )}

      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-600 rounded-2xl md:rounded-3xl text-white px-5 md:px-12 py-10 md:py-16 shadow-xl overflow-hidden relative">
        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-20 -left-10 w-56 h-56 rounded-full bg-indigo-400/20" />
          <div className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full bg-white/5" />
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          {/* Live badge */}
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-1.5 text-xs font-semibold mb-5 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
            지금 바로 온라인 진료 예약 가능
          </div>

          {/* Title */}
          <p className="text-blue-200 text-[11px] md:text-xs font-bold tracking-[0.2em] uppercase mb-3">
            Korean Virtual Doctor Service
          </p>
          <h1 className="text-[2.25rem] sm:text-6xl md:text-7xl font-black leading-none tracking-tight mb-3 whitespace-nowrap">
            K Doctor<span className="text-blue-300">.</span>Online
          </h1>
          <p className="text-blue-100 text-base md:text-lg font-medium leading-relaxed opacity-90">
            한국어로 화상 진료, 집에서 편하게
          </p>

          {/* Trust stats */}
          <div className="flex items-center justify-center gap-6 md:gap-10 mt-5 mb-7">
            {[
              { icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>, val: "4.9", label: "평점" },
              { icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, val: "10+", label: "전문의" },
              { icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, val: "HIPAA", label: "보안인증" },
            ].map(({ icon, val, label }) => (
              <div key={label} className="flex flex-col items-center gap-0.5">
                <div className="text-blue-200 mb-0.5">{icon}</div>
                <span className="text-white font-black text-sm leading-none">{val}</span>
                <span className="text-blue-200 text-[10px] font-medium">{label}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onReserve}
              className="group inline-flex items-center justify-center gap-2.5 bg-white text-blue-700 font-bold text-base px-8 py-3.5 rounded-2xl shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all active:scale-[0.97]"
            >
              <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>
              </svg>
              화상 진료 예약하기
              <svg className="w-4 h-4 text-blue-400 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
            <div className="inline-flex items-center justify-center gap-2 bg-white/10 text-white text-sm px-6 py-3.5 rounded-2xl border border-white/20 backdrop-blur-sm font-medium">
              <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              보험 적용 가능 · HIPAA 보안
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works + Doctor Cards ── */}
      <section className="grid md:grid-cols-2 gap-5 md:gap-8 items-start">
        <HowItWorks />

        {/* Doctor Cards */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 px-1">
            <div className="w-1.5 h-5 rounded-full bg-blue-600" />
            <h2 className="font-bold text-slate-800 text-base">담당 의사 선생님</h2>
          </div>
          {doctors.map((doc) => (
            <div
              key={doc.name}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all overflow-hidden"
            >
              {/* Top accent bar */}
              <div className={`h-1 w-full ${doc.color}`} />
              <div className="p-4 flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <DoctorAvatar initials={doc.initials} color={doc.color} size="lg" />
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 border-2 border-white rounded-full shadow-sm" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{doc.name}</p>
                      <p className="text-blue-600 text-xs font-semibold mt-0.5">{doc.specialty}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-blue-50 border border-blue-100 rounded-full px-2 py-0.5 shrink-0">
                      <svg className="w-3 h-3 text-amber-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      <span className="text-[10px] font-bold text-slate-700">4.9</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {doc.services.slice(0, 3).map((s, i) => (
                      <span key={i} className="bg-slate-50 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded-full border border-slate-200">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedDoctor(doc)}
                      className="flex-1 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl px-3 py-2 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                      프로필 보기
                    </button>
                    <button
                      onClick={() => onReserveWithDoctor ? onReserveWithDoctor(doc) : onReserve()}
                      className="flex-1 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl px-3 py-2 transition-colors shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      예약하기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Feature Cards ── */}
      <section>
        <div className="flex items-center gap-2 px-1 mb-4">
          <div className="w-1.5 h-5 rounded-full bg-blue-600" />
          <h2 className="font-bold text-slate-800 text-base">서비스 특징</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-100 transition-all"
            >
              <div className={`bg-gradient-to-br ${f.gradient} w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-md`}>
                {f.icon}
              </div>
              <h3 className="font-bold text-slate-800 text-sm mb-0.5">{f.title}</h3>
              <p className="text-blue-600 text-xs font-semibold mb-2">{f.sub}</p>
              <p className="text-slate-500 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl md:rounded-3xl text-white px-6 md:px-12 py-8 md:py-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-blue-600/10" />
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-indigo-600/10" />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 rounded-full px-3 py-1 text-xs font-semibold text-blue-300 mb-4">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
            온라인 화상 진료
          </div>
          <h2 className="text-xl md:text-2xl font-black mb-2 text-balance">
            지금 바로 화상 진료를 예약하세요
          </h2>

          <button
            onClick={onReserve}
            className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm md:text-base px-8 py-3.5 rounded-2xl shadow-lg transition-all active:scale-[0.97]"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            예약 일정 보기
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
