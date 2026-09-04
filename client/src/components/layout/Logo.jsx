import { ChefHat } from "lucide-react";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 text-white shadow-sm">
        <ChefHat size={24} strokeWidth={2.5} />
      </div>

      <div>
        <h1 className="text-xl font-bold leading-tight text-slate-900">
          HomeFeast
        </h1>

        <p className="text-xs text-slate-500">
          Fresh Homemade Meals
        </p>
      </div>
    </Link>
  );
}

export default Logo;