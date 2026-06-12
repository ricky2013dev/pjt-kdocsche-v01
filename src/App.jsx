import { useState } from 'react';
import ScheduleView from './components/ScheduleView';
import ReservePage from './components/ReservePage';
import ConfirmationPage from './components/ConfirmationPage';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [patientData, setPatientData] = useState(null);

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
        <header className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-lg shadow-xl p-4 md:p-8 text-center mb-4 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold mb-1 md:mb-2">Doctor Appointment Scheduling</h1>
          <p className="text-sm md:text-lg">Book your appointment in 3 easy steps</p>
        </header>

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
      </div>
    </div>
  );
}

export default App;
