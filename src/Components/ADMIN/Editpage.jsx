import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';


function Editproducts() {
    const {id}=useParams()
    const navigate=useNavigate()
  const [product, setProduct] = useState({
    // id: '',
    name: '',
    image: '',
    newprice: '',
    oldprice: '',
    category: '',
    description: '',
  });

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(`http://localhost:3000/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        toast.error('Error fetching product details');
        console.error('Error fetching product details:', error);
      }
    }

    fetchProduct();
  }, [id]);

  // Define your categories here
  const categories = [
    'girls',
    'boys',
    'toy',
    'food',
    'mamy',
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/product/${id}`, product);
      toast.success('Product updated successfully');
      navigate('/admin/edit-product');
    } catch (error) {
      toast.error('Error updating product');
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Add Product</h1>
      {/* {message && <p className="mb-4 text-green-600 text-center">{message}</p>} */}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
        {/* <div>
          <label htmlFor="id" className="block text-sm font-medium text-gray-700">ID</label>
          <input
            type="text"
            id="id"
            name="id"
            value={product.id}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-3 border-2"
          />
        </div> */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-3 border-2"
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={product.image}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-3 border-2"
          />
        </div>
        <div>
          <label htmlFor="newprice" className="block text-sm font-medium text-gray-700">New Price</label>
          <input
            type="number"
            id="newprice"
            name="newprice"
            value={product.newprice}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-3 border-2"
          />
        </div>
        <div>
          <label htmlFor="oldprice" className="block text-sm font-medium text-gray-700">Old Price</label>
          <input
            type="number"
            id="oldprice"
            name="oldprice"
            value={product.oldprice}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-3 border-2"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-3 border-2"
          >
            <option value="">Select a category</option>
            {categories.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
            rows="4"
            className="mt-1 block w-full border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-3 border-2"
          />
        </div>
        <button
          type="submit"
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-colors duration-300"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default Editproducts;
