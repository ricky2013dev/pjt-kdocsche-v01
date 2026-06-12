const ProgressBar = ({ currentStep }) => {
  const steps = [
    { num: 1, label: 'Schedule' },
    { num: 2, label: 'Patient Info' },
    { num: 3, label: 'Confirmation' }
  ];

  return (
    <div className="flex justify-between items-center my-8 px-4 relative">
      {steps.map((step, index) => (
        <div key={step.num} className="flex-1 relative">
          {/* Connecting Line */}
          {index < steps.length - 1 && (
            <div className="absolute top-5 left-1/2 w-full h-1 bg-gray-300 -z-10"></div>
          )}

          <div className="flex flex-col items-center relative">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-all ${
                step.num === currentStep
                  ? 'bg-indigo-600 text-white'
                  : step.num < currentStep
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-300 text-gray-600'
              }`}
            >
              {step.num}
            </div>
            <div className="text-sm font-medium text-gray-700">{step.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
