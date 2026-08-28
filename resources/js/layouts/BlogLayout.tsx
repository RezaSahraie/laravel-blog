import { Link, usePage } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import { dashboard, login, register } from '@/routes';
import { index as postsIndex } from '@/routes/posts';

export default function BlogLayout({ children }: PropsWithChildren) {
    const { auth } = usePage().props as any;

    return (
        <div className="min-h-screen bg-[#f7f8fc] text-slate-950 dark:bg-[#070b14] dark:text-white">
            <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_85%_0%,rgba(14,165,233,.10),transparent_30%),radial-gradient(circle_at_10%_20%,rgba(124,58,237,.08),transparent_28%)]" />
            <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-[#f7f8fc]/85 backdrop-blur-xl dark:border-white/10 dark:bg-[#070b14]/80">
                <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
                    <Link href={postsIndex()} className="flex items-center gap-3">
                        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 text-lg font-black text-slate-950 shadow-lg shadow-cyan-500/15">R</span>
                        <span className="hidden sm:block">
                            <span className="block text-base font-black tracking-tight">Readly</span>
                            <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Ideas worth your time</span>
                        </span>
                    </Link>
                    <nav className="flex items-center gap-1.5 text-sm font-semibold">
                        <Link href={postsIndex()} className="rounded-xl px-3.5 py-2 text-slate-600 transition hover:bg-white hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white">Articles</Link>
                        {auth?.user ? (
                            <Link href={dashboard()} className="ml-1 rounded-xl bg-slate-950 px-4 py-2.5 text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950">Dashboard</Link>
                        ) : (
                            <>
                                <Link href={login()} className="hidden rounded-xl px-3.5 py-2 text-slate-600 transition hover:bg-white dark:text-slate-300 dark:hover:bg-white/5 sm:block">Sign in</Link>
                                <Link href={register()} className="ml-1 rounded-xl bg-slate-950 px-4 py-2.5 text-white shadow-lg transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950">Get started</Link>
                            </>
                        )}
                    </nav>
                </div>
            </header>
            <main>{children}</main>
            <footer className="mt-24 border-t border-slate-200/80 dark:border-white/10">
                <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-10 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Readly</span>
                    <span>Built with Laravel & Inertia · {new Date().getFullYear()}</span>
                </div>
            </footer>
        </div>
    );
}
