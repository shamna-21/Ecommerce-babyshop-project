import axios from 'axios';
import { toast } from 'react-toastify';

export const AddtoCart = async (item, quantity = 1) => {
  const userId = localStorage.getItem('id');

  if (userId) {
    try {
      const response = await axios.get(`http://localhost:3000/user/${userId}`);
      const userData = response.data;

      if (!userData) {
        throw new Error('User data not found.');
      }

      const cart = userData.cart || [];
      const existingItem = cart.find(p => p.id === item.id);

      if (existingItem) {
        existingItem.quantity += quantity;
        toast.info('Quantity updated in cart.');
      } else {
        cart.push({ ...item, quantity });
        toast.success('Item added to cart.');
      }

      
      console.log('Updating cart:', cart);

      await axios.patch(`http://localhost:3000/user/${userId}`, { cart });

    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error(`Failed to update cart: ${error.message}`);
    }
  } else {
    toast.warning('Please log in to add items to your cart.');
  }
};

export const removeFromCart = async (itemId) => {
  const userId = localStorage.getItem('id');

  if (userId) {
    try {
      const response = await axios.get(`http://localhost:3000/user/${userId}`);
      const userData = response.data;

      const cart = userData.cart || [];
      const updatedCart = cart.filter(item => item.id !== itemId);

      await axios.patch(`http://localhost:3000/user/${userId}`, { cart: updatedCart });

      toast.success('Item removed from cart.');
    } catch (error) {
      console.error('Error removing item from cart:', error);
      toast.error('Failed to remove item from cart.');
    }
  } else {
    toast.warning('Please log in to remove items from your cart.');
  }
};
