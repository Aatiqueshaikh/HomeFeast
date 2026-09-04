import { ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router-dom";

import Container from "../../components/layout/Container";

function NotFound() {
  return (
    <main className="min-h-[calc(100vh-160px)] bg-slate-50">
      <Container className="flex min-h-[calc(100vh-160px)] items-center justify-center py-16">
        <div className="w-full max-w-lg text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-orange-100 text-3xl font-bold text-orange-500">
            404
          </div>

          <h1 className="mt-8 text-3xl font-bold text-slate-900 sm:text-4xl">
            Page Not Found
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-500">
            Sorry, the page you're looking for doesn't exist or may have been
            moved.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-orange-600"
            >
              <Home size={17} />
              Go Home
            </Link>

            <button
              type="button"
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 rounded-xl border border-orange-500 bg-white px-5 py-3 text-sm font-semibold text-orange-500 transition duration-300 hover:bg-orange-50"
            >
              <ArrowLeft size={17} />
              Go Back
            </button>
          </div>
        </div>
      </Container>
    </main>
  );
}

export default NotFound;