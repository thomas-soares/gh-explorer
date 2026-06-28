import { useParams, Link } from 'react-router-dom';
import { useMemo } from 'react';
import { useGitHubUser } from '@/hooks/useGitHubUser';

export default function UserPage() {
  const { username } = useParams();
  const userLogin = useMemo(() => username ?? '', [username]);

  const { data: user, isLoading, isError, error } = useGitHubUser(userLogin);

  return (
    <main className="mx-auto max-w-4xl p-6">
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

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-6 w-48 bg-slate-200 rounded mb-4" />
            <div className="h-4 w-72 bg-slate-200 rounded mb-2" />
            <div className="h-4 w-40 bg-slate-200 rounded" />
          </div>
        ) : isError ? (
          <div className="text-rose-600">{(error as Error)?.message ?? 'Error loading user'}</div>
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
          <div className="text-slate-700">No user selected.</div>
        )}
      </section>
    </main>
  );
}
