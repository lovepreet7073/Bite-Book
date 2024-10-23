import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, IconButton, Box, FormControl, MenuItem, NativeSelect } from '@mui/material';
import { useDispatch } from 'react-redux';
import { UpdateRecipe } from '../../redux/Recipe/Actions';
import { useLocation } from 'react-router-dom';
import { Formik, Form, FieldArray, Field } from 'formik';
import { RiMenuAddFill } from 'react-icons/ri'; // Ensure you have this import for the icon
import { RxCross2 } from 'react-icons/rx'; // Ensure you have this import for the icon
import AddIcon from '@mui/icons-material/Add'; // Import AddIcon for the button
import MultipleImageUploadField from '../../components/ImageUploadField';

const EditRecipeForm = () => {
    const location = useLocation();
    const { recipe } = location.state || {};

    console.log(recipe, "location-recipe")
    const dispatch = useDispatch();
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
    // Initial form values
    const initialValues = {
        title: recipe?.title || '',
        cuisine: recipe?.cuisine || '',
        description: recipe?.description || '',
        ingredients: recipe?.ingredients || [''],
        directions: recipe?.directions || [''],
        imageUrl: recipe?.imageUrl || null,
        notes: recipe?.notes || '',
        cookTime: recipe?.cookTime || { time: '', unit: 'mins' },
        prepTime: recipe?.prepTime || { time: '', unit: 'mins' },
    };
    const handleSubmit = (values, { setSubmitting }) => {
        const formData = new FormData();

        // Append form values to formData
        Object.keys(values).forEach((key) => {
            if (key === 'imageUrl') {
                if (values.imageUrl) {
                    Array.from(values.imageUrl).forEach((file) => {
                        formData.append('imageUrl', file);
                    });
                }
            } else if (typeof values[key] === 'object' && values[key] !== null) {
                formData.append(key, JSON.stringify(values[key]));
            } else {
                formData.append(key, values[key]);
            }
        });

        // Dispatch the update action with recipe ID and formData
        dispatch(UpdateRecipe(recipe._id, formData));
        setSubmitting(false);
    };

    const handleFileChange = (e, setFieldValue) => {
        setFieldValue('imageUrl', e.currentTarget.files);
    };

    const handleCancel = () => {
        // Implement navigation logic if needed, e.g., using `useHistory` or `useNavigate`
        // Example: history.push('/recipes');
    };

    return (
        <div className='lg:px-[12rem] px-[2rem] lg:py-12 py-3 flex justify-center flex-col mx-auto'>
            <div className='flex items-center gap-3'>
                <h1 className='text-3xl font-bold text-slate-800 mt-2 mb-4'>Edit Recipe</h1>
                <RiMenuAddFill size={20} />
            </div>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {({ values, handleChange, handleBlur, setFieldValue }) => (
                    <Form>
                        <Grid container spacing={2}>
                            {/* Title and Description */}
                            <Grid item xs={12} sm={6}>
                                <div className='flex gap-12 flex-col'>
                                    <TextField
                                        label="Recipe Title"
                                        name='title'
                                        value={values.title}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                    />
                                    <TextField
                                        label="Recipe Description"
                                        name='description'
                                        multiline
                                        fullWidth
                                        required
                                        value={values.description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                            </Grid>

                            {/* Image Upload */}
                            <Grid item xs={12} sm={6}>
                                <MultipleImageUploadField

                                />
                                {/* Optionally, show selected images */}
                                {values.imageUrl && Array.from(values.imageUrl).map((file, index) => (
                                    <p key={index}>{file.name}</p>
                                ))}
                            </Grid>

                            {/* Ingredients FieldArray */}
                            <Grid item xs={12}>
                                <h4 className='font-semibold text-xl'>Ingredients</h4>
                                <FieldArray name="ingredients">
                                    {({ push, remove }) => (
                                        <>
                                            {values.ingredients.map((ingredient, index) => (
                                                <Grid container key={index} spacing={2} alignItems="center">
                                                    <Grid item xs={11}>
                                                        <Field
                                                            as={TextField}
                                                            name={`ingredients[${index}]`}
                                                            label={`Ingredient ${index + 1}`}
                                                            fullWidth
                                                            value={ingredient}
                                                            sx={{ marginTop: 1 }}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={1}>
                                                        <IconButton
                                                            onClick={() => remove(index)}
                                                            disabled={values.ingredients.length === 1}
                                                        >
                                                            <RxCross2 />
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                            ))}
                                            <Button
                                                onClick={() => push('')}
                                                startIcon={<AddIcon />}
                                                sx={{
                                                    bgcolor: 'transparent',
                                                    borderColor: '#E55A12',
                                                    color: '#E55A12',
                                                    '&:hover': {
                                                        bgcolor: '#E55A12',
                                                        color: 'white',
                                                    },
                                                    marginTop: '12px',
                                                }}
                                            >
                                                Add Ingredient
                                            </Button>
                                        </>
                                    )}
                                </FieldArray>
                            </Grid>

                            {/* Directions FieldArray */}
                            <Grid item xs={12}>
                                <h4 className='font-semibold text-xl'>Directions
                                </h4>
                                <FieldArray name="directions">
                                    {({ push, remove }) => (
                                        <>
                                            {values.directions.map((direction, index) => (
                                                <Grid container key={index} spacing={2} alignItems="center">
                                                    <Grid item xs={11}>
                                                        <Field
                                                            as={TextField}
                                                            name={`directions[${index}]`}
                                                            label={`Direction ${index + 1}`}
                                                            fullWidth
                                                            sx={{ marginTop: 1 }}
                                                            value={direction}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={1}>
                                                        <IconButton
                                                            onClick={() => remove(index)}
                                                            disabled={values.directions.length === 1}
                                                        >
                                                            <RxCross2 />
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                            ))}
                                            <Button
                                                onClick={() => push('')}
                                                startIcon={<AddIcon />}
                                                sx={{
                                                    bgcolor: 'transparent',
                                                    borderColor: '#E55A12',
                                                    color: '#E55A12',
                                                    '&:hover': {
                                                        bgcolor: '#E55A12',
                                                        color: 'white',
                                                    },
                                                    marginTop: '12px',
                                                }}
                                            >
                                                Add Direction
                                            </Button>
                                        </>
                                    )}
                                </FieldArray>
                            </Grid>

                            {/* Prep Time */}
                            <Grid item xs={6}>
                                <div className='flex gap-5 items-center mt-5'>
                                    <h1 className='text-md font-medium'>Prep Time</h1>
                                    <TextField
                                        name='prepTime.time'
                                        label="Prep Time"
                                        type="number"
                                        InputProps={{ inputProps: { min: 0 } }}
                                        sx={{ width: 80 }}
                                        value={values.prepTime.time}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
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
                                    </TextField>
                                </div>
                            </Grid>

                            {/* Cook Time */}
                            <Grid item xs={6}>
                                <div className='flex gap-5 items-center mt-2'>
                                    <h1 className='text-md font-medium'>Cook Time</h1>
                                    <TextField
                                        name='cookTime.time'
                                        label="Cook Time"
                                        type="number"
                                        InputProps={{ inputProps: { min: 0 } }}
                                        sx={{ width: 80 }}
                                        value={values.cookTime.time}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <TextField
                                        select
                                        name="cookTime.unit"
                                        value={values.cookTime.unit}
                                        onChange={handleChange}
                                        sx={{ width: 100 }}
                                    >
                                        <MenuItem value="mins">mins</MenuItem>
                                        <MenuItem value="hours">hours</MenuItem>
                                    </TextField>
                                </div>
                            </Grid>
                            <hr className='w-full py-2 mt-5 mb-2' />
                            <Grid item xs={6}>
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
                            {/* Notes */}
                            <Grid item xs={6} >
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

                            {/* Buttons */}
                            <hr className='w-full py-2 mt-5 mb-2' />
                            {/* Submit Button */}
                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="right" gap={2}>

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
                                        Save Changes
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

export default EditRecipeForm;
