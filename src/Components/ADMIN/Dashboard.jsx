// src/components/Dashboard.js
import axios from "axios";
import React, { useEffect, useState } from "react";

function Dashboard() {
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const productResponse = await axios.get(
          "http://localhost:3000/product"
        );
        setProductCount(productResponse.data.length);

        const userResponse = await axios.get("http://localhost:3000/user");
        const allUsers = userResponse.data;

        const nonAdminUsers = allUsers.filter((user) => !user.admin);
        setUsers(nonAdminUsers);
        setUserCount(nonAdminUsers.length);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }

    fetchData();
  }, []);

  const allOrders = users.flatMap((user) =>
    user.order ? user.order.flatMap((order) => order.cart || []) : []
  );

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-2">Total Products</h2>
        <p className="text-3xl font-bold">{productCount}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-2">Total Users</h2>
        <p className="text-3xl font-bold">{userCount}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-2">Total Orders</h2>
        <p className="text-3xl font-bold">{allOrders.length}</p>
      </div>
    </div>
  );
}

export default Dashboard;
