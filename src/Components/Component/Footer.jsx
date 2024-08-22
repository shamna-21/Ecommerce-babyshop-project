import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-white text-gray-800 py-8 border-t border-gray-200">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between">
          {/* Logo and Company Info */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-red-600 mb-2">Your Company</h2>
            <p className="text-gray-600">Delivering excellence and quality products since 2024.</p>
            <p className="text-gray-600 mt-2">&copy; 2024 Your Company. All rights reserved.</p>
          </div>
          
          {/* Navigation Links */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-semibold text-red-600 mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-red-600 hover:text-red-700">Home</Link></li>
              <li><Link to="/products" className="text-red-600 hover:text-red-700">Products</Link></li>
              <li><Link to="/about" className="text-red-600 hover:text-red-700">About Us</Link></li>
              <li><Link to="/contact" className="text-red-600 hover:text-red-700">Contact</Link></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-semibold text-red-600 mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700">
                <FaInstagram size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
