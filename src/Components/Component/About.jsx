import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    
    <div className="bg-gray-100">
      
  
      <section className="relative bg-[url('https://c.ndtvimg.com/2021-04/ld9b9m4_newborn-650_625x300_01_April_21.jpg?im=Resize=(1200,757)')] bg-cover bg-center h-60 flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative text-center text-white">
          <h1 className="text-4xl font-bold text-red-200">About BabyShop</h1>
          <p className="mt-2 text-lg text-red-100">Discover our story and commitment to providing the best for your little ones</p>
        </div>
      </section>

   
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-red-500">Our Mission</h2>
            <p className="text-lg text-gray-800">
              At BabyShop, our mission is to provide high-quality, safe, and affordable products for babies and young children. We are dedicated to offering a curated selection of items that meet the highest standards of safety and comfort, ensuring that every parent and child has access to the best products available.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
              <h3 className="text-2xl font-semibold mb-4 text-red-500">Our Story</h3>
              <p className="text-gray-700">
                BabyShop was founded with the simple goal of making parenting a little easier. After noticing a gap in the market for high-quality and affordable baby products, we decided to create a store that prioritizes both safety and style. From our humble beginnings, we have grown into a trusted source for parents seeking the best for their children.
                <br /><br />
                Our journey has been marked by a commitment to quality and customer satisfaction, and we are proud to be a part of so many families' lives.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
              <h3 className="text-2xl font-semibold mb-4 text-red-500">Our Team</h3>
              <p className="text-gray-700">
                Our team at BabyShop is made up of dedicated professionals who are passionate about providing the best for babies and families. Each member brings a wealth of experience and a personal touch to our store, ensuring that we offer not only great products but also exceptional customer service.
                <br /><br />
                We work hard to stay updated with the latest trends and innovations in baby products, and we are always here to help with any questions or concerns you may have.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-red-600 py-8 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">Get in Touch with Us</h2>
          <p className="text-lg mb-6">We would love to hear from you! Whether you have questions about our products or need assistance with your order, feel free to reach out to us. Your satisfaction is our top priority.</p>
          <Link to='/contactus' className="bg-white text-red-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-200">Contact us</Link>
        </div>
      </section>
    
    </div>
  );
}

export default About;
