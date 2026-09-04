import {
  ArrowLeft,
  CalendarDays,
  CheckCircle,
  MapPin,
  XCircle,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Container from "../../components/layout/Container";
import PrimaryButton from "../../components/ui/PrimaryButton";
import apiRequest from "../../services/api";

function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancelling, setCancelling] = useState(false);

  const fetchOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      const data = await apiRequest(`/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrder(data.order);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const handleCancel = async () => {
    try {
      setCancelling(true);

      const token = localStorage.getItem("token");

      const data = await apiRequest(`/orders/${id}/cancel`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrder(data.order);
    } catch (err) {
      setError(err.message);
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <main className="bg-slate-50 py-20">
        <Container>
          <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <p className="text-sm text-slate-500">
              Loading order details...
            </p>
          </div>
        </Container>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="bg-slate-50 py-20">
        <Container>
          <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <h1 className="text-xl font-semibold text-slate-900">
              Order Not Found
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              {error || "This order could not be found."}
            </p>

            <Link
              to="/customer/orders"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white"
            >
              <ArrowLeft size={16} />
              Back to Orders
            </Link>
          </div>
        </Container>
      </main>
    );
  }

  const canCancel =
    order.status !== "Delivered" && order.status !== "Cancelled";

  return (
    <main className="bg-slate-50 py-12 sm:py-16">
      <Container>
        <Link
          to="/customer/orders"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-orange-500"
        >
          <ArrowLeft size={16} />
          Back to Orders
        </Link>

        <div className="mx-auto mt-8 max-w-3xl">
          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Order #{order._id.slice(-8)}
                </p>

                <h1 className="mt-1 text-2xl font-bold text-slate-900">
                  {order.meal?.name}
                </h1>
              </div>

              <span className="inline-flex w-fit rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-600">
                {order.status}
              </span>
            </div>

            <div className="mt-6 space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 text-orange-500" size={20} />

                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Home Cook
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {order.cook?.businessName} · {order.cook?.city}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CalendarDays
                  className="mt-0.5 text-orange-500"
                  size={20}
                />

                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Delivery Date
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {new Date(order.deliveryDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle
                  className="mt-0.5 text-orange-500"
                  size={20}
                />

                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Quantity
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {order.quantity} meal
                    {order.quantity > 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-xl bg-slate-50 p-5">
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-700">
                  Total Amount
                </span>

                <span className="text-xl font-bold text-orange-500">
                  ₹{order.totalAmount}
                </span>
              </div>
            </div>

            {error && (
              <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </p>
            )}

            {canCancel && (
              <PrimaryButton
                type="button"
                onClick={handleCancel}
                className="mt-6 w-full bg-red-500 hover:bg-red-600"
                disabled={cancelling}
              >
                <XCircle size={17} className="mr-2" />
                {cancelling ? "Cancelling..." : "Cancel Order"}
              </PrimaryButton>
            )}
          </div>
        </div>
      </Container>
    </main>
  );
}

export default OrderDetails;