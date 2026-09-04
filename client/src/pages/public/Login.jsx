import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";

import PrimaryButton from "../../components/ui/PrimaryButton";
import Container from "../../components/layout/Container";
import Logo from "../../components/layout/Logo";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await login(email, password);

      if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (data.user.role === "cook") {
        navigate("/cook/dashboard");
      } else {
        navigate("/customer/dashboard");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-x-hidden bg-slate-50 py-12 sm:py-16">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-orange-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-20 h-80 w-80 rounded-full bg-rose-200/50 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-amber-100/60 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-1/4 h-40 w-40 rounded-full bg-orange-100/70 blur-2xl" />

      {/* Decorative Circles */}
      <div className="pointer-events-none absolute left-[8%] top-[30%] hidden h-14 w-14 rounded-full bg-orange-300/40 sm:block" />
      <div className="pointer-events-none absolute right-[10%] top-[45%] hidden h-16 w-16 rounded-full bg-rose-300/40 sm:block" />
      <div className="pointer-events-none absolute bottom-[15%] left-[15%] hidden h-10 w-10 rounded-full bg-amber-300/50 md:block" />

      <Container className="relative flex justify-center">
        <div className="w-full max-w-md">

          {/* Heading */}
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <Logo />
            </div>

            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Welcome Back
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Sign in to continue enjoying fresh homemade meals.
            </p>
          </div>

          {/* Form Card */}
          <div className="mt-8 rounded-3xl border border-white/80 bg-white/90 p-6 shadow-xl shadow-orange-100/40 backdrop-blur-sm sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition duration-300 placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-12 text-sm text-slate-700 outline-none transition duration-300 placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((previous) => !previous)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors duration-300 hover:text-orange-500"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm font-semibold text-orange-500 transition-colors duration-300 hover:text-orange-600"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Error */}
              {error && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </p>
              )}

              {/* Submit */}
              <PrimaryButton
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </PrimaryButton>
            </form>

            {/* Register Link */}
            <p className="mt-6 text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-orange-500 transition duration-300 hover:text-orange-600"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Login;