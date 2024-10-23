import React from "react";
import TextField from '@mui/material/TextField';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import RegisterSchema from "../components/Validations/RegisterSchema";
import { register } from "../redux/Auth/Actions";// if you already have this schema defined
import GoogleLoginComponent from "../components/GoogleLoginComponent";
import revealElements from "../scrollReveal";
import showCustomToast from "../components/ToastComponent";
const Register = () => {
  useEffect(() => {
    revealElements(); // Initialize ScrollReveal
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector(store => store);
  const emailError = auth?.error && auth?.error?.error && auth?.error?.error?.includes("User already exists")
    ? "User already exists"
    : null;
  const handleSubmit = (values) => {

    dispatch(register(values, navigate));
    showCustomToast('Register successfully', 'success'); // Adjust the message as needed


  };

  return (
    <div className="w-full h-screen flex items-center ">
      <div className="relative hidden  w-1/2 h-full lg:flex flex-col sm:hidden lg:block right">
        <img
          src="https://st2.depositphotos.com/3889193/7173/i/450/depositphotos_71739083-stock-photo-healthy-vegetarian-home-made-food.jpg"
          className="w-full h-full object-cover object-right "
        />
      </div>
      <div className="h-full bg-[#f5f5f5] left flex flex-col lg:w-1/2 w-full px-[2rem] lg:px-[7rem] py-2 justify-around items-center">
        <div className="w-full flex flex-col max-w-[500px]">
          <div className="w-full flex flex-col mb-2">
            <h3 className="text-xl font-semibold mb-2">Sign Up and Share Your Recipes!</h3>
            <p className="text-sm mb-2">Welcome to BiteBook! 🍲🍴</p>
          </div>

          {/* Formik form starts here */}
          <Formik
            initialValues={{
              fullName: '',
              email: '',
              password: '',
            }}
            validationSchema={RegisterSchema} // Use your validation schema here
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
                    width: '100%', // Set width to full container
                    marginBottom: '16px', // Adjust bottom margin
                    marginTop: '10px', // Adjust top margin
                    '& .MuiInputLabel-root': { color: 'grey' }, // Label color
                    '& .MuiInput-underline:before': { borderBottomColor: 'black' }, // Line color before input

                    '& .MuiInputBase-input': {
                      fontSize: '14px', // Font size for input text
                      color: '#333', // Text color for input
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
                    width: '100%', // Set width to full container
                    marginBottom: '16px', // Adjust bottom margin
                    marginTop: '10px', // Adjust top margin
                    '& .MuiInputLabel-root': { color: 'grey' }, // Label color
                    '& .MuiInput-underline:before': { borderBottomColor: 'black' }, // Line color before input

                    '& .MuiInputBase-input': {
                      fontSize: '14px', // Font size for input text
                      color: '#333', // Text color for input
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
                  type="password"
                  variant="standard"
                  sx={{
                    width: '100%', // Set width to full container
                    marginBottom: '16px', // Adjust bottom margin
                    marginTop: '10px', // Adjust top margin
                    '& .MuiInputLabel-root': { color: 'grey' }, // Label color
                    '& .MuiInput-underline:before': { borderBottomColor: 'black' }, // Line color before input

                    '& .MuiInputBase-input': {
                      fontSize: '14px', // Font size for input text
                      color: '#333', // Text color for input
                    },
                  }}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.password && errors.password ? errors.password : ""}
                  error={touched.password && Boolean(errors.password)}
                />

                <div className="w-full flex items-center justify-between">
                  {/* <div className="w-full flex items-center">
                    <Field type="checkbox" name="rememberMe" className="w-4 h-4 mr-2" />
                    <label htmlFor="rememberMe">Remember me for 30 days</label>
                  </div> */}
                </div>

                <div className="w-full flex flex-col">
                  <button type="submit" className="hero-buttons w-full hover: my-4 rounded-md mt-3 p-3 text-center flex items-center justify-center text-white bg-[#060606] font-semibold">
                    Sign Up
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          {/* Formik form ends here */}

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
