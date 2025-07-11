import React from 'react';
import TextField from '@mui/material/TextField';

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
}) => {
  return (
    <TextField
      id={id}
      label={label}
      variant="outlined"
      size="small"
      type={type}
      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      value={value}
      onChange={onChange}
      required
    />
  );
};

export default InputField;