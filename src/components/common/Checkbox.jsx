const Checkbox = ({
  id,
  name,
  checked,
  onChange,
  label,
  className = '',
  error,
  ...props
}) => {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className={`flex items-start md:items-center p-2 md:p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-all ${className}`}
      >
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          className="w-4 h-4 md:w-5 md:h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2 mr-2 md:mr-3 cursor-pointer mt-0.5 md:mt-0 flex-shrink-0"
          {...props}
        />
        <span className="text-gray-700 text-sm md:text-base leading-snug md:leading-normal">{label}</span>
      </label>
      {error && <p className="mt-1 text-xs md:text-sm text-red-500 ml-6 md:ml-7">{error}</p>}
    </div>
  );
};

export default Checkbox;
