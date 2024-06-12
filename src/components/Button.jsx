import React from 'react';

const Button = ({ type, children, className }) => {
  return (
    <button type={type} className={`w-[100%] rounded p-2 font-semibold ${className}`}>
      {children}
    </button>
  );
};

export default Button;
