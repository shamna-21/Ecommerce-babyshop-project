import React from 'react';
import toys from '../Images/products.png';
import { Link } from 'react-router-dom';
import item from '../Images/items.png';
import cost from '../Images/cost.png';

function Products() {
  return (
    <div className="p-6 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200">
      <h1 className="text-3xl font-extrabold text-center text-red-700 mb-6">
        MORE PRODUCTS
      </h1>
      <div className="flex flex-wrap justify-center gap-6">
        <div className="relative flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <Link to="/products?category=toy" className="block relative group">
            <img
              src={toys}
              alt="Toys"
              className="w-full h-auto object-cover rounded-lg shadow-md transition-transform transform group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
              <span className="text-white text-xl font-bold">Show More</span>
            </div>
          </Link>
        </div>
        <div className="relative flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <Link to="/products?category=food" className="block relative group">
            <img
              src={item}
              alt="Food Items"
              className="w-full h-auto object-cover rounded-lg shadow-md transition-transform transform group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
              <span className="text-white text-xl font-bold">Show More</span>
            </div>
          </Link>
        </div>
        <div className="relative flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <Link to="/products?category=mamy" className="block relative group">
            <img
              src={cost}
              alt="Mamy"
              className="w-full h-auto object-cover rounded-lg shadow-md transition-transform transform group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
              <span className="text-white text-xl font-bold">Show More</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Products;
