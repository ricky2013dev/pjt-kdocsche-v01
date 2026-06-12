const FormSection = ({ title, children, className = '' }) => {
  return (
    <div className={`mb-6 md:mb-8 p-4 md:p-6 bg-gray-50 rounded-lg border-l-4 border-green-600 ${className}`}>
      {title && (
        <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-4">{title}</h3>
      )}
      {children}
    </div>
  );
};

export default FormSection;
