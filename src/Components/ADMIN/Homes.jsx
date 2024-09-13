import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

function Homes() {

  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    const userId = localStorage.getItem('id');
    if (userId) {
      // setIsLoggine(true);
      try {
        const res = await axios.get(`http://localhost:3000/user/${userId}`);
        if (res.data?.admin === true) setIsAdmin(true);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  }

  const Data = [
    { title: "Dashboard", url: "dashboard" },
    { title: "All Users", url: "all-users" },
    { title: "Add Products", url: "add-product" },
    { title: "Edit Products", url: "edit-product" },
    { title: "Orders", url: "orders" },
  ];

  if (!isAdmin) {
    return <div>Unauthorized</div>; // Or redirect to an unauthorized page
  }
  
  
 
  const handleLogout = () => {
    const confirm=window.confirm('Are You Sure')
    if(confirm){
      localStorage.clear();
     
      navigate('/login')
    }
    
  };
 
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 w-full">
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
      {/* Sidebar */}
      <div
        className={`fixed inset-0 bg-gray-700 text-gray-200 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out w-72 h-full pt-20 z-10 md:translate-x-0`}
      >
        
        {Data.map((item, ind) => (
          <Link
            key={ind}
            className="block w-[80%] mx-auto"
            to={`/admin/${item.url}`}
            onClick={() => setIsOpen(false)}
          >
            <div className="hover:bg-gray-600 rounded-lg px-6 py-3 mb-4 transition-colors">
              {item.title}
            </div>
          </Link>
        ))}
        {/* <Link to='/'>
        <div className="block w-[80%] mx-auto">
          <h1  className="hover:bg-gray-600 rounded-lg px-6 py-3 mb-4 transition-colors">Home</h1>
        </div>
        </Link> */}
       
           
              <button
                onClick={handleLogout}
                className="border ml-11 w-20 rounded bg-red-600 text-white text-lg font-semibold shadow-md hover:bg-red-700 transition-colors duration-300"
              >
                LogOut
              </button>
          
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-0 md:ml-72 w-full p-6 pt-20">
        <Outlet /> {/* Render nested routes here */}
      </div>
      
    </div>
  );
}

export default Homes;
