import { useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGitHubRepo } from '@/hooks/useGitHubRepo';
import Skeleton from '@/components/Skeleton';
import ErrorMessage from '@/components/ErrorMessage';
import { setMeta } from '@/utils/meta';

export default function RepoPage() {
  const { username, repoName } = useParams();
  const fullName = useMemo(
    () => (username && repoName ? `${username}/${repoName}` : ''),
    [username, repoName]
  );

  const { data: repo, isLoading, isError, error } = useGitHubRepo(fullName);

  useEffect(() => {
    if (repo) {
      document.title = `${repo.full_name} — GH Explorer`;
      setMeta('description', repo.description ?? `${repo.full_name} repository on GitHub`);
    } else if (repoName) {
      document.title = `${repoName} — GH Explorer`;
      setMeta('description', `${repoName} repository on GitHub`);
    } else {
      document.title = 'Repository — GH Explorer';
      setMeta('description', 'Repository details on GH Explorer');
    }
  }, [repo, repoName]);

  return (
    <main id="main" tabIndex={-1} className="mx-auto max-w-4xl px-4 py-6 sm:p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-semibold break-words">
            {repo?.name ?? repoName ?? 'Repository'}
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Details page for repository under <span className="font-medium">{username}</span>.
          </p>
        </div>
        <Link
          to={`/user/${username}`}
          className="w-full sm:w-auto text-center rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-100 transition-colors"
        >
          Back to user
        </Link>
      </div>

      <section
        className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm"
        aria-live="polite"
        aria-label="Repository details"
      >
        {isLoading && <Skeleton rows={4} />}

        {isError && (
          <ErrorMessage message={error?.message ?? 'Failed to load repository details.'} />
        )}

        {repo && (
          <div className="space-y-4 sm:space-y-6">
            {repo.description && (
              <p className="text-sm sm:text-base text-slate-700">{repo.description}</p>
            )}

            <div className="flex flex-wrap gap-2 sm:gap-3">
              <span className="rounded-md bg-slate-100 px-2 sm:px-3 py-1 text-xs sm:text-sm">
                ⭐ {repo.stargazers_count}
              </span>
              <span className="rounded-md bg-slate-100 px-2 sm:px-3 py-1 text-xs sm:text-sm">
                🍴 {repo.forks_count}
              </span>
              <span className="rounded-md bg-slate-100 px-2 sm:px-3 py-1 text-xs sm:text-sm">
                👀 {repo.watchers_count}
              </span>
              <span className="rounded-md bg-slate-100 px-2 sm:px-3 py-1 text-xs sm:text-sm">
                🐞 {repo.open_issues_count}
              </span>
              {repo.language && (
                <span className="rounded-md bg-slate-100 px-2 sm:px-3 py-1 text-xs sm:text-sm">
                  📝 {repo.language}
                </span>
              )}
              {repo.license?.name && (
                <span className="rounded-md bg-slate-100 px-2 sm:px-3 py-1 text-xs sm:text-sm">
                  📜 {repo.license.name}
                </span>
              )}
              <span className="rounded-md bg-slate-100 px-2 sm:px-3 py-1 text-xs sm:text-sm">
                🌿 {repo.default_branch}
              </span>
            </div>

            {repo.topics && repo.topics.length > 0 && (
              <div>
                <h3 className="font-medium text-sm sm:text-base">Topics</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {repo.topics.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-slate-100 px-2 py-1 text-xs sm:text-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4">
              {repo.homepage && (
                <a
                  href={repo.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-3 text-blue-600 hover:underline"
                >
                  Visit homepage
                </a>
              )}

              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                View on GitHub
              </a>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
