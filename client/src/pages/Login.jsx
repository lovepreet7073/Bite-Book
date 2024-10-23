import React from "react";
import { useState } from "react";
import GoogleLoginComponent from "../components/GoogleLoginComponent";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from 'formik';
import TextField from '@mui/material/TextField';
import LoginSchema from "../components/Validations/LoginSchema";
import { useDispatch } from "react-redux";
import { login } from "../redux/Auth/Actions";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import revealElements from "../scrollReveal";
const Login = () => {
    useEffect(() => {
        revealElements(); // Initialize ScrollReveal
    }, []);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = (values) => {
        const userData = {
            email: values.email,
            password: values.password,
        };
        dispatch(login(userData, navigate));
    };
    // Access Redux state for potential backend errors
    const auth = useSelector(state => state.auth);

    const [initialErrors, setInitialErrors] = useState({ email: '', password: '' });
    useEffect(() => {
        if (auth?.error) {
            console.log(auth?.error);  // Check the structure
            const emailError = auth?.error?.error?.includes("User not found with email")
                ? "User not found with this email"
                : '';
            const passwordError = auth?.error?.error?.includes("Invalid Password")
                ? "Invalid Password"
                : '';
            setInitialErrors({ email: emailError, password: passwordError });
        }
    }, [auth?.error]);


    return (
        <div className="w-full h-screen flex items-center ">
            <div className="relative hidden  w-1/2 h-full lg:flex flex-col sm:hidden lg:block right">
                <img
                    src="https://st2.depositphotos.com/3889193/7173/i/450/depositphotos_71739083-stock-photo-healthy-vegetarian-home-made-food.jpg"
                    className="w-full h-full object-cover object-right"
                    alt="Healthy Food"
                />
            </div>
            <div className="left h-full bg-[#f5f5f5] flex flex-col lg:w-1/2 w-full px-[2rem] lg:px-[7rem] py-2 justify-around items-center">
                <div className="w-full flex flex-col max-w-[500px]">
                    <div className="w-full flex flex-col ">
                <h1 className="w-full text-xl text-[#060606] font-semibold max-w-[500px] mx-auto mr-auto mb-4 mt-2">BiteBook</h1>

                        <h3 className="text-3xl font-semibold mb-2 mt-2">Login</h3>
                        <p className="text-sm mb-2">Welcome Back! Please enter your details</p>
                    </div>

                    {/* Formik Form */}
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={LoginSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form className="w-full flex flex-col">
                                <Field
                                    as={TextField}
                                    id="standard-Email-input"
                                    label="Email"
                                    type="email"
                                    name="email"
                                    variant="standard"
                                    sx={{
                                        width: '100%',
                                        marginBottom: '16px',
                                        marginTop: '10px',
                                        '& .MuiInputLabel-root': { color: 'grey' },
                                        '& .MuiInput-underline:before': { borderBottomColor: 'black' },
                                        '& .MuiInputBase-input': {
                                            fontSize: '14px',
                                            color: '#333',
                                        },
                                    }}
                                    error={touched.email && (Boolean(errors.email) || Boolean(initialErrors.email))}
                                    helperText={touched.email && (errors.email || initialErrors.email)}
                                />
                                <Field
                                    as={TextField}
                                    id="standard-password-input"
                                    label="Password"
                                    type="password"
                                    name="password"
                                    variant="standard"
                                    sx={{
                                        width: '100%',
                                        marginBottom: '16px',
                                        marginTop: '10px',
                                        '& .MuiInputLabel-root': { color: 'grey' },
                                        '& .MuiInput-underline:before': { borderBottomColor: 'black' },
                                        '& .MuiInputBase-input': {
                                            fontSize: '14px',
                                            color: '#333',
                                        },
                                    }}
                                    error={touched.password && (Boolean(errors.password) || Boolean(initialErrors.password))}
                                    helperText={touched.password && (errors.password || initialErrors.password)}
                                />
                                <div className="w-full">
                                    <p className="text-sm underline underline-offset-2 text-right font-medium cursor-pointer whitespace-nowrap">
                                        Forgot password?
                                    </p>
                                </div>
                                <div className="w-full flex flex-col">
                                    <button type="submit" className="w-full my-4 rounded-md p-3 text-center flex items-center justify-center text-white bg-[#060606] font-semibold">
                                        LogIn
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>

                    <div className="w-full flex items-center justify-center relative py-2">
                        <div className="w-full h-[1px] bg-black"></div>
                        <p className="text-lg absolute text-black/80 bg-[#f5f5f5]">or</p>
                    </div>

                    <div className="mt-2">
                        <GoogleLoginComponent />

                    </div>

                </div>
                <div className="w-full flex items-center justify-center">
                    <p className="text-sm font-normal text-[#060606] mt-0">
                        Create an account?{" "}
                        <span className="font-semibold underline underline-offset-2 cursor-pointer" onClick={() => navigate('/auth/register')}>
                            Register
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
