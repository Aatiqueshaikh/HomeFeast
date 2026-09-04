import {
  CalendarDays,
  Home,
  ShieldCheck,
  Wallet,
} from "lucide-react";

import Container from "../layout/Container";
import SectionTitle from "../common/SectionTitle";

const benefits = [
  {
    id: 1,
    title: "Homemade Food",
    description:
      "Enjoy fresh and hygienically prepared meals that feel just like home.",
    icon: Home,
  },
  {
    id: 2,
    title: "Trusted Home Cooks",
    description:
      "Discover verified local cooks offering reliable homemade meal services.",
    icon: ShieldCheck,
  },
  {
    id: 3,
    title: "Flexible Meal Plans",
    description:
      "Choose daily, weekly, or monthly plans based on your needs.",
    icon: CalendarDays,
  },
  {
    id: 4,
    title: "Affordable Meals",
    description:
      "Get wholesome homemade food at prices suitable for everyday meals.",
    icon: Wallet,
  },
];

function WhyChooseUsSection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <SectionTitle
          title="Why Choose HomeFeast?"
          subtitle="Everything you need to enjoy convenient, affordable, and trustworthy homemade meals."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.id}
                className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                  <Icon size={26} />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-slate-900">
                  {benefit.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default WhyChooseUsSection;