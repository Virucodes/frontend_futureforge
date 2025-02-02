import React from "react";

function TextBox({ label = null, placeholder = "", value, setValue, required = false, type = "text" }) {
  return (
    <div className="relative w-full">
      {/* Label */}
      {label && (
        <label className="absolute top-[-10px] left-3 bg-white px-1 text-gray-500 text-sm font-medium">
          {label}
        </label>
      )}
      
      {/* Input Field */}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required={required}
        className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 placeholder-gray-400"
      />
    </div>
  );
}

export default TextBox;
