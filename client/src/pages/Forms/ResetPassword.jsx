import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { checkTokenValidity, resetPassword } from "../../redux/Auth/Actions"; // Update the path to your actual actions
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff'; import resetPasswordSchema from "../../components/Validations/ResetSchema";
import InvalidToken from "./InvalidToken";
import showCustomToast from "../../components/Shared/ToastComponent";
const ResetPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token } = useParams(); // To get the reset token from the URL
    const [errorMessage, setErrorMessage] = useState(""); // State to handle error message
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { isTokenValid, isLoading, error } = useSelector(state => state.auth);
    console.log(isLoading, "error")
    const initialValues = { newPassword: "", confirmPassword: "" };


    useEffect(() => {
        dispatch(checkTokenValidity(token));
    }, [dispatch, token]);

    const handleSubmit = async (values, { setSubmitting }) => {
        setErrorMessage("");
        try {
            await dispatch(resetPassword({ ...values, token }));
            showCustomToast("Password reset successful! Please log in with your new password.");
            navigate("/auth/login");
        } catch (error) {
            setErrorMessage(`Failed to reset password: ${error.message}`);
        } finally {
            setSubmitting(false);
        }
    };

    if (isLoading || isTokenValid === null) {
        return <div>Loading...</div>;
    }
    
    if (isTokenValid === false || error) {
        return <InvalidToken />;
    }
    return (
        <div className="w-full h-screen flex items-center">
            <div className="relative hidden w-1/2 h-full lg:block">
                <img
                    src="https://st2.depositphotos.com/3889193/7173/i/450/depositphotos_71739083-stock-photo-healthy-vegetarian-home-made-food.jpg"
                    className="w-full h-full object-cover object-right"
                    alt="Healthy Food"
                />
            </div>
            <div className="flex flex-col justify-center gap-3 items-center h-full bg-[#f5f5f5] lg:w-1/2 w-full px-6 lg:px-12">
                <BiLeftArrowAlt
                    className="absolute top-8 left-[55%] cursor-pointer hover:text-primary"
                    size={30}
                    onClick={() => navigate("/")}
                />
                <div className="w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-2">Reset Your Password</h1>
                    <p className="text-sm text-gray-600 mb-6">
                        Enter your new password below to reset it.
                    </p>

                    {errorMessage && (
                        <div className="bg-red-100 text-red-800 p-3 rounded-md mb-4">
                            {errorMessage}
                        </div>
                    )}

                    <Formik
                        initialValues={initialValues}
                        validationSchema={resetPasswordSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched, isSubmitting }) => (
                            <Form>
                                <Field
                                    as={TextField}
                                    required
                                    id="newPassword"
                                    label="New Password"
                                    type={showPassword ? "text" : "password"}
                                    name="newPassword"
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
                                    error={touched.newPassword && Boolean(errors.newPassword)}
                                    helperText={touched.newPassword && errors.newPassword}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <Field
                                    as={TextField}
                                    required
                                    id="confirmPassword"
                                    label="Confirm Password"
                                    type={showConfirmPassword ? "text" : "password"} // Dynamically set type
                                    name="confirmPassword"
                                    variant="standard"
                                    sx={{
                                        width: "100%",
                                        marginBottom: "16px",
                                        "& .MuiInputLabel-root": { color: "grey" },
                                        "& .MuiInput-underline:before": { borderBottomColor: "black" },
                                        "& .MuiInputBase-input": {
                                            fontSize: "14px",
                                            color: "#333",
                                        },
                                    }}
                                    error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                    helperText={touched.confirmPassword && errors.confirmPassword}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle confirm password visibility"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                >
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />


                                <button
                                    type="submit"
                                    className={`w-full py-2 rounded-md text-white ${isSubmitting ? "bg-gray-400" : "bg-black"}`}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Resetting..." : "Reset Password"}
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
