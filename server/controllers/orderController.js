const mongoose = require("mongoose");

const Order = require("../models/Order");
const Cook = require("../models/Cook");
const Meal = require("../models/Meal");

// Create order
const createOrder = async (req, res) => {
  try {
    console.log("CREATE ORDER BODY:", req.body);
    console.log("CREATE ORDER HEADERS:", req.headers);

    const {
      cook,
      meal,
      quantity,
      totalAmount,
      deliveryDate,
    } = req.body;

    // Check required fields
    if (
      !cook ||
      !meal ||
      quantity === undefined ||
      totalAmount === undefined ||
      !deliveryDate
    ) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    // Validate MongoDB IDs
    if (
      !mongoose.Types.ObjectId.isValid(cook) ||
      !mongoose.Types.ObjectId.isValid(meal)
    ) {
      return res.status(400).json({
        message: "Invalid cook or meal ID",
      });
    }

    // Validate quantity
    const orderQuantity = Number(quantity);

    if (!Number.isInteger(orderQuantity) || orderQuantity < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1",
      });
    }

    // Validate total amount
    const orderTotal = Number(totalAmount);

    if (Number.isNaN(orderTotal) || orderTotal < 0) {
      return res.status(400).json({
        message: "Invalid total amount",
      });
    }

    // Validate delivery date
    const parsedDeliveryDate = new Date(deliveryDate);

    if (Number.isNaN(parsedDeliveryDate.getTime())) {
      return res.status(400).json({
        message: "Invalid delivery date",
      });
    }

    // Find cook
    const cookProfile = await Cook.findById(cook);

    if (!cookProfile) {
      return res.status(404).json({
        message: "Cook not found",
      });
    }

    // Find meal
    const mealItem = await Meal.findById(meal);

    if (!mealItem) {
      return res.status(404).json({
        message: "Meal not found",
      });
    }

    // Make sure the selected meal belongs to the selected cook
    if (mealItem.cook.toString() !== cookProfile._id.toString()) {
      return res.status(400).json({
        message: "Selected meal does not belong to this cook",
      });
    }

    // Check meal availability
    if (!mealItem.isAvailable) {
      return res.status(400).json({
        message: "Meal is currently unavailable",
      });
    }

    // Create order
    const order = await Order.create({
      user: req.user._id,
      cook: cookProfile._id,
      meal: mealItem._id,
      quantity: orderQuantity,
      totalAmount: orderTotal,
      deliveryDate: parsedDeliveryDate,
    });

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);

    res.status(500).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
};

// Get logged-in user's orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    })
      .populate(
        "cook",
        "businessName city foodType image isVerified"
      )
      .populate(
        "meal",
        "name description category foodType price image mealType"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("GET ORDERS ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

// Get single order
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    })
      .populate(
        "cook",
        "businessName city foodType image isVerified"
      )
      .populate(
        "meal",
        "name description category foodType price image mealType"
      );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({
      order,
    });
  } catch (error) {
    console.error("GET ORDER ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch order",
      error: error.message,
    });
  }
};

// Cancel order
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (order.status === "Delivered") {
      return res.status(400).json({
        message: "Delivered orders cannot be cancelled",
      });
    }

    if (order.status === "Cancelled") {
      return res.status(400).json({
        message: "Order is already cancelled",
      });
    }

    order.status = "Cancelled";

    await order.save();

    res.status(200).json({
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    console.error("CANCEL ORDER ERROR:", error);

    res.status(500).json({
      message: "Failed to cancel order",
      error: error.message,
    });
  }
};

// Get orders for logged-in cook
const getCookOrders = async (req, res) => {
  try {
    // Find the cook profile linked to the logged-in user
    const cookProfile = await Cook.findOne({
      user: req.user._id,
    });

    if (!cookProfile) {
      return res.status(404).json({
        message: "Cook profile not found",
      });
    }

    // Find orders belonging to this cook
    const orders = await Order.find({
      cook: cookProfile._id,
    })
      .populate(
        "user",
        "name email phone city"
      )
      .populate(
        "meal",
        "name description category foodType price image mealType"
      )
      .populate(
        "cook",
        "businessName city foodType image isVerified"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("GET COOK ORDERS ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch cook orders",
      error: error.message,
    });
  }
};


// Update order status by cook
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Confirmed",
      "Preparing",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ];

    // Validate status
    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid order status",
      });
    }

    // Find cook profile of logged-in cook
    const cookProfile = await Cook.findOne({
      user: req.user._id,
    });

    if (!cookProfile) {
      return res.status(404).json({
        message: "Cook profile not found",
      });
    }

    // Find order that belongs to this cook
    const order = await Order.findOne({
      _id: req.params.id,
      cook: cookProfile._id,
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // Prevent changes to already delivered/cancelled orders
    if (
      order.status === "Delivered" ||
      order.status === "Cancelled"
    ) {
      return res.status(400).json({
        message: `Order is already ${order.status.toLowerCase()}`,
      });
    }

    order.status = status;

    await order.save();

    // Return updated order with related data
    const updatedOrder = await Order.findById(order._id)
      .populate(
        "user",
        "name email phone city"
      )
      .populate(
        "meal",
        "name description category foodType price image mealType"
      )
      .populate(
        "cook",
        "businessName city foodType image isVerified"
      );

    res.status(200).json({
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("UPDATE ORDER STATUS ERROR:", error);

    res.status(500).json({
      message: "Failed to update order status",
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  getCookOrders,
  updateOrderStatus,
};