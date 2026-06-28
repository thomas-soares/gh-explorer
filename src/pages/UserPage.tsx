import { useParams, Link } from 'react-router-dom';
import { useMemo, useState, useEffect } from 'react';
import { useGitHubUser } from '@/hooks/useGitHubUser';
import { useGitHubRepos } from '@/hooks/useGitHubRepos';
import type { GitHubRepo } from '@/types/github';
import Skeleton from '@/components/Skeleton';
import ErrorMessage from '@/components/ErrorMessage';
import EmptyState from '@/components/EmptyState';
import { setMeta } from '@/utils/meta';

export default function UserPage() {
  const { username } = useParams();
  const userLogin = useMemo(() => username ?? '', [username]);

  const { data: user, isLoading, isError, error } = useGitHubUser(userLogin);

  useEffect(() => {
    if (user) {
      document.title = `${user.name ?? user.login} — GH Explorer`;
      setMeta('description', user.bio ?? `${user.login} GitHub profile`);
    } else if (username) {
      document.title = `${username} — GH Explorer`;
      setMeta('description', `${username} GitHub profile`);
    } else {
      document.title = 'GH Explorer';
      setMeta('description', 'Search GitHub users and view profiles and repositories');
    }
  }, [user, username]);

  return (
    <main id="main" tabIndex={-1} className="mx-auto max-w-4xl px-4 py-6 sm:p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-semibold break-words">{username ?? 'User'}</h1>
          <p className="text-sm sm:text-base text-slate-600">GitHub profile and repositories.</p>
        </div>
        <Link
          to="/"
          className="w-full sm:w-auto text-center rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-100 transition-colors"
        >
          Back to search
        </Link>
      </div>

      <section
        className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm"
        aria-busy={isLoading}
        aria-live="polite"
        aria-label="GitHub user profile"
      >
        {isLoading ? (
          <Skeleton rows={3} className="max-w-lg" />
        ) : isError ? (
          <ErrorMessage message={(error as Error)?.message ?? 'Error loading user'} />
        ) : user ? (
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <img
              src={user.avatar_url}
              alt={`${user.login} avatar`}
              className="w-20 h-20 sm:w-28 sm:h-28 rounded-full flex-shrink-0"
            />
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-semibold break-words">
                {user.name ?? user.login}
              </h2>
              <p className="text-slate-600 text-sm">@{user.login}</p>
              {user.bio ? (
                <p className="mt-3 text-slate-700 text-sm sm:text-base">{user.bio}</p>
              ) : null}

              <div className="mt-4 flex flex-wrap gap-2 text-xs sm:text-sm text-slate-700">
                <div className="px-3 py-1 rounded bg-slate-100">Followers: {user.followers}</div>
                <div className="px-3 py-1 rounded bg-slate-100">Following: {user.following}</div>
                <div className="px-3 py-1 rounded bg-slate-100">Repos: {user.public_repos}</div>
                {user.email ? (
                  <div className="px-3 py-1 rounded bg-slate-100">Email: {user.email}</div>
                ) : null}
              </div>
            </div>
          </div>
        ) : (
          <EmptyState message="No user selected." actionLabel="Back to home" actionTo="/" />
        )}
      </section>
      <RepoList username={userLogin} />
    </main>
  );
}

function RepoList({ username }: { username: string }) {
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<'stars' | 'forks' | 'name' | 'updated_at'>('stars');
  const [direction, setDirection] = useState<'asc' | 'desc'>('desc');

  const { data: repos, isLoading, isError, error } = useGitHubRepos(username, page);

  const sorted = useMemo(() => {
    if (!repos) return [];
    const reposArray = (repos as GitHubRepo[]) || [];
    if (reposArray.length === 0) return [];
    const copy: GitHubRepo[] = [...reposArray];
    switch (sortKey) {
      case 'stars':
        copy.sort(
          (a, b) => (a.stargazers_count - b.stargazers_count) * (direction === 'asc' ? 1 : -1)
        );
        break;
      case 'forks':
        copy.sort((a, b) => (a.forks_count - b.forks_count) * (direction === 'asc' ? 1 : -1));
        break;
      case 'name':
        copy.sort((a, b) => a.name.localeCompare(b.name) * (direction === 'asc' ? 1 : -1));
        break;
      case 'updated_at':
      default:
        copy.sort(
          (a, b) =>
            (new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()) *
            (direction === 'asc' ? 1 : -1)
        );
        break;
    }
    return copy;
  }, [repos, sortKey, direction]);

  return (
    <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg sm:text-xl font-semibold">Repositories</h3>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
          <label htmlFor="sort-key" className="text-xs sm:text-sm text-slate-600">
            Sort:
          </label>
          <select
            id="sort-key"
            value={sortKey}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSortKey(e.target.value as 'stars' | 'forks' | 'name' | 'updated_at')
            }
            className="rounded border px-2 py-1 text-xs sm:text-sm"
            aria-label="Sort repositories"
          >
            <option value="stars">Stars</option>
            <option value="forks">Forks</option>
            <option value="name">Name</option>
            <option value="updated_at">Updated</option>
          </select>
          <button
            type="button"
            onClick={() => setDirection((d) => (d === 'asc' ? 'desc' : 'asc'))}
            className="rounded border px-2 py-1 text-xs sm:text-sm"
            aria-label={`Sort direction: ${direction === 'asc' ? 'Ascending' : 'Descending'}`}
          >
            {direction === 'asc' ? '↑ Asc' : '↓ Desc'}
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="animate-pulse">
          <div className="h-4 bg-slate-200 rounded mb-2" />
          <div className="h-4 bg-slate-200 rounded mb-2" />
          <div className="h-4 bg-slate-200 rounded" />
        </div>
      ) : isError ? (
        <div className="text-rose-600 text-sm">
          {(error as Error)?.message ?? 'Error loading repositories'}
        </div>
      ) : (
        <>
          {sorted.length === 0 ? (
            <div className="text-slate-700 text-sm" role="status" aria-live="polite">
              No repositories found.
            </div>
          ) : (
            <ul className="space-y-3" role="list">
              {sorted.map((r) => (
                <li
                  key={r.id}
                  className="p-3 border rounded hover:bg-slate-50 transition-colors"
                  role="listitem"
                >
                  <Link
                    to={`/user/${username}/repo/${r.name}`}
                    className="text-sky-600 font-medium text-sm sm:text-base break-words hover:underline"
                    aria-label={`View ${r.name} repository`}
                  >
                    {r.name}
                  </Link>
                  {r.description ? (
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">{r.description}</p>
                  ) : null}
                  <div className="text-xs text-slate-600 mt-2 flex flex-wrap gap-2">
                    <span>⭐ {r.stargazers_count}</span>
                    <span>•</span>
                    <span>Forks: {r.forks_count}</span>
                    <span>•</span>
                    <span>{r.language || 'N/A'}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs sm:text-sm">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded border px-2 sm:px-3 py-1 hover:bg-slate-100 transition-colors disabled:opacity-50"
              aria-label="Previous page"
              disabled={page === 1}
            >
              Prev
            </button>
            <div className="text-slate-600">Page {page}</div>
            <button
              type="button"
              onClick={() => setPage((p) => p + 1)}
              className="rounded border px-2 sm:px-3 py-1 hover:bg-slate-100 transition-colors"
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        </>
      )}
    </section>
  );
}
