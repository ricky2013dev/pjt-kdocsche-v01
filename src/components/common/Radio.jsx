const Radio = ({
  id,
  name,
  value,
  checked,
  onChange,
  label,
  className = '',
  ...props
}) => {
  return (
    <label
      htmlFor={id}
      className={`flex items-center p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-all ${className}`}
    >
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500 focus:ring-2 mr-3 cursor-pointer"
        {...props}
      />
      <span className="text-gray-700">{label}</span>
    </label>
  );
};

export default Radio;
