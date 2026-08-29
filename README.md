<div align="center">

# READLY/ 🗞️

### Read. Learn. Build. Repeat.

A modern Laravel + React publishing platform with a clean public reading experience and a separate private Studio.

[![Laravel](https://img.shields.io/badge/Laravel-13-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com)
[![Inertia](https://img.shields.io/badge/Inertia.js-2.0-9553E9?style=for-the-badge)](https://inertiajs.com)

<br/>

[🇮🇷 فارسی — راهنما کامل](README.fa.md) &nbsp;·&nbsp; [🇺🇸 English — Full Guide](README.en.md)

</div>

---

## Pick your language

| | README |
|---|---|
| 🇮🇷 | **[فارسی](README.fa.md)** — معرفی پروژه، راه‌اندازی، Docker/Sail و دستورات کاربردی |
| 🇺🇸 | **[English](README.en.md)** — Project overview, setup and complete Docker/Sail guide |

## ⚡ The short version

READLY keeps two worlds separate:

```text
PUBLIC  → Read posts. Discover ideas. Comment after signing in.
STUDIO  → Create posts. Manage categories. Publish.
```

### Quick Docker start

```bash
git clone https://github.com/RezaSahraie/laravel-blog.git
cd laravel-blog
cp .env.example .env
./vendor/bin/sail up -d
./vendor/bin/sail artisan key:generate
./vendor/bin/sail artisan migrate
./vendor/bin/sail npm install
./vendor/bin/sail npm run dev
```

Then open:

```text
http://localhost
```

> 📚 For the full walkthrough, configuration details and troubleshooting, choose your language above.

---

<div align="center">

**Not a starter screen. A place for ideas.**

</div>
