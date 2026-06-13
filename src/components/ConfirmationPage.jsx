const Row = ({ label, value, highlight }) => (
  <div className="flex items-start justify-between gap-4 py-3.5 border-b border-slate-100 last:border-0">
    <span className="text-sm font-medium text-slate-500 shrink-0">{label}</span>
    <span className={`text-sm font-semibold text-right break-all ${highlight ? "text-amber-500" : "text-slate-800"}`}>
      {value}
    </span>
  </div>
);

const ConfirmationPage = ({ selectedSlot, patientData, selectedDoctor, confirmCode, onReset }) => (
  <div className="max-w-lg mx-auto space-y-4">

    {/* ── Success card ── */}
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center">
      {/* Check icon */}
      <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-5">
        <svg className="w-8 h-8 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">감사합니다!</h2>
      <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-1">
        예약 요청이 성공적으로 접수되었습니다.
      </p>
      <p className="text-slate-400 text-sm mb-6">
        확인 후 예약 일정을 안내해 드리겠습니다.
      </p>

      {/* Confirmation code */}
      {confirmCode && (
        <div className="bg-teal-50 border border-teal-200 rounded-2xl p-5">
          <p className="text-xs font-semibold text-teal-600 mb-2 uppercase tracking-wide">예약 확인 코드</p>
          <p className="text-3xl font-bold text-teal-700 tracking-[0.4em] mb-3">{confirmCode}</p>
          <p className="text-xs text-teal-600/80 leading-relaxed">
            이 코드를 저장해두세요.<br />
            <span className="font-semibold">나의 예약확인</span> 메뉴에서 이메일과 함께 사용합니다.
          </p>
        </div>
      )}
    </div>

    {/* ── Doctor summary (if selected) ── */}
    {selectedDoctor && (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-bold shrink-0 ${selectedDoctor.color}`}>
          {selectedDoctor.initials}
        </div>
        <div>
          <p className="text-xs text-slate-400 font-medium">담당 의사</p>
          <p className="font-bold text-slate-800">{selectedDoctor.name}</p>
          <p className="text-teal-600 text-xs font-medium">{selectedDoctor.specialty} · {selectedDoctor.city}</p>
        </div>
      </div>
    )}

    {/* ── Appointment summary ── */}
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 md:p-6">
      <h3 className="text-base font-bold text-slate-700 mb-1 flex items-center gap-2">
        <span className="w-1 h-5 rounded-full bg-teal-500 inline-block" />
        예약 요약
      </h3>
      <p className="text-xs text-slate-400 ml-3 mb-4">Appointment Summary</p>

      <div>
        <Row label="환자 이름" value={`${patientData.firstName} ${patientData.lastName}`} />
        <Row label="예약 일시" value={selectedSlot?.datetime} />
        <Row label="이메일" value={patientData.email} />
        <Row label="전화번호" value={patientData.phone} />
        <Row label="보험" value={`${patientData.insuranceProvider} (${patientData.policyId})`} />
        <Row label="상태" value="확인 대기 중" highlight />
      </div>
    </div>

    {/* ── CTA ── */}
    <button
      onClick={onReset}
      className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 rounded-2xl shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm md:text-base"
    >
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
      새 예약 하기
    </button>
  </div>
);

export default ConfirmationPage;
