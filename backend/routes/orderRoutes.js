const express = require('express');
const Order = require('../models/order');
const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const { name, phone, address, deliveryOption, paymentMethod, transactionId, orderSummary, totalAmount } = req.body;

    if (!name || !phone || !address || !deliveryOption || !paymentMethod || !orderSummary || !totalAmount) {
      return res.status(400).json({ error: 'All required fields must be provided.' });
    }

    const newOrder = new Order({
      name,
      phone,
      address,
      deliveryOption,
      paymentMethod,
      transactionId: paymentMethod === 'bkash' ? transactionId : null,
      orderSummary,
      totalAmount,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully!', orderId: savedOrder._id });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/all', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }); // Sort by most recent orders
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

router.put('/:orderId/status', async (req, res) => {
  try {
    const { status } = req.body;
    const orderId = req.params.orderId;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ message: 'Order status updated successfully', order: updatedOrder });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

router.put('/:orderId/edit', async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const updatedOrder = req.body;

    const order = await Order.findByIdAndUpdate(orderId, updatedOrder, { new: true });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ message: 'Order updated successfully', order });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
});

router.delete('/:orderId', async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ message: 'Order cancelled and deleted successfully', orderId });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

router.get('/:orderId', async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

module.exports = router;
