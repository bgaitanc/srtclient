import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...rest }) => {
  return (
    <button
      className={`px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;