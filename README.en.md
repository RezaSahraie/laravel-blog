<div align="center">

# READLY/ 🗞️

### A modern publishing platform for things actually worth reading.

[![Laravel](https://img.shields.io/badge/Laravel-13-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com)
[![PHP](https://img.shields.io/badge/PHP-8.3+-777BB4?style=for-the-badge&logo=php&logoColor=white)](https://www.php.net)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Inertia](https://img.shields.io/badge/Inertia.js-9553E9?style=for-the-badge&logo=inertia&logoColor=white)](https://inertiajs.com)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-171714?style=for-the-badge)](LICENSE)

[🇮🇷 فارسی](README.fa.md) · [🐳 Docker guide](#-running-with-docker--laravel-sail) · [🚀 Quick start](#-quick-start) · [📁 Project map](#️-project-map)

</div>

---

## 📑 Table of contents

- [What is READLY?](#-what-is-ready)
- [Features](#-features)
- [Stack](#-stack)
- [Preview](#-preview)
- [Quick start](#-quick-start)
- [Running with Docker + Laravel Sail](#-running-with-docker--laravel-sail)
- [Access model](#-access-model)
- [Project map](#️-project-map)
- [Quality checks](#-quality-checks)
- [Contributing](#-contributing)
- [License](#-license)

---

## ⚡ What is READLY?

READLY is **not** another default Laravel starter screen wearing a different coat of paint. It's a small, real publishing app with two intentionally separate experiences:

- **Public** — read, discover and follow posts. No login required, no admin clutter in the way.
- **Studio** — create, manage and publish content, gated behind authentication.

Posts aren't limited to "stories." Publish tutorials, reviews, opinions, experiments, analysis, notes — anything worth sharing.

## ✨ Features

- Public reading experience with no admin chrome
- Post archive and dedicated article pages
- Anyone can read; signed-in users can comment
- Separate `/dashboard` Studio for authors
- Post creation, editing and management
- Category management
- Responsive interface
- Authentication via Laravel Fortify
- Laravel + Inertia + React — no separate API to maintain
- Docker-ready out of the box with Laravel Sail
- MySQL, Redis and Mailpit services included

## 🧱 Stack

| Layer | Technology |
|---|---|
| Backend | Laravel 13 / PHP 8.3+ |
| Frontend | React 19 + TypeScript |
| Bridge | Inertia.js |
| Styling | Tailwind CSS v4 |
| Authentication | Laravel Fortify |
| Database | MySQL 8.4 |
| Cache | Redis |
| Local email | Mailpit |
| Containers | Docker + Laravel Sail |
| Build tool | Vite |

## 👀 Preview

<p align="center">
  <img src="docs/screenshots/Screenshot%202026-08-29%20131927.png" alt="READLY public blog preview" width="49%" />
  <img src="docs/screenshots/Screenshot%202026-08-29%20135038.png" alt="READLY dashboard preview" width="49%" />
</p>

<p align="center"><sub>Screenshots taken directly from this project — public area (left) and the Studio dashboard (right).</sub></p>

---

## 🚀 Quick start

Requirements for running locally without Docker:

- PHP 8.3+
- Composer
- Node.js 18+ and npm
- MySQL or another Laravel-compatible database

```bash
git clone https://github.com/RezaSahraie/laravel-blog.git
cd laravel-blog

composer install
npm install
```

Create the environment file:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Then generate the app key, configure your database in `.env`, and run:

```bash
php artisan key:generate
php artisan migrate
npm run dev
php artisan serve
```

Open:

```text
http://localhost:8000
```

---

## 🐳 Running with Docker + Laravel Sail

The repository ships with **Laravel Sail**, wiring up:

```text
Laravel App · MySQL 8.4 · Redis · Mailpit · Vite
```

### 1. Create the environment file

```bash
cp .env.example .env          # Windows PowerShell: Copy-Item .env.example .env
```

### 2. Build and start the containers

```bash
./vendor/bin/sail up -d
```

On Windows PowerShell, if the script doesn't execute directly:

```powershell
bash vendor/bin/sail up -d
```

Check container status any time with `./vendor/bin/sail ps`.

### 3. App key & database

```bash
./vendor/bin/sail artisan key:generate
./vendor/bin/sail artisan migrate
```

Want seed data?

```bash
./vendor/bin/sail artisan db:seed
```

Or a completely fresh database:

```bash
./vendor/bin/sail artisan migrate:fresh --seed
```

### 4. Frontend

```bash
./vendor/bin/sail npm install
./vendor/bin/sail npm run dev      # development
./vendor/bin/sail npm run build    # production build
```

### 5. Open the site

With Sail's default configuration:

```text
http://localhost
```

The app port comes from `.env` (`APP_PORT`, default `80`) — e.g. set `APP_PORT=8080` and visit `http://localhost:8080` instead.

**Mailpit** (local email testing UI) is usually available at:

```text
http://localhost:8025
```

Configurable via `FORWARD_MAILPIT_DASHBOARD_PORT`.

### Stopping Docker

```bash
./vendor/bin/sail down
```

To also remove volumes (⚠️ this deletes the Docker database data):

```bash
./vendor/bin/sail down -v
```

---

## 🔐 Access model

| Area | Access |
|---|---|
| Browse posts | Everyone |
| Read a post | Everyone |
| Comment | Authenticated users |
| `/dashboard/*` | Authenticated and verified users |
| Publishing tools | Studio users |

## 🧪 Quality checks

```bash
composer run test          # full test suite (Pest)
composer run lint:check    # check PHP formatting (Pint)
composer run lint          # auto-fix PHP formatting
```

## 🗂️ Project map

```text
app/
├── Http/Controllers/     # Post and category actions
└── Models/               # Post, Category, Comment, User

resources/
├── css/                  # Design tokens and global styling
├── js/
│   ├── layouts/          # Public and Studio layouts
│   ├── pages/Posts/      # Reading and publishing pages
│   └── pages/Categories/ # Category management
└── views/                # Root HTML shell

database/
├── migrations/
└── seeders/

routes/web.php
compose.yaml               # Docker / Sail services
```

## 🛠️ Handy Sail commands

```bash
./vendor/bin/sail shell              # container shell
./vendor/bin/sail artisan route:list # inspect routes
./vendor/bin/sail composer install   # run Composer
./vendor/bin/sail npm run build      # run npm
./vendor/bin/sail logs -f            # follow logs
```

## 🤝 Contributing

1. Fork the repo
2. Create a new branch
3. Make your changes
4. Run the quality checks
5. Open a Pull Request

## 📄 License

This project is released under the [MIT License](LICENSE).

---

<div align="center">

### READLY/ — Read. Learn. Build. Repeat.

Built with Laravel, React, Inertia and Docker by **[Reza Sahraie](https://github.com/RezaSahraie)** 🖤

[🇮🇷 Read this in Persian](README.fa.md)

</div>
