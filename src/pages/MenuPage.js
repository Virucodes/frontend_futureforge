import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assests/images/logo.png";
import {
  ChartBarIcon,
  PencilSquareIcon,
  EyeIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

const MenuPage = ({ page }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any authentication tokens from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Clear any other auth-related data you might have stored
    
    // Optional: Clear any application state
    // If using Redux or other state management, dispatch logout action here
    
    // Redirect to login page
    navigate('/');
  };

  return (
    <div className="flex flex-row h-screen w-full bg-blue-50">
      <div className="h-screen w-1/6 bg-blue-600 shadow-md">
        <div className="flex flex-row justify-center w-full p-3 border-b border-blue-500 bg-blue-600">
          <div className="font-serif text-2xl text-white tracking-widest py-1">
            FutureForge
          </div>
        </div>
        <div className="flex flex-col">
          <Link
            to="/chat"
            className={`w-full flex flex-row py-4 text-white text-md ${
              location.pathname === "/chat" ? "bg-blue-800" : "hover:bg-blue-700"
            }`}
          >
            <EyeIcon className="w-8 h-8 mx-5" />
            <button>Chat Interface</button>
          </Link>

          <Link
            to="/dashboard"
            className={`w-full flex flex-row py-4 text-white text-md ${
              location.pathname === "/dashboard" ? "bg-blue-800" : "hover:bg-blue-700"
            }`}
          >
            <ChartBarIcon className="w-8 h-8 mx-5" />
            <button>Dashboard</button>
          </Link>

          <Link
            to="/editprofile"
            className={`w-full flex flex-row py-4 text-white text-lg ${
              location.pathname === "/editprofile" ? "bg-blue-800" : "hover:bg-blue-700"
            } mb-10`}
          >
            <PencilSquareIcon className="w-8 h-8 mx-5" />
            <button>Edit profile</button>
          </Link>
        </div>

        <div className="flex flex-col-reverse">
          <button
            onClick={handleLogout}
            className="w-full flex flex-row hover:bg-red-500 py-4 text-white text-md transition-colors duration-200"
          >
            <ArrowLeftStartOnRectangleIcon className="w-8 h-8 mx-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
      <div className="flex flex-col w-5/6 pb-5">
        <div className="flex flex-row-reverse w-full p-3 shadow-md bg-blue-600">
          <Link to="/career-advisor">
            <img src={logo} alt="Career Advisor" className="w-10 h-10 rounded-xl mr-6 cursor-pointer" />
          </Link>
        </div>

        <div style={{ maxHeight: "90%" }}>{page}</div>
      </div>
    </div>
  );
};

export default MenuPage;