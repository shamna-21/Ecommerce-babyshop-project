import React from "react";
import { useCart } from "../Context/CartContext";
import { Link, useNavigate } from "react-router-dom";



function CartPage() {
  const navigate = useNavigate();
  const { cart, handleRemoveFromCart } = useCart();

  const totalPrice = cart.reduce((acc, product) => {
    const price = Number(product.newprice) || 0;
    return acc + price * product.quantity;
  }, 0);

  const handleRemove = (productId) => {
    handleRemoveFromCart(productId);
  };
  // console.log(cart);
  

  const handleClick = () => {
    navigate("/checkout", { state: { cart, totalPrice } });
  };

  return (
   
    <div className="max-w-4xl mx-auto p-4">
     
      <h1 className="text-3xl font-bold mb-4">Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="list-none p-0">
            {cart.map((product) => {
              const price = Number(product.newprice) || 0;
              const itemTotalPrice = (price * product.quantity).toFixed(2);

              return (
                <li
                  key={product.id}
                  className="border-b py-4 flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg mr-4"
                    />
                    <div>
                      <h2 className="text-xl font-semibold">{product.name}</h2>
                      <p className="text-gray-600">Price: ${itemTotalPrice}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemove(product.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="mt-4">
            <p className="text-xl font-semibold">
              Total Price: ${totalPrice.toFixed(2)}
            </p>
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={handleClick}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
      <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">
        Continue Shopping
      </Link>
     
    </div>
    
  );
}

export default CartPage;
