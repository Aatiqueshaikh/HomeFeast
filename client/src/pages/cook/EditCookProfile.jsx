import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";

import apiRequest from "../../services/api";

function EditCookProfile() {
  const navigate = useNavigate();

  const [cookId, setCookId] = useState("");
  const [formData, setFormData] = useState({
    businessName: "",
    description: "",
    city: "",
    foodType: "Vegetarian",
    pricePerMeal: "",
    image: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const data = await apiRequest("/cooks/me/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const cook = data.cook;

        setCookId(cook._id);

        setFormData({
          businessName: cook.businessName || "",
          description: cook.description || "",
          city: cook.city || "",
          foodType: cook.foodType || "Vegetarian",
          pricePerMeal: cook.pricePerMeal ?? "",
          image: cook.image || "",
        });
      } catch (error) {
        console.error("EDIT PROFILE FETCH ERROR:", error);
        setError(error.message || "Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      await apiRequest(`/cooks/${cookId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          businessName: formData.businessName,
          description: formData.description,
          city: formData.city,
          foodType: formData.foodType,
          pricePerMeal: Number(formData.pricePerMeal),
          image: formData.image,
        }),
      });

      navigate("/cook/profile");
    } catch (error) {
      console.error("UPDATE PROFILE ERROR:", error);
      setError(error.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-sm text-slate-500">Loading profile...</p>
      </div>
    );
  }

  if (error && !cookId) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>

          <Link
            to="/cook/profile"
            className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 transition"
          >
            <ArrowLeft size={16} />
            Back to Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <Link
            to="/cook/profile"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-orange-500 transition mb-3"
          >
            <ArrowLeft size={16} />
            Back to Profile
          </Link>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Edit Cook Profile
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Update your business and service information.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">

          {error && (
            <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Business Name */}
            <div>
              <label
                htmlFor="businessName"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Business Name
              </label>

              <input
                id="businessName"
                name="businessName"
                type="text"
                value={formData.businessName}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                placeholder="Enter your kitchen/business name"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Description
              </label>

              <textarea
                id="description"
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                placeholder="Describe your homemade food service"
              />
            </div>

            {/* City */}
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                City
              </label>

              <input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                placeholder="Enter your city"
              />
            </div>

            {/* Food Type + Price */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              {/* Food Type */}
              <div>
                <label
                  htmlFor="foodType"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Food Type
                </label>

                <select
                  id="foodType"
                  name="foodType"
                  value={formData.foodType}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                >
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                  <option value="Both">Both</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label
                  htmlFor="pricePerMeal"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Price Per Meal (₹)
                </label>

                <input
                  id="pricePerMeal"
                  name="pricePerMeal"
                  type="number"
                  min="0"
                  value={formData.pricePerMeal}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  placeholder="Enter price"
                />
              </div>

            </div>

            {/* Image URL */}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Profile Image URL
              </label>

              <input
                id="image"
                name="image"
                type="text"
                value={formData.image}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                placeholder="Enter image URL"
              />

              <p className="text-xs text-slate-400 mt-2">
                Optional
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t border-slate-200">

              <Link
                to="/cook/profile"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Save size={17} />

                {saving ? "Saving..." : "Save Changes"}
              </button>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default EditCookProfile;