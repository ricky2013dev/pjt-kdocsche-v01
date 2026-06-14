import { useEffect } from "react";

const Section = ({ title, children }) => (
  <div>
    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
      <span className="w-1 h-4 rounded-full bg-blue-500 inline-block"></span>
      {title}
    </h3>
    {children}
  </div>
);

const DoctorModal = ({ doctor, onClose, onReserve }) => {
  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal panel */}
      <div className="relative bg-white w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[88vh] overflow-hidden">

        {/* ── Profile header ── */}
        <div className={`${doctor.color} px-6 pt-6 pb-8 text-white relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            aria-label="닫기"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl bg-white/25 flex items-center justify-center text-3xl font-bold shadow-lg shrink-0">
              {doctor.initials}
            </div>
            <div>
              <p className="text-white/70 text-xs font-medium uppercase tracking-wider mb-0.5">
                {doctor.city}
              </p>
              <h2 className="text-xl font-bold">{doctor.name}</h2>
              <span className="inline-block bg-white/20 text-white text-xs font-semibold px-2.5 py-1 rounded-full mt-1">
                {doctor.specialty}
              </span>
            </div>
          </div>

          {/* Contact row */}
          <div className="flex gap-3 mt-4">
            <a
              href={`tel:${doctor.phone}`}
              className="flex-1 flex items-center justify-center gap-1.5 bg-white/15 hover:bg-white/25 transition-colors rounded-xl py-2 text-xs font-semibold"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {doctor.phoneDisplay}
            </a>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(doctor.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 bg-white/15 hover:bg-white/25 transition-colors rounded-xl py-2 text-xs font-semibold"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              지도 보기
            </a>
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div className="overflow-y-auto flex-1 px-6 py-6 space-y-7">

          {/* Bio */}
          <Section title="소개">
            <p className="text-slate-600 text-sm leading-relaxed">{doctor.bio}</p>
          </Section>

          {/* Education */}
          <Section title="학력">
            <ol className="space-y-3">
              {doctor.education.map((item) => (
                <li key={item.year} className="flex gap-3 items-start">
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md shrink-0 mt-0.5">
                    {item.year}
                  </span>
                  <span className="text-sm text-slate-700">{item.title}</span>
                </li>
              ))}
            </ol>
          </Section>

          {/* Career */}
          <Section title="경력">
            <ol className="relative border-l-2 border-blue-100 ml-2 space-y-4">
              {doctor.career.map((item) => (
                <li key={item.year} className="pl-5 relative">
                  <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-sm"></span>
                  <p className="text-xs text-blue-600 font-semibold">{item.year}</p>
                  <p className="text-sm text-slate-700 mt-0.5">{item.title}</p>
                </li>
              ))}
            </ol>
          </Section>

          {/* Services */}
          <Section title="진료항목">
            <ul className="flex flex-wrap gap-2">
              {doctor.services.map((svc) => (
                <li
                  key={svc}
                  className="text-xs bg-slate-50 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-full"
                >
                  {svc}
                </li>
              ))}
            </ul>
          </Section>
        </div>

        {/* ── Footer CTA ── */}
        <div className="px-6 py-4 border-t border-slate-100 bg-white">
          <button
            onClick={() => { onClose(); onReserve(); }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors text-sm shadow-sm active:scale-[0.98]"
          >
            이 의사 선생님으로 예약하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorModal;
