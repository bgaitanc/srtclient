import React, { useMemo } from 'react';
import { useFormik } from 'formik';
import InputField from '@components/Input/InputField';
import Button from '@mui/material/Button';
import userRegisterSchema from '@schemas/userRegister.schema';
import type { UserRegisterValues } from '@models/formik/UserRegisterValues';
import CircularLoading from '@components/Loading/CircularLoading.tsx';
import { useRegisterUser } from '@hooks/useRegisterUser';

const RegisterPage: React.FC = () => {
  const { registerUser, isLoading, error, isSuccess } = useRegisterUser();

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
        // El error se maneja en el hook
      }
    },
  });

  return (
    <div className="register-container">
      <h2>Registro</h2>
      {isSuccess && (
        <p style={{ color: 'green' }}>
          ¡Registro exitoso! Ahora puedes iniciar sesión.
        </p>
      )}
      <form onSubmit={formik.handleSubmit}>
        <InputField
          id="name"
          label="Nombre"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name ? formik.errors.name : ''}
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
        >
          {isLoading ? <CircularLoading show={true} /> : 'Registrarse'}
        </Button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <div>
        ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
      </div>
    </div>
  );
};

export default RegisterPage;
