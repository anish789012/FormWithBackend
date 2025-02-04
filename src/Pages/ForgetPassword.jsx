import React, { useState } from "react";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/email/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(`A password reset link has been sent to ${email}.`);
      } else {
        toast.error(
          data.error || "There was an issue sending the password reset link."
        );
      }
    } catch (err) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4  ">
      <div className="bg-white flex items-center justify-center flex-col px-8 md:px-12 py-8 md:h-full text-center shadow-2xl rounded-lg">
        <h1 className="font-bold text-2xl mb-4">Forgot Your Password?</h1>
        <p className="text-sm leading-5 text-gray-700 mb-6">
          Enter valid email address to reset your password.
        </p>
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            placeholder="Email"
            icon="mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            name="password_reset_link"
            disabled={loading}
            className={`mt-4 rounded-[20px] border border-[#3a91a5] bg-[#3a91a5] text-white text-xs font-bold py-3 px-11 uppercase tracking-wider cursor-pointer transition-transform ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:opacity-90 active:scale-95"
            }`}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        <a
          href="/"
          className="block mt-6 text-sm text-gray-700 hover:underline"
        >
          Back to Sign In
        </a>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}

export default ForgetPassword;
