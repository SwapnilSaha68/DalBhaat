import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getAllOrders } from '../../services/api';
import './OrderConfirmation.css';

function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(location.state?.orderDetails || null);

  useEffect(() => {
    if (!orderDetails && orderId) {
      fetchOrderDetails(orderId);
    }
  }, [orderDetails, orderId]);

  const fetchOrderDetails = async (id) => {
    try {
      const order = await getAllOrders(id); // Use a dedicated `getOrderById` if available
      setOrderDetails(order);
    } catch (error) {
      console.error('Error fetching order details:', error);
      alert('Failed to load order details. Redirecting to homepage.');
      navigate('/');
    }
  };

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="confirmation-container">
      <h1>Order Confirmation</h1>
      <p>Thank you for your order!</p>
      <div className="receipt">
        <h2>Billing Receipt</h2>
        <p><strong>Order ID:</strong> {orderDetails._id}</p>
        <p><strong>Name:</strong> {orderDetails.name}</p>
        <p><strong>Phone:</strong> {orderDetails.phone}</p>
        <p><strong>Address:</strong> {orderDetails.address}</p>
        <p><strong>Delivery Option:</strong> {orderDetails.deliveryOption}</p>
        <p><strong>Payment Method:</strong> {orderDetails.paymentMethod}</p>
        {orderDetails.paymentMethod === 'bkash' && (
          <p><strong>Transaction ID:</strong> {orderDetails.transactionId}</p>
        )}
        <h3>Order Summary</h3>
        <ul>
          {orderDetails.orderSummary.map((item, index) => (
            <li key={index}>
              {item.productName} - Quantity: {item.quantity}
            </li>
          ))}
        </ul>
        <p><strong>Total Amount:</strong> BDT {orderDetails.totalAmount.toFixed(2)}</p>
      </div>
      <button className="back-home-btn" onClick={() => navigate('/')}>
        Back to Home
      </button>
    </div>
  );
}

export default OrderConfirmation;
