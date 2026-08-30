<div align="center">

# READLY/ 🗞️

### A modern publishing platform for things actually worth reading.
### یک پلتفرم وبلاگ مدرن برای نوشتن چیزهایی که واقعاً ارزش خواندن دارند.

[![Laravel](https://img.shields.io/badge/Laravel-13-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Inertia](https://img.shields.io/badge/Inertia.js-9553E9?style=for-the-badge&logo=inertia&logoColor=white)](https://inertiajs.com)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com)
[![License](https://img.shields.io/badge/License-MIT-171714?style=for-the-badge)](LICENSE)

<p>
  <a href="README.fa.md"><b>🇮🇷 مستندات فارسی</b></a>
  &nbsp;•&nbsp;
  <a href="README.en.md"><b>🇬🇧 English documentation</b></a>
  &nbsp;•&nbsp;
  <a href="#-docker-quick-start--شروع-سریع-با-docker">🐳 Docker quick start</a>
</p>

</div>

---

## 👀 Preview / پیش‌نمایش

<p align="center">
  <img src="docs/screenshots/Screenshot%202026-08-29%20131927.png" alt="READLY public blog preview" width="49%" />
  <img src="docs/screenshots/Screenshot%202026-08-29%20135038.png" alt="READLY dashboard preview" width="49%" />
</p>

<p align="center"><sub>Live screenshots straight from this repository — public reading area on the left, the authenticated Studio dashboard on the right.</sub></p>

---

## ⚡ What is READLY? / READLY چیست؟

READLY isn't another default Laravel starter page wearing a new coat of paint. It's a small but real publishing app split into two intentional worlds:

> 🌍 **Public** — read, discover and follow posts, no login required.
> 🧑‍💻 **Studio** — an authenticated dashboard to write, edit and organize content.

READLY یک قالب پیش‌فرض Laravel نیست؛ یک وبلاگ واقعی با دو دنیای جداست: بخش **عمومی** برای خواندن آزاد، و **Studio** برای نویسنده‌ها که پشت احراز هویت مدیریت می‌شود.

## ✨ Highlights / امکانات کلیدی

| | |
|---|---|
| 📰 | Public reading area — no admin chrome, just content · صفحه عمومی مستقل برای خوانندگان |
| 💬 | Everyone can read, only signed-in users can comment · خواندن آزاد، کامنت فقط با ورود |
| 🔐 | Authentication via Laravel Fortify · احراز هویت با Laravel Fortify |
| 🧑‍💻 | Separate `/dashboard` Studio for authors · پنل مدیریت مجزا در `/dashboard` |
| ✍️ | Create, edit and manage posts & categories · مدیریت کامل پست و دسته‌بندی |
| ⚡ | Laravel + Inertia + React, no separate API layer · بدون نیاز به API جداگانه |
| 🐳 | One command to boot the whole stack with Sail · اجرای کامل با یک دستور Docker |

## 🧱 Stack

| Layer | Technology |
|---|---|
| Backend | Laravel 13 · PHP 8.3+ |
| Frontend | React 19 + TypeScript |
| Bridge | Inertia.js |
| Styling | Tailwind CSS v4 |
| Auth | Laravel Fortify |
| Database | MySQL 8.4 |
| Cache | Redis |
| Local mail | Mailpit |
| Containers | Docker + Laravel Sail |
| Build | Vite |

The exact Docker services live in [`compose.yaml`](compose.yaml).

---

## 🐳 Docker quick start / شروع سریع با Docker

```bash
git clone https://github.com/RezaSahraie/laravel-blog.git
cd laravel-blog
cp .env.example .env          # Windows PowerShell: Copy-Item .env.example .env

./vendor/bin/sail up -d
./vendor/bin/sail artisan key:generate
./vendor/bin/sail artisan migrate
./vendor/bin/sail npm install
./vendor/bin/sail npm run dev
```

Open **http://localhost** (Mailpit at **http://localhost:8025**).

For the full walkthrough — local (non-Docker) setup, seeding, useful Sail commands, project structure and testing — head to the language-specific guide:

| Language | README |
|---|---|
| 🇮🇷 فارسی | **[راهنمای کامل فارسی →](README.fa.md)** |
| 🇬🇧 English | **[Full English guide →](README.en.md)** |

---

## 🤝 Contributing / مشارکت

Fork it, create a branch, build something useful, run the checks (`composer run test`), and open a Pull Request.
اگر می‌خوای مشارکت کنی: Fork بگیر، Branch جدید بساز، تغییراتت رو انجام بده، تست‌ها رو اجرا کن و Pull Request بزن.

## 📄 License

Released under the [MIT License](LICENSE).

---

<div align="center">

**READLY/ — Read. Learn. Build. Repeat.**

Built with ❤️ using Laravel, React, Inertia & Docker by **[Reza Sahraie](https://github.com/RezaSahraie)**

⭐ If this project is useful to you, consider starring the repo!

</div>
