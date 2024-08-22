import React, { useRef } from 'react';
import emailjs from 'emailjs-com';
import { toast } from 'react-toastify';

function Contactus() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_6rzhrta', 'template_73vc3yf', form.current, 'OCo5wvNkOOmUtGiiK') // Replace with your actual userID
      .then(
        () => {
          toast.success('Message sent successfully!');
        },
        (error) => {
          toast.error('Failed to send message: ' + error.text);
        }
      );
  };

  return (
   
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-red-100 via-red-200 to-red-300 p-4">
      
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl  font-semibold mb-4 text-red-700">CONTACT US</h2>
        <form ref={form} onSubmit={sendEmail} className="space-y-4">
          <div>
            <label htmlFor="user_name" className="block text-red-600 font-medium mb-2">Name</label>
            <input
              id="user_name"
              type="text"
              name="user_name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
              required
            />
          </div>
          <div>
            <label htmlFor="user_email" className="block text-red-600 font-medium mb-2">Email</label>
            <input
              id="user_email"
              type="email"
              name="user_email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-red-600 font-medium mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </form>
      </div>
     
    </div>
    
  );
}

export default Contactus;
