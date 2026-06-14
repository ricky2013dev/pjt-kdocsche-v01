import { useState, useEffect } from "react";
import AlertModal from "./common/AlertModal";

const STATUS_CONFIG = {
  pending:   { label: "확인 대기중", cls: "bg-amber-50 text-amber-600 border border-amber-200" },
  confirmed: { label: "예약 확정",   cls: "bg-blue-50 text-blue-600 border border-blue-200" },
  cancelled: { label: "취소됨",      cls: "bg-slate-100 text-slate-400 border border-slate-200" },
};

// ── Verification screen ──────────────────────────────────────
const VerifyScreen = ({ onVerify }) => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Resend flow
  const [showResend, setShowResend] = useState(false);
  const [resendEmail, setResendEmail] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [resendModal, setResendModal] = useState(false);
  const [resendError, setResendError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !code) { setError("이메일과 확인 코드를 모두 입력해주세요."); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError("올바른 이메일 주소를 입력해주세요."); return; }
    if (code.length !== 6) { setError("확인 코드는 6자리입니다."); return; }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const result = onVerify(email.trim(), code.trim());
      if (!result) setError("이메일 또는 확인 코드가 올바르지 않습니다. 예약 완료 화면의 코드를 확인해주세요.");
    }, 600);
  };

  const handleResend = () => {
    const target = resendEmail.trim() || email.trim();
    if (!target) { setResendError("이메일 주소를 입력해주세요."); return; }
    if (!/\S+@\S+\.\S+/.test(target)) { setResendError("올바른 이메일 주소를 입력해주세요."); return; }
    setResendError("");
    setResendLoading(true);
    setTimeout(() => {
      setResendLoading(false);
      setShowResend(false);
      setResendEmail("");
      setResendModal(true);
    }, 800);
  };

  const inputCls =
    "w-full border border-slate-200 rounded-xl px-3.5 py-3 text-slate-800 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder:text-slate-400";

  return (
    <div className="max-w-md mx-auto">
      {/* Resend success modal */}
      <AlertModal
        open={resendModal}
        type="success"
        title="이메일을 확인해주세요"
        message={"입력하신 이메일로 확인 코드가 재전송되었습니다.\n메일함(스팸함 포함)을 확인해주세요."}
        confirmLabel="확인"
        onConfirm={() => setResendModal(false)}
        onCancel={() => setResendModal(false)}
      />

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-6 py-8 text-white text-center">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
              <line x1="12" y1="14" x2="12" y2="18"/><line x1="10" y1="16" x2="14" y2="16"/>
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-1">나의 예약 확인</h2>
          <p className="text-blue-100 text-sm">예약 시 사용한 이메일과<br />확인 코드를 입력해주세요</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              이메일 <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="예약 시 입력한 이메일"
              className={inputCls}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-medium text-slate-600">
                확인 코드 (6자리) <span className="text-red-400">*</span>
              </label>
              <button
                type="button"
                onClick={() => { setShowResend(v => !v); setResendEmail(email); setResendError(""); }}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium underline underline-offset-2 transition-colors"
              >
                코드를 잊으셨나요?
              </button>
            </div>
            <input
              type="text"
              value={code}
              onChange={e => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="000000"
              className={`${inputCls} text-center text-xl font-bold tracking-[0.3em]`}
              maxLength={6}
            />
            <p className="text-xs text-slate-400 mt-1.5">예약 완료 화면에서 발급된 6자리 코드</p>
          </div>

          {/* ── Resend panel ── */}
          {showResend && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <p className="text-sm font-semibold text-blue-700">확인 코드 재전송</p>
              </div>
              <p className="text-xs text-blue-600">이메일로 확인 코드를 다시 보내드립니다.</p>
              <input
                type="email"
                value={resendEmail}
                onChange={e => setResendEmail(e.target.value)}
                placeholder="이메일 주소 입력"
                className="w-full border border-blue-200 rounded-xl px-3.5 py-2.5 text-slate-800 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors placeholder:text-slate-400"
              />
              {resendError && <p className="text-xs text-red-500">{resendError}</p>}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => { setShowResend(false); setResendError(""); }}
                  className="flex-1 text-xs font-semibold text-slate-500 border border-slate-200 rounded-lg py-2 hover:bg-slate-50 transition-colors"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendLoading}
                  className="flex-1 text-xs font-bold text-white bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 rounded-lg py-2 transition-colors flex items-center justify-center gap-1.5"
                >
                  {resendLoading ? (
                    <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                  ) : (
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  )}
                  {resendLoading ? "전송 중..." : "재전송"}
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-start gap-2">
              <svg className="w-4 h-4 text-red-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {loading ? (
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
              </svg>
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            )}
            {loading ? "확인 중..." : "예약 조회"}
          </button>
        </form>

        <div className="px-6 pb-6">
          <div className="bg-slate-50 rounded-xl p-4 flex items-start gap-3">
            <svg className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <div>
              <p className="text-xs text-slate-500 leading-relaxed">
                확인 코드는 예약 완료 시 화면에 표시됩니다.
              </p>
              <p className="text-xs text-slate-400 mt-1">
                🧪  <span className="font-mono font-semibold text-slate-600">test@test.com</span> / <span className="font-mono font-semibold text-slate-600">123456</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Main Component ───────────────────────────────────────────
