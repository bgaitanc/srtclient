import * as Yup from 'yup';
import type { UserRegisterValues } from '@models/formik/UserRegisterValues.ts';

const userRegisterSchema = Yup.object().shape<
  Record<keyof UserRegisterValues, Yup.AnySchema>
>({
  name: Yup.string().ensure().trim().required('El nombre es requerido'),
  lastName: Yup.string().ensure().trim().required('El apellido es requerido'),
  username: Yup.string()
    .ensure()
    .trim()
    .required('El nombre de usuario es requerido'),
  password: Yup.string()
    .ensure()
    .trim()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es requerida'),
  email: Yup.string()
    .ensure()
    .trim()
    .email('El correo electrónico no es válido')
    .required('El correo electrónico es requerido'),
  phone: Yup.string()
    .ensure()
    .trim()
    .required('El número de teléfono es requerido'),
});

export default userRegisterSchema;
