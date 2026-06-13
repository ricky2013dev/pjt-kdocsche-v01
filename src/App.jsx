import { useState } from "react";
import HomePage from "./components/HomePage";
import DoctorSelectPage from "./components/DoctorSelectPage";
import ScheduleView from "./components/ScheduleView";
import ReservePage from "./components/ReservePage";
import ConfirmationPage from "./components/ConfirmationPage";
import MyAppointmentsPage from "./components/MyAppointmentsPage";
import AboutUs from "./components/AboutUs";

// ── Test / demo appointment (test@test.com / 123456) ─────────
const TEST_APPOINTMENTS = [
  {
    id: 10001,
    doctor: {
      initials: "백",
      name: "백동철 원장",
      specialty: "가정의학과",
      city: "Carrollton, TX",
      color: "bg-teal-500",
    },
    slot: {
      date: new Date(Date.now() + 7 * 86400000).toDateString(),   // 1 week from today
      time: "10:00 AM",
      datetime: (() => {
        const d = new Date(Date.now() + 7 * 86400000);
        return `${d.toLocaleDateString()} at 10:00 AM`;
      })(),
    },
    patient: {
      firstName: "테스트",
      lastName: "사용자",
      email: "test@test.com",
      phone: "214-555-0100",
      insuranceProvider: "Blue Cross Blue Shield",
      policyId: "TEST-BC-001",
    },
    status: "confirmed",
    confirmCode: "123456",
    createdAt: new Date().toISOString(),
  },
  {
    id: 10002,
    doctor: {
      initials: "감",
      name: "감철우 원장",
      specialty: "한의원",
      city: "Plano, TX",
      color: "bg-blue-500",
    },
    slot: {
      date: new Date(Date.now() + 14 * 86400000).toDateString(),  // 2 weeks from today
      time: "2:00 PM",
      datetime: (() => {
        const d = new Date(Date.now() + 14 * 86400000);
        return `${d.toLocaleDateString()} at 2:00 PM`;
      })(),
    },
    patient: {
      firstName: "테스트",
      lastName: "사용자",
      email: "test@test.com",
      phone: "214-555-0100",
      insuranceProvider: "Aetna",
      policyId: "TEST-AE-002",
    },
    status: "pending",
    confirmCode: "123456",
    createdAt: new Date().toISOString(),
  },
];

