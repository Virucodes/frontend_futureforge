import React, { useState, useEffect } from "react";
import Button from "../Button";
import TextBox from "../TextBox";
import { EnvelopeIcon, LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";
import axios from "axios";

function EditProfile() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const fetchUserData = async (email) => {
      try {
        if (!email) {
          alert("Email is required");
        }

        const response = await axios.get(
          `http://localhost:5000/user/getuserbyemail`,
          {
            params: { email },
          }
        );

        setId(response.data.user._id);
        setName(response.data.user.name);
        setEmail(response.data.user.email);
        setPassword(response.data.user.password);
        setConfirmPassword(response.data.user.password);
      } catch (error) {
        alert(error?.response?.data?.message);
      }
    };

    fetchUserData(localStorage.getItem("email"));
  }, []);

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userData = {
      name,
      email,
      password,
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/user/update/${id}`,
        userData
      );
      alert(response?.data?.message);
    } catch (error) {
      alert(error?.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <UserIcon className="w-10 h-10 text-blue-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-blue-900 mb-2">
              Edit Profile
            </h1>
            <p className="text-blue-600 text-sm mb-8">
              Update your personal information
            </p>

            <form className="w-full max-w-md space-y-6" onSubmit={handleUpdate}>
              <div className="space-y-4">
                <TextBox 
                  label="Name" 
                  type="text" 
                  Icon={UserIcon} 
                  value={name} 
                  setValue={setName} 
                  required={true}
                  className="bg-blue-50 border-blue-200 focus:border-blue-500"
                />

                <TextBox 
                  label="Email" 
                  type="text" 
                  Icon={EnvelopeIcon} 
                  value={email} 
                  setValue={setEmail} 
                  required={true}
                  className="bg-blue-50 border-blue-200 focus:border-blue-500"
                />

                <TextBox 
                  label="Password" 
                  type="password" 
                  Icon={LockClosedIcon} 
                  value={password} 
                  setValue={setPassword} 
                  required={true}
                  className="bg-blue-50 border-blue-200 focus:border-blue-500"
                />

                <TextBox 
                  label="Confirm Password" 
                  type="password" 
                  Icon={LockClosedIcon} 
                  value={confirmPassword} 
                  setValue={setConfirmPassword} 
                  required={true}
                  className="bg-blue-50 border-blue-200 focus:border-blue-500"
                />
              </div>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  name="Update Profile"
                  className="bg-blue-600 hover:bg-blue-700 transform hover:scale-[1.02] transition-all duration-200"
                />
              </div>
            </form>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-blue-600 text-sm">
            All your information is stored securely
          </p>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;