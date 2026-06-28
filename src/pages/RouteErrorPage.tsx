import { Link, useRouteError } from 'react-router-dom';
import { useEffect } from 'react';
import { setMeta } from '@/utils/meta';

function getErrorMessage(error: unknown) {
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  return 'An unexpected error occurred.';
}

export default function RouteErrorPage() {
  const error = useRouteError();
  const message = getErrorMessage(error);

  useEffect(() => {
    document.title = 'Error — GH Explorer';
    setMeta('description', 'An unexpected error occurred while loading the page.');
  }, []);

  return (
    <main id="main" tabIndex={-1} className="mx-auto max-w-4xl p-6">
      <div
        className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-center"
        aria-live="polite"
      >
        <h1 className="text-4xl font-semibold text-rose-700 mb-4">Something went wrong</h1>
        <p className="mb-4 text-slate-700">{message}</p>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-6 py-3 text-white hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-500"
        >
          Return to home
        </Link>
      </div>
    </main>
  );
}
