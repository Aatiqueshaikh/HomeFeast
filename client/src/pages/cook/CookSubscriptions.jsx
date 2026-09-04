import { useEffect, useState } from "react";
import { Check, X, CalendarDays, User, IndianRupee } from "lucide-react";

import apiRequest from "../../services/api";

function CookSubscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState("");

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await apiRequest("/subscriptions/cook", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setSubscriptions(data.subscriptions || []);
    } catch (err) {
      setError(err.message || "Failed to load subscriptions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const handleAction = async (subscriptionId, action) => {
    try {
      setActionLoading(subscriptionId);
      setError("");

      const data = await apiRequest(
        `/subscriptions/${subscriptionId}/${action}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setSubscriptions((current) =>
        current.map((subscription) =>
          subscription._id === subscriptionId
            ? data.subscription
            : subscription
        )
      );
    } catch (err) {
      setError(err.message || "Failed to update subscription");
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 text-center">
        <p className="text-slate-500">Loading subscriptions...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <p className="text-orange-500 font-medium mb-2">
          Cook Dashboard
        </p>

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
          Customer Subscriptions
        </h1>

        <p className="text-slate-500 mt-2">
          Review and manage subscription requests from your customers.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-red-600">
          {error}
        </div>
      )}

      {subscriptions.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            No subscriptions yet
          </h2>

          <p className="text-slate-500 mt-2">
            Customer subscription requests will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {subscriptions.map((subscription) => (
            <div
              key={subscription._id}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center">
                      <User className="w-5 h-5 text-orange-500" />
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">
                        {subscription.user?.name || "Customer"}
                      </h2>

                      <p className="text-sm text-slate-500">
                        {subscription.user?.email}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-slate-400 uppercase">
                        Plan
                      </p>
                      <p className="font-medium text-slate-800 mt-1">
                        {subscription.planType}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400 uppercase">
                        Meal
                      </p>
                      <p className="font-medium text-slate-800 mt-1">
                        {subscription.mealType}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400 uppercase">
                        Price
                      </p>
                      <p className="font-medium text-slate-800 mt-1 flex items-center gap-1">
                        <IndianRupee className="w-4 h-4" />
                        {subscription.price}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400 uppercase">
                        Start Date
                      </p>
                      <p className="font-medium text-slate-800 mt-1 flex items-center gap-1">
                        <CalendarDays className="w-4 h-4" />
                        {new Date(
                          subscription.startDate
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start lg:items-end gap-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      subscription.status === "Pending"
                        ? "bg-amber-50 text-amber-600"
                        : subscription.status === "Active"
                        ? "bg-green-50 text-green-600"
                        : subscription.status === "Rejected"
                        ? "bg-red-50 text-red-600"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {subscription.status}
                  </span>

                  {subscription.status === "Pending" && (
                    <div className="flex gap-3">
                      <button
                        onClick={() =>
                          handleAction(subscription._id, "accept")
                        }
                        disabled={actionLoading === subscription._id}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition disabled:opacity-50"
                      >
                        <Check className="w-4 h-4" />
                        Accept
                      </button>

                      <button
                        onClick={() =>
                          handleAction(subscription._id, "reject")
                        }
                        disabled={actionLoading === subscription._id}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition disabled:opacity-50"
                      >
                        <X className="w-4 h-4" />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CookSubscriptions;