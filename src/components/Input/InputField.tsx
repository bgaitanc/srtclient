import React from 'react';
import TextField from '@mui/material/TextField';
import { Box, type InputBaseProps } from '@mui/material';

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  error?: boolean;
  onBlur?: InputBaseProps['onBlur'];
  helperText: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  error,
  name,
  onBlur,
  helperText,
}) => {
  return (
    <Box>
      <TextField
        id={id}
        name={name}
        label={label}
        variant="outlined"
        size="small"
        type={type}
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        value={value}
        onChange={onChange}
        required
        error={error}
        onBlur={onBlur}
        helperText={helperText}
      />
    </Box>
  );
};

export default InputField;
