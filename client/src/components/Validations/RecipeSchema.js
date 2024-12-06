import * as Yup from 'yup';
const recipeValidationSchema = Yup.object().shape({
    title: Yup.string()
        .required('Title is required'),
    description: Yup.string()
        .required('Description is required'),
    ingredients: Yup.array()
        .of(Yup.string().required('Ingredient is required')),
    directions: Yup.array()
        .of(Yup.string().required('directions step is required')),
});
export default recipeValidationSchema;