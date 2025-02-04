const Button = ({ onClick, label, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-[20px] border border-white bg-transparent text-white text-xs font-bold py-3 px-11 uppercase tracking-wider cursor-pointer transition-transform hover:bg-white hover:text-[#3a91a5] active:scale-95 ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
