# GH Explorer

A small GitHub search explorer built with React, TypeScript and Vite.

## Project overview

This app lets a user search for a GitHub profile, view the user's details, and explore that user's repositories sorted by stars. The application also supports repository detail pages and client-side navigation.

## Business requirements covered

- Search GitHub users by username
- View user details (followers, following, avatar, bio)
- Display user's repositories sorted by stars
- Navigate between repositories and view detailed repository information
- Use environment configuration for the GitHub access token

## Tech stack

- React 19
- TypeScript
- Vite
- React Router DOM
- React Query
- Axios
- Tailwind CSS
- Zod

## Prerequisites

- Node.js 18+ installed
- `pnpm` installed globally or use `corepack pnpm`

## Environment configuration

Create a `.env` file in the project root with:

```env
VITE_GITHUB_TOKEN=your_github_token_here
```

### What token permissions are needed

Only read access to public GitHub data is required.

- For a classic token: `public_repo` is enough.
- For a fine-grained token: choose GitHub public repository read-only access.

> Do not commit your token to version control.

## Available commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm test
pnpm preview
```

### What each command does

- `pnpm install` installs dependencies
- `pnpm dev` starts the Vite development server
- `pnpm build` compiles the app for production
- `pnpm test` currently reports that no tests are configured
- `pnpm preview` serves the production build locally

## Deployment

The app can be deployed to Vercel or Netlify.

### Vercel / Netlify setup

1. Set `VITE_GITHUB_TOKEN` as an environment variable in the platform settings.
2. Use `pnpm install` and `pnpm build` as the build commands.
3. Point the publish directory to `dist`.
4. Configure rewrites / redirects so client-side routing works.

#### Vercel

- Use a `vercel.json` or project settings to rewrite all routes to `/index.html`.

#### Netlify

- Create a `_redirects` file in `public/` with:

```text
/* /index.html 200
```

## Routes to test after deploy

- `/`
- `/user/:username`
- `/repo/:owner/:repo`

Reload the pages directly in the deployed URL to confirm client-side routing works.

## Demo

Add your live deployment link here once the app is deployed.

## Notes

- The project currently includes a minimal test suite with Vitest covering a couple of components.
- The GitHub token is required to avoid API rate limit issues on public GitHub requests.
