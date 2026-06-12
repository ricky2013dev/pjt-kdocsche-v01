const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'px-6 py-3 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed',
    secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed',
    outline: 'bg-white text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
