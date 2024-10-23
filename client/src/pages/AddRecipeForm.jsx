import React from 'react';
import { Button, TextField, Grid, IconButton, Box, Divider, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Formik, Field, Form, FieldArray, ErrorMessage } from 'formik';
import { RiMenuAddFill } from "react-icons/ri";
import AddIcon from '@mui/icons-material/Add';
import MultipleImageUploadField from '../components/ImageUploadField';
import { RxCross2 } from "react-icons/rx";
import { addRecipe } from '../redux/Recipe/Actions';
import { useDispatch, useSelector } from 'react-redux';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import showCustomToast from '../components/ToastComponent';
const AddRecipeForm = () => {
    const [open, setOpen] = useState(false);
    const location = useLocation(); // Access location

    const { recipe } = location.state || {}; // Get recipe from state

    const handleClickOpen = () => {
        setOpen(true); // Open the dialog
    };

    const handleClose = () => {
        setOpen(false); // Close the dialog without navigating
    };

    const handleConfirm = () => {
        setOpen(false); // Close the dialog
        navigate('/'); // Navigate to home or the desired route
    };
    const cuisineOptions = [
        { value: 'italian', label: 'Italian' },
        { value: 'indian', label: 'Indian' },
        { value: 'mexican', label: 'Mexican' },
        { value: 'chinese', label: 'Chinese' },
        { value: 'american', label: 'American' },
        { value: 'thai', label: 'Thai' },
        { value: 'french', label: 'French' },
        { value: 'japanese', label: 'Japanese' },
        // Add more cuisines as needed
    ];
    const navigate = useNavigate();
    console.log(recipe, "recipe")

    // Update the initial values to reflect the passed recipe data
    const initialValues = {
        title: recipe?.title || '',
        cuisine: recipe?.cuisine || '',
        description: recipe?.description || '',
        ingredients: recipe?.ingredients || [''],
        directions: recipe?.directions || [''],
        imageUrl: recipe?.imageUrl || [],
        notes: recipe?.notes || '',
        cookTime: {
            time: recipe?.cookTime?.time || '',
            unit: recipe?.cookTime?.unit || 'mins',
        },
        prepTime: {
            time: recipe?.prepTime?.time || '',
            unit: recipe?.prepTime?.unit || 'mins',
        }
    };



    const handleSubmit = (values) => {
        const formData = new FormData();

        Object.keys(values).forEach((key) => {
            if (key === 'imageUrl') {
                values[key].forEach((file) => formData.append('imageUrl', file));
            } else if (typeof values[key] === 'object' && values[key] !== null) {

                formData.append(key, JSON.stringify(values[key]));
            } else {
                formData.append(key, values[key]);
            }
        });
        dispatch(addRecipe(formData,navigate))
        showCustomToast('Recipe added successfully!', 'success');
   
    };


    const dispatch = useDispatch();
    return (
        <div className='lg:px-[12rem] px-10 py-12 flex justify-center flex-col mx-auto'>

            <div className='flex items-center gap-3'>
                <h1 className='text-3xl font-bold text-slate-800 mt-2 mb-4'>Add a Recipe </h1>

                <RiMenuAddFill size={20} />
            </div>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}

            >
                {({ values, handleChange, handleBlur, setFieldValue }) => (
                    <Form  >
                        <Grid container spacing={2}>

                            {/* Title */}
                            <Grid item xs={12} sm={6}>
                                <div className=' flex gap-12 flex-col'>
                                    <TextField
                                        id="outlined-multiline-flexible"
                                        label="Recipe Title"
                                        multiline
                                        maxRows={4}
                                        name='title'
                                        value={values.title}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required

                                    />
                                    <TextField
                                        id="outlined-multiline-flexible"
                                        label="Recipe description"
                                        multiline
                                        fullWidth
                                        required
                                        maxRows={4}
                                        name='description'
                                        value={values.description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}

                                    />
                                </div>

                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <MultipleImageUploadField values={values} setFieldValue={setFieldValue} />
                            </Grid>
                            {/* Ingredients FieldArray */}
                            <hr className='w-full py-2 mt-5 mb-2' />
                            <Grid item xs={12}>
                                <h4 className='font-semibold text-xl'>Ingredients
                                </h4>
                                <p className='text-sm text-neutral-400 line-clamp-4 mt-2 mb-4'>Enter the ingredients for your recipe below, one per line. Include quantities and any special instructions <br />(e.g., chopped, sifted). </p>
                                <FieldArray name="ingredients">
                                    {({ push, remove }) => (
                                        <>
                                            {values.ingredients.map((ingredient, index) => (
                                                <Grid container key={index} spacing={2} alignItems="center">
                                                    <Grid item xs={11}>
                                                        <Field

                                                            as={TextField}
                                                            fullWidth
                                                            name={`ingredients[${index}]`}
                                                            label={`Ingredient ${index + 1}`}
                                                            variant="outlined"
                                                            value={ingredient}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            sx={{ marginTop: 1 }}
                                                            helperText={<ErrorMessage name={`ingredients[${index}]`} />}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={1}>
                                                        <IconButton
                                                            onClick={() => remove(index)} // Remove ingredient
                                                            disabled={values.ingredients.length === 1} // Disable remove if only one ingredient
                                                        >
                                                            <RxCross2 />
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                            ))}
                                            <Button
                                                required
                                                variant="outlined"
                                                startIcon={<AddIcon />}
                                                onClick={() => push('')}
                                                sx={{
                                                    bgcolor: 'transparent',
                                                    borderColor: '#E55A12',
                                                    color: '#E55A12', // Use the primary color from Tailwind config
                                                    '&:hover': {
                                                        bgcolor: '#E55A12',
                                                        color: 'white', // Change text color to white on hover
                                                    },
                                                    marginTop: '12px'
                                                }}
                                            >
                                                Add Ingredient
                                            </Button>
                                        </>
                                    )}
                                </FieldArray>
                            </Grid>
                            <hr className='w-full py-2 mt-5 mb-2' />
                            {/* Directions FieldArray */}
                            <Grid item xs={12}>
                                <h4 className='font-semibold text-xl'>Directions
                                </h4>
                                <p className='text-sm text-neutral-400 line-clamp-4 mt-2 mb-4'>Describe how to make your recipe </p>
                                <FieldArray name="directions">
                                    {({ push, remove }) => (
                                        <>
                                            {values.directions.map((direction, index) => (
                                                <Grid container key={index} spacing={2} alignItems="center">
                                                    <Grid item xs={11}>
                                                        <Field
                                                            as={TextField}
                                                            required
                                                            fullWidth
                                                            name={`directions[${index}]`}
                                                            label={`Direction ${index + 1}`}
                                                            variant="outlined"
                                                            value={direction}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            sx={{ marginTop: 1 }}
                                                            helperText={<ErrorMessage name={`directions[${index}]`} />}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={1}>
                                                        <IconButton
                                                            onClick={() => remove(index)} // Remove direction
                                                            disabled={values.directions.length === 1} // Disable remove if only one direction
                                                        >
                                                            <RxCross2 />
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                            ))}
                                            <Button
                                                variant="outlined"
                                                startIcon={<AddIcon />}
                                                onClick={() => push('')}
                                                sx={{
                                                    bgcolor: 'transparent',
                                                    borderColor: '#E55A12',
                                                    color: '#E55A12', // Use the primary color from Tailwind config
                                                    '&:hover': {
                                                        bgcolor: '#E55A12',
                                                        color: 'white', // Change text color to white on hover
                                                    },
                                                    marginTop: '12px'
                                                }}
                                            >
                                                Add Direction
                                            </Button>


                                        </>
                                    )}
                                </FieldArray>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <div className='flex gap-5 items-center mt-5'>
                                    <h1 className='text-md font-medium'>Prep Time</h1>
                                    <TextField
                                        label="Prep Time"
                                        name='prepTime.time'
                                        type="number"
                                        defaultValue={0}
                                        InputProps={{ inputProps: { min: 0 } }}
                                        sx={{ width: 80 }}
                                        value={values.prepTime.time}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required

                                    />
                                    <TextField
                                        select
                                        name="prepTime.unit"
                                        value={values.prepTime.unit}
                                        onChange={handleChange}
                                        sx={{ width: 100 }}
                                    >
                                        <MenuItem value="mins">mins</MenuItem>
                                        <MenuItem value="hours">hours</MenuItem>
                                        <MenuItem value="days">days</MenuItem>
                                    </TextField>
                                </div>
                            </Grid>

                            {/* Cook Time */}
                            <Grid item xs={12} sm={6}>
                                <div className='flex gap-5 items-center mt-2'>
                                    <h1 className='text-md font-medium'>Cook Time <span className='text-sm text-neutral-400'>(optional)</span></h1>
                                    <TextField
                                        name='cookTime.time'
                                        label="Cook Time"
                                        type="number"
                                        InputProps={{ inputProps: { min: 0 } }}
                                        sx={{ width: 80 }}
                                        value={values.cookTime.time}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        defaultValue={0}
                                    />
                                    <TextField
                                        name="cookTime.unit"
                                        select
                                        value={values.cookTime.unit}
                                        onChange={handleChange}
                                        defaultValue="mins"
                                        sx={{ width: 100 }}
                                    >
                                        <MenuItem value="mins">mins</MenuItem>
                                        <MenuItem value="hours">hours</MenuItem>
                                        <MenuItem value="days">days</MenuItem>
                                    </TextField>
                                </div>
                            </Grid>

                            <hr className='w-full py-2 mt-5 mb-2' />
                            <Grid item xs={12} sm={6}>
                                <div className='flex flex-col gap-10'>
                                    <h1 className='text-md font-medium'>Cuisine </h1>
                                    <FormControl fullWidth>
                                        <NativeSelect
                                            reuired
                                            defaultValue={values.cuisine}
                                            name="cuisine"
                                            value={values.cuisine}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            inputProps={{
                                                id: 'cuisine-native-select',
                                            }}
                                        >
                                            {cuisineOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </NativeSelect>
                                    </FormControl>
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <div className=' flex gap-6 flex-col'>

                                    <h1 className='text-md font-medium'>Notes <span className='text-sm text-neutral-400'>(optional)</span></h1>
                                    <TextField
                                        id="outlined-multiline-flexible"
                                        label="Notes"
                                        multiline
                                        maxRows={4}
                                        name='notes'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.notes}
                                    />

                                </div>
                            </Grid>
                            <hr className='w-full py-2 mt-5 mb-2' />
                            {/* Submit Button */}
                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="right" gap={2}>
                                    <Button
                                        color="primary"
                                        type="button"
                                        onClick={handleClickOpen}
                                        sx={{

                                            '&:hover': {
                                                borderBottomColor: '#E55A12', // Change to secondary color from Tailwind config on hover
                                            },
                                        }}
                                    >
                                        cancel
                                    </Button>
                                    <Dialog
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">{"Are you sure you want to leave?"}</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                If you leave now, any unsaved changes will be lost.
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose} color="primary">
                                                No, Stay
                                            </Button>
                                            <Button onClick={handleConfirm} variant='contained' sx={{
                                                bgcolor: '#FF6216', // Use the primary color from Tailwind config
                                                '&:hover': {
                                                    bgcolor: '#E55A12', // Change to secondary color from Tailwind config on hover
                                                },
                                            }}>
                                                Yes, Leave
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        sx={{
                                            bgcolor: '#FF6216', // Use the primary color from Tailwind config
                                            '&:hover': {
                                                bgcolor: '#E55A12', // Change to secondary color from Tailwind config on hover
                                            },
                                        }}
                                    >
                                        Submit Recipe
                                    </Button>

                                </Box>
                            </Grid>

                        </Grid>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddRecipeForm;
