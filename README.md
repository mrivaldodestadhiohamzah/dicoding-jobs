# Dicoding Jobs

Dicoding Jobs is a small full-stack vacancy board. Candidates can browse vacancies, search by title, and open a detail page. Recruiters can publish a vacancy through a validated form backed by Laravel and MySQL.

## Stack

- Backend: Laravel 12, PHP 8.2+, Eloquent, Form Requests, PHPUnit
- Database: MySQL for local development; SQLite in-memory for automated backend tests
- Frontend: Next.js 16, React 19, TypeScript, TanStack Query, plain CSS
- E2E: Playwright with Chromium

## Repository structure

```text
backend/     Laravel REST API, migrations, factories, seeders, PHPUnit tests
frontend/    Next.js app, typed API client, reusable UI, Playwright tests
```

## Prerequisites

- PHP 8.2 or newer with `pdo_mysql` and `pdo_sqlite` enabled
- Composer
- Node.js 20.9 or newer and npm
- MySQL 8 or MariaDB running locally

On Windows with XAMPP, the PHP executable may be at `C:\xampp\php\php.exe`. Add it to `PATH`, or replace `php` in the commands below with that full path.

## Backend setup

```powershell
cd backend
composer install
Copy-Item .env.example .env
php artisan key:generate
```

Create a MySQL database named `dicoding_jobs`, then check the `DB_*` values in `backend/.env`. Run the migrations and seed the sample vacancies:

```powershell
php artisan migrate --seed
php artisan serve --host=127.0.0.1 --port=8000
```

The API is available at `http://127.0.0.1:8000/api`.

For a quick local-only run without MySQL, set `DB_CONNECTION=sqlite` and `DB_DATABASE=database/database.sqlite` in `.env`, then run the same migration and seed commands. The repository’s current local environment uses this SQLite option; the committed example is configured for MySQL.

## Frontend setup

```powershell
cd frontend
npm install
Copy-Item .env.example .env.local
npm run dev -- --hostname 127.0.0.1 --port 3000
```

The frontend is available at `http://127.0.0.1:3000`. `NEXT_PUBLIC_API_URL` points to the API base URL and defaults to `http://127.0.0.1:8000/api` when omitted. For an in-app local proxy, set `NEXT_PUBLIC_API_URL=/backend-api`; `BACKEND_URL` controls the rewrite target and defaults to `http://127.0.0.1:8000`.

## API endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/vacancies` | List vacancies; accepts `search`, `page`, and `per_page`; returns `200` |
| POST | `/api/vacancies` | Create a vacancy; returns `201` or validation errors with `422` |
| GET | `/api/vacancies/{id}` | Retrieve one vacancy; returns `200` or JSON `404` when missing |

List responses use `{ data, meta }`. Detail and create responses use `{ data }`. Create fields are `title`, `company`, `location`, `employment_type`, `work_arrangement`, and `description`.

## Tests and checks

Backend tests use an isolated in-memory SQLite database configured in `phpunit.xml`:

```powershell
cd backend
php artisan test --compact
```

Frontend lint and production build:

```powershell
cd frontend
npm run lint
npm run build
```

For the real frontend-backend E2E flow, start the backend and frontend in separate terminals, seed the backend first, then install the browser once and run:

```powershell
cd frontend
npx playwright install chromium
npm run test:e2e
```

The Playwright suite covers listing seeded vacancies, debounced title search, the detail route, no-match results, unknown IDs, and recruiter vacancy creation. Set `PLAYWRIGHT_BASE_URL` if the frontend runs on a different host or port.

## Environment variables

Backend variables are documented in `backend/.env.example`, including MySQL connection values and `FRONTEND_URL` for local CORS. Frontend variables are documented in `frontend/.env.example`.

No credentials or API keys are required. Local `.env` files and SQLite databases are ignored by Git.

## Known limitations

- Authentication and recruiter authorization are intentionally out of scope for this assessment.
- Update and delete endpoints are not included because the required create, list, search, and detail flows take priority.
- Vacancy descriptions are plain text; rich text and file uploads are not part of the brief.
