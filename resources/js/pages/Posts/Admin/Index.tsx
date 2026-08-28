import { Head, Link, router } from '@inertiajs/react';
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
        if (confirm('Delete this post?')) {
            router.delete(`/dashboard/posts/${id}`);
        }
    };

    return (
        <div className="mx-auto max-w-5xl px-6 py-12">
            <Head title="My Posts" />

            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-2xl font-bold">My Posts</h1>
                <div className="flex gap-3">
                    <Link href={postsIndex()} className="text-sm text-zinc-600 hover:underline">
                        View blog
                    </Link>
                    <Link
                        href="/dashboard/posts/create"
                        className="rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white dark:bg-white dark:text-zinc-900"
                    >
                        New Post
                    </Link>
                </div>
            </div>

            {posts.data.length === 0 ? (
                <p className="text-zinc-500">No posts yet.</p>
            ) : (
                <div className="space-y-3">
                    {posts.data.map((post) => (
                        <div
                            key={post.id}
                            className="flex items-center justify-between rounded-xl border border-zinc-200 p-4 dark:border-zinc-800"
                        >
                            <div>
                                <p className="font-medium">{post.title}</p>
                                <p className="text-sm text-zinc-500">
                                    {post.category.name} ·{' '}
                                    {post.is_published ? 'Published' : 'Draft'}
                                </p>
                            </div>
                            <div className="flex gap-3 text-sm">
                                <Link
                                    href={`/dashboard/posts/${post.id}/edit`}
                                    className="text-blue-600 hover:underline"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => destroy(post.id)}
                                    className="text-red-600 hover:underline"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}