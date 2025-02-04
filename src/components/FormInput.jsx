import { Mail, Lock, User } from "lucide-react";

const FormInput = ({ icon, label, onChange, ...props }) => {
  const icons = {
    mail: <Mail className="w-5 h-5" />,
    lock: <Lock className="w-5 h-5" />,
    person: <User className="w-5 h-5" />,
  };

  return (
    <div className="input-wrapper relative w-full mb-6 group">
      {/* Icon container */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#3a9185]">
        {icons[icon]}
      </div>

      {/* Input field */}
      <input
        {...props}
        onChange={onChange} // Handle onChange passed down from parent
        className="input-field w-full h-[42px] rounded border border-gray-300 px-12 text-base text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#3a91a5] focus:ring-0 transition-all duration-200"
        required
      />
    </div>
  );
};

export default FormInput;
