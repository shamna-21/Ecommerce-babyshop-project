import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../Context/CartContext'; 
import { toast } from 'react-toastify';
import axios from 'axios';


function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(`http://localhost:3000/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
        toast.error('Failed to fetch product details.');
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (change) => {
    setQuantity(prevQuantity => Math.max(1, prevQuantity + change));
  };

  const handleAddToCart = async () => {
    if (product) {
      try {
        await addToCart({ ...product, quantity });
        toast.success('Product added to cart!');
      } catch (error) {
        toast.error('Failed to add product to cart');
      }
    } else {
      toast.error('Failed to add product to cart');
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (!product) return <p className="text-center text-red-500">Product not found.</p>;

  return (
    
    
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
   
      <h1 className="text-4xl font-bold text-gray-900 mb-6">{product.name}</h1>
      <div className="flex flex-col md:flex-row md:space-x-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-auto object-cover rounded-lg shadow-md"
        />
        <div className="md:w-1/2 mt-6 md:mt-0">
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold text-gray-800 mb-6">Price: ${product.newprice}</p>
          
          <div className="flex items-center mb-6">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-l-lg hover:bg-gray-400 transition"
            >
              -
            </button>
            <input
              type="text"
              value={quantity}
              readOnly
              className="text-center border-t border-b border-gray-300 w-16 py-2"
            />
            <button
              onClick={() => handleQuantityChange(1)}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-r-lg hover:bg-gray-400 transition"
            >
              +
            </button>
          </div>
          
          <p className="text-xl font-semibold text-gray-800 mb-6">
            Total Price: ${(product.newprice * quantity).toFixed(2)}
          </p>
          
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
      
    </div>
    
  );
}

export default ProductDetails;
