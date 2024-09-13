import axios from "axios";
import React, { useEffect, useState } from "react";

function Order() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const userId = localStorage.getItem("id");
        const res = await axios.get(`http://localhost:3000/user/${userId}`);
        setData(res.data);
      } catch (err) {
        setError("Error fetching data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  const allCartItems = data?.order?.flatMap((order) => order.cart) || [];

  if (allCartItems.length === 0) {
    return <p className="text-center text-gray-600">No items in cart.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Ordered Items</h1>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-300">
            <th className="py-3 px-6 text-left text-gray-600">Image</th>
            <th className="py-3 px-6 text-left text-gray-600">Name</th>
            <th className="py-3 px-6 text-left text-gray-600">Price</th>
            <th className="py-3 px-6 text-left text-gray-600">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {allCartItems.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="py-3 px-6 text-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                />
              </td>
              <td className="py-3 px-6 text-gray-800">{item.name}</td>
              <td className="py-3 px-6 text-gray-800">${item.newprice}</td>
              <td className="py-3 px-6 text-gray-800">{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Order;
