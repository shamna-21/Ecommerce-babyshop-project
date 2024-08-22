import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { AddtoCart, removeFromCart } from '../Context/AddtoCart';
import axios from 'axios';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem('id');
    if (userId) {
      const fetchCart = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/user/${userId}`);
          setCart(response.data.cart || []);
        } catch (error) {
          console.error('Error fetching cart data:', error);
          toast.error('Failed to fetch cart data');
        }
      };
      fetchCart();
    }
  }, []);

  const addToCart = async (product) => {
    const userId = localStorage.getItem('id');
    if (userId) {
      try {
        await AddtoCart(product, product.quantity || 1);
        setCart(prevCart => {
          const existingProduct = prevCart.find(p => p.id === product.id);
          if (existingProduct) {
            return prevCart.map(p =>
              p.id === product.id
                ? { ...p, quantity: p.quantity + (product.quantity || 1) }
                : p
            );
          } else {
            return [...prevCart, { ...product, quantity: product.quantity || 1 }];
          }
        });
      } catch (error) {
        console.error('Error adding to cart:', error);
        toast.error('Failed to add product to cart');
      }
    } else {
      toast.warning('Please log in to add items to your cart.');
    }
  };

  const handleRemoveFromCart = async (productId) => {
    const userId = localStorage.getItem('id');
    if (userId) {
      try {
        await removeFromCart(productId);
        setCart(prevCart => prevCart.filter(p => p.id !== productId));
      } catch (error) {
        console.error('Error removing from cart:', error);
        toast.error('Failed to remove product from cart');
      }
    } else {
      toast.warning('Please log in to remove items from your cart.');
    }
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, handleRemoveFromCart, cartItemCount: cart.length }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
