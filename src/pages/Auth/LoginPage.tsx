import React, { useEffect, useMemo } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import { Link } from 'react-router-dom';
import AuthForm, { type AuthFormField } from '@components/Auth/AuthForm';
import UserIcon from '@assets/icons/UserIcon';
import { useFormik } from 'formik';
import type { UserLoginValues } from '@models/formik/UserLoginValues';
import userLoginSchema from '@schemas/userLogin.schema';
import { useLoginMutation } from '@services/authentication.service.ts';
import type { UserLoginReq } from '@models/authentication.ts';
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

  const fields: AuthFormField[] = [
    { id: 'username', label: 'Usuario', name: 'username' },
    { id: 'password', label: 'Contraseña', name: 'password', type: 'password' },
  ];
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
          User: values.username,
          Password: values.password,
        };
        await loginAction(request);
      } catch (err) {
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
        icon={<UserIcon />}
      >
        <AuthForm
          fields={fields}
          formik={formik}
          buttonText="Entrar"
          loading={isLoginLoading}
          successMessage={null}
        >
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
        </AuthForm>
      </AuthFormCard>
    </>
  );
}

export default LoginPage;
