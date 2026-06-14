const Row = ({ label, value, highlight }) => (
  <div className="flex items-start justify-between gap-4 py-3 border-b border-slate-100 last:border-0">
    <span className="text-xs font-semibold text-slate-500 shrink-0 uppercase tracking-wide">{label}</span>
    <span className={`text-sm font-bold text-right break-all ${highlight ? "text-amber-500" : "text-slate-800"}`}>
      {value}
    </span>
  </div>
);

const ConfirmationPage = ({ selectedSlot, patientData, selectedDoctor, confirmCode, onReset }) => (
  <div className="max-w-lg mx-auto space-y-4">

    {/* ── Success card ── */}
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-7 text-center">
      {/* Animated check */}
      <div className="relative w-20 h-20 mx-auto mb-5">
        <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-30" />
        <div className="relative w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
      </div>

      <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-2">예약 완료!</h2>
      <p className="text-slate-500 text-sm leading-relaxed mb-1">
        예약 요청이 성공적으로 접수되었습니다.
      </p>
      <p className="text-slate-400 text-xs mb-6">
        확인 후 예약 일정을 안내해 드리겠습니다.
      </p>

      {/* Confirmation code */}
      {confirmCode && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-5">
          <div className="flex items-center justify-center gap-2 mb-2">
            <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">예약 확인 코드</p>
          </div>
          <p className="text-4xl font-black text-blue-700 tracking-[0.5em] mb-3">{confirmCode}</p>
          <p className="text-xs text-blue-500/80 leading-relaxed">
            이 코드를 저장해두세요.<br />
            <span className="font-bold">나의 예약확인</span> 메뉴에서 이메일과 함께 사용합니다.
          </p>
        </div>
      )}
    </div>

    {/* ── Doctor summary ── */}
    {selectedDoctor && (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 flex items-center gap-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white text-lg font-black shrink-0 shadow-md ${selectedDoctor.color}`}>
          {selectedDoctor.initials}
        </div>
        <div className="flex-1">
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide mb-0.5">담당 의사</p>
          <p className="font-bold text-slate-800 text-sm">{selectedDoctor.name}</p>
          <p className="text-blue-600 text-xs font-semibold mt-0.5">{selectedDoctor.specialty} · {selectedDoctor.city}</p>
        </div>
        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
          <svg className="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
      </div>
    )}

    {/* ── Appointment summary ── */}
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
        <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
        </svg>
        예약 요약
      </h3>
      <div>
        <Row label="환자 이름"  value={`${patientData.firstName} ${patientData.lastName}`} />
        <Row label="예약 일시"  value={selectedSlot?.datetime} />
        <Row label="이메일"     value={patientData.email} />
        <Row label="전화번호"   value={patientData.phone} />
        <Row label="보험"       value={`${patientData.insuranceProvider} (${patientData.policyId})`} />
        <Row label="상태"       value="확인 대기 중" highlight />
      </div>
    </div>

    {/* ── CTA ── */}
    <button
      onClick={onReset}
      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 rounded-2xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2.5 text-sm md:text-base"
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
      홈으로 돌아가기
    </button>
  </div>
);

export default ConfirmationPage;
