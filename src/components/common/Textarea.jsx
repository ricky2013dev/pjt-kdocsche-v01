const Textarea = ({
  label,
  id,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  rows = 4,
  className = '',
  error,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block mb-1.5 md:mb-2 font-medium text-gray-700 text-sm md:text-base">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className={`w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 transition-all resize-y ${
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs md:text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Textarea;
