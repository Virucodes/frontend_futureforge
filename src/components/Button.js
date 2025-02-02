import React from "react";

const Button = ({ name, type, onClick, className }) => {
  return (
    <button
      type={type}
      className={`w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition duration-300 ${className || ''}`}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default Button;