function App() {
  const [step, setStep] = useState(1);           // 1: calendar, 2: form, 3: confirmation
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [patientData, setPatientData] = useState(null);
  const [view, setView] = useState("home");       // "home" | "reserve" | "about" | "myappt"
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointments, setAppointments] = useState(TEST_APPOINTMENTS);
  const [confirmCode, setConfirmCode] = useState(null);
  const [editingAppointment, setEditingAppointment] = useState(null);

  // Navigate to a top-level view
  const navigateTo = (target) => {
    setView(target);
    if (target === "reserve") {
      setSelectedDoctor(null);
      setStep(1);
      setSelectedSlot(null);
      setEditingAppointment(null);
    }
    window.scrollTo(0, 0);
  };

  // Called from HomePage doctor card "예약하기" — pre-selects a doctor
  const handleReserveWithDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setStep(1);
    setSelectedSlot(null);
    setView("reserve");
    window.scrollTo(0, 0);
  };

  // Called from DoctorSelectPage
  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setStep(1);
    window.scrollTo(0, 0);
  };

  const handleSlotSelect = (slot) => setSelectedSlot(slot);

  const handleNextToReserve = () => {
    if (selectedSlot) {
      setStep(2);
      window.scrollTo(0, 0);
    }
  };

  const handleBackToSchedule = () => {
    setStep(1);
    window.scrollTo(0, 0);
  };

  const handleFormSubmit = (formData) => {
    if (editingAppointment) {
      // Update existing appointment
      const updated = {
        ...editingAppointment,
        doctor: selectedDoctor,
        slot: selectedSlot,
        patient: formData,
        status: "pending",
      };
      setAppointments(prev => prev.map(a => a.id === editingAppointment.id ? updated : a));
      setEditingAppointment(null);
      setPatientData(formData);
      setView("myappt");
      window.scrollTo(0, 0);
    } else {
      // New appointment
      const code = String(Math.floor(100000 + Math.random() * 900000));
      const newAppt = {
        id: Date.now(),
        doctor: selectedDoctor,
        slot: selectedSlot,
        patient: formData,
        status: "pending",
        confirmCode: code,
        createdAt: new Date().toISOString(),
      };
      setAppointments(prev => [...prev, newAppt]);
      setConfirmCode(code);
      setPatientData(formData);
      setStep(3);
      window.scrollTo(0, 0);
    }
  };

  const handleEditAppointment = (appt) => {
    setEditingAppointment(appt);
    setSelectedDoctor(appt.doctor);
    setStep(1);
    setSelectedSlot(null);
    setView("reserve");
    window.scrollTo(0, 0);
  };

  const handleCancelAppointment = (apptId) => {
    setAppointments(prev => prev.map(a => a.id === apptId ? { ...a, status: "cancelled" } : a));
  };

  const handleReset = () => {
    setStep(1);
    setSelectedSlot(null);
    setPatientData(null);
    setSelectedDoctor(null);
    setConfirmCode(null);
    setEditingAppointment(null);
    setView("home");
    window.scrollTo(0, 0);
  };

  // Sub-header label for the reserve view
  const isEditing = !!editingAppointment;
  const reserveSubtitle = !selectedDoctor
    ? { title: "의사 선생님 선택", sub: "예약할 의사 선생님을 먼저 선택해주세요" }
    : step === 1
    ? { title: isEditing ? "일정 수정" : "예약 일정", sub: isEditing ? "새로운 날짜와 시간을 선택해주세요" : "원하시는 날짜와 시간을 선택하세요" }
    : step === 2
    ? { title: "환자 정보 입력", sub: "예약에 필요한 정보를 입력해주세요" }
    : { title: "예약 완료", sub: "예약이 성공적으로 접수되었습니다" };

  const navLinks = [
    { label: "홈",      target: "home",    active: view === "home" },
    { label: "예약",    target: "reserve", active: view === "reserve" },
    { label: "예약확인", target: "myappt",  active: view === "myappt" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      {/* ── Top Navbar ── */}
      <nav className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex items-center justify-between h-16">
            <button onClick={() => navigateTo("home")} className="flex items-center gap-2.5 group">
              <div className="bg-teal-600 rounded-xl p-1.5 flex items-center justify-center w-9 h-9 shadow-sm group-hover:bg-teal-700 transition-colors">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <div className="leading-tight">
                <span className="font-black text-teal-700 text-base md:text-lg tracking-tight">KDS Dallas</span>
                <span className="hidden md:block text-[10px] text-slate-400 font-medium -mt-0.5">Korean Doctor Services</span>
              </div>
            </button>

            <div className="flex items-center gap-1">
              {navLinks.map(({ label, target, active }) => (
                <button
                  key={target}
                  onClick={() => navigateTo(target)}
                  className={`px-3 md:px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    active ? "bg-teal-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* ── Reserve sub-header ── */}
      {view === "reserve" && (
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl py-5 md:py-7">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-xl p-2.5">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <div>
                <h1 className="text-lg md:text-2xl font-bold">{reserveSubtitle.title}</h1>
                <p className="text-teal-100 text-xs md:text-sm mt-0.5">{reserveSubtitle.sub}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MyAppt sub-header ── */}
      {view === "myappt" && (
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl py-5 md:py-7">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-xl p-2.5">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <div>
                <h1 className="text-lg md:text-2xl font-bold">나의 예약확인</h1>
                <p className="text-teal-100 text-xs md:text-sm mt-0.5">예약 내역 조회 및 일정 수정</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Main Content ── */}
      <main className="flex-grow container mx-auto px-4 md:px-6 py-6 md:py-8 max-w-7xl">

        {view === "home" && (
          <HomePage
            onReserve={() => navigateTo("reserve")}
            onReserveWithDoctor={handleReserveWithDoctor}
          />
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
            {/* Step 0: no doctor selected → pick doctor */}
            {!selectedDoctor && (
              <DoctorSelectPage onSelect={handleDoctorSelect} />
            )}

            {/* Step 1: schedule (doctor chosen) */}
            {selectedDoctor && step === 1 && (
              <ScheduleView
                selectedSlot={selectedSlot}
                onSlotSelect={handleSlotSelect}
                onNext={handleNextToReserve}
                selectedDoctor={selectedDoctor}
                onChangeDoctor={() => setSelectedDoctor(null)}
              />
            )}

            {/* Step 2: patient info form */}
            {selectedDoctor && step === 2 && (
              <ReservePage
                selectedSlot={selectedSlot}
                selectedDoctor={selectedDoctor}
                onBack={handleBackToSchedule}
                onSubmit={handleFormSubmit}
                initialData={editingAppointment?.patient}
              />
            )}

            {/* Step 3: confirmation */}
            {selectedDoctor && step === 3 && (
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

      {/* ── Footer ── */}
      <footer className="bg-slate-800 text-slate-300 py-5 mt-4">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="bg-teal-500 rounded-lg p-1 w-6 h-6 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <div className="leading-tight">
                <span className="text-sm font-black text-slate-200 tracking-tight">KDS Dallas</span>
                <span className="block text-[10px] text-slate-400">Korean Doctor Services</span>
              </div>
            </div>
            <p className="text-xs text-slate-400">© 2026 KDS Dallas. All rights reserved.</p>
            <button onClick={() => navigateTo("about")} className="text-xs text-teal-400 hover:text-teal-300 transition-colors font-medium">
              About Us →
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
