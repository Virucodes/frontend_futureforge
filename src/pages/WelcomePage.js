import React from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import careerAnimation from "../assests/animations/careerguidance.json"; // Add your Lottie JSON file here

import backgroundImage from "../assests/images/background1.png";
import logo from "../assests/images/logo.png";

const WelcomePage = () => {
  return (
    <div className="bg-cover min-h-screen overflow-auto" style={{ backgroundImage: `url(${backgroundImage})` }}>

      
      {/* Navbar */}
      <div className="flex flex-row px-20 fixed top-0 right-0 left-0 bg-blue bg-opacity-80 shadow-md">

        <div className="flex flex-row justify-start w-1/2 py-4 items-center">
          <img src={logo} alt="logo" className="w-12 h-12 rounded-xl shadow-lg" />
          <div className="text-blue-900 font-serif text-3xl text-gray-800 font-bold tracking-widest ml-5">
            FutureForge
          </div>
        </div>
        <div className="flex flex-row justify-end w-1/2 py-4 items-center">
          <Link
            to="/register"
            className="text-white px-6 py-2 mx-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all shadow-md">
            Sign Up
          </Link>
          <Link
            to="/login"
            className="text-white px-6 py-2 mx-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all shadow-md">
            Sign In
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
        
        {/* Lottie Animation */}
        <div className="w-2/3 md:w-1/2 lg:w-1/3">
          <Lottie animationData={careerAnimation} loop={true} />
        </div>

        {/* Heading & Subtext */}
        <h1 className="text-5xl font-extrabold text-blue-900 mt-6 tracking-wide shadow-sm">

            Discover Your Perfect Career Path
        </h1>
        <p className="text-lg text-gray-200 mt-4 max-w-2xl leading-relaxed">

          Our AI-powered guidance system helps you explore careers based on your skills, interests, and future goals.
        </p>


        {/* CTA Buttons */}
        <div className="mt-6 mb-10">
          <Link
            to="/explore"
            className="text-white px-6 py-3 mx-2 rounded-lg bg-green-600 hover:bg-green-700 transition-all shadow-md text-lg">
            Get Started
          </Link>
          <Link
            to="/about"
            className="text-white px-6 py-3 mx-2 rounded-lg border border-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-md text-lg">
            Learn More
          </Link>
        </div>

      </div>
    </div>
  );
};

export default WelcomePage;
