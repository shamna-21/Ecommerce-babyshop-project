import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";

function Homes() {

  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    const userId = localStorage.getItem('id');
    if (userId) {
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

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 w-full">
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
        <Link to='/'>
        <div className="block w-[80%] mx-auto">
          <h1  className="hover:bg-gray-600 rounded-lg px-6 py-3 mb-4 transition-colors">Home</h1>
        </div>
        </Link>
        
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-0 md:ml-72 w-full p-6 pt-20">
        <Outlet /> {/* Render nested routes here */}
      </div>
    </div>
  );
}

export default Homes;
