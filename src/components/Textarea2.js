// components/Textarea.js
import React from "react";

const Textarea = ({ value, onChange, placeholder, className }) => {
  return (
    <textarea
      value={value} // bind to the value prop
      onChange={onChange} // bind to the onChange prop
      placeholder={placeholder}
      className={`w-full p-2 border rounded ${className}`}
    />
  );
};

export default Textarea;
