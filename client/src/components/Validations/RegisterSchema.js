import * as Yup from 'yup';

// Validation schema using Yup with strong password and email regex
const RegisterSchema = Yup.object({
    fullName: Yup.string()
    .required('Full name is required')
    .min(3, 'Full name must be at least 3 characters'),
  email: Yup.string()
    .required('Email is required')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email format'
    ),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character'
    ),
});

export default RegisterSchema;
