import { useParams, Link } from 'react-router-dom';

export default function RepoPage() {
  const { username, repoName } = useParams();

  return (
    <main className="mx-auto max-w-4xl p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">{repoName ?? 'Repository'}</h1>
          <p className="text-slate-600">Details page for repository under {username}.</p>
        </div>
        <Link
          to={`/user/${username}`}
          className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-100"
        >
          Back to user
        </Link>
      </div>
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-3">Repository details</h2>
        <p className="text-slate-700">This page will display repository metadata and stats.</p>
      </section>
    </main>
  );
}
