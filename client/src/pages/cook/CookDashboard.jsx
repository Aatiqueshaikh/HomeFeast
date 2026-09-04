import {
  CalendarDays,
  ClipboardList,
  UtensilsCrossed,
  UserCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

import Container from "../../components/layout/Container";
import { useAuth } from "../../context/AuthContext";

function CookDashboard() {
  const { user } = useAuth();

  return (
    <main className="bg-slate-50 py-12 sm:py-16">
      <Container>
        <div>
          <p className="text-sm font-medium text-orange-500">
            Cook Dashboard
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Welcome, {user?.name || "Cook"}!
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Manage your profile, meals, customer orders, and subscriptions
            from one place.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link
            to="/cook/profile"
            className="rounded-2xl bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
              <UserCircle size={24} />
            </div>

            <h2 className="mt-5 text-lg font-semibold text-slate-900">
              My Profile
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Manage your home cook profile and service information.
            </p>
          </Link>

          <Link
            to="/cook/meals"
            className="rounded-2xl bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
              <UtensilsCrossed size={24} />
            </div>

            <h2 className="mt-5 text-lg font-semibold text-slate-900">
              Manage Meals
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Add, edit, and manage the meals you offer.
            </p>
          </Link>

          <Link
            to="/cook/orders"
            className="rounded-2xl bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
              <ClipboardList size={24} />
            </div>

            <h2 className="mt-5 text-lg font-semibold text-slate-900">
              Customer Orders
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              View and manage orders placed for your meals.
            </p>
          </Link>

          <Link
            to="/cook/subscriptions"
            className="rounded-2xl bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
              <CalendarDays size={24} />
            </div>

            <h2 className="mt-5 text-lg font-semibold text-slate-900">
              Customer Subscriptions
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Review, accept, and reject customer subscription requests.
            </p>
          </Link>
        </div>
      </Container>
    </main>
  );
}

export default CookDashboard;