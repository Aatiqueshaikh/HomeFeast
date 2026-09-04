import { CalendarDays, ClipboardList, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";

import Container from "../../components/layout/Container";
import { useAuth } from "../../context/AuthContext";

function CustomerDashboard() {
  const { user } = useAuth();

  return (
    <main className="bg-slate-50 py-12 sm:py-16">
      <Container>
        <div>
          <p className="text-sm font-medium text-orange-500">
            Customer Dashboard
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Welcome, {user?.name || "Customer"}!
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Manage your orders and meal subscriptions from one place.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link
            to="/customer/orders"
            className="group rounded-2xl bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
              <ClipboardList size={24} />
            </div>

            <h2 className="mt-5 text-lg font-semibold text-slate-900">
              My Orders
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              View your recent orders and track their status.
            </p>
          </Link>

          <Link
            to="/customer/subscriptions"
            className="group rounded-2xl bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
              <CalendarDays size={24} />
            </div>

            <h2 className="mt-5 text-lg font-semibold text-slate-900">
              My Subscriptions
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Manage your active and previous meal subscriptions.
            </p>
          </Link>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
              <UserCircle size={24} />
            </div>

            <h2 className="mt-5 text-lg font-semibold text-slate-900">
              My Profile
            </h2>

            <div className="mt-3 space-y-1 text-sm text-slate-500">
              <p>{user?.email}</p>
              <p>{user?.phone}</p>
              <p>{user?.city}</p>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}

export default CustomerDashboard;