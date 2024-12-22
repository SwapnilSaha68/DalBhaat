import React from 'react';
import { useNavigate } from 'react-router-dom';
import { placeOrder, clearCart } from '../services/api';

function PlaceOrder({ orderData }) {
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    try {
      // Send order data to the server
      const response = await placeOrder(orderData);
      alert(response.message);

      // Clear cart
      clearCart();

      // Redirect to confirmation page or home
      navigate('/order-confirmation'); // Ensure you have this route set up
    } catch (error) {
      alert('Error placing order. Please try again later.');
    }
  };

  return (
    <button onClick={handlePlaceOrder} className="place-order-btn">
      Place Order
    </button>
  );
}

export default PlaceOrder;
