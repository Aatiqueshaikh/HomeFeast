import { ArrowLeft, CalendarDays } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Container from "../../components/layout/Container";
import PrimaryButton from "../../components/ui/PrimaryButton";
import apiRequest from "../../services/api";

function PlaceOrder() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const cookId = searchParams.get("cook");
  const mealId = searchParams.get("meal");

  const [cook, setCook] = useState(null);
  const [meal, setMeal] = useState(null);

  const [quantity, setQuantity] = useState(1);
  const [deliveryDate, setDeliveryDate] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        if (!cookId || !mealId) {
          throw new Error("Cook or meal information is missing.");
        }

        const [cookData, mealData] = await Promise.all([
          apiRequest(`/cooks/${cookId}`),
          apiRequest(`/meals/${mealId}`),
        ]);

        setCook(cookData.cook);
        setMeal(mealData.meal);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [cookId, mealId]);

  const totalAmount = meal
  ? meal.price * Number(quantity)
  : 0;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      setError("");

      const token = localStorage.getItem("token");

      await apiRequest("/orders", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cook: cookId,
          meal: mealId,
          quantity: Number(quantity),
          totalAmount,
          deliveryDate,
        }),
      });

      navigate("/customer/orders");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
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

  if (error && (!cook || !meal)) {
    return (
      <main className="bg-slate-50 py-20">
        <Container>
          <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <h1 className="text-xl font-semibold text-slate-900">
              Unable to load order
            </h1>

            <p className="mt-2 text-sm text-slate-500">{error}</p>

            <Link
              to="/providers"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white"
            >
              <ArrowLeft size={16} />
              Back to Providers
            </Link>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="bg-slate-50 py-12 sm:py-16">
      <Container>
        <Link
          to={`/cook/${cookId}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-orange-500"
        >
          <ArrowLeft size={16} />
          Back to Cook
        </Link>

        <div className="mx-auto mt-8 max-w-2xl rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-medium text-orange-500">
            Place Order
          </p>

          <h1 className="mt-2 text-2xl font-bold text-slate-900">
            {meal.name}
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            {cook.businessName}
          </p>

          <div className="mt-6 rounded-xl bg-orange-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">
                Price per meal
              </span>

              <span className="font-semibold text-orange-500">
                ₹{meal.price}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label
                htmlFor="quantity"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Quantity
              </label>

              <input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                required
              />
            </div>

            <div>
              <label
                htmlFor="deliveryDate"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Delivery Date
              </label>

              <div className="relative">
                <CalendarDays
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="deliveryDate"
                  type="date"
                  value={deliveryDate}
                  onChange={(event) => setDeliveryDate(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-11 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  required
                />
              </div>
            </div>

            {error && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </p>
            )}

            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-4">
              <span className="font-medium text-slate-700">
                Total Amount
              </span>

              <span className="text-xl font-bold text-orange-500">
                ₹{totalAmount}
              </span>
            </div>

            <PrimaryButton
              type="submit"
              className="w-full"
              disabled={submitting}
            >
              {submitting ? "Placing Order..." : "Place Order"}
            </PrimaryButton>
          </form>
        </div>
      </Container>
    </main>
  );
}

export default PlaceOrder;