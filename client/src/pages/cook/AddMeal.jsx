import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import apiRequest from "../../services/api";

function AddMeal() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    mealType: "Lunch",
    foodType: "Vegetarian",
    mealPlan: "Daily",
    price: "",
    image: "",
    isAvailable: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await apiRequest("/meals", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          category: formData.category,
          mealType: formData.mealType,
          foodType: formData.foodType,
          mealPlan: formData.mealPlan,
          price: Number(formData.price),
          image: formData.image,
          isAvailable: formData.isAvailable,
        }),
      });

      navigate("/cook/meals");
    } catch (err) {
      setError(err.message || "Failed to add meal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <Link
            to="/cook/meals"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-orange-600"
          >
            <ArrowLeft size={18} />
            Back to My Meals
          </Link>

          <h1 className="text-3xl font-bold text-slate-900">
            Add New Meal
          </h1>

          <p className="mt-2 text-slate-500">
            Add a homemade meal to your menu.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">

          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Meal Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Meal Name *
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Paneer Thali"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Description *
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the meal..."
                rows="4"
                required
                className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Category *
              </label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g. North Indian, South Indian"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            {/* Select Fields */}
            <div className="grid gap-6 sm:grid-cols-3">

              {/* Meal Type */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Meal Type *
                </label>

                <select
                  name="mealType"
                  value={formData.mealType}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                </select>
              </div>

              {/* Food Type */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Food Type *
                </label>

                <select
                  name="foodType"
                  value={formData.foodType}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                >
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                </select>
              </div>

              {/* Meal Plan */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Meal Plan *
                </label>

                <select
                  name="mealPlan"
                  value={formData.mealPlan}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                >
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>
            </div>

            {/* Price */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Price *
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500">
                  ₹
                </span>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="150"
                  min="0"
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 pl-9 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                />
              </div>
            </div>

            {/* Image */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Image URL
              </label>

              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/meal.jpg"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />

              <p className="mt-2 text-xs text-slate-400">
                Optional. You can add an image URL for the meal.
              </p>
            </div>

            {/* Availability */}
            <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-4">
              <input
                type="checkbox"
                name="isAvailable"
                checked={formData.isAvailable}
                onChange={handleChange}
                className="h-4 w-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
              />

              <div>
                <p className="text-sm font-semibold text-slate-700">
                  Meal is available
                </p>

                <p className="text-xs text-slate-500">
                  Customers can order this meal when it is available.
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">

              <Link
                to="/cook/meals"
                className="rounded-lg border border-slate-300 px-6 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Plus size={18} />

                {loading ? "Adding Meal..." : "Add Meal"}
              </button>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddMeal;