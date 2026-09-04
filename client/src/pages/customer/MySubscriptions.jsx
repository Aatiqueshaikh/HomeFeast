import { CalendarDays, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Container from "../../components/layout/Container";
import apiRequest from "../../services/api";

function MySubscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const token = localStorage.getItem("token");

        const data = await apiRequest("/subscriptions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSubscriptions(data.subscriptions || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  return (
    <main className="bg-slate-50 py-12 sm:py-16">
      <Container>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
            <CalendarDays size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              My Subscriptions
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage your homemade meal subscriptions.
            </p>
          </div>
        </div>

        {loading && (
          <div className="mt-10 rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <p className="text-sm text-slate-500">
              Loading your subscriptions...
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="mt-10 rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Unable to load subscriptions
            </h2>

            <p className="mt-2 text-sm text-slate-500">{error}</p>
          </div>
        )}

        {!loading && !error && subscriptions.length === 0 && (
          <div className="mt-10 rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              No subscriptions yet
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Your meal subscriptions will appear here.
            </p>

            <Link
              to="/providers"
              className="mt-5 inline-flex rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600"
            >
              Browse Providers
            </Link>
          </div>
        )}

        {!loading && !error && subscriptions.length > 0 && (
          <div className="mt-10 space-y-5">
            {subscriptions.map((subscription) => (
              <article
                key={subscription._id}
                className="rounded-2xl bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="font-semibold text-slate-900">
                      {subscription.cook?.businessName || "Home Cook"}
                    </h2>

                    <p className="mt-1 text-sm text-orange-500">
                      {subscription.planType} · {subscription.mealType}
                    </p>

                    <p className="mt-2 text-sm text-slate-500">
                      {new Date(
                        subscription.startDate
                      ).toLocaleDateString()}{" "}
                      -{" "}
                      {new Date(
                        subscription.endDate
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-lg font-bold text-orange-500">
                        ₹{subscription.price}
                      </p>

                      <span className="mt-1 inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                        {subscription.status}
                      </span>
                    </div>

                    <Link
                      to={`/customer/subscriptions/${subscription._id}`}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500 hover:bg-orange-100"
                      aria-label="View subscription"
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

export default MySubscriptions;