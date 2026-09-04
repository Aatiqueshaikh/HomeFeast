import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Container from "../layout/Container";
import PrimaryButton from "../ui/PrimaryButton";
import SecondaryButton from "../ui/SecondaryButton";
import heroFood from "../../assets/images/hero-food.jpg";

function HeroSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const search = searchTerm.trim();

    if (!search) {
      navigate("/providers");
      return;
    }

    navigate(`/providers?search=${encodeURIComponent(search)}`);
  };

  return (
    <section className="overflow-hidden bg-orange-50">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <div>
            <span className="inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-600">
              Homemade goodness, every day
            </span>

            <h1 className="mt-6 max-w-2xl text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Fresh Homemade Meals,
              <span className="block text-orange-500">
                Delivered with Care.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Discover trusted home cooks near you and enjoy fresh,
              hygienic, and affordable homemade meals with flexible
              meal plans.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <PrimaryButton to="/providers">
                Browse Providers
              </PrimaryButton>

              <SecondaryButton to="/register">
                Become a Customer
              </SecondaryButton>
            </div>

            {/* Search */}
            <div className="mt-10 max-w-xl rounded-2xl bg-white p-2 shadow-lg">
              <div className="flex items-center gap-3">
                <Search
                  size={22}
                  className="ml-3 shrink-0 text-slate-400"
                />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  placeholder="Search for home cooks or meals..."
                  className="min-w-0 flex-1 bg-transparent px-1 py-3 text-sm text-slate-700 placeholder:text-slate-400"
                />

                <button
                  type="button"
                  onClick={handleSearch}
                  className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-medium text-white transition duration-300 hover:bg-orange-600"
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-xl">
              <img
                src={heroFood}
                alt="Fresh homemade Indian meal"
                className="h-[420px] w-full object-cover sm:h-[500px]"
              />
            </div>

            <div className="absolute -bottom-5 -left-4 hidden rounded-2xl bg-white px-5 py-4 shadow-lg sm:block">
              <p className="text-sm font-semibold text-slate-900">
                Fresh & Homemade
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Made with care
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HeroSection;