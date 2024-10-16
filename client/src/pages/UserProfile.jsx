import React from 'react';
import { Container, Grid, Paper, Typography, TextField, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import VariantAvatars from '../components/Avatar';

const UserProfile = () => {
  const { auth } = useSelector(store => store)
  console.log(auth, 'auth')
  return (

    <Container maxWidth="lg" className="py-10 h-screen">
      <Grid container spacing={3}>
        {/* Sidebar */}
        <Grid item xs={12} sm={3}>
          <Paper elevation={3} className="p-5 flex gap-2 items-center ">
            <VariantAvatars username={auth?.user?.fullName} />


            <Typography variant="h6">Hi, {auth?.user?.fullName}</Typography>
            {/* <ul>
              <li><Button href="#" variant="text">Personal Info</Button></li>
              <li><Button href="#" variant="text">Public Profile Settings</Button></li>
              <li><Button href="#" variant="text">Saved Recipes & Collections</Button></li>
              <li><Button href="#" variant="text">Allrecipes Personal Recipes</Button></li>
            </ul> */}
          </Paper>
        </Grid>

        {/* Main content */}
        <Grid item xs={12} sm={9}>
          <Paper elevation={3} className="p-5 ">
            <div className='flex justify-between items-center'>
              <Typography variant="h5" gutterBottom>Personal Info</Typography>
              <Button
                variant="contained"
                className="mt-0 "
                sx={{
                  bgcolor: '#FF6216', // Use the primary color from Tailwind config
                  '&:hover': {
                    bgcolor: '#E55A12', // Change to secondary color from Tailwind config on hover
                  },
                
                }}
              >
                Save Changes
              </Button>

            </div>


            <Typography variant="body1" paragraph sx={{ marginTop: '13px' }}>
              These details will be used for all the Meredith profiles associated
              <br />with your email address...
            </Typography>

            <form>
              <TextField
                // label="Email Address"
                value={auth?.user?.email}
                fullWidth
                disabled
                variant="outlined"
                margin="normal"
              />
              <Typography variant="body2" color="textSecondary">
                *If you'd like to update your email address, please contact Customer Service.
              </Typography>

              <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                value={auth?.user?.fullName}
              // placeholder={auth?.user?.fullName}
              />



            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfile;
