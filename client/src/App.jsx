import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import ProtectedRoute from "./components/auth/ProtectedRoute";

import Home from "./pages/public/Home";
import BrowseProviders from "./pages/public/BrowseProviders";
import CookDetails from "./pages/public/CookDetails";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import NotFound from "./pages/public/NotFound";

import CustomerDashboard from "./pages/customer/CustomerDashboard";
import PlaceOrder from "./pages/customer/PlaceOrder";
import Subscribe from "./pages/customer/Subscribe";
import MyOrders from "./pages/customer/MyOrders";
import OrderDetails from "./pages/customer/OrderDetails";
import MySubscriptions from "./pages/customer/MySubscriptions";
import SubscriptionDetails from "./pages/customer/SubscriptionDetails";

import CookDashboard from "./pages/cook/CookDashboard";
import CookProfile from "./pages/cook/CookProfile";
import EditCookProfile from "./pages/cook/EditCookProfile";
import ManageMeals from "./pages/cook/ManageMeals";
import AddMeal from "./pages/cook/AddMeal";
import EditMeal from "./pages/cook/EditMeal";
import CookOrders from "./pages/cook/CookOrders";
import CookSubscriptions from "./pages/cook/CookSubscriptions";

import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/providers" element={<BrowseProviders />} />
        <Route path="/cook/:id" element={<CookDetails />} />
      </Route>

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Customer Pages */}
      <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
        <Route element={<MainLayout />}>
          <Route
            path="/customer/dashboard"
            element={<CustomerDashboard />}
          />

          <Route
            path="/customer/order"
            element={<PlaceOrder />}
          />

          <Route
            path="/customer/subscribe"
            element={<Subscribe />}
          />

          <Route
            path="/customer/orders"
            element={<MyOrders />}
          />

          <Route
            path="/customer/orders/:id"
            element={<OrderDetails />}
          />

          <Route
            path="/customer/subscriptions"
            element={<MySubscriptions />}
          />

          <Route
            path="/customer/subscriptions/:id"
            element={<SubscriptionDetails />}
          />
        </Route>
      </Route>

      {/* Cook Pages */}
      <Route element={<ProtectedRoute allowedRoles={["cook"]} />}>
        <Route element={<MainLayout />}>
          <Route path="/cook/dashboard" element={<CookDashboard />} />
          <Route path="/cook/profile" element={<CookProfile />} />
          <Route path="/cook/profile/edit" element={<EditCookProfile />} />
          <Route path="/cook/meals" element={<ManageMeals />} />
          <Route path="/cook/meals/add" element={<AddMeal />} />
          <Route path="/cook/meals/edit/:id" element={<EditMeal />} />
          <Route path="/cook/orders" element={<CookOrders />} />
          <Route
            path="/cook/subscriptions"
            element={<CookSubscriptions />}
          />
        </Route>
      </Route>

      {/* Admin Pages */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route element={<MainLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;