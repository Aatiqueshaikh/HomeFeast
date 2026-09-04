import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  User,
  CalendarDays,
  IndianRupee,
  RefreshCw,
} from "lucide-react";

import apiRequest from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function CookOrders() {
  const { token } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await apiRequest("/orders/cook", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(data.orders || []);
    } catch (error) {
      setError(error.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const updateStatus = async (orderId, status) => {
    try {
      await apiRequest(`/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status,
        }),
      });

      fetchOrders();
    } catch (error) {
      alert(error.message || "Failed to update order status");
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Confirmed":
        return "bg-blue-100 text-blue-700";

      case "Preparing":
        return "bg-orange-100 text-orange-700";

      case "Out for Delivery":
        return "bg-purple-100 text-purple-700";

      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-orange-500 animate-spin mx-auto mb-3" />
          <p className="text-slate-600">Loading customer orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <Link
              to="/cook/dashboard"
              className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-orange-500 transition mb-3"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>

            <h1 className="text-3xl font-bold text-slate-900">
              Customer Orders
            </h1>

            <p className="text-slate-600 mt-1">
              Manage orders placed by your customers.
            </p>
          </div>

          <button
            onClick={fetchOrders}
            className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-lg hover:bg-slate-50 transition"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!error && orders.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <Package className="w-14 h-14 text-slate-300 mx-auto mb-4" />

            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              No Customer Orders
            </h2>

            <p className="text-slate-500">
              You don't have any customer orders yet.
            </p>
          </div>
        )}

        {/* Orders */}
        <div className="space-y-5">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
            >
              {/* Order Header */}
              <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-500">
                    Order ID
                  </p>

                  <p className="font-semibold text-slate-800 break-all">
                    #{order._id}
                  </p>
                </div>

                <span
                  className={`inline-flex w-fit px-3 py-1.5 rounded-full text-sm font-medium ${getStatusClass(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              {/* Order Content */}
              <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Customer */}
                <div>
                  <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <User className="w-5 h-5 text-orange-500" />
                    Customer
                  </h3>

                  <div className="space-y-1 text-sm text-slate-600">
                    <p>
                      <span className="font-medium text-slate-800">
                        Name:
                      </span>{" "}
                      {order.user?.name || "N/A"}
                    </p>

                    <p>
                      <span className="font-medium text-slate-800">
                        Email:
                      </span>{" "}
                      {order.user?.email || "N/A"}
                    </p>

                    <p>
                      <span className="font-medium text-slate-800">
                        Phone:
                      </span>{" "}
                      {order.user?.phone || "N/A"}
                    </p>

                    <p>
                      <span className="font-medium text-slate-800">
                        City:
                      </span>{" "}
                      {order.user?.city || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Meal */}
                <div>
                  <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <Package className="w-5 h-5 text-orange-500" />
                    Meal Details
                  </h3>

                  <div className="space-y-1 text-sm text-slate-600">
                    <p>
                      <span className="font-medium text-slate-800">
                        Meal:
                      </span>{" "}
                      {order.meal?.name || "N/A"}
                    </p>

                    <p>
                      <span className="font-medium text-slate-800">
                        Meal Type:
                      </span>{" "}
                      {order.meal?.mealType || "N/A"}
                    </p>

                    <p>
                      <span className="font-medium text-slate-800">
                        Category:
                      </span>{" "}
                      {order.meal?.category || "N/A"}
                    </p>

                    <p>
                      <span className="font-medium text-slate-800">
                        Quantity:
                      </span>{" "}
                      {order.quantity}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="px-5 pb-5">
                <div className="bg-slate-50 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <CalendarDays className="w-4 h-4 text-orange-500" />

                    <span>
                      Delivery:{" "}
                      <span className="font-medium text-slate-800">
                        {new Date(order.deliveryDate).toLocaleDateString()}
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center gap-1 font-bold text-lg text-slate-900">
                    <IndianRupee className="w-5 h-5" />
                    {order.totalAmount}
                  </div>
                </div>
              </div>

              {/* Status Controls */}
              <div className="px-5 pb-5">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Update Order Status
                </label>

                <select
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(order._id, e.target.value)
                  }
                  disabled={
                    order.status === "Delivered" ||
                    order.status === "Cancelled"
                  }
                  className="w-full sm:w-64 px-4 py-2.5 border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:bg-slate-100 disabled:cursor-not-allowed"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Preparing">Preparing</option>
                  <option value="Out for Delivery">
                    Out for Delivery
                  </option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CookOrders;