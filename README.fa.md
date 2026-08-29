<div dir="rtl" align="right">

# READLY/ 🗞️

### یک پلتفرم وبلاگ مدرن برای نوشتن چیزهایی که واقعاً ارزش خواندن دارند.

[![Laravel](https://img.shields.io/badge/Laravel-13-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com)
[![License](https://img.shields.io/badge/License-MIT-171714?style=for-the-badge)](LICENSE)

[🇺🇸 English README](README.en.md) · [🐳 Docker](#-اجرای-پروژه-با-docker--laravel-sail) · [🚀 شروع سریع](#-شروع-سریع)

</div>

---

## ⚡ READLY چیست؟

**READLY یک قالب پیش‌فرض Laravel نیست.** این پروژه یک وبلاگ مدرن با دو دنیای جداست:

> **Public** برای خواندن، کشف کردن و دنبال کردن محتوا.
>
> **Studio** برای نوشتن، مدیریت و انتشار محتوا.

پست‌ها محدود به داستان نیستند؛ می‌توانند آموزش، مقاله، تجربه، بررسی، تحلیل، نظر یا هر چیزی باشند که ارزش انتشار دارد.

## ✨ امکانات

- 📰 صفحه عمومی مستقل برای خوانندگان
- 📖 آرشیو و صفحه اختصاصی هر پست
- 💬 خواندن برای همه؛ کامنت فقط برای کاربران واردشده
- 🔐 احراز هویت با Laravel Fortify
- 🧑‍💻 پنل مدیریت جدا در `/dashboard`
- ✍️ ایجاد، ویرایش و مدیریت پست‌ها
- 🗂️ مدیریت Categoryها
- 🌓 طراحی Responsive و Dark-ready
- ⚡ Laravel + Inertia + React بدون نیاز به API جداگانه
- 🐳 اجرای کامل با Docker و Laravel Sail
- 🗄️ MySQL + Redis + Mailpit در محیط Docker

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
copy .env.example .env
php artisan key:generate
npm install
```

در Linux/macOS:

```bash
cp .env.example .env
```

سپس تنظیمات دیتابیس را در `.env` وارد کن و:

```bash
php artisan migrate
npm run dev
php artisan serve
```

سایت روی این آدرس در دسترس خواهد بود:

```text
http://localhost:8000
```

---

# 🐳 اجرای پروژه با Docker + Laravel Sail

این پروژه از **Laravel Sail** استفاده می‌کند و سرویس‌های زیر را آماده دارد:

```text
Laravel App
MySQL 8.4
Redis
Mailpit
Vite
```

## 1) فایل Environment را بساز

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Linux/macOS:

```bash
cp .env.example .env
```

## 2) کانتینرها را Build و اجرا کن

### Windows PowerShell

```powershell
./vendor/bin/sail up -d
```

اگر در PowerShell این دستور کار نکرد:

```powershell
bash vendor/bin/sail up -d
```

### WSL / Linux / macOS

```bash
./vendor/bin/sail up -d
```

برای دیدن وضعیت:

```bash
./vendor/bin/sail ps
```

## 3) Key و Database

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

## 4) Frontend

برای نصب وابستگی‌ها:

```bash
./vendor/bin/sail npm install
```

برای حالت Development:

```bash
./vendor/bin/sail npm run dev
```

برای Build نهایی:

```bash
./vendor/bin/sail npm run build
```

## 5) باز کردن سایت

با تنظیم پیش‌فرض Sail:

```text
http://localhost
```

پورت برنامه از `.env` قابل تغییر است:

```env
APP_PORT=80
```

مثلاً:

```env
APP_PORT=8080
```

سپس سایت:

```text
http://localhost:8080
```

## 📬 Mailpit

پنل ایمیل محلی معمولاً روی:

```text
http://localhost:8025
```

قرار دارد و از `FORWARD_MAILPIT_DASHBOARD_PORT` قابل تغییر است.

## ⛔ توقف Docker

```bash
./vendor/bin/sail down
```

توقف و حذف Volumeها:

```bash
./vendor/bin/sail down -v
```

> ⚠️ دستور `-v` دیتای دیتابیس Docker را حذف می‌کند.

---

## 🧪 تست و بررسی کیفیت

```bash
composer run test
```

بررسی فرمت PHP:

```bash
composer run lint:check
```

اصلاح فرمت:

```bash
composer run lint
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
# ورود به Shell کانتینر
./vendor/bin/sail shell

# اجرای Artisan
./vendor/bin/sail artisan route:list

# اجرای Composer
./vendor/bin/sail composer install

# اجرای NPM
./vendor/bin/sail npm run build

# مشاهده Logها
./vendor/bin/sail logs -f
```

## 🤝 مشارکت

اگر قصد توسعه پروژه را داری:

1. Fork کن
2. Branch جدید بساز
3. تغییراتت را انجام بده
4. تست‌ها را اجرا کن
5. Pull Request بزن

## 📄 License

این پروژه تحت لایسنس MIT منتشر شده است.

---

<div align="center" dir="ltr">

### READLY/ — Read. Learn. Build. Repeat.

Built with Laravel, React, Inertia and Docker. 🖤

</div>
