import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../redux/Auth/Actions"; // Update the path to your actual action
import showCustomToast from "../../components/Shared/ToastComponent";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { auth } = useSelector(store => store);
    const initialValues = { email: "" };
    const validationSchema = Yup.object({
        email: Yup.string()
            .required('Email is required')
            .matches(
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                'Invalid email format'
            ),
    });

    const emailError = auth?.error?.includes("User not registered")
    ? "User not registered"
    : null;


    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        await dispatch(forgotPassword(values))
        if(!auth.error){
            showCustomToast('Password reset link sent to your email','success')

        }
       
    };

    useEffect(() => {
        if (auth?.error) {
            console.log(auth.error); // Show the error message (e.g., password reset link still valid)
        }
    }, [auth?.error]);

    return (
        <div className="w-full h-screen flex items-center">
            <div className="relative hidden w-1/2 h-full sm:hidden lg:block">
                <img
                    src="https://st2.depositphotos.com/3889193/7173/i/450/depositphotos_71739083-stock-photo-healthy-vegetarian-home-made-food.jpg"
                    className="w-full h-full object-cover object-right"
                    alt="Healthy Food"
                />
            </div>
            <div className="flex flex-col justify-center gap-3 items-center h-full bg-[#f5f5f5] lg:w-1/2 w-full px-6 lg:px-12">
                <BiLeftArrowAlt
                    className="absolute top-8 lg:left-[55%] left-[10%] cursor-pointer hover:text-primary"
                    size={30}
                    onClick={() => navigate("/")}
                />
                <div className="w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-2">Reset Your Password</h1>
                    <p className="text-sm text-gray-600 mb-6">
                        Enter your email below, and we'll send you a link to reset your password.
                    </p>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched, isSubmitting }) => (
                            <Form>
                                <Field
                                    as={TextField}
                                    required
                                    id="standard-Email-input"
                                    label="Email"
                                    type="email"
                                    name="email"
                                    variant="standard"
                                    sx={{
                                        width: "100%",
                                        marginBottom: "16px",
                                        marginTop: "10px",
                                        "& .MuiInputLabel-root": { color: "grey" },
                                        "& .MuiInput-underline:before": { borderBottomColor: "black" },
                                        "& .MuiInputBase-input": {
                                            fontSize: "14px",
                                            color: "#333",
                                        },
                                    }}
                                    error={touched.email && (Boolean(errors.email) || Boolean(emailError))}
                                    helperText={touched.email && (errors.email || emailError)}
                                />
                                {auth?.error && (
                                    <div className="text-red-500 text-sm mb-4">
                                        {!emailError && auth.error}
                                    </div>
                                )}
                                <button
                                    type="submit"
                                    className={`w-full py-2 rounded-md text-white ${isSubmitting ? "bg-gray-400" : "bg-black"}`}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Sending..." : "Send Reset Link"}
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>

                <div className="mt-6 text-sm">
                    <p>
                        Remembered your password?{" "}
                        <span
                            className="hover:primary underline cursor-pointer"
                            onClick={() => navigate("/auth/login")}
                        >
                            Login here
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
