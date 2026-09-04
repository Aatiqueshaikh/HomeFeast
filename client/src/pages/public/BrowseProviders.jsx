import { Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Container from "../../components/layout/Container";
import SectionTitle from "../../components/common/SectionTitle";
import CookCard from "../../components/cook/CookCard";
import apiRequest from "../../services/api";

function BrowseProviders() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  const [mealType, setMealType] = useState("All");
  const [cuisine, setCuisine] = useState(
    searchParams.get("cuisine") || "All"
  );
  const [mealPlan, setMealPlan] = useState("All");
  const [price, setPrice] = useState("All");

  const [cooks, setCooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch cooks from backend
  useEffect(() => {
    const fetchCooks = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await apiRequest("/cooks");

        setCooks(data.cooks || []);
      } catch (err) {
        setError(err.message || "Failed to load home cooks");
      } finally {
        setLoading(false);
      }
    };

    fetchCooks();
  }, []);

  // Keep URL parameters synchronized with search and cuisine
  useEffect(() => {
    const params = {};

    const search = searchTerm.trim();

    if (search) {
      params.search = search;
    }

    if (cuisine !== "All") {
      params.cuisine = cuisine;
    }

    setSearchParams(params, { replace: true });
  }, [searchTerm, cuisine, setSearchParams]);

  const filteredCooks = useMemo(() => {
    return cooks.filter((cook) => {
      const search = searchTerm.toLowerCase().trim();

      const cookName = cook.user?.name || "";

      const matchesSearch =
        !search ||
        cook.businessName?.toLowerCase().includes(search) ||
        cookName.toLowerCase().includes(search) ||
        cook.city?.toLowerCase().includes(search) ||
        cook.description?.toLowerCase().includes(search);

      const matchesMealType =
        mealType === "All" ||
        (mealType === "Veg" && cook.foodType === "Vegetarian") ||
        (mealType === "Non-Veg" && cook.foodType === "Non-Vegetarian");

      const matchesCuisine =
        cuisine === "All" ||
        cook.description?.toLowerCase().includes(cuisine.toLowerCase());

      // Meal plan and price filters will be connected
      // after the cook list is successfully working
      // with MongoDB data.

      return (
        matchesSearch &&
        matchesMealType &&
        matchesCuisine &&
        mealPlan === "All" &&
        price === "All"
      );
    });
  }, [cooks, searchTerm, mealType, cuisine, mealPlan, price]);

  const clearFilters = () => {
    setSearchTerm("");
    setMealType("All");
    setCuisine("All");
    setMealPlan("All");
    setPrice("All");
  };

  return (
    <main className="bg-slate-50">
      {/* Header */}
      <section className="bg-orange-50 py-16 sm:py-20">
        <Container>
          <SectionTitle
            title="Browse Home Cooks"
            subtitle="Discover trusted local cooks serving fresh and delicious homemade meals."
          />

          {/* Search */}
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl bg-white p-2 shadow-md">
            <div className="flex items-center gap-3">
              <Search
                size={20}
                className="ml-3 shrink-0 text-slate-400"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by cook, cuisine, or location..."
                className="min-w-0 flex-1 bg-transparent px-1 py-3 text-sm text-slate-700 placeholder:text-slate-400"
              />

              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                  aria-label="Clear search"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Providers */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
            {/* Filters */}
            <aside className="w-full shrink-0 lg:w-64">
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal
                      size={18}
                      className="text-orange-500"
                    />

                    <h2 className="font-semibold text-slate-900">
                      Filters
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-xs font-medium text-orange-500 transition hover:text-orange-600"
                  >
                    Clear
                  </button>
                </div>

                {/* Meal Type */}
                <div className="mt-6">
                  <label
                    htmlFor="mealType"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Meal Type
                  </label>

                  <select
                    id="mealType"
                    value={mealType}
                    onChange={(event) => setMealType(event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  >
                    <option value="All">All</option>
                    <option value="Veg">Veg</option>
                    <option value="Non-Veg">Non-Veg</option>
                  </select>
                </div>

                {/* Cuisine */}
                <div className="mt-5">
                  <label
                    htmlFor="cuisine"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Cuisine
                  </label>

                  <select
                    id="cuisine"
                    value={cuisine}
                    onChange={(event) => setCuisine(event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  >
                    <option value="All">All</option>
                    <option value="North Indian">North Indian</option>
                    <option value="Gujarati">Gujarati</option>
                    <option value="South Indian">South Indian</option>
                    <option value="Punjabi">Punjabi</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Hyderabadi">Hyderabadi</option>
                  </select>
                </div>

                {/* Meal Plan */}
                <div className="mt-5">
                  <label
                    htmlFor="mealPlan"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Meal Plan
                  </label>

                  <select
                    id="mealPlan"
                    value={mealPlan}
                    onChange={(event) => setMealPlan(event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  >
                    <option value="All">All</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>

                {/* Price */}
                <div className="mt-5">
                  <label
                    htmlFor="price"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Price
                  </label>

                  <select
                    id="price"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  >
                    <option value="All">All</option>
                    <option value="Under ₹100">Under ₹100</option>
                    <option value="₹100 - ₹200">₹100 - ₹200</option>
                    <option value="Above ₹200">Above ₹200</option>
                  </select>
                </div>
              </div>
            </aside>

            {/* Results */}
            <div className="min-w-0 flex-1">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-slate-900">
                  Home Cook Providers
                </h2>

                {!loading && !error && (
                  <p className="mt-1 text-sm text-slate-500">
                    {filteredCooks.length}{" "}
                    {filteredCooks.length === 1
                      ? "provider"
                      : "providers"}{" "}
                    found
                  </p>
                )}
              </div>

              {/* Loading */}
              {loading && (
                <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
                  <p className="text-sm text-slate-500">
                    Loading home cooks...
                  </p>
                </div>
              )}

              {/* Error */}
              {!loading && error && (
                <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Unable to load providers
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    {error}
                  </p>
                </div>
              )}

              {/* Results */}
              {!loading && !error && filteredCooks.length > 0 && (
                <div className="grid gap-6 md:grid-cols-2">
                  {filteredCooks.map((cook) => (
                    <CookCard key={cook._id} cook={cook} />
                  ))}
                </div>
              )}

              {/* No Results */}
              {!loading && !error && filteredCooks.length === 0 && (
                <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">
                    No providers found
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Try changing your search or filters to find more
                    home cooks.
                  </p>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-5 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-orange-600"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

export default BrowseProviders;