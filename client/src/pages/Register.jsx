import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import RegisterSchema from "../components/Validations/RegisterSchema";
import { register } from "../redux/Auth/Actions"; 
import GoogleLoginComponent from "../components/GoogleLoginComponent";
import revealElements from "../scrollReveal";
import showCustomToast from "../components/ToastComponent";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { BiLeftArrowAlt } from "react-icons/bi";
const Register = () => {
  useEffect(() => {
    revealElements(); 
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector(store => store);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const emailError = auth?.error && auth?.error?.error && auth?.error?.error?.includes("User already exists")
    ? "User already exists"
    : null;

  const handleSubmit = (values) => {
    dispatch(register(values, navigate))
      .then(() => {
        showCustomToast('Register successfully', 'success');
      })
    
  };

  return (
    <div className="w-full h-screen flex items-center ">
      <div className="relative hidden w-1/2 h-full lg:flex flex-col sm:hidden lg:block right">
        <img
          src="https://st2.depositphotos.com/3889193/7173/i/450/depositphotos_71739083-stock-photo-healthy-vegetarian-home-made-food.jpg"
          className="w-full h-full object-cover object-right "
        />
      </div>
      <div className="h-full bg-[#f5f5f5] left flex flex-col lg:w-1/2 w-full px-[2rem] lg:px-[7rem] py-2 justify-around items-center">
      <BiLeftArrowAlt className="absolute top-[7%] left-[2%] mb-[2%] cursor-pointer hover:text-primary" size={33} title="Back to Home" onClick={()=>navigate('/')}/>
        <div className="w-full flex flex-col max-w-[500px] mt-5">
          <div className="w-full flex flex-col mb-2">
            <h3 className="text-xl font-semibold mb-2">Sign Up and Share Your Recipes!</h3>
            <p className="text-sm mb-2">Welcome to BiteBook! 🍲🍴</p>
          </div>

          <Formik
            initialValues={{
              fullName: '',
              email: '',
              password: '',
              confirmPassword: ''
            }}
            validationSchema={RegisterSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form className="w-full flex flex-col">
                <Field
                  as={TextField}
                  id="fullName"
                  name="fullName"
                  label="Full Name"
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
                  value={values.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.fullName && errors.fullName ? errors.fullName : ""}
                  error={touched.fullName && Boolean(errors.fullName)}
                />

                <Field
                  as={TextField}
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
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
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && (Boolean(errors.email) || Boolean(emailError))}
                  helperText={touched.email && (errors.email || emailError)}
                />

                <Field
                  as={TextField}
                  id="password"
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
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
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.password && errors.password ? errors.password : ""}
                  error={touched.password && Boolean(errors.password)}
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
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
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
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : ""}
                  error={touched.confirmPassword && Boolean(errors.confirmPassword)}
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

                <div className="w-full flex flex-col">
                  <button type="submit" className="hero-buttons w-full my-4 rounded-md mt-3 p-3 text-center flex items-center justify-center text-white bg-[#060606] font-semibold">
                    Sign Up
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <div className="w-full flex items-center justify-center relative py-2">
            <div className="w-full h-[1px] bg-black"></div>
            <p className="text-lg absolute text-black/80 bg-[#f5f5f5]">or</p>
          </div>
          <div className="mt-2 hero-buttons2">
            <GoogleLoginComponent />
          </div>
        </div>

        <div className="w-full flex items-center justify-center">
          <p className="text-sm font-normal text-[#060606] mt-0">
            Already have an account?{" "}
            <span className="font-semibold underline underline-offset-2 cursor-pointer" onClick={() => navigate('/auth/login')}>
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
