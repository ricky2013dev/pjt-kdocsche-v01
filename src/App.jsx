import { useState } from "react";
import HomePage from "./components/HomePage";
import DoctorSelectPage from "./components/DoctorSelectPage";
import ReservePage from "./components/ReservePage";
import ConfirmationPage from "./components/ConfirmationPage";
import MyAppointmentsPage from "./components/MyAppointmentsPage";
import AboutUs from "./components/AboutUs";

const TEST_APPOINTMENTS = [
  {
    id: 10001,
    doctor: { initials: "백", name: "백동철 원장", specialty: "가정의학과", city: "Carrollton, TX", color: "bg-blue-600" },
    slot: {
      date: new Date(Date.now() + 7 * 86400000).toDateString(),
      time: "10:00 AM",
      datetime: (() => { const d = new Date(Date.now() + 7 * 86400000); return `${d.toLocaleDateString()} at 10:00 AM`; })(),
    },
    patient: { firstName: "테스트", lastName: "사용자", email: "test@test.com", phone: "214-555-0100", insuranceProvider: "Blue Cross Blue Shield", policyId: "TEST-BC-001" },
    status: "confirmed", confirmCode: "123456", createdAt: new Date().toISOString(),
  },
  {
    id: 10002,
    doctor: { initials: "김", name: "감철우 원장", specialty: "한의원", city: "Plano, TX", color: "bg-blue-500" },
    slot: {
      date: new Date(Date.now() + 14 * 86400000).toDateString(),
      time: "2:00 PM",
      datetime: (() => { const d = new Date(Date.now() + 14 * 86400000); return `${d.toLocaleDateString()} at 2:00 PM`; })(),
    },
    patient: { firstName: "테스트", lastName: "사용자", email: "test@test.com", phone: "214-555-0100", insuranceProvider: "Aetna", policyId: "TEST-AE-002" },
    status: "pending", confirmCode: "123456", createdAt: new Date().toISOString(),
  },
];

// ── Icon helpers ─────────────────────────────────────────────
const IconHome = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const IconCal = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const IconUser = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconPulse = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
  </svg>
);

