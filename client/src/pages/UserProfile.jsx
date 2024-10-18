import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, TextField, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Ensure you have this to navigate to recipe pages
import VariantAvatars from '../components/Avatar';
import { updateUser } from '../redux/Auth/Actions';
import { userRecipes } from '../redux/Recipe/Actions'; // Make sure this path is correct
import showCustomToast from '../components/ToastComponent';
import { API_BASE_URL } from '../config/apiUrl'; // Assuming you have the API base URL

const UserProfile = () => {
  const { auth, recipe } = useSelector((store) => store);
  const token = localStorage.getItem('jwt');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = auth?.user?._id;

  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
  });
  const [activeSection, setActiveSection] = useState('personalInfo'); // Track active section

  // Fetch recipes when the "My Recipes" section is active
  useEffect(() => {
    if (activeSection === 'myRecipes' && userId) {
      dispatch(userRecipes(userId,token));
    }
  }, [activeSection, userId, dispatch]);

  useEffect(() => {
    if (auth.user) {
      const { fullName, email } = auth.user;
      setUserData({
        fullName,
        email,
      });
    }
  }, [auth.user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updatedUser = {
      fullName: userData.fullName,
      email: userData.email,
    };

    dispatch(updateUser(updatedUser, token));
    showCustomToast('Profile updated successfully!', 'success');
  };

  return (
    <Container maxWidth="lg" className="py-10 ">
      <Grid container spacing={6}>
        {/* Sidebar */}
        <Grid item xs={12} sm={3}>
          <Paper elevation={3} className="flex gap-2 flex-col">
            <div className="flex items-center gap-2 p-3">
              <VariantAvatars username={auth?.user?.fullName} />
              <Typography variant="h6">Hi, {auth?.user?.fullName}</Typography>
            </div>
            {/* Buttons to toggle sections */}
            <button
              className={`w-full text-left p-3 hover:bg-slate-200 ${activeSection === 'personalInfo' ? 'border-l-primary border-l-4' : 'border-l-0'
                }`}
              onClick={() => setActiveSection('personalInfo')}
            >
              Personal Info
            </button>
            <button
              className={`w-full text-left p-3 hover:bg-slate-200 ${activeSection === 'myRecipes' ? 'border-l-primary border-l-4' : 'border-l-0'
                }`}
              onClick={() => setActiveSection('myRecipes')}
            >
              My Recipes
            </button>
          </Paper>
        </Grid>

        {/* Main content */}
        <Grid item xs={12} sm={9}>
          <Paper elevation={3} className="p-5">
            {/* Conditionally render the content based on the active section */}
            {activeSection === 'personalInfo' ? (
              <>
                <div className="flex justify-between items-center">
                  <Typography variant="h5" gutterBottom>
                    Personal Info
                  </Typography>
                  <Button
                    type="submit"
                    form="user-form"
                    variant="contained"
                    sx={{
                      bgcolor: '#FF6216',
                      '&:hover': {
                        bgcolor: '#E55A12',
                      },
                    }}
                  >
                    Save Changes
                  </Button>
                </div>

                <Typography variant="body1" paragraph sx={{ marginTop: '13px' }}>
                  These details will be used for all the Meredith profiles associated with your email address...
                </Typography>

                <form id="user-form" onSubmit={handleSave}>
                  <TextField
                    name="email"
                    value={userData.email}
                    fullWidth
                    disabled
                    onChange={handleChange}
                    variant="outlined"
                    margin="normal"
                  />
                  <Typography variant="body2" color="textSecondary">
                    *If you'd like to update your email address, please contact Customer Service.
                  </Typography>

                  <TextField
                    fullWidth
                    name="fullName"
                    variant="outlined"
                    margin="normal"
                    value={userData.fullName}
                    onChange={handleChange}
                  />
                </form>
              </>
            ) : (
              <div className=' '>
                {/* Render user's recipes */}
                <div className='flex items-center justify-between sticky'>
                  <div>
                    <h1 className='text-3xl font-bold'>Bite Book Personal Recipes</h1>
                    <p className='text-md text-grey-400 mt-4'>Recipes you have created on Bite Book.</p>
                  </div>
                  <Button
                    type="text"
                    form="user-form"
                    onClick={()=>navigate('/user/add-recipe')}
                    variant="contained"
                    sx={{
                      bgcolor: '#FF6216',
                      '&:hover': {
                        bgcolor: '#E55A12',
                      },
                    }}
                  >
                    Add a recipe
                  </Button>

                </div>
                <hr className='w-full mt-2 mb-2' />
                <div className='grid grid-cols-3 mt-[5%]'>
                  {recipe?.userRecipes?.length > 0 ? (
                    recipe.userRecipes.map((recipe, index) => (
                      <div
                        key={recipe._id}
                        className="hero-title  hover:cursor-pointer w-[16rem]"
                        onClick={() => navigate(`/user/recipe/${recipe._id}`)}
                      >
                        <div className="mb-4 flex flex-col gap-2">
                          {/* Recipe Image */}
                          {recipe.imageUrl && (
                            <div className="h-[10rem]">
                              <img
                                className="h-full imghover w-full object-cover object-top"
                                src={`${API_BASE_URL}/images/${recipe.imageUrl}`}
                                alt={recipe.title}
                              />
                            </div>
                          )}

                          {/* Recipe Title and Cuisine */}
                          <div className="px-1  bg-white">

                            <h5
                              className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white"
                              style={{ transition: 'underline 0.3s ease' }}
                            >
                              {recipe.title}
                            </h5>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <Typography>No recipes found.</Typography>
                  )}
                </div>

              </div>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfile;
