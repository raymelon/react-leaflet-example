# Troubleshooting

This file captures common setup/runtime issues for this legacy CRA project.

## Environment baseline

- Node: `16.20.2`
- npm: `8.x`
- Install command: `npm install --legacy-peer-deps`

Verify first:

```bash
node -v
npm -v
```

## Error: `react-scripts is not recognized`

Symptom:

- Running `npm start` fails immediately with `'react-scripts' is not recognized...`

Cause:

- Dependencies are missing or install was interrupted.

Fix:

```powershell
Remove-Item -Recurse -Force .\node_modules
Remove-Item -Force .\package-lock.json
Remove-Item -Force .\yarn.lock
npm install --legacy-peer-deps
```

## Error: `ERESOLVE could not resolve` (TypeScript vs react-scripts)

Symptom:

- `npm install` fails with peer dependency conflict around `react-scripts@4.0.1` and TypeScript.

Cause:

- Modern npm peer resolution is strict for this older dependency tree.

Fix:

```bash
npm install --legacy-peer-deps
```

## Error: CRA preflight webpack mismatch

Symptom:

- Startup fails with:
  - `A different version of webpack was detected higher up in the tree`
  - often points to `C:\Users\<you>\node_modules\webpack`

Cause:

- CRA v4 preflight detects a parent/global-ish `webpack@5` and blocks startup.

Immediate safe fix (session-only):

```powershell
$env:SKIP_PREFLIGHT_CHECK='true'; npm start
```

Long-term safer fix:

1. Move/clone the repo to a root-level path like `C:\dev\react-leaflet-example`, or
2. Run the repo via virtual drive mapping:

```powershell
subst X: "C:\Users\raymel\Documents\Sides\NababahaPH\poc\react-leaflet-example"
X:
npm start
```

## Warning spam: `npm WARN deprecated ...`

Symptom:

- Dozens of deprecation warnings during install.

Meaning:

- Expected for a legacy dependency tree; not usually a startup blocker.

Action:

- Continue unless install exits with `npm ERR!`.

## `EACCES` cleanup warnings on Windows

Symptom:

- Many warnings like `npm WARN cleanup ... EACCES ... node_modules\.bin\...`

Cause:

- Locked files (running dev server, active shell handles, antivirus scanning).

Fix steps:

1. Stop all Node processes and close other terminals/editors using this repo.
2. Retry clean reinstall commands.
3. If still blocked, reboot and rerun install.

## Port 3000 already in use

Check:

```bash
netstat -ano | findstr :3000
```

If no output, port 3000 is free.

## Last resort only

Do not run this unless intentionally doing upgrade work:

- `npm audit fix --force`

It can introduce breaking dependency changes in this project.
