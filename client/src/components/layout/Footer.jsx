import {
  ArrowRight,
  ChefHat,
  Home,
  Search,
  Utensils,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import Container from "./Container";
import Logo from "./Logo";

function Footer() {
  return (
    <footer className="border-t border-orange-100 bg-orange-50">
      <Container>
        <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Logo />

            <p className="mt-5 max-w-md text-sm leading-7 text-slate-600">
              HomeFeast connects you with trusted home cooks offering
              fresh, hygienic, and affordable homemade meals made with
              care.
            </p>

            <Link
              to="/providers"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-orange-500 transition duration-300 hover:text-orange-600"
            >
              Explore homemade meals
              <ArrowRight size={16} />
            </Link>

            {/* Social Icons */}
            <div className="mt-7">
              <p className="text-sm font-semibold text-slate-900">
                Follow HomeFeast
              </p>

              <div className="mt-4 flex items-center gap-3">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-orange-500 hover:text-white"
                >
                  <FaFacebookF size={18} />
                </a>

                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-orange-500 hover:text-white"
                >
                  <FaInstagram size={18} />
                </a>

                <a
                  href="#"
                  aria-label="Twitter"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-orange-500 hover:text-white"
                >
                  <FaTwitter size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-2 text-sm text-slate-600 transition duration-300 hover:text-orange-500"
                >
                  <Home size={16} />
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/providers"
                  className="flex items-center gap-2 text-sm text-slate-600 transition duration-300 hover:text-orange-500"
                >
                  <Search size={16} />
                  Browse Providers
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  className="flex items-center gap-2 text-sm text-slate-600 transition duration-300 hover:text-orange-500"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="flex items-center gap-2 text-sm text-slate-600 transition duration-300 hover:text-orange-500"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Home Cooks */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
              Home Cooks
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  to="/register"
                  className="flex items-center gap-2 text-sm text-slate-600 transition duration-300 hover:text-orange-500"
                >
                  <ChefHat size={16} />
                  Join HomeFeast
                </Link>
              </li>

              <li>
                <Link
                  to="/providers"
                  className="flex items-center gap-2 text-sm text-slate-600 transition duration-300 hover:text-orange-500"
                >
                  <Utensils size={16} />
                  Explore Providers
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col gap-3 border-t border-orange-200 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} HomeFeast. All rights reserved.
          </p>

          <p className="text-slate-600">
            Fresh Homemade Meals, Delivered with Care.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;