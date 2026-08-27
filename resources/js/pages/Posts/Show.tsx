import { Head, Link } from '@inertiajs/react';
import BlogLayout from '@/layouts/BlogLayout';

interface Props {
    post: {
        id: number;
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        cover_image: string | null;
        published_at: string | null;
        user: { id: number; name: string };
        category: { id: number; name: string; slug: string };
        comments: Array<{
            id: number;
            body: string;
            user: { id: number; name: string } | null;
            created_at: string;
        }>;
    };
}

export default function Show({ post }: Props) {
    return (
        <BlogLayout>
            <Head title={post.title} />

            <article className="mx-auto max-w-3xl px-6 py-16">
                {/* Meta */}
                <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                    <Link
                        href="/posts"
                        className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 transition hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                    >
                        {post.category.name}
                    </Link>
                    <span>·</span>
                    <time>
                        {post.published_at
                            ? new Date(post.published_at).toLocaleDateString(
                                  'en-US',
                                  {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric',
                                  },
                              )
                            : 'Draft'}
                    </time>
                </div>

                {/* Title */}
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                    {post.title}
                </h1>

                {/* Author */}
                <div className="mt-8 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-sm font-medium text-white dark:bg-white dark:text-zinc-900">
                        {post.user.name.charAt(0)}
                    </div>
                    <div>
                        <p className="font-medium">{post.user.name}</p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Author
                        </p>
                    </div>
                </div>

                {/* Cover Image */}
                {post.cover_image && (
                    <div className="mt-10 overflow-hidden rounded-2xl">
                        <img
                            src={post.cover_image}
                            alt={post.title}
                            className="h-auto w-full object-cover"
                        />
                    </div>
                )}

                {/* Content */}
                <div
                    className="prose prose-zinc dark:prose-invert prose-headings:tracking-tight prose-a:text-blue-600 dark:prose-a:text-blue-400 mt-12 max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Comments */}
                <section className="mt-20 border-t border-zinc-200 pt-12 dark:border-zinc-800">
                    <h2 className="text-xl font-semibold">
                        Comments ({post.comments.length})
                    </h2>

                    {post.comments.length === 0 ? (
                        <p className="mt-6 text-zinc-500 dark:text-zinc-400">
                            No comments yet.
                        </p>
                    ) : (
                        <div className="mt-8 space-y-8">
                            {post.comments.map((comment) => (
                                <div key={comment.id} className="flex gap-4">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-sm font-medium dark:bg-zinc-700">
                                        {comment.user?.name?.charAt(0) ?? '?'}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">
                                                {comment.user?.name ??
                                                    'Anonymous'}
                                            </span>
                                            <span className="text-sm text-zinc-500 dark:text-zinc-400">
                                                {new Date(
                                                    comment.created_at,
                                                ).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="mt-1 text-zinc-700 dark:text-zinc-300">
                                            {comment.body}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Back link */}
                <div className="mt-16">
                    <Link
                        href="/posts"
                        className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                    >
                        ← Back to articles
                    </Link>
                </div>
            </article>
        </BlogLayout>
    );
}
