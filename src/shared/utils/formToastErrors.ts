import { toast } from 'react-hot-toast';

export function showRequiredFieldToasts<T extends Record<string, any>>(
  values: T,
  requiredFields: Array<keyof T>,
  fieldLabels: Partial<Record<keyof T, string>>,
  duration = 2500
): Partial<T> {
  const errors: Partial<T> = {};
  requiredFields.forEach((field) => {
    if (!values[field]) {
      const label = fieldLabels[field] || String(field);
      toast.error(`${label} es requerido`, { duration });
      errors[field] = `${label} es requerido` as any;
    }
  });
  return errors;
}
