import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { setMeta } from '@/utils/meta';

const searchSchema = z.object({
  username: z
    .string()
    .min(1, 'Informe um usuário')
    .max(39, 'Máximo 39 caracteres')
    .regex(/^[a-zA-Z0-9-]+$/, 'Username inválido'),
});

type SearchForm = z.infer<typeof searchSchema>;

const LOCAL_STORAGE_KEY = 'github-explorer:lastSearch';

export default function HomePage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SearchForm>({
    resolver: zodResolver(searchSchema),
    defaultValues: { username: '' },
  });

  const usernameValue = watch('username');

  useEffect(() => {
    const storedUsername = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedUsername) {
      setValue('username', storedUsername);
    }
  }, [setValue]);

  useEffect(() => {
    if (usernameValue !== undefined) {
      localStorage.setItem(LOCAL_STORAGE_KEY, usernameValue);
    }
  }, [usernameValue]);

  useEffect(() => {
    document.title = 'GitHub Explorer';
    setMeta('description', 'Search GitHub users and view profiles and repositories');
  }, []);

  const onSubmit = (data: SearchForm) => {
    navigate(`/user/${data.username}`);
  };

  return (
    <main id="main" tabIndex={-1} className="mx-auto max-w-4xl p-6">
      <h1 className="text-3xl font-semibold mb-4">GitHub Explorer</h1>
      <p className="mb-6 text-slate-600">
        Search for a GitHub user to view their profile and repositories.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="username">
          GitHub username
        </label>
        <div className="flex-1">
          <input
            id="username"
            type="text"
            placeholder="Enter GitHub username"
            aria-invalid={errors.username ? 'true' : 'false'}
            aria-describedby={errors.username ? 'username-error' : undefined}
            className={`w-full rounded-lg border px-4 py-3 border-slate-300 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200 ${
              errors.username ? 'border-rose-500 ring-rose-100' : ''
            }`}
            {...register('username')}
          />
          {errors.username ? (
            <p id="username-error" role="alert" className="mt-2 text-sm text-rose-600">
              {errors.username.message}
            </p>
          ) : null}
        </div>
        <button
          type="submit"
          aria-label="Search GitHub user"
          className="rounded-lg bg-sky-600 px-5 py-3 text-white hover:bg-sky-700 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-500"
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
