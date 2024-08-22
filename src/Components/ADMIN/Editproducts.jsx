import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Editproducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const response = await axios.get('http://localhost:3000/product');
      setProducts(response.data);
    } catch (error) {
      setError('Error fetching products');
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(productId) {
    try {
      await axios.delete(`http://localhost:3000/product/${productId}`);
      // Update local state after successful deletion
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
    } catch (error) {
      setError('Error deleting product');
      console.error('Error deleting product:', error);
    }
  }

  // Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="p-6">
      {Object.keys(groupedProducts).map((category) => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">{category.toUpperCase()}</h2>
          <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-6 border-b text-left text-gray-600">ID</th>
                <th className="py-3 px-6 border-b text-left text-gray-600">Name</th>
                <th className="py-3 px-6 border-b text-left text-gray-600">Image</th>
                <th className="py-3 px-6 border-b text-left text-gray-600">New Price</th>
                <th className="py-3 px-6 border-b text-left text-gray-600">Old Price</th>
                <th className="py-3 px-6 border-b text-center text-gray-600">Edit</th>
                <th className="py-3 px-6 border-b text-center text-gray-600">Delete</th>
              </tr>
            </thead>
            <tbody>
              {groupedProducts[category].map((product, index) => (
                <tr
                  key={product.id}
                  className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                >
                  <td className="py-3 px-6 border-b text-center text-gray-800">{product.id}</td>
                  <td className="py-3 px-6 border-b text-gray-800">{product.name}</td>
                  <td className="py-3 px-6 border-b text-center">
                    <img src={product.image} alt={product.name} className="w-24 h-24 object-cover mx-auto rounded" />
                  </td>
                  <td className="py-3 px-6 border-b text-center text-gray-800">${product.newprice}</td>
                  <td className="py-3 px-6 border-b text-center text-gray-800">${product.oldprice}</td>
                  <td className="py-3 px-6 border-b text-center">
                    <Link to={`${product.id}`}>
                    <button className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                      Edit
                    </button></Link>
                  </td>
                  <td className="py-3 px-6 border-b text-center">
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                     onClick={() => handleDelete(product.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default Editproducts;
