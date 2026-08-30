<div dir="rtl" align="right">

# READLY/ 🗞️

### یک پلتفرم وبلاگ مدرن برای نوشتن چیزهایی که واقعاً ارزش خواندن دارند.

[![Laravel](https://img.shields.io/badge/Laravel-13-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com)
[![PHP](https://img.shields.io/badge/PHP-8.3+-777BB4?style=for-the-badge&logo=php&logoColor=white)](https://www.php.net)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Inertia](https://img.shields.io/badge/Inertia.js-9553E9?style=for-the-badge&logo=inertia&logoColor=white)](https://inertiajs.com)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com)
[![License](https://img.shields.io/badge/License-MIT-171714?style=for-the-badge)](LICENSE)

[🇺🇸 English README](README.en.md) · [🐳 راهنمای Docker](#-اجرای-پروژه-با-docker--laravel-sail) · [🚀 شروع سریع](#-شروع-سریع)

</div>

---

## 📑 فهرست مطالب

- [READLY چیست؟](#-ready-چیست)
- [امکانات](#-امکانات)
- [تکنولوژی‌ها](#-تکنولوژیها)
- [پیش‌نمایش](#-پیشنمایش)
- [مسیرهای مهم](#️-مسیرهای-مهم)
- [شروع سریع](#-شروع-سریع)
- [اجرا با Docker](#-اجرای-پروژه-با-docker--laravel-sail)
- [تست و کیفیت](#-تست-و-بررسی-کیفیت)
- [ساختار پروژه](#️-ساختار-پروژه)
- [مشارکت](#-مشارکت)
- [License](#-license)

---

## ⚡ READLY چیست؟

**READLY یک قالب پیش‌فرض Laravel نیست.** این پروژه یک وبلاگ واقعی و کاربردی با دو دنیای کاملاً جداست:

> 🌍 **Public** — برای خواندن، کشف کردن و دنبال‌کردن محتوا، بدون نیاز به لاگین.
> 🧑‍💻 **Studio** — پنل احراز-هویت‌شده برای نوشتن، مدیریت و انتشار محتوا.

پست‌ها محدود به داستان نیستند؛ می‌توانند آموزش، مقاله، تجربه، بررسی، تحلیل، نظر یا هر چیز دیگری باشند که ارزش انتشار دارد.

## ✨ امکانات

- 📰 صفحه عمومی مستقل برای خوانندگان، بدون شلوغی پنل مدیریت
- 📖 آرشیو پست‌ها و صفحه اختصاصی برای هر پست
- 💬 خواندن برای همه آزاد است؛ کامنت فقط برای کاربران واردشده
- 🔐 احراز هویت با Laravel Fortify
- 🧑‍💻 پنل مدیریت جدا (Studio) در مسیر `/dashboard`
- ✍️ ایجاد، ویرایش و مدیریت کامل پست‌ها
- 🗂️ مدیریت دسته‌بندی‌ها (Categories)
- 🌓 طراحی Responsive
- ⚡ ترکیب Laravel + Inertia + React، بدون نیاز به یک API جداگانه
- 🐳 اجرای کامل پروژه با یک دستور Docker
- 🗄️ سرویس‌های MySQL + Redis + Mailpit به‌صورت آماده در Docker

## 🧱 تکنولوژی‌ها

| بخش | ابزار |
|---|---|
| Backend | Laravel 13 / PHP 8.3+ |
| Frontend | React 19 + TypeScript |
| Bridge | Inertia.js |
| Styling | Tailwind CSS v4 |
| Auth | Laravel Fortify |
| Database | MySQL 8.4 |
| Cache | Redis |
| Local Mail | Mailpit |
| Containers | Docker + Laravel Sail |
| Build | Vite |

## 👀 پیش‌نمایش

<p align="center">
  <img src="docs/screenshots/Screenshot%202026-08-29%20131927.png" alt="پیش‌نمایش صفحه عمومی READLY" width="49%" />
  <img src="docs/screenshots/Screenshot%202026-08-29%20135038.png" alt="پیش‌نمایش داشبورد READLY" width="49%" />
</p>

<p align="center"><sub>این تصاویر مستقیماً از همین پروژه گرفته شده‌اند — سمت راست بخش عمومی و سمت چپ داشبورد Studio.</sub></p>

---

## 🗺️ مسیرهای مهم

| مسیر | کاربرد |
|---|---|
| `/` | صفحه ورودی وبلاگ |
| `/posts` | همه پست‌ها |
| `/posts/{slug}` | صفحه یک پست |
| `/login` | ورود هنگام نیاز به کامنت یا دسترسی پنل |
| `/dashboard` | Studio / پنل مدیریت |
| `/dashboard/posts` | مدیریت پست‌ها |
| `/dashboard/categories` | مدیریت دسته‌بندی‌ها |

## 🚀 شروع سریع

### پیش‌نیازها

برای اجرای محلی بدون Docker:

- PHP 8.3+
- Composer
- Node.js 18+
- npm
- MySQL یا یک دیتابیس سازگار با Laravel

```bash
git clone https://github.com/RezaSahraie/laravel-blog.git
cd laravel-blog

composer install
npm install
```

ساخت فایل Environment؛ در Linux/macOS:

```bash
cp .env.example .env
```

در Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

سپس تنظیمات دیتابیس را در `.env` وارد کن و دستورات زیر را اجرا کن:

```bash
php artisan key:generate
php artisan migrate
npm run dev
php artisan serve
```

سایت روی این آدرس در دسترس خواهد بود:

```text
http://localhost:8000
```

---

## 🐳 اجرای پروژه با Docker + Laravel Sail

این پروژه از **Laravel Sail** استفاده می‌کند و سرویس‌های زیر را آماده دارد:

```text
Laravel App · MySQL 8.4 · Redis · Mailpit · Vite
```

### 1) فایل Environment را بساز

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Linux/macOS:

```bash
cp .env.example .env
```

### 2) کانتینرها را Build و اجرا کن

```bash
./vendor/bin/sail up -d
```

اگر در PowerShell این دستور مستقیم اجرا نشد:

```powershell
bash vendor/bin/sail up -d
```

برای دیدن وضعیت کانتینرها:

```bash
./vendor/bin/sail ps
```

### 3) Key و Database

```bash
./vendor/bin/sail artisan key:generate
./vendor/bin/sail artisan migrate
```

اگر Seederهای پروژه را می‌خواهی:

```bash
./vendor/bin/sail artisan db:seed
```

یا برای ساخت دیتابیس کاملاً تازه:

```bash
./vendor/bin/sail artisan migrate:fresh --seed
```

### 4) Frontend

```bash
./vendor/bin/sail npm install
./vendor/bin/sail npm run dev      # حالت توسعه
./vendor/bin/sail npm run build    # ساخت نهایی برای Production
```

### 5) باز کردن سایت

با تنظیم پیش‌فرض Sail:

```text
http://localhost
```

پورت برنامه از `.env` (متغیر `APP_PORT`، پیش‌فرض `80`) قابل تغییر است؛ مثلاً `APP_PORT=8080` و سپس بازدید از `http://localhost:8080`.

**Mailpit** (رابط تست ایمیل محلی) معمولاً روی این آدرس در دسترس است:

```text
http://localhost:8025
```

قابل تنظیم از طریق `FORWARD_MAILPIT_DASHBOARD_PORT`.

### ⛔ توقف Docker

```bash
./vendor/bin/sail down
```

توقف و حذف Volumeها:

```bash
./vendor/bin/sail down -v
```

> ⚠️ دستور `-v` دیتای دیتابیس Docker را کامل حذف می‌کند.

---

## 🧪 تست و بررسی کیفیت

```bash
composer run test          # اجرای کامل تست‌ها (Pest)
composer run lint:check    # بررسی فرمت PHP (Pint)
composer run lint          # اصلاح خودکار فرمت
```

## 🗂️ ساختار پروژه

```text
app/
├── Http/Controllers/     # منطق Post و Category
└── Models/               # Post, Category, Comment, User

resources/
├── css/                  # Design system
├── js/
│   ├── layouts/          # Public و Studio layouts
│   ├── pages/Posts/      # صفحات پست
│   └── pages/Categories/ # مدیریت Category
└── views/                # Root HTML shell

database/
├── migrations/
└── seeders/

routes/
└── web.php

compose.yaml              # Docker / Sail services
```

## 🛠️ چند دستور کاربردی Sail

```bash
./vendor/bin/sail shell              # ورود به Shell کانتینر
./vendor/bin/sail artisan route:list # اجرای Artisan
./vendor/bin/sail composer install   # اجرای Composer
./vendor/bin/sail npm run build      # اجرای NPM
./vendor/bin/sail logs -f            # مشاهده Logها
```

## 🤝 مشارکت

اگر قصد توسعه پروژه را داری:

1. Fork کن
2. Branch جدید بساز
3. تغییراتت را انجام بده
4. تست‌ها را اجرا کن
5. Pull Request بزن

## 📄 License

این پروژه تحت لایسنس [MIT](LICENSE) منتشر شده است.

---

<div align="center" dir="ltr">

### READLY/ — Read. Learn. Build. Repeat.

Built with Laravel, React, Inertia and Docker by **[Reza Sahraie](https://github.com/RezaSahraie)** 🖤

[🇺🇸 Read this in English](README.en.md)

</div>
