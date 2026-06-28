import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { setMeta } from '@/utils/meta';

export default function NotFoundPage() {
  useEffect(() => {
    document.title = '404 — Page not found — GH Explorer';
    setMeta('description', 'The requested page was not found on GH Explorer.');
  }, []);

  return (
    <main id="main" tabIndex={-1} className="mx-auto max-w-4xl p-6 text-center">
      <h1 className="text-4xl font-semibold mb-4">404 — Page not found</h1>
      <p className="mb-6 text-slate-600">The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-6 py-3 text-white hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-500"
      >
        Go back home
      </Link>
    </main>
  );
}
