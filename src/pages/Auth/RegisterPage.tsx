import React, { useMemo } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useFormik } from 'formik';
import InputField from '@components/Input/InputField';
import Button from '@mui/material/Button';
import userRegisterSchema from '@schemas/userRegister.schema';
import type { UserRegisterValues } from '@models/formik/UserRegisterValues';
import CircularLoading from '@components/Loading/CircularLoading.tsx';
import { useRegisterUser } from '@hooks/useRegisterUser';
import AuthFormCard from '@components/Auth/AuthFormCard';
import { showRequiredFieldToasts } from '@utils/formToastErrors';
import { Link } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const { registerUser, isLoading, isSuccess } = useRegisterUser();

  const initialValues = useMemo<UserRegisterValues>(
    () => ({
      name: '',
      lastName: '',
      username: '',
      password: '',
      email: '',
      phone: '',
    }),
    []
  );

  const formik = useFormik<UserRegisterValues>({
    initialValues,
    validationSchema: userRegisterSchema,
    validateOnChange: true,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const errors = showRequiredFieldToasts<UserRegisterValues>(
        values,
        ['name', 'lastName', 'username', 'email', 'phone', 'password'],
        {
          name: 'Nombre',
          lastName: 'Apellido',
          username: 'Usuario',
          email: 'Correo electrónico',
          phone: 'Teléfono',
          password: 'Contraseña',
        }
      );
      if (Object.keys(errors).length > 0) {
        return;
      }
      const registerPayload = {
        nombres: values.name,
        apellidos: values.lastName,
        usuario: values.username,
        contrasena: values.password,
        correo: values.email,
        telefono: values.phone,
      };
      try {
        await registerUser(registerPayload);
        resetForm();
      } catch (err) {
        toast.error('Ocurrió un error inesperado.', { duration: 3000 });
      }
    },
  });

  return (
    <>
      <Toaster position="top-right" />
      <AuthFormCard
        title="Crear cuenta"
        subtitle="Completa tus datos para registrarte"
        icon={
          <svg
            className="w-8 h-8 text-blue-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        }
        maxWidth="max-w-lg"
      >
        {isSuccess && (
          <div className="mb-4 text-center">
            <span className="text-green-600 font-semibold">
              ¡Registro exitoso! Ahora puedes iniciar sesión.
            </span>
          </div>
        )}
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              id="name"
              label="Nombre"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={
                formik.touched.name && formik.errors.name
                  ? formik.errors.name
                  : ''
              }
            />
            <InputField
              id="lastName"
              label="Apellido"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={
                formik.touched.lastName && formik.errors.lastName
                  ? formik.errors.lastName
                  : ''
              }
            />
          </div>
          <InputField
            id="username"
            label="Usuario"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={
              formik.touched.username && formik.errors.username
                ? formik.errors.username
                : ''
            }
          />
          <InputField
            id="email"
            label="Correo electrónico"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ''
            }
          />
          <InputField
            id="phone"
            label="Teléfono"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={
              formik.touched.phone && formik.errors.phone
                ? formik.errors.phone
                : ''
            }
          />
          <InputField
            id="password"
            label="Contraseña"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : ''
            }
          />
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-300"
            variant="contained"
            disabled={isLoading}
          >
            {isLoading ? <CircularLoading show={true} /> : 'Registrarse'}
          </Button>
        </form>
        <div className="text-center mt-6">
          <span className="text-gray-600 text-sm">
            ¿Ya tienes cuenta?{' '}
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-semibold"
            >
              Inicia sesión
            </Link>
          </span>
        </div>
      </AuthFormCard>
    </>
  );
}

export default RegisterPage;
