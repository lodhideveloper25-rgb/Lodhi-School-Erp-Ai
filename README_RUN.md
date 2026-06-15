Run instructions for development environment

1) Use external terminals (recommended)

Open PowerShell or Command Prompt and run:

```powershell
cd "d:\Lodhi School Erp Ai\Lodhi School Erp Ai\backend"
npm install
npm run seed    # optional: populate demo data
npm run dev
```

In another terminal:

```powershell
cd "d:\Lodhi School Erp Ai\Lodhi School Erp Ai\frontend"
npm install
npm run dev
```

2) Quick start (Windows): run `run-dev.bat` from repo root — it opens two cmd windows and starts backend/frontend automatically.

3) VS Code integrated terminal: if you see a ConPTY error, open `.vscode/settings.json` and ensure `terminal.integrated.windowsEnableConpty` is set to `false`, then restart VS Code.

4) Env vars:
- Create `backend/.env` with `MONGO_URI`, `JWT_SECRET`, `PORT`.
- Create `frontend/.env.local` with `VITE_API_URL`.
