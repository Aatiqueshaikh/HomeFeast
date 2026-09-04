import {
  ArrowLeft,
  CalendarDays,
  XCircle,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Container from "../../components/layout/Container";
import PrimaryButton from "../../components/ui/PrimaryButton";
import apiRequest from "../../services/api";

function SubscriptionDetails() {
  const { id } = useParams();

  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancelling, setCancelling] = useState(false);

  const fetchSubscription = async () => {
    try {
      const token = localStorage.getItem("token");

      const data = await apiRequest(`/subscriptions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSubscription(data.subscription);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscription();
  }, [id]);

  const handleCancel = async () => {
    try {
      setCancelling(true);

      const token = localStorage.getItem("token");

      const data = await apiRequest(`/subscriptions/${id}/cancel`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSubscription(data.subscription);
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
              Loading subscription...
            </p>
          </div>
        </Container>
      </main>
    );
  }

  if (error || !subscription) {
    return (
      <main className="bg-slate-50 py-20">
        <Container>
          <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <h1 className="text-xl font-semibold text-slate-900">
              Subscription Not Found
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              {error || "This subscription could not be found."}
            </p>

            <Link
              to="/customer/subscriptions"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white"
            >
              <ArrowLeft size={16} />
              Back to Subscriptions
            </Link>
          </div>
        </Container>
      </main>
    );
  }

  const canCancel =
    subscription.status !== "Cancelled" &&
    subscription.status !== "Completed";

  return (
    <main className="bg-slate-50 py-12 sm:py-16">
      <Container>
        <Link
          to="/customer/subscriptions"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-orange-500"
        >
          <ArrowLeft size={16} />
          Back to Subscriptions
        </Link>

        <div className="mx-auto mt-8 max-w-2xl rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-orange-500">
                {subscription.planType} Meal Plan
              </p>

              <h1 className="mt-1 text-2xl font-bold text-slate-900">
                {subscription.cook?.businessName}
              </h1>
            </div>

            <span className="inline-flex w-fit rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-600">
              {subscription.status}
            </span>
          </div>

          <div className="mt-7 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">
                Meal Type
              </span>

              <span className="text-sm font-semibold text-slate-800">
                {subscription.mealType}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">
                Start Date
              </span>

              <span className="text-sm font-semibold text-slate-800">
                {new Date(
                  subscription.startDate
                ).toLocaleDateString()}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">
                End Date
              </span>

              <span className="text-sm font-semibold text-slate-800">
                {new Date(
                  subscription.endDate
                ).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="mt-7 flex items-center gap-3 rounded-xl bg-orange-50 p-4">
            <CalendarDays size={20} className="text-orange-500" />

            <div>
              <p className="text-sm font-medium text-slate-700">
                Subscription Price
              </p>

              <p className="mt-1 text-xl font-bold text-orange-500">
                ₹{subscription.price}
              </p>
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
              {cancelling
                ? "Cancelling..."
                : "Cancel Subscription"}
            </PrimaryButton>
          )}
        </div>
      </Container>
    </main>
  );
}

export default SubscriptionDetails;