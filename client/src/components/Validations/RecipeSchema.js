import * as Yup from 'yup';
const recipeValidationSchema = Yup.object().shape({
    title: Yup.string()
        .min(3, 'Title should be at least 3 characters')
        .max(100, 'Title should be less than 100 characters')
        .required('Title is required'),

    description: Yup.string()
        .min(10, 'Description should be at least 10 characters')
        .max(500, 'Description should be less than 500 characters')
        .required('Description is required')
    ,

    ingredients: Yup.array()
        .of(Yup.string().required('Ingredient is required'))
        .min(1, 'At least one ingredient is required')
    ,
    directions: Yup.array()
        .of(Yup.string().required('directions step is required'))
        .min(1, 'At least one direction is required')
        .required('directions are required')
    ,

    cuisine: Yup.string()
        .required('Cuisine is required'),

    imageUrl: Yup.array()
 .required('Image is required'),
    prepTime: Yup.string()

        .required('Preparation time is required'),

    cookTime: Yup.number()

        .required('cookTime  is required'),

});
export default recipeValidationSchema;