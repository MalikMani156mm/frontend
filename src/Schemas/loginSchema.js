import * as yup from 'yup';

const loginSchema = yup.object().shape({
    username:yup.string().min(3).max(30).required('Username is Required'),
    password:yup.string().min(8).max(20).required('Password is Required'),
});

export default loginSchema;