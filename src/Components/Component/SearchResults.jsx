import React from 'react';
import { useLocation, Link } from 'react-router-dom';


function SearchResults() {
  const location = useLocation();
  const { results } = location.state || { results: [] };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
     
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-900">
        Search Results
      </h1>
      {results.length === 0 ? (
        <p className="text-center text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map(product => (
            <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <Link to={`/${product.category}/${product.id}`}>
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover" // Adjust size as needed
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <h2 className="text-lg font-semibold text-white mb-2">{product.name}</h2>
                  </div>
                </div>
                <div className="p-4">
                  {product.oldPrice && (
                    <p className="text-lg text-gray-500 line-through mb-2">
                      ${product.oldPrice} {/* Old price with line-through */}
                    </p>
                  )}
                  <p className="text-2xl font-semibold text-red-600">
                    ${product.newprice} {/* New price */}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    
    </div>
  );
}

export default SearchResults;
