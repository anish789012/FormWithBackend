import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginandRegistration from "./Pages/LoginandRegistration";
import ForgetPassword from "./Pages/ForgetPassword";
import ResetPassword from "./Pages/reset-password";
import Dashboard from "./Pages/Dashboard";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginandRegistration />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default App;
