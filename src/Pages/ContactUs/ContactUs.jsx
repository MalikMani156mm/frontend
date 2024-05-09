import React from 'react'
import  './ContactUs.css'

function ContactUs ()  {
  return (
    <div className='body'>
      

      <main className='Container'>
        <section id="contact-info">
          <h1>Contact Us</h1>
          <p>If you have any questions or need assistance, please don't hesitate to reach out to us using the following contact information:</p>
          <ul>
            <li>Email: Malikmani156@gmail.com</li>
            <li>Phone: +923008337310</li>
            <li>Address: Police Line Head Quarter H-11, Islamabad, Pakistan</li>
          </ul>
        </section>

        <section id="contact-form">
          <h2>Send us a Message</h2>
          <form>
            <div>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" />
            </div>
            <div>
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" rows="4"></textarea>
            </div>
            <button type="submit">Submit</button>
          </form>
        </section>
      </main>

      
    </div>
  )
}

export default ContactUs
