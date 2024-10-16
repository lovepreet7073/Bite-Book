import * as Yup from 'yup';
const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    ingredients: Yup.array().of(Yup.string().required('Ingredient is required')),
    directions: Yup.array().of(Yup.string().required('Direction is required')),
});

export default validationSchema;