import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";


function Checkout() {
  const location = useLocation();
  const { cart, totalPrice } = location.state || { cart: [], totalPrice: 0 }; // Default values to handle potential errors

  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    address: "",
    city: "",
    postalcode: "",
  });

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  function handlePaymentChange(e) {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  }

  function handleShippingChange(e) {
    const { name, value } = e.target;
    setShippingDetails({ ...shippingDetails, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("id");
  
      // Fetch existing user data
      const userResponse = await axios.get(`http://localhost:3000/user/${userId}`);
      const userData = userResponse.data;
  
      // Ensure `order` is an array
      const existingOrders = Array.isArray(userData.order) ? userData.order : [];

  
      // Prepare new order
      const newOrder = {
        paymentDetails,
        shippingDetails,
        cart,
        totalPrice,
      };
  
      // Append new order to existing orders
      const updatedOrders = [...existingOrders, newOrder];

  
      // Update user data with new orders list
      await axios.patch(`http://localhost:3000/user/${userId}`, {
        order: updatedOrders
      });
  
      // Handle success (e.g., redirect to order confirmation page)
      toast.success("Checkout successful");
    } catch (error) {
      toast.error("Checkout error: " + error.message);
    }
  }
  

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
     
      <h1 className="text-3xl font-semibold mb-6 text-red-700">CHECKOUT</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Summary */}
        <div className="lg:w-1/3 p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Cart Summary
          </h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul className="divide-y divide-gray-300">
              {cart.map((item) => {
                const price = Number(item.newprice) || 0;
                const itemTotalPrice = (price * item.quantity).toFixed(2);
                return (
                  <li
                    key={item.id}
                    className="py-4 flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {item.name}
                        </h3>
                        <p className="text-gray-600">
                          ${itemTotalPrice} x {item.quantity}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          <div className="mt-6 text-right">
            <h2 className="text-xl font-bold text-gray-800">
              Total: ${totalPrice.toFixed(2)}
            </h2>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="lg:w-2/3 p-4 bg-white shadow-md rounded-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Shipping Details
              </h2>
              <input
                onChange={handleShippingChange}
                type="text"
                name="name"
                value={shippingDetails.name}
                placeholder="YOUR NAME"
                required
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <input
                onChange={handleShippingChange}
                type="text"
                name="address"
                value={shippingDetails.address}
                placeholder="YOUR ADDRESS"
                required
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <input
                onChange={handleShippingChange}
                type="text"
                name="city"
                value={shippingDetails.city}
                placeholder="YOUR CITY"
                required
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <input
                onChange={handleShippingChange}
                type="text"
                name="postalcode"
                value={shippingDetails.postalcode}
                placeholder="YOUR POSTAL CODE"
                required
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Payment Details
              </h2>
              <input
                type="text"
                name="cardNumber"
                value={paymentDetails.cardNumber}
                onChange={handlePaymentChange}
                placeholder="Card Number"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                required
              />
              <input
                type="text"
                name="expirationDate"
                value={paymentDetails.expirationDate}
                onChange={handlePaymentChange}
                placeholder="Expiration Date (MM/YY)"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                required
              />
              <input
                type="text"
                name="cvv"
                value={paymentDetails.cvv}
                onChange={handlePaymentChange}
                placeholder="CVV"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600"
              >
                Pay ${totalPrice.toFixed(2)}
              </button>
            </div>
          </form>
        </div>
      </div>
     
    </div>
  );
}

export default Checkout;
