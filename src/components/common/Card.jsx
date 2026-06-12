const Card = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-lg p-4 md:p-8 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
