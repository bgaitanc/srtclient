import React, { useEffect, useMemo, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import AuthForm, { type AuthFormField } from '@components/Auth/AuthForm';
import srtLogo from '@assets/images/srt_logo_transparent.png';
import { useFormik } from 'formik';
import type { UserLoginValues } from '@models/formik/UserLoginValues';
import userLoginSchema from '@schemas/userLogin.schema';
import { useLoginMutation } from '@services/authentication.service.ts';
import type { UserLoginReq } from '@models/authentication.ts';
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

  const [showPassword, setShowPassword] = useState(false);
  const fields: AuthFormField[] = [
    { id: 'username', label: 'Usuario', name: 'username' },
    { id: 'password', label: 'Contraseña', name: 'password', type: showPassword ? 'text' : 'password' },
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
          Username: values.username,
          Password: values.password,
        };
        await loginAction(request);
      } catch (error) {
        console.error('Login error:', error);
        toast.error('Ocurrió un error inesperado.', { duration: 3000 });
      }
    },
  });

  useEffect(() => {
    if (isLoginSuccess && loginData) {
      if (loginData.data?.token && loginData.data?.refreshToken) {
        login(loginData.data.token, loginData.data.refreshToken);
        navigate('/dashboard', { replace: true });
      } else {
        console.error('Token or RefreshToken missing in response');
        toast.error('Error: Tokens no recibidos del servidor', { duration: 3000 });
      }
    }
  }, [isLoginSuccess, loginData, login, navigate]);

  useEffect(() => {
    if (isLoginError && loginError) {
      console.error('Login error:', loginError);
      if ('message' in loginError) {
        toast.error(String(loginError.message), { duration: 3000 });
      } else {
        toast.error('Ocurrió un error inesperado.', { duration: 3000 });
      }
    }
  }, [isLoginError, loginError]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-0">
      <Toaster position="top-right" />
      <section className="w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2">
        <div className="hidden lg:flex flex-col items-center justify-center bg-blue-100/60 p-10">
          <img src={srtLogo} alt="SRT Logo" className="h-20 w-20 mb-6 object-contain drop-shadow" />
          <h1 className="text-3xl font-extrabold text-blue-700 mb-2 text-center">SRT Backoffice</h1>
          <p className="text-blue-700/80 text-center max-w-xs">Portal administrativo para gestionar rutas, locaciones y reservas.</p>
        </div>
        <div className="flex flex-col justify-center bg-white p-8 lg:p-12 shadow-sm">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">Inicia sesión</h2>
          <AuthForm
            fields={fields}
            formik={formik}
            buttonText="Entrar"
            loading={isLoginLoading}
            successMessage={null}
          >
            <div className="flex items-center justify-end mt-2">
              <button
                type="button"
                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                {showPassword ? 'Ocultar' : 'Mostrar'} contraseña
              </button>
            </div>
          </AuthForm>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;
