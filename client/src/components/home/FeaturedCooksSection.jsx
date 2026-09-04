import { useEffect, useState } from "react";

import Container from "../layout/Container";
import SectionTitle from "../common/SectionTitle";
import PrimaryButton from "../ui/PrimaryButton";
import CookCard from "../cook/CookCard";
import apiRequest from "../../services/api";

function FeaturedCooksSection() {
  const [cooks, setCooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCooks = async () => {
      try {
        const data = await apiRequest("/cooks");

        setCooks((data.cooks || []).slice(0, 6));
      } catch (error) {
        console.error("Failed to fetch featured cooks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCooks();
  }, []);

  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <Container>
        <SectionTitle
          title="Featured Home Cooks"
          subtitle="Discover trusted local cooks serving fresh homemade meals."
        />

        {loading ? (
          <div className="mt-12 rounded-2xl bg-white px-6 py-12 text-center shadow-sm">
            <p className="text-sm text-slate-500">
              Loading featured cooks...
            </p>
          </div>
        ) : cooks.length === 0 ? (
          <div className="mt-12 rounded-2xl bg-white px-6 py-12 text-center shadow-sm">
            <p className="text-sm text-slate-500">
              No home cooks available right now.
            </p>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cooks.map((cook) => (
              <CookCard key={cook._id} cook={cook} />
            ))}
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <PrimaryButton to="/providers">
            View All Providers
          </PrimaryButton>
        </div>
      </Container>
    </section>
  );
}

export default FeaturedCooksSection;