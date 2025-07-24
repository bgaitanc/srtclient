import React, { useMemo } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useFormik } from 'formik';
import userRegisterSchema from '@schemas/userRegister.schema';
import type { UserRegisterValues } from '@models/formik/UserRegisterValues';
import { useRegisterUser } from '@hooks/useRegisterUser';
import AuthFormCard from '@components/Auth/AuthFormCard';
import { showRequiredFieldToasts } from '@utils/formToastErrors';
import { Link } from 'react-router-dom';
import AuthForm from '@components/Auth/AuthForm';
import type { AuthFormField } from '@components/Auth/AuthForm';
import UserIcon from '@assets/icons/UserIcon';

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

  const fields: AuthFormField[] = [
    { id: 'name', label: 'Nombre', name: 'name', grid: true },
    { id: 'lastName', label: 'Apellido', name: 'lastName', grid: true },
    { id: 'username', label: 'Usuario', name: 'username' },
    { id: 'password', label: 'Contraseña', name: 'password', type: 'password' },
    { id: 'email', label: 'Correo electrónico', name: 'email' },
    { id: 'phone', label: 'Teléfono', name: 'phone' },
  ];
  const formik = useFormik<UserRegisterValues>({
    initialValues,
    validationSchema: userRegisterSchema,
    validateOnChange: true,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const errors = showRequiredFieldToasts<UserRegisterValues>(
        values,
        ['name', 'lastName', 'username', 'password', 'email', 'phone'],
        {
          name: 'Nombre',
          lastName: 'Apellido',
          username: 'Usuario',
          password: 'Contraseña',
          email: 'Correo electrónico',
          phone: 'Teléfono',
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
        icon={<UserIcon />}
        maxWidth="max-w-lg"
      >
        <AuthForm
          fields={fields}
          formik={formik}
          buttonText="Registrarse"
          loading={isLoading}
          gridCols="grid-cols-1 md:grid-cols-1"
          successMessage={isSuccess && (
            <div className="mb-4 text-center">
              <span className="text-green-600 font-semibold">
                ¡Registro exitoso! Ahora puedes iniciar sesión.
              </span>
            </div>
          )}
        >
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
        </AuthForm>
      </AuthFormCard>
    </>
  );
}

export default RegisterPage;
