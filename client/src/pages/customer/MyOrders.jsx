import { ClipboardList, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Container from "../../components/layout/Container";
import apiRequest from "../../services/api";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const data = await apiRequest("/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(data.orders || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const statusClass = (status) => {
    if (status === "Delivered") {
      return "bg-green-50 text-green-600";
    }

    if (status === "Cancelled") {
      return "bg-red-50 text-red-600";
    }

    return "bg-orange-50 text-orange-600";
  };

  return (
    <main className="bg-slate-50 py-12 sm:py-16">
      <Container>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
            <ClipboardList size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              My Orders
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              View and track your food orders.
            </p>
          </div>
        </div>

        {loading && (
          <div className="mt-10 rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <p className="text-sm text-slate-500">
              Loading your orders...
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="mt-10 rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Unable to load orders
            </h2>

            <p className="mt-2 text-sm text-slate-500">{error}</p>
          </div>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="mt-10 rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              No orders yet
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Your placed orders will appear here.
            </p>

            <Link
              to="/providers"
              className="mt-5 inline-flex rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600"
            >
              Browse Providers
            </Link>
          </div>
        )}

        {!loading && !error && orders.length > 0 && (
          <div className="mt-10 space-y-5">
            {orders.map((order) => (
              <article
                key={order._id}
                className="rounded-2xl bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="font-semibold text-slate-900">
                      {order.meal?.name || "Meal Order"}
                    </h2>

                    <p className="mt-1 text-sm text-orange-500">
                      {order.cook?.businessName || "Home Cook"}
                    </p>

                    <p className="mt-2 text-sm text-slate-500">
                      Quantity: {order.quantity}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-lg font-bold text-orange-500">
                        ₹{order.totalAmount}
                      </p>

                      <span
                        className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <Link
                      to={`/customer/orders/${order._id}`}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500 transition hover:bg-orange-100"
                      aria-label="View order"
                    >
                      <Eye size={18} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}

export default MyOrders;