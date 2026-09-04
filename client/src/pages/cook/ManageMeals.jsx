import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Utensils,
} from "lucide-react";

import apiRequest from "../../services/api";

function ManageMeals() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const token = localStorage.getItem("token");

        // First get the logged-in cook profile
        const profileData = await apiRequest("/cooks/me/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const cookId = profileData.cook._id;

        // Then get meals belonging to this cook
        const mealData = await apiRequest(`/meals/cook/${cookId}`);

        setMeals(mealData.meals);
      } catch (error) {
        console.error("FETCH MEALS ERROR:", error);
        setError(error.message || "Failed to load meals.");
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  const handleDelete = async (mealId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this meal?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await apiRequest(`/meals/${mealId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMeals((previousMeals) =>
        previousMeals.filter((meal) => meal._id !== mealId)
      );
    } catch (error) {
      console.error("DELETE MEAL ERROR:", error);
      alert(error.message || "Failed to delete meal.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-sm text-slate-500">Loading meals...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <Link
              to="/cook/dashboard"
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-orange-500 transition mb-3"
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
              Manage Meals
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Add, edit, and manage your homemade meals.
            </p>
          </div>

          <Link
            to="/cook/meals/add"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 transition"
          >
            <Plus size={18} />
            Add New Meal
          </Link>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!error && meals.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 text-center">
            <div className="mx-auto h-14 w-14 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 mb-4">
              <Utensils size={25} />
            </div>

            <h2 className="text-lg font-semibold text-slate-800">
              No meals added yet
            </h2>

            <p className="text-sm text-slate-500 mt-2 mb-6">
              Start adding meals to your home food menu.
            </p>

            <Link
              to="/cook/meals/add"
              className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 transition"
            >
              <Plus size={18} />
              Add Your First Meal
            </Link>
          </div>
        )}

        {/* Meals */}
        {meals.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {meals.map((meal) => (
              <div
                key={meal._id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
              >
                {/* Image */}
                {meal.image ? (
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-orange-50 flex items-center justify-center text-orange-400">
                    <Utensils size={42} />
                  </div>
                )}

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-lg font-semibold text-slate-800">
                      {meal.name}
                    </h2>

                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                        meal.isAvailable
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {meal.isAvailable ? "Available" : "Unavailable"}
                    </span>
                  </div>

                  <p className="text-sm text-slate-500 mt-2 line-clamp-2">
                    {meal.description}
                  </p>

                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Category</span>
                      <span className="font-medium text-slate-700">
                        {meal.category}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">Meal Type</span>
                      <span className="font-medium text-slate-700">
                        {meal.mealType}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">Food Type</span>
                      <span className="font-medium text-slate-700">
                        {meal.foodType}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">Meal Plan</span>
                      <span className="font-medium text-slate-700">
                        {meal.mealPlan}
                      </span>
                    </div>

                    <div className="flex justify-between pt-2 border-t border-slate-100">
                      <span className="text-slate-500">Price</span>
                      <span className="font-bold text-orange-500">
                        ₹{meal.price}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-5 pt-4 border-t border-slate-100">
                    <Link
                      to={`/cook/meals/edit/${meal._id}`}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
                    >
                      <Edit size={16} />
                      Edit
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDelete(meal._id)}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageMeals;