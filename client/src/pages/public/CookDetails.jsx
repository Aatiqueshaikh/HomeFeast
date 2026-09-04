import {
  ArrowLeft,
  CalendarDays,
  CheckCircle,
  MapPin,
} from "lucide-react";

import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Container from "../../components/layout/Container";
import PrimaryButton from "../../components/ui/PrimaryButton";
import apiRequest from "../../services/api";

function CookDetails() {
  const { id } = useParams();

  const [cook, setCook] = useState(null);
  const [cookMeals, setCookMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCookDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const cookData = await apiRequest(`/cooks/${id}`);
        const cookResponse = cookData.cook;

        setCook({
          id: cookResponse._id,
          businessName: cookResponse.businessName,
          cookName: cookResponse.user?.name || cookResponse.businessName,
          description: cookResponse.description,
          cuisine: cookResponse.cuisine || "North Indian",
          serviceArea: cookResponse.city,
          mealType: cookResponse.foodType,
          pricePerMeal: cookResponse.pricePerMeal,
          image: cookResponse.image,
        });

        const mealsData = await apiRequest(`/meals/cook/${id}`);

        const formattedMeals = (mealsData.meals || []).map((meal) => ({
          id: meal._id,
          mealName: meal.name,
          description: meal.description,
          category: meal.category,
          mealType: meal.mealType,
          foodType: meal.foodType,
          mealPlan: meal.mealPlan,
          price: meal.price,
          image: meal.image,
          isAvailable: meal.isAvailable,
        }));

        setCookMeals(formattedMeals);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCookDetails();
  }, [id]);

  if (loading) {
    return (
      <main className="bg-slate-50 py-20">
        <Container>
          <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <p className="text-sm text-slate-500">
              Loading cook details...
            </p>
          </div>
        </Container>
      </main>
    );
  }

  if (error || !cook) {
    return (
      <main className="bg-slate-50 py-20">
        <Container>
          <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <h1 className="text-2xl font-bold text-slate-900">
              Cook Not Found
            </h1>

            <p className="mt-3 text-sm text-slate-500">
              {error ||
                "The home cook you are looking for could not be found."}
            </p>

            <Link
              to="/providers"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-orange-600"
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
    <main className="bg-slate-50">
      {/* Cook Profile */}
      <section className="bg-orange-50 py-12 sm:py-16">
        <Container>
          <Link
            to="/providers"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition duration-300 hover:text-orange-500"
          >
            <ArrowLeft size={16} />
            Back to Providers
          </Link>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            {/* Image */}
            <div className="overflow-hidden rounded-3xl shadow-lg">
              <img
                src={cook.image}
                alt={cook.businessName}
                className="h-[360px] w-full object-cover sm:h-[440px]"
              />
            </div>

            {/* Details */}
            <div>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                  cook.mealType === "Vegetarian"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {cook.mealType}
              </span>

              <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
                {cook.businessName}
              </h1>

              <p className="mt-2 text-base font-medium text-orange-500">
                {cook.cookName}
              </p>

              <p className="mt-5 text-sm leading-7 text-slate-600">
                {cook.description}
              </p>

              {/* Info */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <MapPin size={18} className="text-orange-500" />
                  {cook.serviceArea}
                </div>

                <div className="text-sm font-medium text-slate-700">
                  ₹{cook.pricePerMeal} per meal
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Menu */}
      <section className="py-16 sm:py-20">
        <Container>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Menu & Meal Plans
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Choose from fresh homemade meals and flexible plans.
            </p>
          </div>

          {cookMeals.length > 0 ? (
            <div className="mt-10 grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
              {cookMeals.map((meal) => (
                <article
                  key={meal.id}
                  className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Meal Image */}
                  <div className="relative h-52 shrink-0 overflow-hidden">
                    <img
                      src={meal.image}
                      alt={meal.mealName}
                      className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    />

                    <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-orange-600 shadow-sm">
                      {meal.mealType}
                    </span>
                  </div>

                  {/* Meal Content */}
                  <div className="flex flex-1 flex-col p-5">
                    {/* Title & Price */}
                    <div className="flex min-h-[56px] items-start justify-between gap-4">
                      <h3 className="text-lg font-semibold leading-7 text-slate-900">
                        {meal.mealName}
                      </h3>

                      <span className="shrink-0 text-lg font-bold text-orange-500">
                        ₹{meal.price}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-500">
                      {meal.description}
                    </p>

                    {/* Badges */}
                    <div className="mt-5 min-h-[40px] flex flex-wrap items-start gap-2">
                      <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                        {meal.category}
                      </span>

                      <span className="rounded-lg bg-orange-50 px-3 py-1.5 text-xs font-medium text-orange-600">
                        {meal.mealPlan}
                      </span>

                      <span
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
                          meal.foodType === "Vegetarian"
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {meal.foodType}
                      </span>
                    </div>

                    {/* Bottom Section */}
                    <div className="mt-auto pt-5">
                      {/* Availability */}
                      <div
                        className={`flex items-center gap-2 text-sm ${
                          meal.isAvailable
                            ? "text-green-600"
                            : "text-slate-400"
                        }`}
                      >
                        <CheckCircle size={16} />

                        {meal.isAvailable
                          ? "Available"
                          : "Currently unavailable"}
                      </div>

                      {/* Buttons */}
                      <div className="mt-5 grid grid-cols-2 gap-3">
                        <PrimaryButton
                          to={`/customer/order?cook=${cook.id}&meal=${meal.id}`}
                          className="w-full"
                        >
                          Order Now
                        </PrimaryButton>

                        <Link
                          to={`/customer/subscribe?cook=${cook.id}&meal=${meal.id}`}
                          className="flex items-center justify-center gap-2 rounded-xl border border-orange-500 px-4 py-3 text-sm font-semibold text-orange-500 transition duration-300 hover:bg-orange-50"
                        >
                          <CalendarDays size={16} />
                          Subscribe
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">
                No meals available
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                This cook has not added any meals yet.
              </p>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}

export default CookDetails;