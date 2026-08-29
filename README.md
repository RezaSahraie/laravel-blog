<div align="center">

# 🖋️ Inkwell

**A calm, considered blog for things worth writing down.**

Built with Laravel, Inertia and React — essays, tutorials, reviews and honest notes.
Not everything here is a story. Some of it is just useful.

[![Laravel](https://img.shields.io/badge/Laravel-13-FF2D20?style=flat&logo=laravel&logoColor=white)](https://laravel.com)
[![Inertia.js](https://img.shields.io/badge/Inertia.js-React-9553E9?style=flat)](https://inertiajs.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/license-MIT-black?style=flat)](LICENSE)

</div>

---

## What is this?

Inkwell is a small, self-hosted publishing platform. One or more writers sign in to a
private studio to draft, edit and publish posts under topics; everyone else just reads
— and if they want to join the conversation in the comments, they sign in first.

It is **not** a fiction-only blog template — posts can be tutorials, opinions, reviews,
changelogs, or anything else worth putting into words. The name is a placeholder you're
free to make your own (see [Making it yours](#-making-it-yours) below).

## ✨ Highlights

- **A public reading experience, not an app shell.** Visitors land on a clean editorial
  homepage and a magazine-style archive — no admin chrome, no sidebars, no noise.
- **A separate, private studio.** Everything under `/dashboard` — writing, editing,
  categories, account settings — lives behind authentication, completely apart from the
  public site.
- **Comments require an account.** Anyone can read; only signed-in readers can comment,
  which keeps the conversation section actually worth reading.
- **A real design system**, not defaults. A custom "paper & ink" theme (warm cream /
  deep charcoal, terracotta and amber accents, a serif/sans type pairing) is wired
  through CSS variables, so both the public site and the `shadcn/ui`-based admin studio
  share one consistent look — including dark mode.
- **Topics, not tags.** Lightweight categories keep the archive organized without
  over-engineering a taxonomy.
- **Built on a modern, boring-in-a-good-way stack**: Laravel 13, Inertia 2, React 19,
  TypeScript, and Tailwind CSS v4 — server-driven routing, no separate API layer to
  maintain.

## 🧱 Tech stack

| Layer          | Choice                                              |
|----------------|------------------------------------------------------|
| Backend        | Laravel 13 (PHP 8.2+)                                |
| Frontend glue  | Inertia.js 2 (no separate REST/GraphQL API)          |
| UI             | React 19 + TypeScript, `shadcn/ui`, Tailwind CSS v4  |
| Auth           | Laravel Fortify                                      |
| Database       | SQLite by default (any Laravel-supported DB works)   |
| Tooling        | Vite, Laravel Wayfinder (typed route helpers), Pest  |

## 📸 A quick tour

- **`/`** — the landing page: a short pitch for the blog and a way in.
- **`/posts`** — the public archive: a featured story up top, then a responsive grid of
  everything else. Anyone can read.
- **`/posts/{slug}`** — a single story, with a comment thread. Reading is open to all;
  commenting asks you to sign in first.
- **`/dashboard`** — the writer's studio (auth required): an overview, "My posts" with
  drafts/published status, a distraction-free post editor with cover image upload, and
  category management.

## 🚀 Getting started

### Requirements

- PHP 8.2+
- Composer
- Node.js 18+ and npm
- A database (SQLite is the zero-config default; MySQL/Postgres also work)

### Setup

```bash
git clone https://github.com/RezaSahraie/laravel-blog.git
cd laravel-blog

composer install
cp .env.example .env
php artisan key:generate

# SQLite is the default — create the file if it doesn't exist yet:
touch database/database.sqlite

php artisan migrate
php artisan db:seed   # optional: sample categories + posts + an admin user

npm install
npm run build          # or `npm run dev` while working locally
php artisan serve
```

Or, if you'd rather run everything (server, queue listener, and Vite) in one go:

```bash
composer run dev
```

Visit `http://localhost:8000`. If you ran the seeder, you can sign in at `/login` with:

```
email:    admin@example.com
password: 12345678
```

> Change or remove these credentials before deploying anywhere public.

### Running tests

```bash
composer run test
```

## 🎨 Making it yours

The design lives almost entirely behind a handful of CSS variables, so restyling the
whole app doesn't mean touching every page:

- **Colors & radius** — `resources/css/app.css`, inside `:root` and `.dark`. Every
  component (public site and admin studio alike) reads from these tokens.
- **Fonts** — the Fraunces / Manrope pairing is loaded in `resources/views/app.blade.php`
  and referenced as `--font-display` / `--font-sans` in `resources/css/app.css`.
- **Site name** — set `APP_NAME` in your `.env`; it's shared into every page as `name`
  and shown in the header, footer, and auth screens automatically.
- **Layouts** — `resources/js/layouts/BlogLayout.tsx` (public site chrome) and
  `resources/js/layouts/app/app-sidebar-layout.tsx` (studio chrome) are the two places
  to change structurally.

## 🗂️ Project structure (the interesting parts)

```
app/
  Http/Controllers/       PostController, CategoryController
  Http/Requests/           Form validation (post create/update, comments)
  Models/                  Post, Category, Comment, User
database/
  migrations/               Schema for posts, categories, comments
  seeders/                  Sample content for a fresh install
resources/
  css/app.css               Design tokens (the whole visual theme lives here)
  views/app.blade.php       Root HTML shell, fonts
  js/
    layouts/BlogLayout.tsx  Public site header/footer
    pages/welcome.tsx       Landing page
    pages/Posts/            Public archive + single post
    pages/Categories/       Studio: manage topics
    pages/Posts/Admin/      Studio: create/edit/list posts
routes/web.php              All routes, public and studio
```

## 🔐 Access model, in short

| Area                     | Who can access it                          |
|---------------------------|---------------------------------------------|
| Browse posts               | Everyone                                     |
| Comment on a post           | Signed-in users only                         |
| `/dashboard/*` (the studio) | Signed-in, verified users only               |
| Edit or delete a post        | Only the post's own author                   |
| Delete a category            | Any signed-in user, only if it's empty       |

## 🤝 Contributing

Issues and pull requests are welcome. Please run `composer run lint` and
`composer run test` before opening a PR.

## 📄 License

This project is open-sourced under the [MIT license](LICENSE).

---

<div align="center">
<sub>Built with Laravel, Inertia and a little too much attention to type pairing.</sub>
</div>
