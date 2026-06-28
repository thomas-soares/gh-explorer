import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function HomePage() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-3xl font-semibold mb-4">GitHub Explorer</h1>
      <p className="mb-6 text-slate-600">
        Search for a GitHub user to view their profile and repositories.
      </p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (username.trim()) {
            navigate(`/user/${username.trim()}`);
          }
        }}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <label className="sr-only" htmlFor="username">
          GitHub username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Enter GitHub username"
          className="rounded-lg border px-4 py-3 flex-1 border-slate-300 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
        />
        <button
          type="submit"
          className="rounded-lg bg-sky-600 px-5 py-3 text-white hover:bg-sky-700 transition"
        >
          Search
        </button>
      </form>
      <div className="mt-10">
        <h2 className="text-xl font-medium mb-3">Quick links</h2>
        <ul className="space-y-2 text-slate-700">
          <li>
            <Link className="text-sky-600 hover:underline" to="/user/octocat">
              Explore octocat profile
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
