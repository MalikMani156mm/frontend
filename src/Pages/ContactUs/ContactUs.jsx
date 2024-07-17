import React from 'react';
import './ContactUs.css';
import { Navigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAddNewContactMessageMutation } from '../../Redux/Features/ContactMessage/ContactMessage.Api';

function ContactUs() {

  const [newContactMessage, { isLoading, error }] = useAddNewContactMessageMutation();


  // eslint-disable-next-line
  const { values, touched, handleBlur, handleChange, errors, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: ''
    },
    validationSchema: yup.object().shape({
      name: yup.string().min(3).max(30).required('Name is Required'),
      email: yup.string().email('Enter a valid Email').required('Email is Required'),
      message: yup.string().min(1).max(1000).required('Message is Required'),
    }),
    onSubmit: async (values) => {
      console.log(values);
      const resp = await newContactMessage(values).unwrap();

      if (resp.success) {
        toast.success(resp.message);
      }
      else {
        toast.error(resp.message);
      }
    }
  })

  if (error) {
    return <Navigate to={'*'} replace={true} />
  }

  return (
    <div className='body'>


      <main className='Container'>
        <section id="contact-info">
          <h1>Contact Us</h1>
          <p>If you have any questions or need assistance, please don't hesitate to reach out to us using the following contact information:</p>
          <ul>
            <li><p>Email: dig.hq@Islamabadpolice.gov.pk</p></li>
            <li><p>Phone: 051-9259397</p></li>
            <li><p>Address: Police Line Head Quarter H-11, Islamabad, Pakistan.</p></li>
          </ul>
        </section>

        <section id="contact-form">
          <h2>Send us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" onChange={handleChange} onBlur={handleBlur} />
              <p className="help-block text-danger">{errors.name && touched.name ? errors.name : null}</p>
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" onChange={handleChange} onBlur={handleBlur} />
              <p className="help-block text-danger">{errors.email && touched.email ? errors.email : null}</p>
            </div>
            <div>
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" rows="4" onChange={handleChange} onBlur={handleBlur}></textarea>
              <p className="help-block text-danger">{errors.message && touched.message ? errors.message : null}</p>
            </div>
            <button type="submit" disabled={isLoading}>{isLoading ? "Loading..." : "Submit"}</button>
          </form>
        </section>
      </main>

      <ToastContainer />
    </div>
  )
}

export default ContactUs
