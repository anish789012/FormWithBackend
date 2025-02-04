import { useState } from "react";
import { FaHome, FaChartPie, FaTasks, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import the CSS

function Dashboard() {
  const [activeTab, setActiveTab] = useState("Home");
  const navigate = useNavigate();

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleLogout = () => {
    // Add logout logic here (e.g., clear token, user data)
    console.log("User logged out");

    // Show toast message on successful logout
    toast.success("Logout successful!", {
      position: "top-right",
      autoClose: 100,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      onClose: () => navigate("/"),
    });

    // Redirect to the home page or login page
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Toast Container for toast messages */}
      <ToastContainer />

      {/* Navigation Bar */}
      <nav className="bg-[#3a91a5] text-white py-4 px-6 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-white text-[#3a91a5] px-4 py-2 rounded-lg font-medium hover:opacity-90 active:scale-95"
        >
          <FaSignOutAlt /> Logout
        </button>
      </nav>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg p-4">
          <ul className="space-y-4">
            <li
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                activeTab === "Home"
                  ? "bg-[#3a91a5] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => handleTabClick("Home")}
            >
              <FaHome /> Home
            </li>
            <li
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                activeTab === "Analytics"
                  ? "bg-[#3a91a5] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => handleTabClick("Analytics")}
            >
              <FaChartPie /> Analytics
            </li>
            <li
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                activeTab === "Tasks"
                  ? "bg-[#3a91a5] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => handleTabClick("Tasks")}
            >
              <FaTasks /> Tasks
            </li>
          </ul>
        </aside>

        {/* Main Panel */}
        <main className="flex-1 p-6 bg-[url('https://images.pexels.com/photos/310435/pexels-photo-310435.jpeg?auto=compress&cs=tinysrgb&w=600')] bg-no-repeat  bg-center">
          {activeTab === "Home" && (
            <div>
              <h2 className="text-2xl font-bold mb-4 ">
                Welcome to Your Dashboard
              </h2>
              <p className="text-gray-700 ">
                Here you can find an overview of your activity and manage your
                account.
              </p>
            </div>
          )}
          {activeTab === "Analytics" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Analytics</h2>
              <p className="text-gray-700">
                Visualize your data and gain insights here.
              </p>
            </div>
          )}
          {activeTab === "Tasks" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Tasks</h2>
              <p className="text-gray-700">
                Manage your tasks and keep track of your progress.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
