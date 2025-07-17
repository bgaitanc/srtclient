import React, { useEffect, useMemo, useState } from 'react';
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

const LoginPage: React.FC = () => {
  const [error, setError] = useState<string>('');
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
      try {
        setError('');
        const request: UserLoginReq = {
          user: values.username,
          password: values.password,
        };
        await loginAction(request);
      } catch {
        setError('Ocurrió un error inesperado.');
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
        setError(String(loginError.data));
      } else {
        setError('Ocurrió un error inesperado.');
      }
    }
  }, [isLoginError, loginError]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {isLoginLoading && <CircularLoading show={isLoginLoading} />}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Iniciar Sesión
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <InputField
              id="username"
              name="username"
              // TODO los labels deberían de centralizarse, i18n?
              label="Usuario"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              onBlur={formik.handleBlur}
              helperText={
                formik.touched.username && Boolean(formik.errors.username)
                  ? String(formik.errors.username)
                  : ''
              }
            />
          </div>
          <div className="mb-6">
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
                formik.touched.password && Boolean(formik.errors.password)
                  ? String(formik.errors.password)
                  : ''
              }
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-300"
            variant="contained"
            disabled={!formik.isValid}
          >
            Entrar
          </Button>
        </form>
        <p className="text-center text-gray-600 text-sm mt-6">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
