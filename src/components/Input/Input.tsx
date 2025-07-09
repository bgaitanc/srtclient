import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ id, placeholder, ...rest }) => {
  return (
    <input
      id={id}
      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      placeholder={placeholder}
      {...rest}
    />
  );
};

export default Input;