import { Link, usePage } from '@inertiajs/react';
import { Moon, Sun } from 'lucide-react';
import type { PropsWithChildren } from 'react';
import { index as postsIndex } from '@/routes/posts';
import { dashboard } from '@/routes';
import { useAppearance } from '@/hooks/use-appearance';

function ThemeToggle() {
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const isDark = resolvedAppearance === 'dark';

    return (
        <button
            type="button"
            onClick={() => updateAppearance(isDark ? 'light' : 'dark')}
            aria-label="Toggle color theme"
            className="grid size-9 place-items-center rounded-full border border-border text-foreground/70 transition hover:border-primary hover:text-primary"
        >
            {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </button>
    );
}

export default function BlogLayout({ children }: PropsWithChildren) {
    const { auth, name } = usePage().props as any;
    const siteName = name ?? 'Inkwell';

    return (
        <div className="min-h-screen bg-background font-sans text-foreground antialiased selection:bg-accent/40 selection:text-foreground">
            <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-md">
                <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 py-3 sm:px-8">
                    <Link href={postsIndex()} className="flex items-center gap-2.5">
                        <span className="grid size-9 place-items-center rounded-full bg-primary font-display text-lg font-semibold text-primary-foreground">
                            {siteName?.[0] ?? 'I'}
                        </span>
                        <span className="font-display text-xl font-semibold tracking-tight">{siteName}</span>
                    </Link>

                    <nav className="flex items-center gap-1.5 sm:gap-3">
                        <Link
                            href={postsIndex()}
                            className="hidden rounded-full px-4 py-2 text-sm font-medium text-foreground/70 transition hover:bg-secondary hover:text-foreground sm:inline-block"
                        >
                            All stories
                        </Link>
                        <ThemeToggle />
                        {auth?.user ? (
                            <Link
                                href={dashboard()}
                                className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/20 transition hover:-translate-y-0.5 hover:shadow-md"
                            >
                                Studio
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
                            >
                                Sign in
                            </Link>
                        )}
                    </nav>
                </div>
            </header>

            <main>{children}</main>

            <footer className="mt-28 border-t border-border bg-secondary/40">
                <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-14 sm:px-8 md:flex-row md:items-start md:justify-between">
                    <div className="max-w-sm">
                        <Link href={postsIndex()} className="font-display text-2xl font-semibold tracking-tight">
                            {siteName}
                        </Link>
                        <p className="mt-3 text-sm leading-6 text-muted-foreground">
                            A calm, considered place to read and write &mdash; essays, tutorials, notes and
                            everything worth putting into words. Not every story here is fiction.
                        </p>
                    </div>
                    <div className="flex gap-14 text-sm">
                        <div>
                            <p className="font-display text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">Explore</p>
                            <div className="mt-4 flex flex-col gap-2.5">
                                <Link href={postsIndex()} className="text-foreground/75 transition hover:text-primary">All stories</Link>
                                <Link href="/login" className="text-foreground/75 transition hover:text-primary">Sign in</Link>
                                <Link href="/register" className="text-foreground/75 transition hover:text-primary">Create account</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-border/70 px-6 py-5 text-center text-xs text-muted-foreground sm:px-8">
                    &copy; {new Date().getFullYear()} {siteName}. Crafted for readers and writers alike.
                </div>
            </footer>
        </div>
    );
}
