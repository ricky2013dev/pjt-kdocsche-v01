const DoctorAvatar = ({ initials, color }) => (
  <div
    className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-white text-xl md:text-2xl font-bold shadow-lg ${color}`}
  >
    {initials}
  </div>
);

import { useState } from "react";
import { doctors } from "../data/doctors";
import DoctorModal from "./DoctorModal";

// DFW Metroplex map — Korean community focus
const DallasMap = () => (
  <svg
    viewBox="0 0 380 300"
    className="w-full max-w-sm mx-auto"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Map background */}
    <rect x="0" y="0" width="380" height="300" rx="14" fill="#f0fdf9" />

    {/* ── Road grid ── */}
    {/* I-35W  (Fort Worth corridor, vertical) */}
    <line x1="68" y1="20" x2="68" y2="285" stroke="#cbd5e1" strokeWidth="3.5" />
    {/* I-35E  (Carrollton/Dallas corridor, vertical) */}
    <line x1="182" y1="20" x2="182" y2="285" stroke="#cbd5e1" strokeWidth="3.5" />
    {/* US-75  (Richardson/Plano corridor, vertical) */}
    <line x1="262" y1="20" x2="262" y2="230" stroke="#cbd5e1" strokeWidth="2.5" />
    {/* I-635 LBJ  (horizontal arc across N Dallas) */}
    <path
      d="M 88,128 Q 182,100 308,130"
      stroke="#cbd5e1"
      strokeWidth="2.5"
      fill="none"
    />
    {/* SH-114  (E-W, through Irving/Las Colinas) */}
    <path
      d="M 20,162 L 148,162 L 230,145"
      stroke="#cbd5e1"
      strokeWidth="2"
      fill="none"
    />
    {/* I-30  (E-W through Dallas south) */}
    <line x1="20" y1="222" x2="355" y2="212" stroke="#cbd5e1" strokeWidth="3" />

    {/* ── Road labels ── */}
    <text x="58" y="18" fontSize="8" fill="#94a3b8" fontWeight="bold">I-35W</text>
    <text x="172" y="18" fontSize="8" fill="#94a3b8" fontWeight="bold">I-35E</text>
    <text x="253" y="18" fontSize="8" fill="#94a3b8" fontWeight="bold">US-75</text>
    <text x="22" y="210" fontSize="8" fill="#94a3b8" fontWeight="bold">I-30</text>
    <text x="172" y="98" fontSize="8" fill="#94a3b8" fontWeight="bold">I-635</text>

    {/* ── Secondary cities (gray) ── */}
    {/* Fort Worth */}
    <circle cx="68" cy="185" r="7" fill="#94a3b8" />
    <text x="15" y="182" fontSize="10" fill="#64748b" fontWeight="600">Ft Worth</text>

    {/* Arlington */}
    <circle cx="128" cy="225" r="6" fill="#94a3b8" />
    <text x="100" y="242" fontSize="9" fill="#64748b">Arlington</text>

    {/* Garland */}
    <circle cx="308" cy="188" r="6" fill="#94a3b8" />
    <text x="315" y="186" fontSize="9" fill="#64748b">Garland</text>

    {/* Frisco */}
    <circle cx="228" cy="42" r="5" fill="#94a3b8" />
    <text x="235" y="40" fontSize="9" fill="#64748b">Frisco</text>

    {/* ── Korean community cities (teal, prominent) ── */}
    {/* Carrollton — K-Town */}
    <circle cx="168" cy="112" r="12" fill="#0f766e" opacity="0.9" />
    <circle cx="168" cy="112" r="6" fill="white" />
    <text x="130" y="102" fontSize="11" fill="#0f766e" fontWeight="bold">Carrollton</text>
    <text x="136" y="115" fontSize="9" fill="#0d9488">(K-Town)</text>

    {/* Plano */}
    <circle cx="262" cy="78" r="12" fill="#0f766e" opacity="0.9" />
    <circle cx="262" cy="78" r="6" fill="white" />
    <text x="272" y="74" fontSize="11" fill="#0f766e" fontWeight="bold">Plano</text>

    {/* Irving */}
    <circle cx="148" cy="162" r="12" fill="#0f766e" opacity="0.9" />
    <circle cx="148" cy="162" r="6" fill="white" />
    <text x="115" y="158" fontSize="11" fill="#0f766e" fontWeight="bold" textAnchor="end">Irving</text>

    {/* Dallas */}
    <circle cx="235" cy="188" r="14" fill="#0f766e" />
    <circle cx="235" cy="188" r="7" fill="white" />
    <text x="248" y="185" fontSize="12" fill="#0f766e" fontWeight="bold">Dallas</text>

    {/* Richardson */}
    <circle cx="262" cy="128" r="9" fill="#0f766e" opacity="0.75" />
    <circle cx="262" cy="128" r="4.5" fill="white" />
    <text x="272" y="126" fontSize="10" fill="#0f766e" fontWeight="600">Richardson</text>

    {/* ── Map label ── */}
    <text
      x="190"
      y="268"
      fontSize="12"
      fill="#0f766e"
      fontWeight="bold"
      textAnchor="middle"
      opacity="0.55"
    >
      KDS Dallas Service Area
    </text>
    <text
      x="190"
      y="283"
      fontSize="9"
      fill="#0f766e"
      textAnchor="middle"
      opacity="0.4"
    >
      Korean Doctor Services @ DFW
    </text>
  </svg>
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
      <section className="bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 rounded-2xl text-white px-6 md:px-12 py-10 md:py-16 shadow-xl">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-5 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse"></span>
            온라인 예약 가능
          </div>
          <div className="mb-4">
            <p className="text-teal-300 text-xs md:text-sm font-semibold tracking-widest uppercase mb-3">Korean Doctor Services @ Dallas</p>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-none tracking-tight">
              KDS<span className="text-teal-300">.</span>Dallas
            </h1>
            <p className="text-teal-200 text-base md:text-xl font-semibold mt-3">
              온라인 진료 예약 서비스
            </p>
          </div>
          <p className="text-teal-100 text-sm md:text-base mb-3 leading-relaxed">
            달라스 지역의 한인 의사 선생님과 편리하게 온라인으로 진료 예약을 하세요.
          </p>
          <p className="text-teal-200/70 text-xs md:text-sm mb-8">
            Your trusted Korean medical network in Dallas–Fort Worth.
          </p>
          <button
            onClick={onReserve}
            className="inline-flex items-center gap-2 bg-white text-teal-700 font-bold text-base md:text-lg px-8 md:px-10 py-3 md:py-4 rounded-xl shadow-lg hover:bg-teal-50 hover:shadow-xl transition-all active:scale-95"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
              <line x1="12" y1="14" x2="12" y2="18" />
              <line x1="10" y1="16" x2="14" y2="16" />
            </svg>
            지금 예약하기
          </button>
        </div>
      </section>

      {/* ── DFW Map + Doctors ── */}
      <section>


        <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
          {/* DFW Map */}
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-slate-100">
            <DallasMap />
            <div className="flex items-center justify-center gap-5 mt-3 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-teal-600 inline-block"></span>
                KDS 서비스 지역
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-slate-400 inline-block"></span>
                주변 도시
              </span>
            </div>
          </div>

          {/* Doctor Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {doctors.map((doc) => (
              <div
                key={doc.name}
                className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md hover:border-teal-200 transition-all flex flex-col items-center text-center gap-2"
              >
                <DoctorAvatar initials={doc.initials} color={doc.color} />
                <div>
                  <p className="font-bold text-slate-800 text-sm md:text-base">
                    {doc.name}
                  </p>
                  <p className="text-teal-600 text-xs md:text-sm font-medium">
                    {doc.specialty}
                  </p>
                </div>

   

     

                <div className="mt-1 w-full flex gap-2">
                  <button
                    onClick={() => setSelectedDoctor(doc)}
                    className="flex-1 text-xs font-semibold text-slate-600 border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-50 transition-colors"
                  >
                    상세보기
                  </button>
                  <button
                    onClick={() => onReserveWithDoctor ? onReserveWithDoctor(doc) : onReserve()}
                    className="flex-1 text-xs font-semibold text-teal-600 border border-teal-300 rounded-lg px-3 py-1.5 hover:bg-teal-50 transition-colors"
                  >
                    예약하기
                  </button>
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
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            ),
            title: "24/7 온라인 예약",
            sub: "언제 어디서나 예약 가능",
            desc: "밤낮 구분 없이 편하게 예약하세요.",
          },
          {
            icon: (
              <svg className="w-7 h-7 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            ),
            title: "한국어 · 영어",
            sub: "이중 언어 지원",
            desc: "모국어로 편하게 진료 받으세요.",
          },
          {
            icon: (
              <svg className="w-7 h-7 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            ),
            title: "HIPAA 보안",
            sub: "개인정보 완벽 보호",
            desc: "최고 수준의 의료 보안 시스템.",
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
          지금 바로 예약하세요
        </h2>
        <p className="text-slate-400 text-sm md:text-base mb-6">
          원하시는 날짜와 시간을 선택하고 간단하게 예약 완료!
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
