# UserWidget Module Federation POC

This repository is the **remote** application. It keeps a standalone preview at `/widget` and exposes a provider-wrapped React component as `userWidget/UserWidget` through Webpack 5 Module Federation.

The independent consumer application is in the sibling directory `~/Projects/MFPOC-Host`. It has its own package manifest, lockfile, Webpack configuration, and local Git repository. It consumes this remote through `remoteEntry.js`; it never imports this repository's source files.

## Remote component contract

`src/federation/UserWidgetEntry.tsx` is the public component wrapper. It accepts optional `userId`, `tenantId`, and `appTheme` props. The wrapper builds the app context and supplies a React Query client before rendering the existing `UserWidget`. The widget consumes context through `useAppContext()`, loads user data through React Query and `src/api/users.ts`, and renders the styled-components UI.

Webpack exposes `./UserWidget` as `userWidget/UserWidget`. React, React DOM, TanStack React Query, and styled-components are configured as singleton shared dependencies with their versions declared by the remote. `publicPath: "auto"` lets remote chunks load from the remote's own origin.

`src/bootstrap.tsx` starts the remote's standalone preview. `src/index.tsx` imports it asynchronously so shared modules initialize before the app mounts. The host does not use this standalone bootstrap: it imports the component with `React.lazy`, renders it under `Suspense`, and passes props directly.

## Run the standalone remote

```sh
npm ci
npm start
```

This serves the preview and `http://localhost:3000/remoteEntry.js`. `BROWSER=none` prevents automatic browser opening.

## Run the separate host

In another terminal:

```sh
cd ~/Projects/MFPOC-Host
npm ci
npm start
```

The host defaults to the remote at `http://localhost:3000` and serves on port 3001. Start the remote first. To consume a deployed remote, set `USER_WIDGET_REMOTE_URL` to its origin in the host build environment.

The host owns the TypeScript declaration for `userWidget/UserWidget` in `~/Projects/MFPOC-Host/src/types/remotes.d.ts`, because this module name is resolved by the host's Webpack configuration.

## Build and typecheck

```sh
npm run build
npx tsc --noEmit
```

The production build emits `build/remoteEntry.js` and the chunks required by the exposed component. For the deployed host, set output directory to `build` and set `USER_WIDGET_REMOTE_URL` to the deployed remote origin.
