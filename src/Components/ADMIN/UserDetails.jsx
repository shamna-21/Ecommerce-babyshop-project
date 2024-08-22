import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

function UserDetails() {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:3000/user/${id}`);
        setUser(response.data);
      } catch (error) {
        toast.error('Error fetching user data');
        console.error('Error fetching user data:', error);
      }
    }

    fetchData();
  }, [id]);

  if (!user) return <p className="p-6">Loading...</p>;

  const purchasedItems = user.order ? user.order.flatMap(order => order.cart) : [];
  
  const paymentDetails = user.order ? user.order.map(order => ({
    name: order.shippingDetails.name,
    address: order.shippingDetails.address,
    city: order.shippingDetails.city,
    postalcode: order.shippingDetails.postalcode,
    cardNumber: order.paymentDetails.cardNumber,
    expirationDate: order.paymentDetails.expirationDate,
    cvv: order.paymentDetails.cvv,
    totalPrice: order.totalPrice
  })) : [];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">User Details</h1>

    
      {user && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">User Details</h2>
          <div className="p-4 border border-gray-200 rounded-lg">
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Password:</strong> {user.password}</p>
          </div>
        </div>
      )}

 
      {paymentDetails.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
          {paymentDetails.map((details, index) => (
            <div key={index} className="mb-6 p-4 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold text-red-700 mb-2">Order {index + 1}</h3>
              <p><strong>Name:</strong> {details.name}</p>
              <p><strong>Address:</strong> {details.address}</p>
              <p><strong>City:</strong> {details.city}</p>
              <p><strong>Postal Code:</strong> {details.postalcode}</p>
              <p><strong>Card Number:</strong> {details.cardNumber}</p>
              <p><strong>Expiration Date:</strong> {details.expirationDate}</p>
              <p><strong>CVV:</strong> {details.cvv}</p>
              <p><strong>Total Price:</strong> ${details.totalPrice.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}

  
      {purchasedItems.length > 0 ? (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Purchased Products</h2>
          <ul className="list-disc pl-5">
            {purchasedItems.map(item => {
              const price = Number(item.newprice);
              return (
                <li key={item.id} className="mb-4">
                  <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-sm">
                    <img src={item.image} alt={item.name} className="w-24 h-24 object-cover mr-4" />
                    <div>
                      <p><strong>Name:</strong> {item.name}</p>
                      <p><strong>Price:</strong> ${isNaN(price) ? 'N/A' : price.toFixed(2)}</p>
                      <p><strong>Description:</strong> {item.description}</p>
                      <p><strong>Quantity:</strong> {item.quantity}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p>No purchased items found.</p>
      )}
    </div>
  );
}

export default UserDetails;
