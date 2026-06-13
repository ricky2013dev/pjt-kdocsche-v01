import { doctors } from "../data/doctors";

const DoctorSelectPage = ({ onSelect }) => (
  <div className="space-y-6">
    {/* Header */}
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 md:p-7 flex items-center gap-4">
      <div className="bg-teal-50 rounded-xl p-3">
        <svg className="w-7 h-7 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
        </svg>
      </div>
      <div>
        <h2 className="text-lg md:text-xl font-bold text-slate-800">의사 선생님 선택</h2>
        <p className="text-sm text-slate-500 mt-0.5">예약할 의사 선생님을 먼저 선택해주세요.</p>
      </div>
    </div>

    {/* Doctor cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {doctors.map((doc) => (
        <div
          key={doc.name}
          className="bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-teal-200 hover:shadow-md transition-all overflow-hidden"
        >
          {/* Card top accent */}
          <div className={`h-1.5 w-full ${doc.color}`} />

          <div className="p-5 md:p-6">
            {/* Avatar + name */}
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-sm ${doc.color}`}>
                {doc.initials}
              </div>
              <div>
                <p className="font-bold text-slate-800 text-base">{doc.name}</p>
                <span className="inline-block mt-0.5 text-xs font-semibold text-teal-600 bg-teal-50 border border-teal-100 px-2 py-0.5 rounded-full">
                  {doc.specialty}
                </span>
              </div>
            </div>

            {/* Contact info */}
            <div className="space-y-2 mb-5">
              <a
                href={`tel:${doc.phone}`}
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-teal-600 transition-colors"
              >
                <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                {doc.phoneDisplay}
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(doc.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-sm text-slate-500 hover:text-teal-600 transition-colors"
              >
                <svg className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <span className="leading-snug">{doc.address}</span>
              </a>
            </div>

            {/* Select button */}
            <button
              onClick={() => onSelect(doc)}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl transition-all active:scale-[0.98] shadow-sm flex items-center justify-center gap-2 text-sm"
            >
              이 선생님으로 예약하기
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default DoctorSelectPage;
