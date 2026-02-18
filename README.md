# React Leaflet Example

Legacy Create React App project (around 2019) using `react-scripts@4.0.1`.

## Status in 2026

This repository can still run in 2026, but it requires a compatible Node/npm setup and a small startup workaround on machines where a parent `node_modules` folder contains `webpack@5`.

## Runtime setup (nvm-windows)

Use Node 16 for this repo.

```bash
nvm install 16.20.2
nvm use 16.20.2
node -v
npm -v
```

Expected output:

- `node -v` -> `v16.20.2`
- `npm -v` -> `8.x`

## Clean install

This project currently uses npm. If lockfiles are mixed or stale, clean first.

```powershell
Remove-Item -Recurse -Force .\node_modules
Remove-Item -Force .\package-lock.json
Remove-Item -Force .\yarn.lock
```

Install with legacy peer handling (needed for old CRA dependency constraints):

```bash
npm install --legacy-peer-deps
```

## Start the app

```bash
npm start
```

If you get this preflight error:

- `A different version of webpack was detected higher up in the tree`
- Example path: `C:\Users\<you>\node_modules\webpack`

use a session-only bypass:

```powershell
$env:SKIP_PREFLIGHT_CHECK='true'; npm start
```

This does not modify global Node modules and only affects the current terminal session.

## Safer long-term workaround (recommended)

Avoid running the repo under a parent folder that has a shared `node_modules`.

Recommended options:

1. Move/clone the repo to a root-level dev path (example: `C:\dev\react-leaflet-example`).
2. Or mount the project as a virtual drive:

```powershell
subst X: "C:\Users\raymel\Documents\Sides\NababahaPH\poc\react-leaflet-example"
X:
npm start
```

Both options avoid global mutations and reduce dependency-tree contamination from parent directories.

## Notes

- `npm WARN deprecated ...` is expected for this legacy stack.
- `npm audit` vulnerabilities are expected; do not run `npm audit fix --force` unless you are intentionally upgrading and testing breakages.

## Troubleshooting

For common install/startup failures and copy-paste fixes, see `docs/troubleshooting.md`.

## Scripts

In the project directory:

- `npm start` - run dev server
- `npm test` - run tests
- `npm run build` - production build
