import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';


function FilteredProducts() {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');

    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/product');
        const allProducts = response.data;
        if (category) {
          const filteredProducts = allProducts.filter(product => product.category === category);
          setProducts(filteredProducts);
        } else {
          setProducts(allProducts);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [location.search]);

  return (
    
    <div className="p-6 bg-gray-100 min-h-screen">
      
      <h1 className="text-4xl font-extrabold text-center mb-8 text-red-700">
        Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map(product => (
          
          <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
            <Link to={`/${product.category}/${product.id}`}>
              <div className="relative">
                
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-cover" 
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <h2 className="text-lg font-semibold text-white mb-2">{product.name}</h2>
                </div>
              </div>
              <div className="p-4">
                {product.oldPrice && (
                  <p className="text-lg text-gray-500 line-through mb-2">
                    ${product.oldPrice}
                  </p>
                )}
                <p className="text-xl font-semibold text-red-600">
                  ${product.newprice}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      
    </div>
   
  );
}

export default FilteredProducts;
