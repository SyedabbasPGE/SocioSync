import React, { useEffect, useState } from "react";
import { FaRegPlusSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onAddAccountClick }) => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");

  // Get the user email from localStorage when the component mounts
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      setUserEmail(email);
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login"); // Navigate back to the login page
    window.location.reload(); // Reload the page after logout
  };

  return (
    <div className="w-full bg-gradient-to-br from-gray-800 via-gray-700 to-slate-900 shadow-lg fixed top-0 z-50">
      <nav className="flex items-center justify-between px-6 py-4">
        {/* Left Section: Logo */}
        <div className="flex items-center">
          <img
            src="/soci.jpg"
            alt="SocioSync"
            className="w-12 h-12 rounded-full mr-3 transition-transform duration-300 hover:scale-110"
          />
          <span className="text-white text-2xl font-bold">SocioSync</span>
        </div>
        {/* Center Section: Add Account Button */}
        {/* <div className="flex-1 flex justify-center">
          <button
            onClick={onAddAccountClick}
            className="flex items-center px-4 py-2 bg-gradient-to-br from-gray-700 to-gray-800 text-white text-lg font-semibold rounded-lg shadow-md hover:from-gray-600 hover:to-gray-700 transition-all duration-300"
          >
            <FaRegPlusSquare className="mr-2 text-xl" />
            Add Account
          </button>
        </div> */}
        {/* Right Section: Profile and Log Out */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <span className="text-white font-medium">
              {userEmail || "User"}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="bg-white text-indigo-600 font-semibold px-4 py-2 rounded-lg hover:bg-indigo-600 hover:text-white transition-all duration-300"
          >
            Log Out
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
