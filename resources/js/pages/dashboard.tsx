import { Head, Link } from '@inertiajs/react';
import { FileText, Folder } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={[{ title: 'Overview', href: '/dashboard' }]}>
            <Head title="Overview" />
            <div className="min-h-full bg-secondary/30 p-5 sm:p-8">
                <div className="mx-auto max-w-6xl space-y-8">
                    <div className="rounded-3xl bg-foreground p-7 text-background shadow-xl sm:p-10">
                        <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">Creator workspace</p>
                        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Your publishing studio.</h1>
                        <p className="mt-3 max-w-2xl text-sm leading-6 text-background/70">
                            Write, organize, and publish ideas without getting buried in a complicated CMS.
                        </p>
                        <div className="mt-7 flex flex-wrap gap-3">
                            <Link
                                href="/dashboard/posts/create"
                                className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5"
                            >
                                Create a post
                            </Link>
                            <Link href="/posts" className="rounded-xl border border-background/15 bg-background/5 px-5 py-3 text-sm font-semibold text-background">
                                Preview blog
                            </Link>
                        </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        <Link
                            href="/dashboard/posts"
                            className="group rounded-3xl border border-border bg-card p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                        >
                            <span className="grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                                <FileText className="size-5" />
                            </span>
                            <h2 className="mt-4 font-display text-2xl font-semibold">Manage posts</h2>
                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                Create drafts, publish articles, edit existing content, and keep your library organized.
                            </p>
                            <span className="mt-6 inline-block text-sm font-semibold text-primary transition group-hover:translate-x-1">
                                Open posts &rarr;
                            </span>
                        </Link>
                        <Link
                            href="/dashboard/categories"
                            className="group rounded-3xl border border-border bg-card p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                        >
                            <span className="grid size-11 place-items-center rounded-2xl bg-accent/15 text-accent-foreground">
                                <Folder className="size-5" />
                            </span>
                            <h2 className="mt-4 font-display text-2xl font-semibold">Manage categories</h2>
                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                Build meaningful topic collections so readers can discover exactly what interests them.
                            </p>
                            <span className="mt-6 inline-block text-sm font-semibold text-primary transition group-hover:translate-x-1">
                                Open categories &rarr;
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
