import { Button, Card } from './common';

const ConfirmationPage = ({ selectedSlot, patientData, onReset }) => {
  return (
    <Card>
      <div className="text-center">
        <div className="text-6xl md:text-8xl text-green-500 mb-3 md:mb-4">✓</div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 md:mb-4">Thank You!</h2>

        <div className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed">
          <p className="mb-2">Your appointment request has been received successfully.</p>
          <p>We will review your information and confirm your appointment details soon.</p>
        </div>

        <div className="bg-gray-50 p-4 md:p-8 rounded-lg max-w-2xl mx-auto text-left mb-6 md:mb-8">
          <h3 className="text-lg md:text-xl font-bold text-green-600 mb-4 md:mb-6">Appointment Summary</h3>

          <div className="space-y-3 md:space-y-4">
            <div className="flex justify-between items-center pb-3 md:pb-4 border-b border-gray-300 text-sm md:text-base">
              <span className="font-semibold text-gray-700">Patient Name:</span>
              <span className="text-gray-800 break-words">{patientData.firstName} {patientData.lastName}</span>
            </div>

            <div className="flex justify-between items-center pb-3 md:pb-4 border-b border-gray-300 text-sm md:text-base">
              <span className="font-semibold text-gray-700">Date & Time:</span>
              <span className="text-gray-800 break-words">{selectedSlot?.datetime}</span>
            </div>

            <div className="flex justify-between items-center pb-3 md:pb-4 border-b border-gray-300 text-sm md:text-base">
              <span className="font-semibold text-gray-700">Email:</span>
              <span className="text-gray-800 break-words">{patientData.email}</span>
            </div>

            <div className="flex justify-between items-center pb-3 md:pb-4 border-b border-gray-300 text-sm md:text-base">
              <span className="font-semibold text-gray-700">Phone:</span>
              <span className="text-gray-800 break-words">{patientData.phone}</span>
            </div>

            <div className="flex justify-between items-center pb-3 md:pb-4 border-b border-gray-300 text-sm md:text-base">
              <span className="font-semibold text-gray-700">Insurance:</span>
              <span className="text-gray-800 break-words">
                {patientData.insuranceProvider} ({patientData.policyId})
              </span>
            </div>

            <div className="flex justify-between items-center text-sm md:text-base">
              <span className="font-semibold text-gray-700">Status:</span>
              <span className="text-orange-500 font-bold">Pending Confirmation</span>
            </div>
          </div>
        </div>

        <Button
          onClick={onReset}
          variant="primary"
          className="px-8 py-3"
        >
          Schedule Another Appointment
        </Button>
      </div>
    </Card>
  );
};

export default ConfirmationPage;
