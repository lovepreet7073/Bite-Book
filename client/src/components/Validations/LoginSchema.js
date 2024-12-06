import * as Yup from 'yup';

const LoginSchema = Yup.object({
    email: Yup.string()
        .required('Email is required')
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Invalid email format'
        ),
    password: Yup.string()
        .required('Password is required')

});

export default LoginSchema;
