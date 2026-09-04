import { useNavigate } from "react-router-dom";

import Container from "../layout/Container";
import SectionTitle from "../common/SectionTitle";
import categories from "../../data/categories";

function CategoriesSection() {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/providers?cuisine=${encodeURIComponent(category.name)}`);
  };

  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <SectionTitle
          title="Explore Homemade Cuisines"
          subtitle="Discover delicious homemade meals from trusted local cooks."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => handleCategoryClick(category)}
              className="group rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-3xl transition duration-300 group-hover:bg-orange-100">
                {category.icon}
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                {category.name}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {category.description}
              </p>
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default CategoriesSection;