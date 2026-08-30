<div dir="rtl" align="right">

# Inkwell 🖋️

### یک پلتفرم وبلاگ ساخته‌شده با Laravel، Inertia و React.

[![Laravel](https://img.shields.io/badge/Laravel-13-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com)
[![PHP](https://img.shields.io/badge/PHP-8.3+-777BB4?style=for-the-badge&logo=php&logoColor=white)](https://www.php.net)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Inertia](https://img.shields.io/badge/Inertia.js-9553E9?style=for-the-badge&logo=inertia&logoColor=white)](https://inertiajs.com)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-171714?style=for-the-badge)](LICENSE)

**[🇺🇸 English documentation](README.md)**

</div>

---

## 📑 فهرست مطالب

- [Inkwell چیست؟](#-inkwell-چیست)
- [امکانات](#-امکانات)
- [تکنولوژی‌ها](#-تکنولوژیها)
- [پیش‌نمایش](#-پیشنمایش)
- [مسیرها](#️-مسیرها)
- [شروع محلی (بدون Docker)](#-شروع-محلی-بدون-docker)
- [شروع با Docker / Laravel Sail](#-شروع-با-docker--laravel-sail)
- [پر کردن دیتابیس با داده نمونه](#-پر-کردن-دیتابیس-با-داده-نمونه)
- [اجرای تست‌ها](#-اجرای-تستها)
- [ساختار پروژه](#️-ساختار-پروژه)
- [License](#-license)

---

## ⚡ Inkwell چیست؟

Inkwell یک اپلیکیشن وبلاگ ساده با دو بخش جداست:

- **سایت عمومی** — هرکسی می‌تواند پست‌ها را ببیند، هر پست را باز کند و کامنت‌های آن را بخواند.
- **داشبورد** (`/dashboard`) — کاربرانی که وارد شده و ایمیلشان تأیید شده باشد می‌توانند پست بسازند، ویرایش و حذف کنند، و دسته‌بندی‌ها را مدیریت کنند.

برای گذاشتن کامنت باید وارد حساب کاربری شوی؛ اما خواندن پست و کامنت‌ها برای همه آزاد است.

## ✨ امکانات

- لیست پست‌های عمومی و صفحه اختصاصی برای هر پست (`app/Http/Controllers/PostController.php`)
- کامنت روی پست‌ها، فقط برای کاربران واردشده
- بخش `/dashboard` که پشت میدل‌ورهای `auth` و `verified` لاراول محافظت می‌شود
- CRUD کامل برای پست‌ها (ایجاد، ویرایش، به‌روزرسانی، حذف) از داشبورد
- مدیریت دسته‌بندی‌ها (ایجاد و حذف) از داشبورد
- احراز هویت، ثبت‌نام و تأیید ایمیل با **Laravel Fortify**
- یک `BlogSeeder` که برای توسعه محلی، پست، دسته‌بندی و کامنت نمونه می‌سازد
- ناوبری تک‌صفحه‌ای با **Inertia.js** — یک بک‌اند لاراول و یک فرانت‌اند React، بدون نیاز به یک API جدای REST/JSON

## 🧱 تکنولوژی‌ها

| بخش | ابزار |
|---|---|
| Backend | Laravel 13 / PHP 8.3+ |
| Frontend | React 19 + TypeScript |
| Bridge | Inertia.js |
| Styling | Tailwind CSS v4 |
| Auth | Laravel Fortify |
| Database | به‌صورت پیش‌فرض SQLite در محلی؛ MySQL 8.4 از طریق Docker/Sail هم در دسترس است |
| Session، Cache و Queue | همه روی درایور `database` هستند (`SESSION_DRIVER`, `CACHE_STORE`, `QUEUE_CONNECTION`) |
| Build | Vite |

> **یک نکته صادقانه درباره سرویس‌های Docker:** تنظیمات Sail (فایل `compose.yaml`) کانتینر **Redis** و کانتینر **Mailpit** را هم بالا می‌آورد. Redis اجرا می‌شود ولی پروژه هنوز برای استفاده از آن تنظیم نشده — Session، Cache و Queue همه روی درایور `database` کار می‌کنند. Mailpit هم نصب شده، اما `MAIL_MAILER` در `.env.example` همچنان روی `log` است، یعنی ایمیل‌های خروجی هنوز واقعاً به سمت Mailpit فرستاده نمی‌شوند؛ اگر می‌خواهی ایمیل‌ها را در Mailpit ببینی باید خودت `MAIL_MAILER=smtp` را همراه هاست/پورت Mailpit در `.env` تنظیم کنی.

## 👀 پیش‌نمایش

<p align="center">
  <img src="docs/screenshots/Screenshot%202026-08-29%20131927.png" alt="پیش‌نمایش صفحه عمومی Inkwell" width="49%" />
  <img src="docs/screenshots/Screenshot%202026-08-29%20135038.png" alt="پیش‌نمایش داشبورد Inkwell" width="49%" />
</p>

<p align="center"><sub>این تصاویر مستقیماً از همین پروژه گرفته شده‌اند.</sub></p>

---

## 🗺️ مسیرها

| مسیر | دسترسی | کاربرد |
|---|---|---|
| `/` | عمومی | صفحه ورودی |
| `/posts` | عمومی | لیست پست‌ها |
| `/posts/{slug}` | عمومی | صفحه یک پست + کامنت‌ها |
| `/posts/{slug}/comments` (POST) | نیازمند ورود | ثبت کامنت |
| `/dashboard` | نیازمند ورود + تأیید ایمیل | خانه داشبورد |
| `/dashboard/posts` | نیازمند ورود + تأیید ایمیل | لیست پست‌ها (نمای مدیریتی) |
| `/dashboard/posts/create` | نیازمند ورود + تأیید ایمیل | ایجاد پست |
| `/dashboard/posts/{post}/edit` | نیازمند ورود + تأیید ایمیل | ویرایش پست |
| `/dashboard/categories` | نیازمند ورود + تأیید ایمیل | لیست / ایجاد / حذف دسته‌بندی |

(برای تعریف دقیق مسیرها به `routes/web.php` مراجعه کن.)

---

## 🚀 شروع محلی (بدون Docker)

پیش‌نیازها:

- PHP 8.3+
- Composer
- Node.js 18+ و npm
- SQLite (همراه PHP نصب می‌شود) — برای توسعه محلی نیازی به یک سرور دیتابیس جدا نیست

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

ساخت Key، ساخت فایل دیتابیس SQLite، و اجرای Migration:

```bash
php artisan key:generate
touch database/database.sqlite   # Windows: New-Item database/database.sqlite
php artisan migrate
```

Build فرانت‌اند و اجرای پروژه:

```bash
npm run dev
php artisan serve
```

سایت روی این آدرس در دسترس است:

```text
http://localhost:8000
```

> اگر ترجیح می‌دهی به‌جای SQLite از MySQL محلی استفاده کنی، قبل از اجرای `php artisan migrate`، مقادیر `DB_CONNECTION`، `DB_HOST`، `DB_DATABASE`، `DB_USERNAME` و `DB_PASSWORD` را در `.env` تغییر بده.

---

## 🐳 شروع با Docker / Laravel Sail

این پروژه از **Laravel Sail** استفاده می‌کند. فایل `compose.yaml` کانتینر اپ به‌همراه MySQL، Redis و Mailpit را تعریف می‌کند (برای اینکه کدام‌یک واقعاً توسط پروژه استفاده می‌شود، به یادداشت بالا نگاه کن).

```bash
git clone https://github.com/RezaSahraie/laravel-blog.git
cd laravel-blog
cp .env.example .env          # Windows PowerShell: Copy-Item .env.example .env

./vendor/bin/sail up -d
```

اگر در Windows PowerShell این دستور مستقیم اجرا نشد:

```powershell
bash vendor/bin/sail up -d
```

سپس:

```bash
./vendor/bin/sail artisan key:generate
./vendor/bin/sail artisan migrate
./vendor/bin/sail npm install
./vendor/bin/sail npm run dev
```

سایت روی **http://localhost** در دسترس است (یا پورتی که در `APP_PORT` تنظیم کرده‌ای، پیش‌فرض `80`).

توقف کانتینرها:

```bash
./vendor/bin/sail down
```

برای حذف Volumeها هم اضافه کن `-v` (⚠️ این کار دیتای دیتابیس داخل کانتینر را پاک می‌کند):

```bash
./vendor/bin/sail down -v
```

---

## 🌱 پر کردن دیتابیس با داده نمونه

برای پر کردن دیتابیس با پست، دسته‌بندی و کامنت نمونه:

```bash
php artisan db:seed --class=BlogSeeder
```

یا برای یک دیتابیس کاملاً تازه همراه با داده نمونه:

```bash
php artisan migrate:fresh --seed
```

(با Sail، این دستورها را با `./vendor/bin/sail` شروع کن.)

---

## 🧪 اجرای تست‌ها

```bash
composer run test          # اجرای تست‌های Pest
composer run lint:check    # بررسی فرمت PHP (Pint)
composer run lint          # اصلاح خودکار فرمت
```

## 🗂️ ساختار پروژه

```text
app/
├── Http/Controllers/     # PostController, CategoryController
└── Models/               # Post, Category, Comment, User

resources/
├── css/                  # استایل‌های عمومی
├── js/
│   ├── layouts/          # Layoutهای عمومی و داشبورد
│   ├── pages/Posts/      # صفحات پست
│   └── pages/Categories/ # صفحات مدیریت دسته‌بندی
└── views/                # Root HTML shell

database/
├── migrations/
└── seeders/               # BlogSeeder, DatabaseSeeder

routes/web.php
compose.yaml               # سرویس‌های Docker / Sail
```

## 📄 License

این پروژه تحت لایسنس [MIT](LICENSE) منتشر شده است.

---

<div align="center" dir="ltr">

Built by **[Reza Sahraie](https://github.com/RezaSahraie)**

**[🇺🇸 English documentation](README.md)**

</div>
