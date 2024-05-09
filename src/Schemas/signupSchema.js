import * as yup from 'yup';

const passwordPattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;
const errorMessage = 'Use lowercase, uppercase and digits';

const signupSchema = yup.object().shape({
    name:yup.string().min(5).max(30).required('name is Required'),
    username:yup.string().min(3).max(30).required('Username is Required'),
    email:yup.string().email('enter a valid email').required('email is Required'),
    phonenumber:yup.number().min(11).required('Phone Number is Required'),
    cnic:yup.number().min(14).required('CNIC is Required'),
    password:yup.string().min(8).max(20).matches(passwordPattern,{message:errorMessage}).required('Password is Required'),
    confirmpassword:yup.string().oneOf([yup.ref('password')],'passwords must match').required('Confirm Password is Required'),
});

export default signupSchema;