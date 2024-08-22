import axios from 'axios';
import React, { useEffect, useState } from 'react';

function OrderDetails() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3000/user');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    fetchData();
  }, []);

  // Flatten all orders into a single array
  const allOrders = users.flatMap(user =>
    user.order ? user.order.flatMap(order =>
      order.cart.map(item => ({
        username: user.name,
        image: item.image,
        name: item.name,
        quantity: item.quantity,
        price: item.newprice
      }))
    ) : []
  );

 


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Orders</h1>

      {allOrders.length > 0 ? (
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">Product Image</th>
              <th className="border px-4 py-2">Product Name</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order, index) => (
              <tr key={index} className="border-b">
                <td className="border px-4 py-2">{order.username}</td>
                <td className="border px-4 py-2">
                  <img src={order.image} alt={order.name} className="w-24 h-24 object-cover" />
                </td>
                <td className="border px-4 py-2">{order.name}</td>
                <td className="border px-4 py-2">{order.quantity}</td>
                <td className="border px-4 py-2">${order.price}</td>
               
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}

export default OrderDetails;
