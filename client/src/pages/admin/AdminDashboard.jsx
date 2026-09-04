import { useEffect, useState } from "react";
import {
  Users,
  ChefHat,
  ShoppingBag,
  CalendarDays,
  MessageSquare,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import apiRequest from "../../services/api";

const AdminDashboard = () => {
  const { token } = useAuth();

  const [stats, setStats] = useState({
    users: 0,
    cooks: 0,
    orders: 0,
    subscriptions: 0,
    complaints: 0,
  });

  const [users, setUsers] = useState([]);
  const [cooks, setCooks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [complaints, setComplaints] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true);
        setError("");

        const [
          usersData,
          cooksData,
          ordersData,
          subscriptionsData,
          complaintsData,
        ] = await Promise.all([
          apiRequest("/admin/users", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),

          apiRequest("/admin/cooks", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),

          apiRequest("/admin/orders", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),

          apiRequest("/admin/subscriptions", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),

          apiRequest("/admin/complaints", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        setStats({
          users: usersData.count || 0,
          cooks: cooksData.count || 0,
          orders: ordersData.count || 0,
          subscriptions: subscriptionsData.count || 0,
          complaints: complaintsData.count || 0,
        });

        setUsers(usersData.users || []);
        setCooks(cooksData.cooks || []);
        setOrders(ordersData.orders || []);
        setSubscriptions(subscriptionsData.subscriptions || []);
        setComplaints(complaintsData.complaints || []);
      } catch (err) {
        setError(err.message || "Failed to load admin data");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchAdminData();
    }
  }, [token]);

  const handleVerification = async (cookId, isVerified) => {
    try {
      await apiRequest(`/admin/cooks/${cookId}/verify`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          isVerified,
        }),
      });

      setCooks((prevCooks) =>
        prevCooks.map((cook) =>
          cook._id === cookId
            ? { ...cook, isVerified }
            : cook
        )
      );
    } catch (err) {
      setError(err.message || "Failed to update cook verification");
    }
  };

  const handleResolveComplaint = async (complaintId) => {
    try {
      await apiRequest(`/admin/complaints/${complaintId}/resolve`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint._id === complaintId
            ? { ...complaint, status: "Resolved" }
            : complaint
        )
      );
    } catch (err) {
      setError(err.message || "Failed to resolve complaint");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-600 text-lg">
          Loading admin dashboard...
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Admin Dashboard
          </h1>

          <p className="text-slate-500 mt-2">
            Manage users, cooks, orders, subscriptions and complaints.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-red-700">
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-10">

          {/* Users */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Total Users
                </p>

                <h2 className="text-2xl font-bold text-slate-800 mt-1">
                  {stats.users}
                </h2>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Cooks */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Total Cooks
                </p>

                <h2 className="text-2xl font-bold text-slate-800 mt-1">
                  {stats.cooks}
                </h2>
              </div>

              <div className="p-3 bg-orange-50 rounded-lg">
                <ChefHat className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          {/* Orders */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Total Orders
                </p>

                <h2 className="text-2xl font-bold text-slate-800 mt-1">
                  {stats.orders}
                </h2>
              </div>

              <div className="p-3 bg-green-50 rounded-lg">
                <ShoppingBag className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          {/* Subscriptions */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Subscriptions
                </p>

                <h2 className="text-2xl font-bold text-slate-800 mt-1">
                  {stats.subscriptions}
                </h2>
              </div>

              <div className="p-3 bg-purple-50 rounded-lg">
                <CalendarDays className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Complaints */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Complaints
                </p>

                <h2 className="text-2xl font-bold text-slate-800 mt-1">
                  {stats.complaints}
                </h2>
              </div>

              <div className="p-3 bg-red-50 rounded-lg">
                <MessageSquare className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

        </div>

        {/* User Management */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 mb-8 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800">
              User Management
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              View all registered users.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Name
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Email
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Phone
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    City
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Role
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr
                      key={user._id}
                      className="border-t border-slate-100"
                    >
                      <td className="px-6 py-4 text-sm text-slate-800">
                        {user.name}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {user.email}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {user.phone || "-"}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {user.city || "-"}
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                          {user.role}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-8 text-center text-slate-500"
                    >
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Cook Management */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 mb-8 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800">
              Cook Management
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Review and verify home cook profiles.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Business
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Owner
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    City
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Food Type
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Price / Meal
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Status
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {cooks.length > 0 ? (
                  cooks.map((cook) => (
                    <tr
                      key={cook._id}
                      className="border-t border-slate-100"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-slate-800">
                        {cook.businessName}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {cook.user?.name || "-"}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {cook.city}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {cook.foodType}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        ₹{cook.pricePerMeal}
                      </td>

                      <td className="px-6 py-4">
                        {cook.isVerified ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            <CheckCircle className="w-3.5 h-3.5" />
                            Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                            <XCircle className="w-3.5 h-3.5" />
                            Pending
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        {cook.isVerified ? (
                          <button
                            onClick={() =>
                              handleVerification(cook._id, false)
                            }
                            className="text-sm font-medium text-red-600 hover:text-red-700"
                          >
                            Remove Approval
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handleVerification(cook._id, true)
                            }
                            className="text-sm font-medium text-green-600 hover:text-green-700"
                          >
                            Approve Cook
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-8 text-center text-slate-500"
                    >
                      No cooks found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Order Management */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 mb-8 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800">
              Order Management
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Monitor all customer orders.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Customer
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Cook
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Meal
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Quantity
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Total
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Delivery Date
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-t border-slate-100"
                    >
                      <td className="px-6 py-4 text-sm text-slate-800">
                        {order.user?.name || "-"}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {order.cook?.businessName || "-"}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {order.meal?.name || "-"}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {order.quantity}
                      </td>

                      <td className="px-6 py-4 text-sm font-medium text-slate-800">
                        ₹{order.totalAmount}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {new Date(
                          order.deliveryDate
                        ).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-8 text-center text-slate-500"
                    >
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Subscription Management */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 mb-8 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800">
              Subscription Management
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Monitor all customer meal subscriptions.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Customer
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Cook
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Plan
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Meal Type
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Price
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Start Date
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    End Date
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {subscriptions.length > 0 ? (
                  subscriptions.map((subscription) => (
                    <tr
                      key={subscription._id}
                      className="border-t border-slate-100"
                    >
                      <td className="px-6 py-4 text-sm text-slate-800">
                        {subscription.user?.name || "-"}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {subscription.cook?.businessName || "-"}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {subscription.planType}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {subscription.mealType}
                      </td>

                      <td className="px-6 py-4 text-sm font-medium text-slate-800">
                        ₹{subscription.price}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {new Date(
                          subscription.startDate
                        ).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {new Date(
                          subscription.endDate
                        ).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                          {subscription.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-6 py-8 text-center text-slate-500"
                    >
                      No subscriptions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Complaints Management */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800">
              Complaints Management
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Review and resolve customer complaints.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Customer
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Complaint
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Date
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Status
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {complaints.length > 0 ? (
                  complaints.map((complaint) => (
                    <tr
                      key={complaint._id}
                      className="border-t border-slate-100"
                    >
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-slate-800">
                          {complaint.user?.name || "-"}
                        </p>

                        <p className="text-xs text-slate-500 mt-1">
                          {complaint.user?.email || "-"}
                        </p>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600 max-w-md">
                        {complaint.message ||
                          complaint.description ||
                          "-"}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {complaint.createdAt
                          ? new Date(
                              complaint.createdAt
                            ).toLocaleDateString()
                          : "-"}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                            complaint.status === "Resolved"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {complaint.status}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        {complaint.status === "Resolved" ? (
                          <span className="text-sm font-medium text-green-600">
                            Resolved
                          </span>
                        ) : (
                          <button
                            onClick={() =>
                              handleResolveComplaint(
                                complaint._id
                              )
                            }
                            className="text-sm font-medium text-green-600 hover:text-green-700"
                          >
                            Resolve
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-8 text-center text-slate-500"
                    >
                      No complaints found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </main>
  );
};

export default AdminDashboard;