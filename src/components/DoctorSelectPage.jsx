import { doctors } from "../data/doctors";

const DoctorSelectPage = ({ onSelect }) => (
  <div className="space-y-5">
    {/* Header */}
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex items-center gap-4">
      <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-3 shadow-md">
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
        </svg>
      </div>
      <div>
        <h2 className="text-base md:text-lg font-bold text-slate-800">의사 선생님 선택</h2>
        <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
          예약할 의사 선생님을 먼저 선택해주세요.
        </p>
      </div>
    </div>

    {/* Doctor cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {doctors.map((doc) => (
        <div
          key={doc.name}
          className="bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all overflow-hidden"
        >
          {/* Color strip */}
          <div className={`h-1.5 w-full ${doc.color}`} />

          <div className="p-5">
            {/* Avatar + name */}
            <div className="flex items-start gap-4 mb-5">
              <div className="relative shrink-0">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-md ring-2 ring-white ${doc.color}`}>
                  {doc.initials}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-400 border-2 border-white rounded-full shadow-sm" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-800 text-base leading-tight">{doc.name}</p>
                <span className="inline-block mt-1 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full">
                  {doc.specialty}
                </span>
                <div className="flex items-center gap-1 mt-1.5">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} className={`w-3 h-3 ${i <= 4 ? "text-amber-400" : "text-amber-200"}`} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                  <span className="text-[10px] text-slate-500 font-medium ml-0.5">4.9</span>
                </div>
              </div>
            </div>

            {/* Contact info */}
            <div className="space-y-2 mb-5">
              <a href={`tel:${doc.phone}`} className="flex items-center gap-2.5 text-sm text-slate-500 hover:text-blue-600 transition-colors">
                <div className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <span className="font-medium">{doc.phoneDisplay}</span>
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(doc.address)}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-2.5 text-sm text-slate-500 hover:text-blue-600 transition-colors"
              >
                <div className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <span className="leading-snug text-xs">{doc.address}</span>
              </a>
            </div>

            {/* Select button */}
            <button
              onClick={() => onSelect(doc)}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 rounded-xl transition-all active:scale-[0.98] shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm"
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
