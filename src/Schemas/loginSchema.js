import * as yup from 'yup';

const loginSchema = yup.object().shape({
    email: yup.string().email('Enter a valid Email').required('Email is Required'),
    password:yup.string().min(8).max(20).required('Password is Required'),
});

export default loginSchema;