// ── Mobile Bottom Tab Bar ────────────────────────────────────
const MobileTabBar = ({ view, navigateTo }) => {
  const tabs = [
    { label: "홈",    target: "home",    Icon: IconHome },
    { label: "예약",  target: "reserve", Icon: IconCal  },
    { label: "예약확인", target: "myappt", Icon: IconUser },
  ];
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t border-slate-200 shadow-[0_-4px_24px_rgba(0,0,0,0.07)]">
      <div className="grid grid-cols-3" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
        {tabs.map(({ label, target, Icon }) => {
          const active = view === target;
          return (
            <button
              key={target}
              onClick={() => navigateTo(target)}
              className={`flex flex-col items-center justify-center gap-1 py-2.5 transition-all active:scale-90 ${
                active ? "text-blue-600" : "text-slate-400"
              }`}
            >
              <div className={`relative p-1.5 rounded-xl transition-all ${active ? "bg-blue-50" : ""}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-semibold leading-none ${active ? "text-blue-600" : "text-slate-400"}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

function App() {
  const [step, setStep] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [patientData, setPatientData] = useState(null);
  const [view, setView] = useState("home");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointments, setAppointments] = useState(TEST_APPOINTMENTS);
  const [confirmCode, setConfirmCode] = useState(null);
  const [editingAppointment, setEditingAppointment] = useState(null);

  const navigateTo = (target) => {
    setView(target);
    if (target === "reserve") {
      setSelectedDoctor(null); setStep(1); setSelectedSlot(null); setEditingAppointment(null);
    }
    window.scrollTo(0, 0);
  };

  const handleReserveWithDoctor = (doctor) => {
    setSelectedDoctor(doctor); setStep(1); setSelectedSlot(null);
    setView("reserve"); window.scrollTo(0, 0);
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor); setStep(1); window.scrollTo(0, 0);
  };

  const handleChangeDoctor = () => {
    setSelectedDoctor(null); setSelectedSlot(null); window.scrollTo(0, 0);
  };

  const handleSlotSelect = (slot) => setSelectedSlot(slot);

  const handleFormSubmit = (formData) => {
    if (editingAppointment) {
      const updated = { ...editingAppointment, doctor: selectedDoctor, slot: selectedSlot, patient: formData, status: "pending" };
      setAppointments(prev => prev.map(a => a.id === editingAppointment.id ? updated : a));
      setEditingAppointment(null); setPatientData(formData);
      setView("myappt"); window.scrollTo(0, 0);
    } else {
      const code = String(Math.floor(100000 + Math.random() * 900000));
      const newAppt = { id: Date.now(), doctor: selectedDoctor, slot: selectedSlot, patient: formData, status: "pending", confirmCode: code, createdAt: new Date().toISOString() };
      setAppointments(prev => [...prev, newAppt]);
      setConfirmCode(code); setPatientData(formData); setStep(2); window.scrollTo(0, 0);
    }
  };

  const handleEditAppointment = (appt) => {
    setEditingAppointment(appt); setSelectedDoctor(appt.doctor);
    setStep(1); setSelectedSlot(null); setView("reserve"); window.scrollTo(0, 0);
  };

  const handleCancelAppointment = (apptId) => {
    setAppointments(prev => prev.map(a => a.id === apptId ? { ...a, status: "cancelled" } : a));
  };

  const handleReset = () => {
    setStep(1); setSelectedSlot(null); setPatientData(null);
    setSelectedDoctor(null); setConfirmCode(null); setEditingAppointment(null);
    setView("home"); window.scrollTo(0, 0);
  };

  const isEditing = !!editingAppointment;
  const reserveSubtitle = !selectedDoctor
    ? { title: "의사 선생님 선택", sub: "화상 진료를 받으실 의사 선생님을 먼저 선택해주세요" }
    : step === 1
    ? { title: isEditing ? "예약 수정" : "예약 정보 입력", sub: isEditing ? "새로운 날짜와 시간을 선택해주세요" : "날짜와 시간을 먼저 선택해주세요" }
    : { title: "예약 완료", sub: "화상 진료 예약이 성공적으로 접수되었습니다" };

  const navTabs = [
    { label: "홈",     target: "home",    Icon: IconHome },
    { label: "예약",   target: "reserve", Icon: IconCal  },
    { label: "예약확인", target: "myappt", Icon: IconUser },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      {/* ── Top Navbar ── */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex items-center justify-between h-14 md:h-16">

            {/* Logo */}
            <button onClick={() => navigateTo("home")} className="flex items-center gap-2.5 group">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl p-1.5 w-9 h-9 flex items-center justify-center shadow-md group-hover:shadow-lg group-active:scale-95 transition-all">
                <IconPulse className="w-5 h-5 text-white" />
              </div>
              <div className="leading-none">
                <div className="font-black text-slate-700 text-base md:text-lg tracking-tight">
                  K Doctor<span className="text-blue-600">.</span><span className="text-blue-600">Online</span>
                </div>
                <div className="hidden md:block text-[10px] text-slate-400 font-medium mt-0.5 tracking-wide">
                  Korean Virtual Doctor
                </div>
              </div>
            </button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navTabs.map(({ label, target, Icon }) => {
                const active = view === target;
                return (
                  <button
                    key={target}
                    onClick={() => navigateTo(target)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                      active
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Mobile: page label */}
            <div className="md:hidden flex items-center gap-1.5 bg-slate-100 rounded-full px-3 py-1.5">
              {(() => { const t = navTabs.find(n => n.target === view); return t ? <><t.Icon className="w-3.5 h-3.5 text-slate-500" /><span className="text-xs font-semibold text-slate-600">{t.label}</span></> : null; })()}
            </div>
          </div>
        </div>
      </nav>

      {/* ── Reserve sub-header ── */}
      {view === "reserve" && (
        <div className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl py-4 md:py-6">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-xl p-2.5 shrink-0">
                <IconCal className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-base md:text-xl font-bold">{reserveSubtitle.title}</h1>
                <p className="text-blue-100 text-xs mt-0.5 opacity-90">{reserveSubtitle.sub}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MyAppt sub-header ── */}
      {view === "myappt" && (
        <div className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl py-4 md:py-6">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-xl p-2.5 shrink-0">
                <IconUser className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-base md:text-xl font-bold">나의 예약확인</h1>
                <p className="text-blue-100 text-xs mt-0.5 opacity-90">예약 내역 조회 및 일정 수정</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Main Content ── */}
      <main className="flex-grow container mx-auto px-4 md:px-6 py-5 md:py-8 max-w-7xl pb-24 md:pb-8">

        {view === "home" && (
          <HomePage onReserve={() => navigateTo("reserve")} onReserveWithDoctor={handleReserveWithDoctor} />
        )}
        {view === "about" && (
          <AboutUs onClose={() => navigateTo("home")} />
        )}
        {view === "myappt" && (
          <MyAppointmentsPage
            appointments={appointments}
            onEdit={handleEditAppointment}
            onCancel={handleCancelAppointment}
            onReserve={() => navigateTo("reserve")}
          />
        )}
        {view === "reserve" && (
          <>
            {!selectedDoctor && <DoctorSelectPage onSelect={handleDoctorSelect} />}
            {selectedDoctor && step === 1 && (
              <ReservePage
                selectedSlot={selectedSlot}
                onSlotSelect={handleSlotSelect}
                selectedDoctor={selectedDoctor}
                onBack={() => navigateTo("home")}
                onChangeDoctor={handleChangeDoctor}
                onSubmit={handleFormSubmit}
                initialData={editingAppointment?.patient}
              />
            )}
            {selectedDoctor && step === 2 && (
              <ConfirmationPage
                selectedSlot={selectedSlot}
                patientData={patientData}
                selectedDoctor={selectedDoctor}
                confirmCode={confirmCode}
                onReset={handleReset}
              />
            )}
          </>
        )}
      </main>

      {/* ── Desktop Footer ── */}
      <footer className="hidden md:block bg-slate-900 text-slate-400 py-5">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 rounded-lg p-1 w-7 h-7 flex items-center justify-center">
                <IconPulse className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-sm font-black text-slate-200 tracking-tight">K Doctor Online</span>
                <span className="block text-[10px] text-slate-500">Korean Virtual Doctor Service</span>
              </div>
            </div>
            <p className="text-xs text-slate-500">© 2026 K Doctor Online. All rights reserved.</p>
            <button onClick={() => navigateTo("about")} className="text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium">
              About Us →
            </button>
          </div>
        </div>
      </footer>

      {/* ── Mobile Bottom Tab Bar ── */}
      <MobileTabBar view={view} navigateTo={navigateTo} />
    </div>
  );
}

export default App;
