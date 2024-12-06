import React from "react";
import { Button, TextField, Grid, IconButton, Box, MenuItem, } from "@mui/material";
import recipeValidationSchema from '../../components/Validations/RecipeSchema'
import { Formik, Field, Form, FieldArray } from "formik";
import { RiMenuAddFill } from "react-icons/ri";
import AddIcon from "@mui/icons-material/Add";
import MultipleImageUploadField from "../../components/Shared/ImageUploadField";
import { RxCross2 } from "react-icons/rx";
import { addRecipe } from "../../redux/Recipe/Actions";
import { useDispatch } from "react-redux";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import showCustomToast from '../../components/Shared/ToastComponent';
import ConfirmationDialog from "../../components/Shared/ConfirmationDialog";


const AddRecipeForm = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setOpen(false);
    navigate("/");
  };
  const cuisineOptions = [
    { value: "italian", label: "Italian" },
    { value: "indian", label: "Indian" },
    { value: "mexican", label: "Mexican" },
    { value: "chinese", label: "Chinese" },
    { value: "american", label: "American" },
    { value: "thai", label: "Thai" },
    { value: "french", label: "French" },
    { value: "japanese", label: "Japanese" },
    // Add more cuisines as needed
  ];

  const initialValues = {
    title: '',
    description: '',
    imageUrl: [],
    cuisine: 'Indian',
    ingredients: [''],
    directions: [''],
    notes: '',
    cookTime: {
      time: 0,
      unit: "mins",
    },
    prepTime: {
      time: 1,
      unit: "mins",
    },
  };

  //SUBMIT FORM FUNC
  const handleSubmit = (values) => {
    const recipeValues = {
      ...values,
      cuisine: values.cuisine || "Indian",
    };
    if (!recipeValues.imageUrl || recipeValues.imageUrl.length === 0) {
      showCustomToast("At least one image is required", "error");
      return;
    }
    const formData = new FormData();
    Object.keys(recipeValues).forEach((key) => {
      if (key === "imageUrl") {
        recipeValues[key].forEach((file) => formData.append("imageUrl", file));
      } else if (typeof recipeValues[key] === "object" && recipeValues[key] !== null) {
        formData.append(key, JSON.stringify(recipeValues[key]));
      } else {
        formData.append(key, recipeValues[key]);
      }
    });
    dispatch(addRecipe(formData, navigate)).then((response) => {
      if (response && !response.error) {
        showCustomToast("Recipe added successfully", "success");
        navigate("/");
      } else {
        showCustomToast("Failed to add the recipe", "error");
      }
    });
  };


  return (
    <div className="lg:px-[12rem] px-10 py-12 flex justify-center flex-col mx-auto">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-bold text-slate-800 mt-2 mb-4">
          Add a Recipe{" "}
        </h1>
        <RiMenuAddFill size={20} />
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={recipeValidationSchema}
      >
        {({ values, handleChange, handleBlur, setFieldValue, errors, touched, }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <div className=" flex gap-12 flex-col">
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Recipe Title"
                    multiline
                    maxRows={4}
                    name="title"
                    required
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.title && Boolean(errors.title)} 
                    helperText={touched.title && errors.title}
                  />
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Recipe description"
                    multiline
                    fullWidth
                    error={touched.description && Boolean(errors.description)} // Set error to true if the field is touched and there's an error
                    helperText={touched.description && errors.description}
                    maxRows={4}
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
              </Grid>

              <Grid item xs={12} sm={6}>
                <MultipleImageUploadField
                  values={values}
                  setFieldValue={setFieldValue}
                />
              </Grid>


              <hr className="w-full py-2 mt-5 mb-2" />
              <Grid item xs={12}>
                <h4 className="font-semibold text-xl">Ingredients</h4>
                <p className="text-sm text-neutral-400 line-clamp-4 mt-2 mb-4">
                  Enter the ingredients for your recipe below, one per line.
                </p>
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
                              error={
                                touched.ingredients &&
                                touched.ingredients[index] &&
                                Boolean(errors.ingredients && errors.ingredients[index])
                              }
                              helperText={
                                touched.ingredients &&
                                  touched.ingredients[index] &&
                                  errors.ingredients &&
                                  errors.ingredients[index]
                                  ? errors.ingredients[index]
                                  : null
                              }
                              sx={{ marginTop: 1 }}
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
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={() => push("")}
                        sx={{
                          bgcolor: "transparent",
                          borderColor: "#E55A12",
                          color: "#E55A12",
                          "&:hover": {
                            bgcolor: "#E55A12",
                            color: "white",
                          },
                          marginTop: "12px",
                        }}
                      >
                        Add Ingredient
                      </Button>
                    </>
                  )}
                </FieldArray>
              </Grid>

              {/* Directions Section */}
              <Grid item xs={12}>
                <h4 className="font-semibold text-xl">Directions</h4>
                <p className="text-sm text-neutral-400 line-clamp-4 mt-2 mb-4">
                  Describe how to make your recipe.
                </p>
                <FieldArray name="directions">
                  {({ push, remove }) => (
                    <>
                      {values.directions.map((direction, index) => (
                        <Grid container key={index} spacing={2} alignItems="center">
                          <Grid item xs={11}>
                            <Field
                              as={TextField}
                              fullWidth
                              name={`directions[${index}]`}
                              label={`Direction ${index + 1}`}
                              variant="outlined"
                              value={direction}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched.directions &&
                                touched.directions[index] &&
                                Boolean(errors.directions && errors.directions[index])
                              }
                              helperText={
                                touched.directions &&
                                  touched.directions[index] &&
                                  errors.directions &&
                                  errors.directions[index]
                                  ? errors.directions[index]
                                  : null
                              }
                              sx={{ marginTop: 1 }}
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
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={() => push("")}
                        sx={{
                          bgcolor: "transparent",
                          borderColor: "#E55A12",
                          color: "#E55A12",
                          "&:hover": {
                            bgcolor: "#E55A12",
                            color: "white",
                          },
                          marginTop: "12px",
                        }}
                      >
                        Add Direction
                      </Button>
                    </>
                  )}
                </FieldArray>
              </Grid>

              <Grid item xs={12} sm={6}>
                <div className="flex gap-5 items-center mt-5">
                  <h1 className="text-md font-medium">Prep Time</h1>
                  <TextField
                    label="Prep Time"
                    name="prepTime.time"
                    type="number"
                    defaultValue={0}
                    InputProps={{ inputProps: { min: 1 } }} // min value set to 1 instead of 0
                    sx={{ width: 80 }}
                    value={values.prepTime?.time || ""} // Ensure the value is handled properly (empty string if undefined)
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.prepTime?.time && Boolean(errors.prepTime?.time)
                    } // Set error if touched and there's an error
                    helperText={touched.prepTime?.time && errors.prepTime?.time}
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

              <Grid item xs={12} sm={6}>
                <div className="flex gap-5 items-center mt-2">
                  <h1 className="text-md font-medium">
                    Cook Time{" "}
                  </h1>
                  <TextField
                    name="cookTime.time"
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

              <hr className="w-full py-2 mt-5 mb-2" />
              <Grid item xs={12} sm={6}>
                <div className="flex flex-col gap-10">
                  <h1 className="text-md font-medium">Cuisine </h1>
                  <FormControl fullWidth>
                    <NativeSelect
                      required
                      value={values.cuisine} // Ensure this reflects the value from Formik state
                      name="cuisine"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      inputProps={{
                        id: "cuisine-native-select",
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
                <div className=" flex gap-6 flex-col">
                  <h1 className="text-md font-medium">
                    Notes{" "}
                    <span className="text-sm text-neutral-400">(optional)</span>
                  </h1>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Notes"
                    multiline
                    maxRows={4}
                    name="notes"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.notes}
                  />
                </div>
              </Grid>
              <hr className="w-full py-2 mt-5 mb-2" />
              <Grid item xs={12}>
                <Box display="flex" justifyContent="right" gap={2}>
                  <Button
                    color="primary"
                    type="button"
                    onClick={handleClickOpen}
                    sx={{
                      "&:hover": {
                        borderBottomColor: "#E55A12", // Change to secondary color from Tailwind config on hover
                      },
                    }}
                  >
                    cancel
                  </Button>
                  <ConfirmationDialog
                    open={open}
                    title="Are you sure you want to leave?"
                    message={` If you leave now, any unsaved changes will be lost.`}
                    onConfirm={handleConfirm}
                    onCancel={handleClose}
                  />

                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{
                      bgcolor: "#FF6216", // Use the primary color from Tailwind config
                      "&:hover": {
                        bgcolor: "#E55A12", // Change to secondary color from Tailwind config on hover
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
