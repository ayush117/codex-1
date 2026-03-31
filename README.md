# BloomDesk / AI Job Platform

This repository now contains multiple app variants:

- `next-app/` → **Recommended** full-stack Next.js app (frontend + API routes in one deploy).
- `frontend/` + `backend/` → legacy split React (Vite) + Express architecture.
- root static landing files (`index.html`, `styles.css`, `script.js`).

## Deploying as one app on Netlify (Next.js)

1. In Netlify, create a new site from this repo.
2. Set **Base directory** to `next-app`.
3. Set **Build command** to `npm run build`.
4. Set **Publish directory** to `.next`.
5. Add environment variables from `next-app/.env.example`.
6. Set `DATABASE_URL` to your Supabase Postgres connection string.

### Required environment variables

See `next-app/.env.example`:

- `DATABASE_URL`
- `JWT_SECRET`
- `OPENAI_API_KEY`
- `OPENAI_MODEL`

## Local development (Next.js)

```bash
cd next-app
npm install
npm run dev
```

Then open `http://localhost:3000`.
