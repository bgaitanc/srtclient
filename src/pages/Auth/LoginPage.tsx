import React, { useEffect, useMemo } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import { Link } from 'react-router-dom';
import InputField from '@components/Input/InputField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import type { UserLoginValues } from '@models/formik/UserLoginValues';
import userLoginSchema from '@schemas/userLogin.schema';
import { useLoginMutation } from '@services/authentication.service.ts';
import type { UserLoginReq } from '@models/authentication.ts';
import CircularLoading from '@components/Loading/CircularLoading.tsx';
import AuthFormCard from '@components/Auth/AuthFormCard';
import { showRequiredFieldToasts } from '@utils/formToastErrors';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [
    loginAction,
    {
      data: loginData,
      isSuccess: isLoginSuccess,
      isError: isLoginError,
      error: loginError,
      isLoading: isLoginLoading,
    },
  ] = useLoginMutation();

  const initialValues = useMemo<UserLoginValues>(
    () => ({
      username: '',
      password: '',
    }),
    []
  );

  const formik = useFormik<UserLoginValues>({
    initialValues: initialValues,
    validationSchema: userLoginSchema,
    validateOnChange: true,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const errors = showRequiredFieldToasts<UserLoginValues>(
        values,
        ['username', 'password'],
        { username: 'Usuario', password: 'Contraseña' }
      );
      if (Object.keys(errors).length > 0) {
        return;
      }
      try {
        const request: UserLoginReq = {
          user: values.username,
          password: values.password,
        };
        await loginAction(request);
      } catch (err) {
        console.error('Login ERROR:', err);
        toast.error('Ocurrió un error inesperado.', { duration: 3000 });
      }
    },
  });

  useEffect(() => {
    if (isLoginSuccess && loginData) {
      login(loginData.token);
      navigate('/dashboard');
    }
  }, [isLoginSuccess, loginData]);

  useEffect(() => {
    if (isLoginError && loginError) {
      if ('data' in loginError) {
        toast.error(String(loginError.data), { duration: 3000 });
      } else {
        toast.error('Ocurrió un error inesperado.', { duration: 3000 });
      }
    }
  }, [isLoginError, loginError]);

  return (
    <>
      <Toaster position="top-right" />
      <AuthFormCard
        title="Iniciar Sesión"
        subtitle="Accede con tu usuario y contraseña"
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
      >
        {isLoginLoading && <CircularLoading show={isLoginLoading} />}
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <InputField
            id="username"
            name="username"
            label="Usuario"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            onBlur={formik.handleBlur}
            helperText={
              formik.touched.username && formik.errors.username
                ? String(formik.errors.username)
                : ''
            }
          />
          <InputField
            id="password"
            name="password"
            label="Contraseña"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            onBlur={formik.handleBlur}
            helperText={
              formik.touched.password && formik.errors.password
                ? String(formik.errors.password)
                : ''
            }
          />
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-300"
            variant="contained"
            disabled={!formik.isValid}
          >
            Entrar
          </Button>
        </form>
        <div className="text-center mt-6">
          <span className="text-gray-600 text-sm">
            ¿No tienes cuenta?{' '}
            <Link
              to="/register"
              className="text-blue-600 hover:underline font-semibold"
            >
              Regístrate aquí
            </Link>
          </span>
        </div>
      </AuthFormCard>
    </>
  );
}

export default LoginPage;
