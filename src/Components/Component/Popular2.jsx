import React, { useEffect, useState } from 'react';
import axios from 'axios';
import more from '../Images/more.png';  
import { Link } from 'react-router-dom';

function Popular2() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const resp = await axios.get('http://localhost:3000/product');
          
                const girlsProducts = resp.data.filter(product => product.category === 'boys');
                setProducts(girlsProducts.slice(0, 6)); 
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        fetchProducts();
    }, []);

    return (
        <div className="p-6 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200">
            <h1 className="text-3xl font-extrabold text-center text-red-700 mb-6">
                POPULAR IN BOYS
            </h1>
            <hr className="mb-6 border-red-400" />
            <div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.length === 0 ? (
                        <p className="text-center text-red-600 font-semibold">No products available</p>
                    ) : (
                        products.map(product => (
                            <Link to={`/product/${product.id}`} key={product.id}>
                                <li className="border rounded-lg overflow-hidden shadow-lg bg-white transform transition-transform hover:scale-105">
                                    <img src={product.image} alt={product.name} className="w-full h-100 object-cover" />
                                    <h2 className="text-xl font-semibold text-red-700 mb-2">{product.name}</h2>
                                    <p className="text-gray-600 mb-1">New Price: ${product.newprice}</p>
                                    <p className="text-gray-500">Old Price: ${product.oldprice}</p>
                                </li>
                            </Link>
                        ))
                    )}
                    <Link to="/products?category=boys">
                        <div className='flex justify-center items-center transform transition-transform hover:scale-105 py-36'>
                            <img src={more} alt='More products' className='w-20' />
                        </div>
                    </Link>
                </ul>
            </div>
        </div>
    );
}

export default Popular2;
