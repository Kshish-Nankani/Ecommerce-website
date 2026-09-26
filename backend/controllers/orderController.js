const Order = require("../model/Order");
const sendEmail = require("../utils/sendEmail");

const createOrder = async (req, res) => {
  try {
    const { products, totalAmount, address, paymentId } = req.body;
    if (!products || products.length === 0 || !totalAmount || !address) {
      return res.status(400).json({ message: 'Invalid order data' });
    }

    const userId = req.user ? req.user._id : null;

    const order = new Order({
      user: userId,
      products,
      totalAmount,
      address,
      paymentId: paymentId || `GUEST-${Date.now()}`
    });

    await order.save();

    if (req.user && req.user.email) {
      try {
        const message = `Thank you for placing an order! Order ID: ${order._id}\nTotal Amount: RS ${totalAmount}`;
        await sendEmail(req.user.email, 'Order Created', 'Your order has been created successfully', message);
      } catch (e) {
        console.error('Email notification skipped:', e.message);
      }
    }

    res.status(201).json({ message: 'Order created successfully', _id: order._id, order });

  } catch (error) {
    console.error('CREATE ORDER ERROR:', error);
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

const myOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('products.product', 'name price');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error Fetching orders", error });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'id name email');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (order) {
      order.status = status;
      await order.save();
      res.json({ message: 'Order status updated' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status', error });
  }
};

module.exports = {
  createOrder,
  myOrders,
  getOrders,
  updateOrderStatus
};