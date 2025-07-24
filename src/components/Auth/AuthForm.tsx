import React from 'react';
import InputField from '@components/Input/InputField';
import Button from '@mui/material/Button';
import CircularLoading from '@components/Loading/CircularLoading.tsx';

export interface AuthFormField {
  id: string;
  label: string;
  name: string;
  type?: string;
  grid?: boolean;
}

interface AuthFormProps {
  fields: AuthFormField[];
  formik: any;
  buttonText: string;
  loading?: boolean;
  gridCols?: string;
  successMessage?: React.ReactNode;
  children?: React.ReactNode;
}

const AuthForm: React.FC<AuthFormProps> = ({ fields, formik, buttonText, loading, gridCols = 'grid-cols-1', successMessage, children }) => (
  <>
    {successMessage}
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div className={`grid ${gridCols} gap-4`}>
        {fields.map((field) => (
          <InputField
            key={field.id}
            id={field.id}
            label={field.label}
            name={field.name}
            type={field.type}
            value={formik.values[field.name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
            helperText={
              formik.touched[field.name] && formik.errors[field.name]
                ? formik.errors[field.name]
                : ''
            }
          />
        ))}
      </div>
      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-300"
        variant="contained"
        disabled={loading}
      >
        {loading ? <CircularLoading show={true} /> : buttonText}
      </Button>
    </form>
    {children}
  </>
);

export default AuthForm;
