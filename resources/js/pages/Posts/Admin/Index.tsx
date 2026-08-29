import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { index as postsIndex } from '@/routes/posts';

interface Post {
    id: number;
    title: string;
    slug: string;
    is_published: boolean;
    published_at: string | null;
    category: { id: number; name: string };
}

interface Props {
    posts: {
        data: Post[];
        links: { url: string | null; label: string; active: boolean }[];
        last_page: number;
    };
}

export default function AdminIndex({ posts }: Props) {
    const destroy = (id: number) => {
        if (confirm('Delete this post? This cannot be undone.')) {
            router.delete(`/dashboard/posts/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Posts', href: '/dashboard/posts' }]}>
            <Head title="My posts" />
            <div className="min-h-full bg-secondary/30 p-5 sm:p-8">
                <div className="mx-auto max-w-5xl space-y-8">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                        <div>
                            <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">Publishing studio</p>
                            <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">My posts</h1>
                            <p className="mt-2 text-sm text-muted-foreground">Everything you've written, drafts and published alike.</p>
                        </div>
                        <div className="flex gap-3">
                            <Link
                                href={postsIndex()}
                                className="rounded-full border border-border px-4 py-2.5 text-sm font-semibold transition hover:border-primary hover:text-primary"
                            >
                                View blog
                            </Link>
                            <Link
                                href="/dashboard/posts/create"
                                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/20 transition hover:-translate-y-0.5"
                            >
                                <Plus className="size-4" />
                                New post
                            </Link>
                        </div>
                    </div>

                    {posts.data.length === 0 ? (
                        <div className="rounded-3xl border border-dashed border-border bg-card p-16 text-center">
                            <p className="font-display text-xl font-semibold">No posts yet.</p>
                            <p className="mt-2 text-sm text-muted-foreground">Start writing your first story for the blog.</p>
                            <Link
                                href="/dashboard/posts/create"
                                className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
                            >
                                Create a post
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
                            <div className="divide-y divide-border">
                                {posts.data.map((post) => (
                                    <div key={post.id} className="flex items-center justify-between gap-4 p-5 sm:p-6">
                                        <div className="min-w-0">
                                            <p className="truncate font-display font-semibold">{post.title}</p>
                                            <div className="mt-1.5 flex items-center gap-2 text-xs text-muted-foreground">
                                                <span>{post.category.name}</span>
                                                <span>&middot;</span>
                                                <span
                                                    className={
                                                        post.is_published
                                                            ? 'inline-flex items-center gap-1 font-semibold text-primary'
                                                            : 'inline-flex items-center gap-1 font-semibold text-muted-foreground'
                                                    }
                                                >
                                                    <span className={`size-1.5 rounded-full ${post.is_published ? 'bg-primary' : 'bg-muted-foreground'}`} />
                                                    {post.is_published ? 'Published' : 'Draft'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex shrink-0 items-center gap-1">
                                            <Link
                                                href={`/dashboard/posts/${post.id}/edit`}
                                                className="grid size-9 place-items-center rounded-xl text-foreground/70 transition hover:bg-secondary hover:text-primary"
                                                title="Edit"
                                            >
                                                <Pencil className="size-4" />
                                            </Link>
                                            <button
                                                onClick={() => destroy(post.id)}
                                                className="grid size-9 place-items-center rounded-xl text-destructive transition hover:bg-destructive/10"
                                                title="Delete"
                                            >
                                                <Trash2 className="size-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {posts.last_page > 1 && (
                        <div className="flex flex-wrap justify-center gap-2">
                            {posts.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url || '#'}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                                        link.active ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary hover:text-primary'
                                    } ${!link.url ? 'pointer-events-none opacity-30' : ''}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
