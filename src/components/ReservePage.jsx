import { useState } from "react";
import { dummyPatientData } from "../data/dummyPatientData";
import AlertModal from "./common/AlertModal";

// ── Shared primitives ────────────────────────────────────────
const Label = ({ children, required }) => (
  <label className="block text-sm font-medium text-slate-600 mb-1.5">
    {children}
    {required && <span className="text-red-400 ml-0.5">*</span>}
  </label>
);

const Field = ({ label, required, children }) => (
  <div>
    {label && <Label required={required}>{label}</Label>}
    {children}
  </div>
);

const inputCls =
  "w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-slate-400 shadow-sm hover:border-slate-300";

const SectionCard = ({ title, children }) => (
  <div className="bg-white rounded-2xl border border-slate-100 p-4 md:p-6 shadow-sm">
    {title && (
      <h3 className="text-sm md:text-base font-bold text-slate-800 mb-4 flex items-center gap-2.5">
        <span className="w-1 h-5 rounded-full bg-gradient-to-b from-blue-600 to-indigo-600 inline-block" />
        {title}
      </h3>
    )}
    {children}
  </div>
);

const CheckItem = ({ id, name, checked, onChange, label, bold }) => (
  <label
    htmlFor={id}
    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
      checked
        ? "bg-blue-50 border-blue-200"
        : "bg-white border-slate-200 hover:border-blue-200"
    }`}
  >
    <div className="relative flex-shrink-0 mt-0.5">
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <div
        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
          checked ? "bg-blue-600 border-blue-600" : "border-slate-300 bg-white"
        }`}
      >
        {checked && (
          <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
    </div>
    <span className={`text-sm leading-snug ${bold ? "font-semibold text-slate-800" : "text-slate-600"}`}>
      {label}
    </span>
  </label>
);

// ── Date/Time Picker ─────────────────────────────────────────
const DateTimePicker = ({ selectedSlot, onSlotSelect }) => {
  const [isOpen, setIsOpen] = useState(!selectedSlot);
  const [pickerMonth, setPickerMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const year = pickerMonth.getFullYear();
  const month = pickerMonth.getMonth();
  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const getTimeSlots = (date) => {
    const dom = date.getDate();
    const pool = [
      { time: "9:00 AM",  available: true  },
      { time: "9:30 AM",  available: false },
      { time: "10:00 AM", available: true  },
      { time: "10:30 AM", available: false },
      { time: "11:00 AM", available: true  },
      { time: "2:00 PM",  available: true  },
      { time: "2:30 PM",  available: false },
      { time: "3:00 PM",  available: true  },
      { time: "3:30 PM",  available: true  },
      { time: "4:00 PM",  available: false },
    ];
    const count = 3 + (dom % 3);
    const start = dom % (pool.length - count);
    return pool.slice(start, start + count);
  };

  const handleTimeSelect = (timeSlot) => {
    if (!timeSlot.available || !selectedDate) return;
    const slot = {
      date: selectedDate.toDateString(),
      time: timeSlot.time,
      datetime: `${selectedDate.toLocaleDateString()} at ${timeSlot.time}`,
      available: true,
    };
    onSlotSelect(slot);
    setIsOpen(false);
  };

  const changeMonth = (dir) => {
    const d = new Date(pickerMonth);
    d.setMonth(d.getMonth() + dir);
    setPickerMonth(d);
    setSelectedDate(null);
  };

  const CalIcon = () => (
    <svg className="w-4 h-4 text-blue-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );

  if (!isOpen && selectedSlot) {
    return (
      <div
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-6 cursor-pointer hover:bg-blue-100 transition-colors group"
      >
        <CalIcon />
        <div className="flex-1 min-w-0">
          <p className="text-xs text-blue-600 font-medium">선택된 예약 시간</p>
          <p className="text-sm font-bold text-blue-800 truncate">{selectedSlot.datetime}</p>
        </div>
        <span className="shrink-0 text-xs font-semibold text-blue-600 border border-blue-200 rounded-lg px-3 py-1.5 bg-white group-hover:border-blue-300 transition-colors">
          변경
        </span>
      </div>
    );
  }

  const timeSlots = selectedDate ? getTimeSlots(selectedDate) : [];

  return (
    <div className="border border-blue-200 rounded-2xl bg-gradient-to-b from-blue-50 to-white p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-blue-800 flex items-center gap-2">
          <CalIcon />
          진료 일정 선택
          <span className="text-red-400">*</span>
        </h3>
        {selectedSlot && (
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-xs font-semibold text-slate-500 border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-white hover:text-blue-600 transition-all"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Month navigation */}
      <div className="flex items-center justify-between mb-3 bg-white rounded-xl px-4 py-2.5 border border-slate-100">
        <button
          type="button"
          onClick={() => changeMonth(-1)}
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <span className="text-sm font-bold text-slate-700">
          {pickerMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </span>
        <button
          type="button"
          onClick={() => changeMonth(1)}
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1.5 text-center">
        {["Su","Mo","Tu","We","Th","Fr","Sa"].map((d, i) => (
          <div key={d} className={`text-[10px] font-bold py-1 ${i === 0 ? "text-red-400" : "text-slate-400"}`}>{d}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1 mb-3">
        {Array.from({ length: firstDow }).map((_, i) => <div key={`e-${i}`} />)}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const d = new Date(year, month, day);
          d.setHours(0, 0, 0, 0);
          const isToday = d.getTime() === today.getTime();
          const isSun = d.getDay() === 0;
          const isPast = d < today;
          const isSelected = selectedDate && d.getTime() === selectedDate.getTime();
          const isDisabled = isSun || isPast;
          return (
            <button
              key={day}
              type="button"
              disabled={isDisabled}
              onClick={() => !isDisabled && setSelectedDate(d)}
              className={`py-1.5 rounded-lg text-xs font-semibold transition-all text-center ${
                isSelected
                  ? "bg-blue-600 text-white shadow-sm"
                  : isToday
                  ? "bg-blue-100 text-blue-700 ring-1 ring-blue-400"
                  : isDisabled
                  ? "text-slate-300 cursor-not-allowed"
                  : "bg-white hover:bg-blue-100 text-slate-700 hover:text-blue-700"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Time slots */}
      {selectedDate && (
        <div className="bg-white rounded-xl border border-slate-100 p-3">
          <p className="text-xs font-semibold text-slate-500 mb-2.5">
            {selectedDate.toLocaleDateString("ko-KR", { month: "long", day: "numeric" })} 예약 가능 시간
          </p>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
            {timeSlots.map((ts, i) => (
              <button
                key={i}
                type="button"
                disabled={!ts.available}
                onClick={() => handleTimeSelect(ts)}
                className={`py-3 rounded-xl text-xs font-bold transition-all ${
                  ts.available
                    ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-sm active:scale-95"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                }`}
              >
                {ts.available ? ts.time : <span className="text-[10px]">불가</span>}
              </button>
            ))}
          </div>
          {timeSlots.every((ts) => !ts.available) && (
            <p className="text-xs text-slate-400 text-center mt-2">이 날은 예약 가능한 시간이 없습니다.</p>
          )}
        </div>
      )}


    </div>
  );
};

// ── Main Component ───────────────────────────────────────────
const ReservePage = ({ selectedSlot, onSlotSelect, selectedDoctor, onBack, onChangeDoctor, onSubmit, initialData }) => {
  const [activeTab, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState(initialData || dummyPatientData);
  const [alertMsg, setAlertMsg] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (e) => {
    let v = e.target.value.replace(/\D/g, "");
    if (v.length > 0) {
      if (v.length <= 3) v = `(${v}`;
      else if (v.length <= 6) v = `(${v.slice(0, 3)}) ${v.slice(3)}`;
      else v = `(${v.slice(0, 3)}) ${v.slice(3, 6)}-${v.slice(6, 10)}`;
    }
    setFormData((prev) => ({ ...prev, phone: v }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, checklist: { ...prev.checklist, [name]: checked } }));
  };

  const handleCheckAll = (e) => {
    const checked = e.target.checked;
    setFormData((prev) => ({
      ...prev,
      checklist: {
        symptoms: checked, medicalHistory: checked, medications: checked,
        allergies: checked, consent: checked, emergencyContact: checked,
        privacy: checked, accuracy: checked,
      },
    }));
  };

  const isPersonalInfoComplete = () =>
    formData.firstName && formData.lastName && formData.dob && formData.email && formData.phone;
  const isInsuranceInfoComplete = () => formData.insuranceProvider && formData.policyId;
  const isMedicalChecklistComplete = () => Object.values(formData.checklist).every(Boolean);
  const allChecklistChecked = Object.values(formData.checklist).every(Boolean);

  const tabs = [
    { id: "personal",  label: "개인정보",    required: true,  completed: isPersonalInfoComplete() },
    { id: "insurance", label: "보험정보",    required: true,  completed: isInsuranceInfoComplete() },
    { id: "medical",   label: "의료 체크",   required: true,  completed: isMedicalChecklistComplete() },
    { id: "notes",     label: "메모",        required: false, completed: formData.patientNotes.length > 0 },
  ];

  const currentIdx = tabs.findIndex((t) => t.id === activeTab);
  const isFirstTab = currentIdx === 0;
  const isLastTab  = currentIdx === tabs.length - 1;

  const showAlert = (message, tab) => {
    setAlertMsg({ message, tab });
  };

  const handleAlertClose = () => {
    if (alertMsg?.tab) setActiveTab(alertMsg.tab);
    setAlertMsg(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedSlot)                 { showAlert("진료 일정을 먼저 선택해주세요.", null); return; }
    if (!isMedicalChecklistComplete()) { showAlert("의료 체크리스트를 모두 확인해주세요.", "medical"); return; }
    if (!isPersonalInfoComplete())     { showAlert("개인정보를 모두 입력해주세요.", "personal"); return; }
    if (!isInsuranceInfoComplete())    { showAlert("보험정보를 입력해주세요.", "insurance"); return; }
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 md:p-7">

      <AlertModal
        open={!!alertMsg}
        type="warning"
        title="입력 확인 필요"
        message={alertMsg?.message}
        onConfirm={handleAlertClose}
        onCancel={handleAlertClose}
      />

      {/* Selected Doctor Banner */}
      {selectedDoctor && (
        <div className="flex items-center justify-between gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl px-4 py-3.5 mb-5">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-white text-sm font-black shadow-md ${selectedDoctor.color}`}>
                {selectedDoctor.initials}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full" />
            </div>
            <div>
              <p className="font-bold text-slate-800 text-sm">{selectedDoctor.name}</p>
              <p className="text-blue-600 text-xs font-semibold mt-0.5">{selectedDoctor.specialty} · {selectedDoctor.city}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onChangeDoctor}
            className="shrink-0 text-xs font-bold text-blue-600 bg-white border border-blue-200 rounded-xl px-3 py-2 hover:bg-blue-50 hover:border-blue-300 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            의사 변경
          </button>
        </div>
      )}

      {/* Date/Time Picker */}
      <DateTimePicker selectedSlot={selectedSlot} onSlotSelect={onSlotSelect} />

      {!selectedSlot && (
        <div className="flex flex-col items-center justify-center py-14 text-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4">
            <svg className="w-7 h-7 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </div>
          <p className="text-slate-600 text-sm font-semibold mb-1">날짜와 시간을 먼저 선택해주세요</p>
          <p className="text-slate-400 text-xs">진료 일정을 선택하면 환자 정보를 입력할 수 있습니다</p>

        </div>
      )}

      {selectedSlot && <>
      {/* Tab bar */}
      <div className="flex gap-1 overflow-x-auto pb-0 mb-5 bg-slate-100 rounded-2xl p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-bold whitespace-nowrap rounded-xl flex-1 justify-center transition-all ${
              activeTab === tab.id
                ? "bg-white text-blue-700 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab.label}
            {tab.required && !tab.completed && (
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />
            )}
            {tab.completed && (
              <svg className="w-3.5 h-3.5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {/* ── Personal Info ── */}
        {activeTab === "personal" && (
          <SectionCard title="개인 정보">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Field label="First Name" required>
                <input className={inputCls} name="firstName" value={formData.firstName} onChange={handleInputChange} required />
              </Field>
              <Field label="Last Name" required>
                <input className={inputCls} name="lastName" value={formData.lastName} onChange={handleInputChange} required />
              </Field>
            </div>
            <div className="mb-4">
              <Field label="Date of Birth" required>
                <input className={inputCls} type="date" name="dob" value={formData.dob} onChange={handleInputChange} required />
              </Field>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Email Address" required>
                <input className={inputCls} type="email" name="email" value={formData.email} onChange={handleInputChange} required />
              </Field>
              <Field label="Phone Number" required>
                <input className={inputCls} type="tel" name="phone" value={formData.phone} onChange={handlePhoneChange} placeholder="(123) 456-7890" required />
              </Field>
            </div>
          </SectionCard>
        )}

        {/* ── Insurance ── */}
        {activeTab === "insurance" && (
          <SectionCard title="보험 정보">
            <div className="mb-4">
              <Field label="Insurance Provider / Carrier Name" required>
                <input className={inputCls} name="insuranceProvider" value={formData.insuranceProvider} onChange={handleInputChange} required />
              </Field>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Policy ID / Member Number" required>
                <input className={inputCls} name="policyId" value={formData.policyId} onChange={handleInputChange} required />
              </Field>
              <Field label="Group Number (선택)">
                <input className={inputCls} name="groupNumber" value={formData.groupNumber} onChange={handleInputChange} />
              </Field>
            </div>
          </SectionCard>
        )}

        {/* ── Medical Checklist ── */}
        {activeTab === "medical" && (
          <SectionCard>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-base md:text-lg font-bold text-slate-700 flex items-center gap-2">
                  <span className="w-1 h-5 rounded-full bg-blue-500 inline-block" />
                  진료 전 체크리스트
                  <span className="text-red-400">*</span>
                </h3>
                <p className="text-sm text-slate-500 mt-1 ml-3">방문 전 아래 항목을 확인하고 동의해주세요.</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {[
                { id: "symptoms",       name: "symptoms",       label: "현재 증상, 건강 문제, 방문 이유를 모두 성실히 고지하겠습니다." },
                { id: "medicalHistory", name: "medicalHistory", label: "과거 질병, 수술, 만성 질환 등 전체 병력을 제공하겠습니다." },
                { id: "medications",   name: "medications",    label: "현재 복용 중인 모든 약물, 비타민, 영양제를 고지하겠습니다." },
                { id: "allergies",     name: "allergies",      label: "약물, 음식, 기타 물질에 대한 알레르기를 알리겠습니다." },
                { id: "consent",       name: "consent",        label: "의사가 권장하는 진찰, 치료, 검사에 동의합니다." },
                { id: "emergencyContact", name: "emergencyContact", label: "방문 시 비상 연락처를 제공할 수 있음을 이해합니다." },
                { id: "privacy",       name: "privacy",        label: "HIPAA 개인정보 보호 정책 및 안내문을 읽고 동의합니다." },
                { id: "accuracy",      name: "accuracy",       label: "제공한 모든 정보가 사실이며 정확함을 확인합니다." },
              ].map((item) => (
                <CheckItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  checked={formData.checklist[item.name]}
                  onChange={handleCheckboxChange}
                  label={item.label}
                />
              ))}
            </div>

            <div className="border-t border-slate-200 pt-3 mt-2">
              <CheckItem
                id="checkAll"
                name="checkAll"
                checked={allChecklistChecked}
                onChange={handleCheckAll}
                label="위 항목 전체에 동의합니다."
                bold
              />
            </div>
          </SectionCard>
        )}

        {/* ── Notes ── */}
        {activeTab === "notes" && (
          <SectionCard title="추가 메모 (선택)">
            <Field label="방문 사유 또는 특별 요청사항">
              <textarea
                className={`${inputCls} resize-none`}
                name="patientNotes"
                value={formData.patientNotes}
                onChange={handleInputChange}
                placeholder="방문 이유나 특별히 필요한 편의 사항이 있으시면 입력해주세요..."
                rows={6}
              />
            </Field>
          </SectionCard>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between gap-3 mt-6 pt-5 border-t border-slate-100">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
              <span className="hidden sm:inline">홈으로</span>
            </button>
            {!isFirstTab && (
              <button
                type="button"
                onClick={() => setActiveTab(tabs[currentIdx - 1].id)}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
                이전
              </button>
            )}
          </div>

          {!isLastTab ? (
            <button
              type="button"
              onClick={() => setActiveTab(tabs[currentIdx + 1].id)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-bold transition-all shadow-md active:scale-[0.98]"
            >
              다음
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          ) : (
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-bold transition-all shadow-md active:scale-[0.98]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              예약 완료
            </button>
          )}
        </div>
      </form>
      </>}
    </div>
  );
};

export default ReservePage;
