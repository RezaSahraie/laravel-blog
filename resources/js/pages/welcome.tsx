import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowUpRight, Feather, MessageCircle, Sparkles } from 'lucide-react';
import { index as postsIndex } from '@/routes/posts';

const pillars = [
    {
        icon: Feather,
        title: 'Write anything worth reading',
        body: 'Essays, tutorials, reviews, field notes. This is a blog, not a story machine \u2014 every post is whatever its writer needed it to be.',
    },
    {
        icon: Sparkles,
        title: 'Organized, never cluttered',
        body: 'Topics keep the archive tidy so readers can follow exactly the threads they care about, nothing more.',
    },
    {
        icon: MessageCircle,
        title: 'Real conversation, not noise',
        body: 'Comments are open to signed-in readers only \u2014 enough friction to keep the discussion worth having.',
    },
];

export default function Welcome() {
    const { name, auth } = usePage().props as any;
    const siteName = name ?? 'Inkwell';

    return (
        <>
            <Head title={`${siteName} \u2014 a place for things worth writing down`} />
            <div className="min-h-screen bg-background font-sans text-foreground antialiased">
                <div className="relative overflow-hidden">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_-10%,color-mix(in_oklab,var(--color-accent)_28%,transparent),transparent)]"
                    />
                    <header className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-7 sm:px-8">
                        <span className="flex items-center gap-2.5">
                            <span className="grid size-9 place-items-center rounded-full bg-primary font-display text-lg font-semibold text-primary-foreground">
                                {siteName?.[0] ?? 'I'}
                            </span>
                            <span className="font-display text-xl font-semibold tracking-tight">{siteName}</span>
                        </span>
                        <div className="flex items-center gap-3">
                            {auth?.user ? (
                                <Link
                                    href="/dashboard"
                                    className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/20 transition hover:-translate-y-0.5"
                                >
                                    Go to studio
                                </Link>
                            ) : (
                                <Link
                                    href="/login"
                                    className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition hover:border-primary hover:text-primary"
                                >
                                    Sign in
                                </Link>
                            )}
                            <Link
                                href={postsIndex()}
                                className="rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition hover:-translate-y-0.5"
                            >
                                Read the blog
                            </Link>
                        </div>
                    </header>

                    <main className="relative mx-auto max-w-6xl px-6 pb-24 pt-16 sm:px-8 lg:pt-24">
                        <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold tracking-wide text-primary uppercase">
                            <Sparkles className="size-3.5" />
                            An independent, no-noise publication
                        </p>

                        <h1 className="mt-8 max-w-3xl font-display text-6xl leading-[1.02] font-semibold tracking-tight sm:text-7xl">
                            Things worth
                            <br />
                            writing down<span className="text-primary">.</span>
                        </h1>

                        <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">
                            {siteName} is a small blog for essays, tutorials, opinions and honest notes.
                            Not everything here is a story &mdash; some of it is just useful. Pull up a chair.
                        </p>

                        <div className="mt-10 flex flex-wrap items-center gap-4">
                            <Link
                                href={postsIndex()}
                                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:-translate-y-0.5"
                            >
                                Browse the archive
                                <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Link>
                            {!auth?.user && (
                                <Link
                                    href="/register"
                                    className="text-sm font-semibold text-foreground/70 underline decoration-border decoration-2 underline-offset-4 transition hover:text-primary hover:decoration-primary"
                                >
                                    Create an account to comment
                                </Link>
                            )}
                        </div>

                        <div className="mt-24 grid gap-6 border-t border-border pt-12 sm:grid-cols-3">
                            {pillars.map((pillar) => {
                                const Icon = pillar.icon;
                                return (
                                    <div key={pillar.title}>
                                        <span className="grid size-11 place-items-center rounded-2xl bg-secondary text-primary">
                                            <Icon className="size-5" />
                                        </span>
                                        <h2 className="mt-5 font-display text-lg font-semibold">{pillar.title}</h2>
                                        <p className="mt-2 text-sm leading-6 text-muted-foreground">{pillar.body}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </main>
                </div>

                <footer className="border-t border-border px-6 py-8 text-center text-xs text-muted-foreground sm:px-8">
                    &copy; {new Date().getFullYear()} {siteName}. A blog, not a template.
                </footer>
            </div>
        </>
    );
}
