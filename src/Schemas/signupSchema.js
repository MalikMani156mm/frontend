import * as yup from 'yup';

const passwordPattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;
const errorMessage = 'Use lowercase, uppercase and digits';

const signupSchema = yup.object().shape({
    name:yup.string().min(5).max(30).required('name is Required'),
    email:yup.string().email('enter a valid email').required('email is Required'),
    cnic: yup.number().min(1111111111111,"Must be atleast 13 digit").max(9999999999999,"Invalid CNIC").required('CNIC is Required'),
    phonenumber: yup.number().min(1111111111,"Must be atleast 11 digit").max(999999999999,"Invalid Number").required('Phone Number is Required'),
    password:yup.string().min(8).max(20).matches(passwordPattern,{message:errorMessage}).required('Password is Required'),
    confirmpassword:yup.string().oneOf([yup.ref('password')],'passwords must match').required('Confirm Password is Required'),
});

export default signupSchema;