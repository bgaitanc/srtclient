import * as Yup from 'yup';
import type { UserLoginValues } from '@models/formik/UserLoginValues.ts';

const userLoginSchema = Yup.object().shape<
  Record<keyof UserLoginValues, Yup.AnySchema>
>({
  // TODO los mensajes de validación deberían de centralizarse, i18n?
  username: Yup.string()
    .ensure()
    .trim()
    .required('El nombre de usuario es requerido'),
  password: Yup.string().ensure().trim().required('La contraseña es requerida'),
});

export default userLoginSchema;
