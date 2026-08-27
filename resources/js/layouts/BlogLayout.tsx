import { Link, usePage } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';

export default function BlogLayout({ children }: PropsWithChildren) {
    const { auth } = usePage().props as any;

    return (
        <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
                <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
                    <Link href="/posts" className="text-lg font-semibold tracking-tight">
                        Blog
                    </Link>

                    <nav className="flex items-center gap-6 text-sm">
                        <Link
                            href="/posts"
                            className="text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                        >
                            Articles
                        </Link>

                        {auth?.user ? (
                            <Link
                                href="/dashboard"
                                className="text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href="/register"
                                    className="rounded-full bg-zinc-900 px-4 py-1.5 text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                                >
                                    Sign up
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main>{children}</main>

            {/* Footer */}
            <footer className="border-t border-zinc-200 py-10 dark:border-zinc-800">
                <div className="mx-auto max-w-5xl px-6 text-center text-sm text-zinc-500">
                    © {new Date().getFullYear()} — Built with Laravel & Inertia
                </div>
            </footer>
        </div>
    );
}