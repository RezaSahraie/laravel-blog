<div align="center">

# READLY/

### A focused publishing project built with Laravel, Inertia and React.

<p>
  <a href="README.fa.md">🇮🇷 فارسی</a>
  &nbsp;•&nbsp;
  <a href="README.en.md">🇬🇧 English</a>
</p>

</div>

---

## Preview

<p align="center">
  <img src="docs/screenshots/Screenshot%202026-08-29%20131927.png" alt="READLY public blog preview" width="49%" />
  <img src="docs/screenshots/Screenshot%202026-08-29%20135038.png" alt="READLY dashboard preview" width="49%" />
</p>

> The screenshots above are from this repository's own project.

---

## What is READLY?

READLY is a blog application with a **public reading area** and a separate authenticated **dashboard** for managing content.

### Public area

- Browse published posts
- Open and read individual posts
- View comments
- Sign in when interaction requires an authenticated account

### Dashboard

- Manage posts
- Manage categories

---

## Project stack

- Laravel 13
- React + TypeScript
- Inertia.js
- Tailwind CSS
- Docker + Laravel Sail
- MySQL 8.4
- Redis
- Mailpit
- Vite

The exact Docker services are defined in `compose.yaml`.

---

## Choose your language

| Language | README |
|---|---|
| 🇮🇷 فارسی | [راهنمای فارسی](README.fa.md) |
| 🇬🇧 English | [English documentation](README.en.md) |

---

## Docker quick start

```bash
git clone https://github.com/RezaSahraie/laravel-blog.git
cd laravel-blog
```

Create your environment file:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Start the containers:

```bash
./vendor/bin/sail up -d
```

Then generate the application key and run migrations:

```bash
./vendor/bin/sail artisan key:generate
./vendor/bin/sail artisan migrate
```

For frontend development:

```bash
./vendor/bin/sail npm install
./vendor/bin/sail npm run dev
```

For the complete setup and day-to-day commands, use the language-specific README above.

---

<div align="center">

**READLY/ — built to write, organize and read.**

</div>
