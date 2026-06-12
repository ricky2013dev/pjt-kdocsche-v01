import { useState } from "react";
import ScheduleView from "./components/ScheduleView";
import ReservePage from "./components/ReservePage";
import ConfirmationPage from "./components/ConfirmationPage";
import AboutUs from "./components/AboutUs";

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [patientData, setPatientData] = useState(null);
  const [showAboutUs, setShowAboutUs] = useState(false);

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const handleNextToReserve = () => {
    if (selectedSlot) {
      setCurrentStep(2);
      window.scrollTo(0, 0);
    }
  };

  const handleBackToSchedule = () => {
    setCurrentStep(1);
    window.scrollTo(0, 0);
  };

  const handleFormSubmit = (formData) => {
    setPatientData(formData);
    setCurrentStep(3);
    window.scrollTo(0, 0);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setSelectedSlot(null);
    setPatientData(null);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="container mx-auto px-3 md:px-4 py-4 md:py-8 max-w-7xl">
        <header className="bg-gradient-to-r from-green-600 to-teal-700 text-white rounded-lg shadow-xl p-4 md:p-8 mb-4 md:mb-8">
          {/* Navigation Menu */}
          <nav className="flex justify-end mb-3 md:mb-4">
            <button
              onClick={() => setShowAboutUs(!showAboutUs)}
              className="text-white hover:bg-white hover:bg-opacity-20 px-3 md:px-4 py-1.5 md:py-2 rounded-lg transition-all text-xs md:text-sm font-medium"
            >
              {showAboutUs ? "Home" : "About Us"}
            </button>
          </nav>

          <div className="text-center">
            <div className="flex items-center justify-center gap-3 md:gap-4 mb-1 md:mb-2">
              <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-full p-2 md:p-3 shadow-lg w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                <svg
                  className="w-12 h-12 md:w-16 md:h-16"
                  viewBox="0 0 64 64"
                  fill="none"
                >
                  {/* Head */}
                  <circle cx="32" cy="18" r="8" fill="#3B2D1F" />
                  {/* Face */}
                  <circle cx="32" cy="22" r="6" fill="#F5D5B8" />
                  {/* White coat body */}
                  <path
                    d="M20 28 L20 50 Q20 52 22 52 L42 52 Q44 52 44 50 L44 28 Q44 26 42 26 L38 26 L38 30 L26 30 L26 26 L22 26 Q20 26 20 28 Z"
                    fill="white"
                  />
                  {/* Collar */}
                  <path d="M26 26 L28 30 L32 28 L36 30 L38 26" fill="white" />
                  {/* Tie */}
                  <path d="M30 28 L32 40 L34 28 Z" fill="#E67E22" />
                  {/* Stethoscope - left tube */}
                  <path
                    d="M24 32 Q22 34 22 38 Q22 42 26 44"
                    stroke="#2C3E50"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  {/* Stethoscope - right tube */}
                  <path
                    d="M40 32 Q42 34 42 38 Q42 42 38 44"
                    stroke="#2C3E50"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  {/* Stethoscope - chest piece */}
                  <circle cx="32" cy="46" r="3" fill="#2C3E50" />
                  <circle cx="32" cy="46" r="2" fill="#34495E" />
                  {/* Stethoscope - earpieces */}
                  <circle cx="24" cy="32" r="1.5" fill="#2C3E50" />
                  <circle cx="40" cy="32" r="1.5" fill="#2C3E50" />
                </svg>
              </div>
              <h1 className="text-lg sm:text-2xl md:text-4xl font-bold leading-tight">
                K Doctor Online Scheduling
              </h1>
            </div>
            <p className="text-xs sm:text-sm md:text-lg mt-2">
              Book your appointment in 2 easy steps
            </p>
            <p className="text-xs md:text-base mt-1 opacity-90">
              2단계로 간편하게 예약하세요
            </p>
          </div>
        </header>

        {showAboutUs ? (
          <AboutUs onClose={() => setShowAboutUs(false)} />
        ) : (
          <>
            {currentStep === 1 && (
              <ScheduleView
                selectedSlot={selectedSlot}
                onSlotSelect={handleSlotSelect}
                onNext={handleNextToReserve}
              />
            )}

            {currentStep === 2 && (
              <ReservePage
                selectedSlot={selectedSlot}
                onBack={handleBackToSchedule}
                onSubmit={handleFormSubmit}
              />
            )}

            {currentStep === 3 && (
              <ConfirmationPage
                selectedSlot={selectedSlot}
                patientData={patientData}
                onReset={handleReset}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
