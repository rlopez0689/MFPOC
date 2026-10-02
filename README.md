# UserWidget React POC

This small React 18 proof of concept demonstrates React Router, React Context, a custom context hook, TanStack React Query, a JSONPlaceholder API request, and a styled-components widget. It intentionally has no Module Federation configuration.

## Project layout

- `src/` contains the React and TypeScript application code.
- `public/` contains the HTML template and static assets.
- `scripts/` contains Node start, build, and test entry points.
- `config/` contains paths, environment loading, and the Webpack configuration factory.

## UserWidget

`/widget` renders `UserWidget` under application-level `AppProvider` and `QueryClientProvider`. The widget reads the current user ID, tenant, and theme through `useAppContext()`, queries JSONPlaceholder for that user, and renders loading, error, or profile content. The context hook throws if `AppProvider` is missing. `UserWidget` does not import the app shell, pages, or React Router.

Its current integration dependencies are React, `@tanstack/react-query` (and a host QueryClientProvider), styled-components, the app-specific context contract/provider, and the local API module. API requests use `https://jsonplaceholder.typicode.com/users/{id}`.

## Scripts and behavior

- `npm start` sets development environments, fails on unhandled promise rejections, loads `.env` files, checks required files, starts webpack-dev-server on port 3000 by default, honors `HOST` and `PORT`, opens the browser by default (`BROWSER=none` disables that for headless use), and shuts down on SIGINT/SIGTERM.
- `npm run build` sets production environments, loads `.env` files, cleans `build/`, copies `public/` assets except `index.html`, and runs Webpack production mode. It reports errors and warnings; `CI=true` makes warnings fail the build.
- `npm test` runs Node's built-in test runner for `*.test.js` files that are added.

Webpack has one development/production config factory, Babel support for TS/TSX and JS/JSX, CSS and SCSS loaders with PostCSS autoprefixing, asset modules for images/fonts, env-controlled source maps, production content hashes and minification, DefinePlugin env injection, and filesystem cache.

## Run

```sh
npm install
npm start
```

Run `npm run build` for a production build. Copy `.env` to `.env.local` for local overrides; client-visible custom variables must start with `REACT_APP_`.

## Later Module Federation work

The remote will need an exposure for `./UserWidget` and a host dynamic import/remote entry configuration. We will need to decide how React, React DOM, React Query, and styled-components are shared, including compatible versions and singleton behavior, and who provides context and the query client. The context hook and API module are currently bundled application-specific dependencies. The host/remote contract should cover user and tenant inputs, theme, API base URL, provider ownership, and style injection. Those federation changes are intentionally deferred.
