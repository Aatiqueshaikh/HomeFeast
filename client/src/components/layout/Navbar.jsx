import {
  CheckCircle,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { Link, NavLink, useNavigate } from "react-router-dom";

import { useState } from "react";

import Container from "./Container";

import Logo from "./Logo";

import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);

  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const navLinkClass = ({ isActive }) =>
    `transition-colors duration-300 ${
      isActive
        ? "font-semibold text-orange-500"
        : "text-slate-700 hover:text-orange-500"
    }`;

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const getDashboardPath = () => {
    if (user?.role === "admin") {
      return "/admin/dashboard";
    }

    if (user?.role === "cook") {
      return "/cook/dashboard";
    }

    return "/customer/dashboard";
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/");

    setShowLogoutMessage(true);

    setTimeout(() => {
      setShowLogoutMessage(false);
    }, 3000);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <Container>
          <div className="flex h-20 items-center justify-between">
            <Logo />

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-8 md:flex">
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>

              <NavLink to="/providers" className={navLinkClass}>
                Browse Providers
              </NavLink>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden items-center gap-3 md:flex">
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="rounded-xl border border-orange-500 px-5 py-2 text-orange-500 transition-colors duration-300 hover:bg-orange-50"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="rounded-xl bg-orange-500 px-5 py-2 text-white transition-colors duration-300 hover:bg-orange-600"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => navigate(getDashboardPath())}
                    className="flex items-center gap-2 rounded-xl border border-orange-500 px-5 py-2 text-orange-500 transition-colors duration-300 hover:bg-orange-50"
                  >
                    <LayoutDashboard size={17} />
                    Dashboard
                  </button>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2 text-white transition-colors duration-300 hover:bg-orange-600"
                  >
                    <LogOut size={17} />
                    Logout
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((previous) => !previous)}
              className="rounded-xl p-2 text-slate-700 transition-colors duration-300 hover:bg-orange-50 hover:text-orange-500 md:hidden"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="border-t border-slate-100 py-4 md:hidden">
              <nav className="flex flex-col gap-1">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-sm transition-colors duration-300 ${
                      isActive
                        ? "bg-orange-50 font-semibold text-orange-500"
                        : "text-slate-700 hover:bg-orange-50 hover:text-orange-500"
                    }`
                  }
                  onClick={closeMenu}
                >
                  Home
                </NavLink>

                <NavLink
                  to="/providers"
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-sm transition-colors duration-300 ${
                      isActive
                        ? "bg-orange-50 font-semibold text-orange-500"
                        : "text-slate-700 hover:bg-orange-50 hover:text-orange-500"
                    }`
                  }
                  onClick={closeMenu}
                >
                  Browse Providers
                </NavLink>

                <div className="mt-3 border-t border-slate-100 pt-4">
                  {!user ? (
                    <div className="flex gap-3">
                      <Link
                        to="/login"
                        onClick={closeMenu}
                        className="flex-1 rounded-xl border border-orange-500 px-4 py-3 text-center text-sm font-medium text-orange-500 transition-colors duration-300 hover:bg-orange-50"
                      >
                        Login
                      </Link>

                      <Link
                        to="/register"
                        onClick={closeMenu}
                        className="flex-1 rounded-xl bg-orange-500 px-4 py-3 text-center text-sm font-medium text-white transition-colors duration-300 hover:bg-orange-600"
                      >
                        Register
                      </Link>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          navigate(getDashboardPath());
                          closeMenu();
                        }}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-orange-500 px-4 py-3 text-sm font-medium text-orange-500 transition-colors duration-300 hover:bg-orange-50"
                      >
                        <LayoutDashboard size={17} />
                        Dashboard
                      </button>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-orange-600"
                      >
                        <LogOut size={17} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          )}
        </Container>
      </header>

      {/* Logout Notification */}
      {showLogoutMessage && (
        <div className="fixed right-4 top-24 z-[100] animate-[slideIn_0.3s_ease-out] sm:right-6">
          <div className="flex items-center gap-3 rounded-2xl border border-green-100 bg-white px-5 py-4 shadow-xl shadow-slate-200/50">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-50">
              <CheckCircle size={20} className="text-green-500" />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-800">
                Logged out successfully
              </p>

              <p className="mt-0.5 text-xs text-slate-500">
                See you again soon!
              </p>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(20px);
            }

            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>
    </>
  );
}

export default Navbar;