<div align="center">

# Inkwell 🖋️

### A publishing platform built with Laravel, Inertia and React.

[![Laravel](https://img.shields.io/badge/Laravel-13-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com)
[![PHP](https://img.shields.io/badge/PHP-8.3+-777BB4?style=for-the-badge&logo=php&logoColor=white)](https://www.php.net)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Inertia](https://img.shields.io/badge/Inertia.js-9553E9?style=for-the-badge&logo=inertia&logoColor=white)](https://inertiajs.com)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-171714?style=for-the-badge)](LICENSE)

**[🇮🇷 مستندات فارسی](README.fa.md)**

</div>

---

## 📑 Table of contents

- [What is Inkwell?](#-what-is-inkwell)
- [Features](#-features)
- [Stack](#-stack)
- [Preview](#-preview)
- [Routes](#️-routes)
- [Getting started (local, no Docker)](#-getting-started-local-no-docker)
- [Getting started with Docker / Laravel Sail](#-getting-started-with-docker--laravel-sail)
- [Seeding demo data](#-seeding-demo-data)
- [Running tests](#-running-tests)
- [Project structure](#-project-structure)
- [License](#-license)

---

## ⚡ What is Inkwell?

Inkwell is a small blog application with two separate areas:

- **Public site** — anyone can browse posts, open a post, and read the comments on it.
- **Dashboard** (`/dashboard`) — signed-in, verified users can create, edit and delete posts, and manage categories.

Commenting on a post requires signing in; reading does not.

## ✨ Features

- Public post listing and a dedicated page per post (`app/Http/Controllers/PostController.php`)
- Comments on posts, restricted to authenticated users
- Authenticated `/dashboard` area guarded by Laravel's `auth` and `verified` middleware
- Full CRUD for posts (create, edit, update, delete) from the dashboard
- Category management (create, delete) from the dashboard
- Authentication, registration and email verification via **Laravel Fortify**
- A `BlogSeeder` that seeds sample posts, categories and comments for local development
- Single-page navigation via **Inertia.js** — one Laravel app, one React frontend, no separate REST/JSON API to maintain

## 🧱 Stack

| Layer | Technology |
|---|---|
| Backend | Laravel 13 / PHP 8.3+ |
| Frontend | React 19 + TypeScript |
| Bridge | Inertia.js |
| Styling | Tailwind CSS v4 |
| Authentication | Laravel Fortify |
| Database | SQLite by default locally; MySQL 8.4 available through Docker/Sail |
| Session, cache & queue | Database driver (`SESSION_DRIVER`, `CACHE_STORE`, `QUEUE_CONNECTION` all default to `database`) |
| Build tool | Vite |

> **Honest note on the Docker services:** the Sail setup (`compose.yaml`) also starts a **Redis** container and a **Mailpit** container. Redis is running but the app isn't configured to use it yet — sessions, cache and queue all run on the `database` driver. Mailpit is installed too, but `MAIL_MAILER` still defaults to `log` in `.env.example`, so outgoing mail isn't actually routed to it yet — you'd need to set `MAIL_MAILER=smtp` with the Mailpit host/port yourself if you want to see emails there.

## 👀 Preview

<p align="center">
  <img src="docs/screenshots/Screenshot%202026-08-29%20131927.png" alt="Inkwell public blog preview" width="49%" />
  <img src="docs/screenshots/Screenshot%202026-08-29%20135038.png" alt="Inkwell dashboard preview" width="49%" />
</p>

<p align="center"><sub>Screenshots taken directly from this project.</sub></p>

---

## 🗺️ Routes

| Route | Access | Purpose |
|---|---|---|
| `/` | Public | Landing page |
| `/posts` | Public | Post listing |
| `/posts/{slug}` | Public | Single post + comments |
| `/posts/{slug}/comments` (POST) | Authenticated | Submit a comment |
| `/dashboard` | Authenticated + verified | Dashboard home |
| `/dashboard/posts` | Authenticated + verified | List posts (admin view) |
| `/dashboard/posts/create` | Authenticated + verified | Create a post |
| `/dashboard/posts/{post}/edit` | Authenticated + verified | Edit a post |
| `/dashboard/categories` | Authenticated + verified | List / create / delete categories |

(See `routes/web.php` for the exact route definitions.)

---

## 🚀 Getting started (local, no Docker)

Requirements:

- PHP 8.3+
- Composer
- Node.js 18+ and npm
- SQLite (bundled with PHP) — no separate database server needed for local development

```bash
git clone https://github.com/RezaSahraie/laravel-blog.git
cd laravel-blog

composer install
npm install
```

Create the environment file:

```bash
cp .env.example .env          # Windows PowerShell: Copy-Item .env.example .env
```

Generate the app key, create the SQLite database file, and migrate:

```bash
php artisan key:generate
touch database/database.sqlite   # Windows: New-Item database/database.sqlite
php artisan migrate
```

Build the frontend and run the app:

```bash
npm run dev
php artisan serve
```

Open:

```text
http://localhost:8000
```

> If you prefer MySQL locally instead of SQLite, update `DB_CONNECTION`, `DB_HOST`, `DB_DATABASE`, `DB_USERNAME` and `DB_PASSWORD` in `.env` before running `php artisan migrate`.

---

## 🐳 Getting started with Docker / Laravel Sail

The repository ships with **Laravel Sail**. `compose.yaml` defines the app container plus MySQL, Redis and Mailpit containers (see the note above on which of these the app actually uses today).

```bash
git clone https://github.com/RezaSahraie/laravel-blog.git
cd laravel-blog
cp .env.example .env          # Windows PowerShell: Copy-Item .env.example .env

./vendor/bin/sail up -d
```

On Windows PowerShell, if the script doesn't run directly:

```powershell
bash vendor/bin/sail up -d
```

Then:

```bash
./vendor/bin/sail artisan key:generate
./vendor/bin/sail artisan migrate
./vendor/bin/sail npm install
./vendor/bin/sail npm run dev
```

Open **http://localhost** (or the port set in `APP_PORT`, default `80`).

Stop the containers:

```bash
./vendor/bin/sail down
```

Add `-v` to also remove the Docker volumes (⚠️ this deletes the database data inside the container):

```bash
./vendor/bin/sail down -v
```

---

## 🌱 Seeding demo data

To fill the database with sample posts, categories and comments:

```bash
php artisan db:seed --class=BlogSeeder
```

Or, for a completely fresh database with seed data:

```bash
php artisan migrate:fresh --seed
```

(With Sail, prefix these with `./vendor/bin/sail`.)

---

## 🧪 Running tests

```bash
composer run test          # Pest test suite
composer run lint:check    # check PHP formatting (Pint)
composer run lint          # auto-fix PHP formatting
```

## 🗂️ Project structure

```text
app/
├── Http/Controllers/     # PostController, CategoryController
└── Models/               # Post, Category, Comment, User

resources/
├── css/                  # Global styling
├── js/
│   ├── layouts/          # Public and dashboard layouts
│   ├── pages/Posts/      # Post pages
│   └── pages/Categories/ # Category management pages
└── views/                # Root HTML shell

database/
├── migrations/
└── seeders/               # BlogSeeder, DatabaseSeeder

routes/web.php
compose.yaml               # Docker / Sail services
```

## 📄 License

Released under the [MIT License](LICENSE).

---

<div align="center">

Built by **[Reza Sahraie](https://github.com/RezaSahraie)**

**[🇮🇷 مستندات فارسی](README.fa.md)**

</div>
