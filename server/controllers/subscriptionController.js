const Subscription = require("../models/Subscription");
const Cook = require("../models/Cook");

// Create subscription
const createSubscription = async (req, res) => {
  try {
    const {
      cook,
      planType,
      mealType,
      price,
      startDate,
      endDate,
    } = req.body;

    if (
      !cook ||
      !planType ||
      !mealType ||
      price === undefined ||
      !startDate ||
      !endDate
    ) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    const cookProfile = await Cook.findById(cook);

    if (!cookProfile) {
      return res.status(404).json({
        message: "Cook not found",
      });
    }

    const subscription = await Subscription.create({
      user: req.user._id,
      cook,
      planType,
      mealType,
      price,
      startDate,
      endDate,
    });

    res.status(201).json({
      message: "Subscription created successfully",
      subscription,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create subscription",
      error: error.message,
    });
  }
};

// Get logged-in user's subscriptions
const getMySubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({
      user: req.user._id,
    })
      .populate("cook", "businessName city foodType image isVerified")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: subscriptions.length,
      subscriptions,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch subscriptions",
      error: error.message,
    });
  }
};

// Get single subscription
const getSubscriptionById = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate(
      "cook",
      "businessName city foodType image isVerified"
    );

    if (!subscription) {
      return res.status(404).json({
        message: "Subscription not found",
      });
    }

    res.status(200).json({
      subscription,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch subscription",
      error: error.message,
    });
  }
};

// Cancel subscription
const cancelSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!subscription) {
      return res.status(404).json({
        message: "Subscription not found",
      });
    }

    subscription.status = "Cancelled";

    await subscription.save();

    res.status(200).json({
      message: "Subscription cancelled successfully",
      subscription,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to cancel subscription",
      error: error.message,
    });
  }
};

// Get subscriptions for logged-in cook
const getCookSubscriptions = async (req, res) => {
  try {
    // Find cook profile linked to logged-in user
    const cookProfile = await Cook.findOne({
      user: req.user._id,
    });

    if (!cookProfile) {
      return res.status(404).json({
        message: "Cook profile not found",
      });
    }

    // Find subscriptions belonging to this cook
    const subscriptions = await Subscription.find({
      cook: cookProfile._id,
    })
      .populate(
        "user",
        "name email phone city"
      )
      .populate(
        "cook",
        "businessName city foodType image isVerified"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: subscriptions.length,
      subscriptions,
    });
  } catch (error) {
    console.error("GET COOK SUBSCRIPTIONS ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch cook subscriptions",
      error: error.message,
    });
  }
};


// Accept subscription request
const acceptSubscription = async (req, res) => {
  try {
    // Find cook profile of logged-in cook
    const cookProfile = await Cook.findOne({
      user: req.user._id,
    });

    if (!cookProfile) {
      return res.status(404).json({
        message: "Cook profile not found",
      });
    }

    // Find subscription belonging to this cook
    const subscription = await Subscription.findOne({
      _id: req.params.id,
      cook: cookProfile._id,
    });

    if (!subscription) {
      return res.status(404).json({
        message: "Subscription not found",
      });
    }

    // Only pending requests can be accepted
    if (subscription.status !== "Pending") {
      return res.status(400).json({
        message: `Subscription is already ${subscription.status.toLowerCase()}`,
      });
    }

    subscription.status = "Active";

    await subscription.save();

    const updatedSubscription = await Subscription.findById(
      subscription._id
    )
      .populate(
        "user",
        "name email phone city"
      )
      .populate(
        "cook",
        "businessName city foodType image isVerified"
      );

    res.status(200).json({
      message: "Subscription accepted successfully",
      subscription: updatedSubscription,
    });
  } catch (error) {
    console.error("ACCEPT SUBSCRIPTION ERROR:", error);

    res.status(500).json({
      message: "Failed to accept subscription",
      error: error.message,
    });
  }
};


// Reject subscription request
const rejectSubscription = async (req, res) => {
  try {
    // Find cook profile of logged-in cook
    const cookProfile = await Cook.findOne({
      user: req.user._id,
    });

    if (!cookProfile) {
      return res.status(404).json({
        message: "Cook profile not found",
      });
    }

    // Find subscription belonging to this cook
    const subscription = await Subscription.findOne({
      _id: req.params.id,
      cook: cookProfile._id,
    });

    if (!subscription) {
      return res.status(404).json({
        message: "Subscription not found",
      });
    }

    // Only pending requests can be rejected
    if (subscription.status !== "Pending") {
      return res.status(400).json({
        message: `Subscription is already ${subscription.status.toLowerCase()}`,
      });
    }

    subscription.status = "Rejected";

    await subscription.save();

    const updatedSubscription = await Subscription.findById(
      subscription._id
    )
      .populate(
        "user",
        "name email phone city"
      )
      .populate(
        "cook",
        "businessName city foodType image isVerified"
      );

    res.status(200).json({
      message: "Subscription rejected successfully",
      subscription: updatedSubscription,
    });
  } catch (error) {
    console.error("REJECT SUBSCRIPTION ERROR:", error);

    res.status(500).json({
      message: "Failed to reject subscription",
      error: error.message,
    });
  }
};

module.exports = {
  createSubscription,
  getMySubscriptions,
  getSubscriptionById,
  cancelSubscription,
  getCookSubscriptions,
  acceptSubscription,
  rejectSubscription,
};