const MyAppointmentsPage = ({ appointments, onEdit, onCancel, onReserve }) => {
  const [verified, setVerified] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [calView, setCalView] = useState("monthly");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [cancelTarget, setCancelTarget] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleVerify = (email, code) => {
    const match = appointments.find(
      a => a.patient?.email?.toLowerCase() === email.toLowerCase() && a.confirmCode === code
    );
    if (match) {
      setVerifiedEmail(email);
      setVerified(true);
      return true;
    }
    return false;
  };

  // Filter to this user's appointments
  const myAppts = verified
    ? appointments.filter(a => a.patient?.email?.toLowerCase() === verifiedEmail.toLowerCase())
    : [];

  // Map: dateStr → appointments[]
  const apptDateMap = {};
  myAppts.filter(a => a.status !== "cancelled").forEach(a => {
    const d = a.slot?.date;
    if (d) { if (!apptDateMap[d]) apptDateMap[d] = []; apptDateMap[d].push(a); }
  });

  const changeNav = (dir) => {
    const d = new Date(currentMonth);
    if (calView === "weekly") d.setDate(d.getDate() + dir * 7);
    else d.setMonth(d.getMonth() + dir);
    setCurrentMonth(d);
  };

  const scrollToAppt = (id) => {
    const el = document.getElementById(`appt-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // ── Weekly calendar ──
  const renderWeekly = () => {
    const weekStart = new Date(currentMonth);
    weekStart.setHours(0, 0, 0, 0);
    const today = new Date(); today.setHours(0, 0, 0, 0);

    return (
      <div className="grid grid-cols-7 gap-1.5 md:gap-2">
        {Array.from({ length: 7 }, (_, i) => {
          const d = new Date(weekStart);
          d.setDate(weekStart.getDate() + i);
          const dateStr = d.toDateString();
          const isToday = d.getTime() === today.getTime();
          const hasAppt = !!apptDateMap[dateStr]?.length;
          const isSun = d.getDay() === 0;
          const isPast = d < today;

          return (
            <button
              key={i}
              onClick={() => hasAppt && scrollToAppt(apptDateMap[dateStr][0].id)}
              className={`rounded-xl p-2 md:p-3 text-center transition-all border ${
                isToday ? "border-blue-400 bg-blue-50"
                : hasAppt ? "border-blue-200 bg-white hover:bg-blue-50 cursor-pointer"
                : "border-slate-100 bg-white"
              } ${(isSun || isPast) ? "opacity-40" : ""}`}
            >
              <p className={`text-[10px] md:text-xs font-semibold uppercase tracking-wide ${isToday ? "text-blue-600" : "text-slate-400"}`}>
                {d.toLocaleDateString("en-US", { weekday: isMobile ? "narrow" : "short" })}
              </p>
              <p className={`text-base md:text-xl font-bold mt-0.5 ${isToday ? "text-blue-700" : "text-slate-700"}`}>
                {d.getDate()}
              </p>
              {hasAppt ? (
                <div className="flex justify-center gap-0.5 mt-1.5">
                  {apptDateMap[dateStr].slice(0, 2).map((_, idx) => (
                    <span key={idx} className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
                  ))}
                </div>
              ) : <div className="h-3.5 mt-1.5" />}
            </button>
          );
        })}
      </div>
    );
  };

  // ── Monthly calendar ──
  const renderMonthly = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDow = new Date(year, month, 1).getDay();
    const today = new Date(); today.setHours(0, 0, 0, 0);

    const cells = [];
    for (let i = 0; i < startDow; i++) cells.push(<div key={`e-${i}`} />);

    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(year, month, day); d.setHours(0, 0, 0, 0);
      const dateStr = d.toDateString();
      const isToday = d.getTime() === today.getTime();
      const appts = apptDateMap[dateStr] || [];
      const hasAppt = appts.length > 0;
      const isSun = d.getDay() === 0;
      const isPast = d < today;

      cells.push(
        <button
          key={day}
          onClick={() => hasAppt && scrollToAppt(appts[0].id)}
          className={`rounded-xl p-1.5 md:p-2 text-center min-h-[48px] md:min-h-[60px] flex flex-col items-center justify-start pt-2 transition-all border ${
            isToday ? "border-blue-400 bg-blue-50"
            : hasAppt ? "border-blue-200 bg-white hover:bg-blue-50 cursor-pointer"
            : "border-transparent bg-white"
          } ${(isSun || isPast) ? "opacity-40" : ""}`}
        >
          <p className={`text-xs md:text-sm font-bold ${isToday ? "text-blue-600" : "text-slate-600"}`}>{day}</p>
          {hasAppt && (
            <div className="flex gap-0.5 mt-1">
              {appts.slice(0, 2).map((_, idx) => (
                <span key={idx} className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
              ))}
            </div>
          )}
        </button>
      );
    }
    return cells;
  };

  const rangeLabel = calView === "weekly"
    ? `${currentMonth.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${
        new Date(currentMonth.getTime() + 6 * 86400000).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
      }`
    : currentMonth.toLocaleDateString("en-US", { month: isMobile ? "short" : "long", year: "numeric" });

  if (!verified) {
    return <VerifyScreen onVerify={handleVerify} />;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">

      {/* Cancel confirmation modal */}
      <AlertModal
        open={!!cancelTarget}
        type="error"
        title="예약을 취소하시겠습니까?"
        message={`${cancelTarget?.doctor?.name} 선생님\n${cancelTarget?.slot?.datetime}\n\n취소 후에는 되돌릴 수 없습니다.`}
        confirmLabel="예약 취소"
        cancelLabel="돌아가기"
        onConfirm={() => { onCancel(cancelTarget.id); setCancelTarget(null); }}
        onCancel={() => setCancelTarget(null)}
      />

      {/* Edit confirmation modal */}
      <AlertModal
        open={!!editTarget}
        type="info"
        title="일정을 수정하시겠습니까?"
        message={`${editTarget?.doctor?.name} 선생님 예약 일정을 변경합니다.\n새로운 날짜와 시간을 선택하게 됩니다.`}
        confirmLabel="일정 수정"
        cancelLabel="취소"
        onConfirm={() => { onEdit(editTarget); setEditTarget(null); }}
        onCancel={() => setEditTarget(null)}
      />

      {/* Verified user chip */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-3 py-1.5">
          <svg className="w-3.5 h-3.5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
          <span className="text-xs font-semibold text-blue-700">{verifiedEmail}</span>
        </div>
        <button
          onClick={() => { setVerified(false); setVerifiedEmail(""); }}
          className="text-xs text-slate-400 hover:text-slate-600 font-medium transition-colors"
        >
          로그아웃
        </button>
      </div>

      {/* ── Calendar card ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          {/* View toggle */}
          <div className="inline-flex bg-slate-100 rounded-xl p-1 gap-1">
            {["weekly", "monthly"].map(v => (
              <button
                key={v}
                onClick={() => setCalView(v)}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                  calView === v ? "bg-white text-blue-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {v === "weekly" ? "주간" : "월간"}
              </button>
            ))}
          </div>

          {/* Nav */}
          <div className="flex items-center gap-2">
            <button onClick={() => changeNav(-1)} className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-blue-600 transition-all shadow-sm">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <span className="font-bold text-slate-700 text-sm min-w-[160px] md:min-w-[220px] text-center">{rangeLabel}</span>
            <button onClick={() => changeNav(1)} className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-blue-600 transition-all shadow-sm">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>

        {calView === "monthly" ? (
          <>
            <div className="grid grid-cols-7 mb-2 text-center text-xs font-bold text-slate-400 uppercase tracking-wide">
              {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
                <div key={d} className="py-1">{isMobile ? d[0] : d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 md:gap-1.5">{renderMonthly()}</div>
          </>
        ) : renderWeekly()}

        <div className="mt-4 flex items-center justify-center gap-6 text-xs text-slate-500">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
            나의 예약
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-100 border border-blue-400 inline-block" />
            오늘
          </span>
        </div>
      </div>

      {/* ── Appointment list ── */}
      {myAppts.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-10 text-center">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </div>
          <p className="text-slate-500 font-semibold mb-1">예약 내역이 없습니다</p>
          <p className="text-slate-400 text-sm mb-5">아직 예약하신 진료 일정이 없습니다.</p>
          <button
            onClick={onReserve}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-all active:scale-95"
          >
            지금 예약하기 →
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="px-1">
            <h3 className="text-sm font-bold text-slate-600">
              전체 예약 <span className="text-blue-600">{myAppts.length}건</span>
            </h3>
          </div>

          {myAppts.map(appt => {
            const statusCfg = STATUS_CONFIG[appt.status] || STATUS_CONFIG.pending;
            const isCancelled = appt.status === "cancelled";

            return (
              <div
                id={`appt-${appt.id}`}
                key={appt.id}
                className={`bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden transition-all ${
                  isCancelled ? "opacity-55" : "hover:shadow-md hover:border-blue-100"
                }`}
              >
                {/* Doctor color strip */}
                <div className={`h-1 w-full ${appt.doctor?.color || "bg-blue-500"}`} />

                <div className="p-4 md:p-5">
                  <div className="flex items-start gap-3">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0 ${appt.doctor?.color || "bg-blue-500"}`}>
                      {appt.doctor?.initials}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <div>
                          <p className="font-bold text-slate-800 text-sm">{appt.doctor?.name}</p>
                          <p className="text-blue-600 text-xs font-medium">{appt.doctor?.specialty} · {appt.doctor?.city}</p>
                        </div>
                        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${statusCfg.cls}`}>
                          {statusCfg.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 mt-2.5">
                        <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2"/>
                          <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
                          <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        <p className="text-xs text-slate-700 font-semibold">{appt.slot?.datetime}</p>
                      </div>

                      <div className="flex items-center gap-1.5 mt-1">
                        <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                        </svg>
                        <p className="text-xs text-slate-500">{appt.patient?.firstName} {appt.patient?.lastName}</p>
                      </div>
                    </div>
                  </div>

                  {!isCancelled && (
                    <div className="flex gap-2 mt-4 pt-3 border-t border-slate-100">
                      <button
                        onClick={() => setEditTarget(appt)}
                        className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-blue-600 border border-blue-200 rounded-xl py-2.5 hover:bg-blue-50 transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                        일정 수정
                      </button>
                      <button
                        onClick={() => setCancelTarget(appt)}
                        className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-red-500 border border-red-200 rounded-xl py-2.5 hover:bg-red-50 transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                        </svg>
                        예약 취소
                      </button>
                    </div>
                  )}

                  {isCancelled && (
                    <p className="text-xs text-slate-400 text-center mt-3 pt-3 border-t border-slate-100">
                      취소된 예약입니다
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyAppointmentsPage;
