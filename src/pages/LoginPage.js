import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import backgroundImage from "../assests/images/background1.png";
import loginImage from "../assests/images/login.jpg";
import TextBox from "../components/TextBox";
import Button from "../components/Button";
import axios from "axios";
import WelcomeAnimation from "../components/WelcomeAnimation"; // Import the animation component

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false); // State for animation

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://backend-wm1d.onrender.com/user/login", {
        email,
        password,
      });
  
      // Store the token from your backend response
      localStorage.setItem('token', response.data.token);
      localStorage.setItem("email", email);
      
      if (remember) {
        localStorage.setItem("password", password);
      } else {
        localStorage.removeItem("password");
      }
  
      setShowAnimation(true);
  
      setTimeout(() => {
        navigate("/chat");
      }, 10000);
      
    } catch (error) {
      if (error?.response?.data?.code === 13003 || error?.response?.data?.code === 13004) {
        alert(error?.response?.data?.message);
      } else {
        alert(error?.response?.data?.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center bg-cover h-screen" style={{ backgroundImage: `url(${backgroundImage})` }}>
      {/* Show Welcome Animation if login is successful */}
      {showAnimation ? (
        <WelcomeAnimation />
      ) : (
        <div className="flex justify-center items-center w-4/5 h-4/5 m-4 p-6 bg-white shadow-2xl rounded-xl border border-gray-200">
          {/* Left Section - Image */}
          <div className="flex justify-center items-center w-3/5 mr-10 border-r-2 border-blue-300">
            <img src={loginImage} alt="Login" className="w-3/4" />
          </div>

          {/* Right Section - Form */}
          <div className="w-2/5">
            <form className="mr-10 ml-4" onSubmit={handleLogin}>
              <p className="font-sans text-blue-700 text-2xl text-center font-bold tracking-widest mb-5">
                LOGIN TO YOUR ACCOUNT
              </p>

              {/* Email Field */}
              <TextBox placeholder="Enter your email" label="Email" type="text" Icon={EnvelopeIcon} value={email} setValue={setEmail} required />

              {/* Password Field */}
              <div className="relative my-4 w-full">
                <label className="absolute top-[-10px] left-3 bg-white px-1 text-gray-500 text-sm font-medium">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 placeholder-gray-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="button" className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeSlashIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
                </button>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center mb-5">
                <input type="checkbox" id="checkbox" className="h-4 w-4 rounded mr-2 accent-blue-600" checked={remember} onChange={() => setRemember(!remember)} />
                <label htmlFor="checkbox" className="text-gray-600">Remember me</label>
              </div>

              {/* Sign In Button */}
              <Button name="Sign In" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 rounded-lg shadow-md transition-all" />

              {/* Signup Link */}
              <p className="text-gray-600 mt-4 text-center">
                Don't have an account?{" "}
                <Link to="/register" className="text-blue-600 font-semibold hover:underline">
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
