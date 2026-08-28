import { Head, Link } from '@inertiajs/react';
import { dashboard } from '@/routes';

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div>
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <p className="mt-1 text-zinc-600 dark:text-zinc-400">
                        Manage your blog content
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <Link
                        href="/dashboard/posts"
                        className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-zinc-300 hover:shadow dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
                    >
                        <h2 className="text-lg font-semibold">My Posts</h2>
                        <p className="mt-2 text-sm text-zinc-500">
                            Create, edit and delete your blog posts
                        </p>
                    </Link>

                    <Link
                        href="/posts"
                        className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-zinc-300 hover:shadow dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
                    >
                        <h2 className="text-lg font-semibold">View Blog</h2>
                        <p className="mt-2 text-sm text-zinc-500">
                            See the public blog page
                        </p>
                    </Link>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};