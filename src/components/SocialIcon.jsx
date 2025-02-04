import { Github, Twitter, Facebook } from "lucide-react";

const SocialIcon = () => {
  return (
    <div className="social-container my-5">
      <a
        href="#"
        className="border border-gray-200 rounded-full inline-flex justify-center items-center m-0 h-10 w-10 hover:bg-gray-50 transition-colors"
      >
        <Facebook className="w-5 h-5 text-gray-600" />
      </a>
      <a
        href="#"
        className="border border-gray-200 rounded-full inline-flex justify-center items-center m-0 mx-1.5 h-10 w-10 hover:bg-gray-50 transition-colors"
      >
        <Github className="w-5 h-5 text-gray-600" />
      </a>
      <a
        href="#"
        className="border border-gray-200 rounded-full inline-flex justify-center items-center m-0 h-10 w-10 hover:bg-gray-50 transition-colors"
      >
        <Twitter className="w-5 h-5 text-gray-600" />
      </a>
    </div>
  );
};

export default SocialIcon;
