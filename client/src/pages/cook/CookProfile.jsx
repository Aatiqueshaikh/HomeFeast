import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  MapPin,
  Phone,
  Mail,
  Utensils,
  IndianRupee,
  ShieldCheck,
} from "lucide-react";

import apiRequest from "../../services/api";

function CookProfile() {
  const [cook, setCook] = useState(null);
  const [loading, setLoading] = useState(true);
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

        setCook(data.cook);
      } catch (error) {
        console.error("COOK PROFILE ERROR:", error);
        setError(error.message || "Failed to load cook profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-sm text-slate-500">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>

          <Link
            to="/cook/dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 transition"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

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
              My Cook Profile
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Manage your home cook profile and service information.
            </p>
          </div>

          <Link
            to="/cook/profile/edit"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 transition"
          >
            <Edit size={17} />
            Edit Profile
          </Link>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

          {/* Profile Header */}
          <div className="bg-orange-50 px-6 py-8 sm:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">

              <div className="h-20 w-20 rounded-full bg-orange-500 flex items-center justify-center text-white text-3xl font-bold">
                {cook?.businessName?.charAt(0)?.toUpperCase() || "C"}
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  {cook?.businessName || "Home Cook"}
                </h2>

                <p className="text-slate-600 mt-1">
                  {cook?.user?.name || "Cook"}
                </p>

                <div className="flex items-center gap-2 mt-2 text-sm text-slate-500">
                  <MapPin size={15} />
                  {cook?.city || "City not provided"}
                </div>
              </div>

              <div className="sm:ml-auto">
                {cook?.isVerified ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700">
                    <ShieldCheck size={15} />
                    Verified Cook
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-100 px-3 py-1.5 text-xs font-semibold text-yellow-700">
                    Verification Pending
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Information */}
          <div className="p-6 sm:p-8">

            <h3 className="text-lg font-semibold text-slate-800 mb-5">
              Cook Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Email */}
              <div className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
                    <Mail size={19} />
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Email</p>
                    <p className="text-sm font-medium text-slate-800">
                      {cook?.user?.email || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
                    <Phone size={19} />
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Phone</p>
                    <p className="text-sm font-medium text-slate-800">
                      {cook?.user?.phone || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Food Type */}
              <div className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
                    <Utensils size={19} />
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Food Type</p>
                    <p className="text-sm font-medium text-slate-800">
                      {cook?.foodType || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
                    <IndianRupee size={19} />
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Price Per Meal</p>
                    <p className="text-sm font-medium text-slate-800">
                      ₹{cook?.pricePerMeal ?? "0"}
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Description */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                About
              </h3>

              <div className="rounded-xl bg-slate-50 border border-slate-200 p-5">
                <p className="text-sm leading-6 text-slate-600">
                  {cook?.description || "No description has been added yet."}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default CookProfile;