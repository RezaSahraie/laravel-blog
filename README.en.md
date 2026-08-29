<div align="center">

# READLY/ 🗞️

### A modern publishing platform for things actually worth reading.

[![Laravel](https://img.shields.io/badge/Laravel-13-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com)

[🇮🇷 فارسی](README.fa.md) · [🐳 Docker guide](#-running-with-docker--laravel-sail) · [🚀 Quick start](#-quick-start)

</div>

---

## ⚡ What is READLY?

READLY is not another default Laravel starter screen wearing a different coat of paint.

It has two intentionally separate experiences:

- **Public** — read, discover and follow posts.
- **Studio** — create, manage and publish content behind authentication.

Posts are not limited to stories. Publish tutorials, reviews, opinions, experiments, analysis, notes or anything worth sharing.

## ✨ Features

- Public reading experience with no admin chrome
- Post archive and dedicated article pages
- Anyone can read; signed-in users can comment
- Separate `/dashboard` studio
- Post creation and editing
- Category management
- Responsive interface
- Laravel Fortify authentication
- Laravel + Inertia + React, without maintaining a separate API
- Docker-ready with Laravel Sail
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

## 🚀 Quick start

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

Then generate the key, configure your database and run:

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

# 🐳 Running with Docker + Laravel Sail

The repository ships with services for:

```text
Laravel App
MySQL 8.4
Redis
Mailpit
Vite
```

## Start

```bash
./vendor/bin/sail up -d
```

Then:

```bash
./vendor/bin/sail artisan key:generate
./vendor/bin/sail artisan migrate
./vendor/bin/sail npm install
./vendor/bin/sail npm run dev
```

On Windows PowerShell, if direct execution fails:

```powershell
bash vendor/bin/sail up -d
```

## Useful Sail commands

```bash
# Check containers
./vendor/bin/sail ps

# Run Artisan
./vendor/bin/sail artisan route:list

# Fresh database with seed data
./vendor/bin/sail artisan migrate:fresh --seed

# Run tests
./vendor/bin/sail artisan test

# Application shell
./vendor/bin/sail shell

# Follow logs
./vendor/bin/sail logs -f

# Stop containers
./vendor/bin/sail down
```

To also remove Docker volumes:

```bash
./vendor/bin/sail down -v
```

> ⚠️ `-v` removes persistent database data.

## 🌐 Local URLs

The application port comes from `APP_PORT` and defaults to port `80`:

```text
http://localhost
```

Mailpit defaults to:

```text
http://localhost:8025
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
compose.yaml              # Docker/Sail services
```

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
composer run test
composer run lint:check
composer run lint
```

## 🤝 Contributing

Fork it, build something useful, run the checks and open a Pull Request.

## 📄 License

MIT License.

---

<div align="center">

### READLY/ — Read. Learn. Build. Repeat.

Built with Laravel, React, Inertia and Docker. 🖤

</div>
