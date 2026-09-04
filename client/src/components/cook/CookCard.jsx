import { Link } from "react-router-dom";
import { MapPin, IndianRupee, BadgeCheck } from "lucide-react";

function CookCard({ cook }) {
  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="h-56 overflow-hidden bg-orange-50">
        <img
          src={
            cook.image ||
            "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80"
          }
          alt={cook.businessName}
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              {cook.businessName}
            </h3>

            <div className="mt-2 flex items-center gap-1 text-sm text-slate-500">
              <MapPin size={15} />
              <span>{cook.city}</span>
            </div>
          </div>

          {cook.isVerified && (
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-500"
              title="Verified Cook"
            >
              <BadgeCheck size={18} />
            </div>
          )}
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
          {cook.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1 font-semibold text-orange-500">
            <IndianRupee size={16} />
            <span>{cook.pricePerMeal}</span>
            <span className="text-xs font-normal text-slate-400">
              / meal
            </span>
          </div>

          <Link
            to={`/cook/${cook._id}`}
            className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-medium text-white transition duration-300 hover:bg-orange-600"
          >
            View Cook
          </Link>
        </div>
      </div>
    </article>
  );
}

export default CookCard;