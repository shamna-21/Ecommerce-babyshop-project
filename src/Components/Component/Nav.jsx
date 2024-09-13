import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import pic from '../Images/babyl.png';
import axios from 'axios';
import { useCart } from '../Context/CartContext';

function Nav() {
  const { cartItemCount } = useCart();
  const [isLoggine, setIsLoggine] = useState(false);
  // const [isAdmin, setIsAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = localStorage.getItem('name');

  const userId = localStorage.getItem('id');
  useEffect(() => {
    if (userId) {
      setIsLoggine(true);
     
    }
  }, [userId]);

  const handleLogout = () => {
    const confirm=window.confirm('Are You Sure');
    if(confirm){
      localStorage.clear();
      window.location.reload();
    }
   
  };
// console.log(cartItemCount);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query) {
      navigate('/');
      return;
    }

    try {
      const response = await axios.get('http://localhost:3000/product');
      const allProducts = response.data;
      const filteredResults = allProducts.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );

      navigate('/search-results', { state: { results: filteredResults } });
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <>
      <nav className="bg-white p-2 shadow-md flex items-center justify-between sticky top-0 z-50">
        <Link to="/">
          <img src={pic} alt="logo" className="h-12 w-auto rounded-full" />
        </Link>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-700 hover:text-gray-900 focus:outline-none"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        <div className="flex-grow hidden md:flex items-center justify-between">
          <div className="flex space-x-4 items-center">
            <NavLink
              to="/products?category=boys"
              className={({ isActive }) =>
                `text-black font-semibold transition-colors ${
                  isActive ? 'font-bold' : 'font-normal'
                }`
              }
            >
              Boys
            </NavLink>
            <NavLink
              to="/products?category=girls"
              className={({ isActive }) =>
                `text-black font-semibold transition-colors ${
                  isActive ? 'font-bold' : 'font-normal'
                }`
              }
            >
              Girls
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-black font-semibold transition-colors ${
                  isActive ? 'font-bold' : 'font-normal'
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contactus"
              className={({ isActive }) =>
                `text-black font-semibold transition-colors ${
                  isActive ? 'font-bold' : 'font-normal'
                }`
              }
            >
              Contact Us
            </NavLink>
            <NavLink
              to="/order"
              className={({ isActive }) =>
                `text-black font-semibold transition-colors ${
                  isActive ? 'font-bold' : 'font-normal'
                }`
              }
            >
              Orders
            </NavLink>
           
          </div>

          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            className="p-2 border rounded-lg w-64"
          />

          <div className="flex space-x-4 items-center">
            {isLoggine ? (
              <button
                onClick={handleLogout}
                className="border w-20 rounded bg-red-600 text-white text-lg font-semibold shadow-md hover:bg-red-700 transition-colors duration-300"
              >
                LogOut
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="border w-16 rounded bg-red-600 text-white text-lg font-semibold shadow-md hover:bg-red-700 transition-colors duration-300"
              >
                Login
              </button>
            )}

            <p className="text-lg font-semibold hidden md:block">Hi, {user}</p>

            <NavLink to="/cart1" className="relative flex items-center ml-4">
              <svg
                className="w-8 h-8 text-gray-700 hover:text-gray-900 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l1 9h11l1-9h2M4 7h16m-2 4h2a2 2 0 110 4h-2a2 2 0 110-4zm-6 0h2a2 2 0 110 4H8a2 2 0 110-4zm10 6H6a2 2 0 11-2-2h12a2 2 0 110 4z"
                />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-1">
                  {cartItemCount}
                </span>
              )}
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Side Navbar for small screens */}
      <div
  className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transition-transform transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden z-40`}
>
  <button
    onClick={() => setIsMenuOpen(false)}
    className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 focus:outline-none"
  >
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
  <div className="flex flex-col pt-20 px-4 space-y-4 h-full bg-gray-50">
    <NavLink
      to="/products?category=boys"
      className={({ isActive }) =>
        `text-black font-semibold transition-colors ${
          isActive ? 'font-bold' : 'font-normal'
        } hover:bg-gray-200 rounded-md p-2`
      }
    >
      Boys
    </NavLink>
    <NavLink
      to="/products?category=girls"
      className={({ isActive }) =>
        `text-black font-semibold transition-colors ${
          isActive ? 'font-bold' : 'font-normal'
        } hover:bg-gray-200 rounded-md p-2`
      }
    >
      Girls
    </NavLink>
    <NavLink
      to="/about"
      className={({ isActive }) =>
        `text-black font-semibold transition-colors ${
          isActive ? 'font-bold' : 'font-normal'
        } hover:bg-gray-200 rounded-md p-2`
      }
    >
      About
    </NavLink>
    <NavLink
      to="/contactus"
      className={({ isActive }) =>
        `text-black font-semibold transition-colors ${
          isActive ? 'font-bold' : 'font-normal'
        } hover:bg-gray-200 rounded-md p-2`
      }
    >
      Contact Us
    </NavLink>
   
    <input
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={handleSearch}
      className="p-2 border rounded-lg w-full bg-white shadow-inner"
    />
    {isLoggine ? (
      <button
        onClick={handleLogout}
        className="border w-full rounded bg-red-600 text-white text-lg font-semibold shadow-md hover:bg-red-700 transition-colors duration-300 py-2"
      >
        LogOut
      </button>
    ) : (
      <button
        onClick={handleLogin}
        className="border w-full rounded bg-red-600 text-white text-lg font-semibold shadow-md hover:bg-red-700 transition-colors duration-300 py-2"
      >
        Login
      </button>
    )}
    <p className="text-lg font-semibold">Hi, {user}</p>
    <NavLink to="/cart1" className="relative flex items-center mt-auto">
      <svg
        className="w-8 h-8 text-gray-700 hover:text-gray-900 transition-colors"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 3h2l1 9h11l1-9h2M4 7h16m-2 4h2a2 2 0 110 4h-2a2 2 0 110-4zm-6 0h2a2 2 0 110 4H8a2 2 0 110-4zm10 6H6a2 2 0 11-2-2h12a2 2 0 110 4z"
        />
      </svg>
      {cartItemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-1">
          {cartItemCount}
        </span>
      )}
    </NavLink>
  </div>
</div>

    </>
  );
}

export default Nav;
