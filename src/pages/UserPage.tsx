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
    <main id="main" className="mx-auto max-w-4xl p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">{username ?? 'User'}</h1>
          <p className="text-slate-600">GitHub profile and repositories.</p>
        </div>
        <Link
          to="/"
          className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-100"
        >
          Back to search
        </Link>
      </div>

      <section
        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        aria-busy={isLoading}
        aria-live="polite"
      >
        {isLoading ? (
          <Skeleton rows={3} className="max-w-lg" />
        ) : isError ? (
          <ErrorMessage message={(error as Error)?.message ?? 'Error loading user'} />
        ) : user ? (
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={user.avatar_url}
              alt={`${user.login} avatar`}
              className="w-28 h-28 rounded-full"
            />
            <div className="flex-1 text-left">
              <h2 className="text-2xl font-semibold">{user.name ?? user.login}</h2>
              <p className="text-slate-600">@{user.login}</p>
              {user.bio ? <p className="mt-3 text-slate-700">{user.bio}</p> : null}

              <div className="mt-4 flex gap-4 text-sm text-slate-700">
                <div className="px-3 py-1 rounded bg-slate-100">Followers: {user.followers}</div>
                <div className="px-3 py-1 rounded bg-slate-100">Following: {user.following}</div>
                <div className="px-3 py-1 rounded bg-slate-100">Repos: {user.public_repos}</div>
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
  const [sortKey, setSortKey] = useState<'stars' | 'forks' | 'name' | 'updated_at'>('updated_at');
  const [direction, setDirection] = useState<'asc' | 'desc'>('desc');

  const { data: repos, isLoading, isError, error } = useGitHubRepos(username, page);

  const sorted = useMemo(() => {
    if (!repos) return [] as GitHubRepo[];
    const copy = [...repos];
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
    <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold">Repositories</h3>
        <div className="ml-auto flex items-center gap-2">
          <label className="text-sm text-slate-600">Sort:</label>
          <select
            value={sortKey}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSortKey(e.target.value as 'stars' | 'forks' | 'name' | 'updated_at')
            }
            className="rounded border px-2 py-1"
          >
            <option value="stars">Stars</option>
            <option value="forks">Forks</option>
            <option value="name">Name</option>
            <option value="updated_at">Updated</option>
          </select>
          <button
            type="button"
            onClick={() => setDirection((d) => (d === 'asc' ? 'desc' : 'asc'))}
            className="rounded border px-2 py-1"
          >
            {direction === 'asc' ? 'Asc' : 'Desc'}
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
        <div className="text-rose-600">
          {(error as Error)?.message ?? 'Error loading repositories'}
        </div>
      ) : (
        <>
          {sorted.length === 0 ? (
            <div className="text-slate-700">No repositories found.</div>
          ) : (
            <ul className="space-y-3" role="list">
              {sorted.map((r) => (
                <li key={r.id} className="p-3 border rounded hover:bg-slate-50" role="listitem">
                  <Link
                    to={`/user/${username}/repo/${r.name}`}
                    className="text-sky-600 font-medium"
                    aria-label={`View ${r.name} repository`}
                  >
                    {r.name}
                  </Link>
                  {r.description ? <p className="text-sm text-slate-600">{r.description}</p> : null}
                  <div className="text-xs text-slate-600 mt-2">
                    ⭐ {r.stargazers_count} • Forks: {r.forks_count} • {r.language}
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-4 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded border px-3 py-1"
              aria-label="Previous page"
              disabled={page === 1}
            >
              Prev
            </button>
            <div className="text-sm text-slate-600">Page {page}</div>
            <button
              type="button"
              onClick={() => setPage((p) => p + 1)}
              className="rounded border px-3 py-1"
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
