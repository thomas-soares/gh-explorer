import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <main className="mx-auto max-w-4xl p-6 text-center">
      <h1 className="text-4xl font-semibold mb-4">404 — Page not found</h1>
      <p className="mb-6 text-slate-600">The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-6 py-3 text-white hover:bg-sky-700"
      >
        Go back home
      </Link>
    </main>
  );
}
