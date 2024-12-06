import * as Yup from 'yup';
const resetPasswordSchema = Yup.object({
  

newPassword: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character' ),
      confirmPassword: Yup.string()
      .required('Please confirm your password')
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match') // Ensures confirmPassword matches password
});
export default resetPasswordSchema;