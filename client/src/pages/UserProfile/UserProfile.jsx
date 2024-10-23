import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, TextField, Button, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import VariantAvatars from '../../components/Avatar';
import { updateUser } from '../../redux/Auth/Actions';
import showCustomToast from '../../components/ToastComponent';
import UserRecipes from './UserRecipes';
import { userRecipes } from '../../redux/Recipe/Actions';
const UserProfile = () => {
  const { auth, recipe } = useSelector((store) => store);
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
  });

  const [activeSection, setActiveSection] = useState('personalInfo'); // Track active section
  const token = localStorage.getItem('jwt');
  const dispatch = useDispatch();
  const userId = auth?.user?._id;

  // Fetch recipes when the "My Recipes" section is active
  useEffect(() => {
    if (activeSection === 'myRecipes' && userId) {
      dispatch(userRecipes(userId, token));
    }
  }, [activeSection, userId, dispatch, recipe.deletedrecipe]);

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
    <Container maxWidth="lg" className="py-10">
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
          <Paper elevation={3} className="p-5 lg:mb-[18%]">
            {/* Conditionally render the content based on the active section */}
            {activeSection === 'personalInfo' ? (
              <>
                <div className="flex justify-between items-center ">
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
              <UserRecipes />
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfile;
