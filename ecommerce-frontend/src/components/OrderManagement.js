import React, { useState, useEffect } from 'react';
import { getAllOrders, deleteOrder, updateOrderDetails } from '../services/api'; // Import API
import EditOrderModal from './EditOrderModal';
import './OrderManagement.css';

function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingOrder, setEditingOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await getAllOrders();
        setOrders(fetchedOrders);
        setFilteredOrders(fetchedOrders); // Initialize filtered orders
      } catch (error) {
        console.error('Error fetching orders:', error);
        alert('Failed to load orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleAction = async (orderId, action) => {
    try {
      switch (action) {
        case 'cancel':
          if (window.confirm('Are you sure you want to cancel and delete this order?')) {
            await deleteOrder(orderId);
            alert('Order cancelled and deleted successfully.');
          }
          break;
        case 'edit':
          const orderToEdit = orders.find((order) => order._id === orderId);
          setEditingOrder(orderToEdit);
          break;
        default:
          alert('Invalid action.');
      }
      // Refresh orders after action
      const refreshedOrders = await getAllOrders();
      setOrders(refreshedOrders);
      setFilteredOrders(refreshedOrders); // Update filtered orders
    } catch (error) {
      console.error(`Error performing ${action}:`, error);
      alert(`Failed to ${action} order. Please try again.`);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === '') {
      setFilteredOrders(orders); // Reset filtered orders if query is empty
    } else {
      setFilteredOrders(
        orders.filter(
          (order) =>
            order._id.toLowerCase().includes(query) ||
            order.name.toLowerCase().includes(query)
        )
      );
    }
  };

  return (
    <div className="order-management">
      <h1>Order Management</h1>

      {/* Search Input */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Order ID or Customer Name"
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      {loading ? (
        <p>Loading orders...</p>
      ) : filteredOrders.length === 0 ? (
        <p className="no-orders-message">No orders found.</p>
      ) : (
        <div className="order-table-container">
          <table className="order-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Delivery Option</th>
                <th>Payment Method</th>
                <th>Transaction ID</th>
                <th>Total Amount</th>
                <th>Order Summary</th>
                <th>Order Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.name}</td>
                  <td>{order.phone}</td>
                  <td>{order.address}</td>
                  <td>{order.deliveryOption}</td>
                  <td>{order.paymentMethod}</td>
                  <td>{order.transactionId || 'N/A'}</td>
                  <td>BDT {order.totalAmount.toFixed(2)}</td>
                  <td>
                    {order.orderSummary.map((item, index) => (
                      <div key={index} className="order-item-summary">
                        {item.productName} (x{item.quantity})
                      </div>
                    ))}
                  </td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                  <td>
                    <div className="order-actions">
                      <button
                        className="action-btn cancel"
                        onClick={() => handleAction(order._id, 'cancel')}
                      >
                        Order Cancel
                      </button>
                      <button
                        className="action-btn edit"
                        onClick={() => handleAction(order._id, 'edit')}
                      >
                        Order Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Order Modal */}
      {editingOrder && (
        <EditOrderModal
          order={editingOrder}
          onClose={() => setEditingOrder(null)}
          onSave={async (updatedOrder) => {
            await updateOrderDetails(updatedOrder._id, updatedOrder);
            alert('Order updated successfully!');
            setEditingOrder(null);
            const refreshedOrders = await getAllOrders();
            setOrders(refreshedOrders);
            setFilteredOrders(refreshedOrders);
          }}
        />
      )}
    </div>
  );
}

export default OrderManagement;
