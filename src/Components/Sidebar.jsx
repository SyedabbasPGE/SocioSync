import React, { useState } from "react";
import { FaHome, FaPen, FaFolderOpen } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Sidebar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleMouseEnter = (item) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const sidebarItems = [
    { icon: <FaHome />, name: "Home", path: "/" },
    { icon: <FaPen />, name: "Create a Post", path: "/create-post" },
    { icon: <FaFolderOpen />, name: "View Posts", path: "/view-posts" }, // Updated path
  ];

  return (
    <div className="fixed top-1/2 left-3 transform -translate-y-1/2 bg-gray-800 text-white rounded-xl p-4 flex flex-col items-center justify-center gap-8 shadow-lg h-[30vh] transition-all duration-500 ease-in-out hover:shadow-2xl hover:bg-gray-700 z-50">
      {sidebarItems.map((item, index) => (
        <Link to={item.path} key={index} className="relative">
          <div
            className={`text-gray-300 cursor-pointer text-2xl transition-transform duration-300 ease-in-out ${
              hoveredItem === item.name
                ? "text-blue-400 transform -translate-y-2 scale-110"
                : "hover:scale-105 hover:text-gray-400"
            }`}
            onMouseEnter={() => handleMouseEnter(item.name)}
            onMouseLeave={handleMouseLeave}
          >
            {item.icon}
            {hoveredItem === item.name && (
              <span className="absolute left-[70px] top-1/2 transform -translate-y-1/2 bg-blue-100 text-orange-600 p-2 rounded-md text-sm font-bold whitespace-nowrap shadow-md z-50">
                {item.name}
              </span>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
