import { Head, Link } from '@inertiajs/react';
import BlogLayout from '@/layouts/BlogLayout';

interface User {
    id: number;
    name: string;
}

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    published_at: string | null;
    user: User;
    category: Category;
}

interface PaginatedPosts {
    data: Post[];
    current_page: number;
    last_page: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

interface Props {
    posts: PaginatedPosts;
}

export default function Index({ posts }: Props) {
    return (
        <BlogLayout>
            <Head title="Articles" />

            <div className="mx-auto max-w-5xl px-6 py-16">
                {/* Page Header */}
                <div className="mb-14 max-w-2xl">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                        Articles
                    </h1>
                    <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
                        Thoughts on Laravel, React, Docker and building modern applications.
                    </p>
                </div>

                {/* Posts */}
                {posts.data.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-zinc-300 py-20 text-center dark:border-zinc-700">
                        <p className="text-zinc-500">No articles published yet.</p>
                    </div>
                ) : (
                    <div className="space-y-10">
                        {posts.data.map((post) => (
                            <article key={post.id} className="group">
                                <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                                    <span className="font-medium text-zinc-700 dark:text-zinc-300">
                                        {post.category.name}
                                    </span>
                                    <span>·</span>
                                    <time>
                                        {post.published_at
                                            ? new Date(post.published_at).toLocaleDateString('en-US', {
                                                  year: 'numeric',
                                                  month: 'long',
                                                  day: 'numeric',
                                              })
                                            : 'Draft'}
                                    </time>
                                </div>

                                <h2 className="mt-3 text-2xl font-semibold tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                    <Link href={`/posts/${post.slug}`}>
                                        {post.title}
                                    </Link>
                                </h2>

                                <p className="mt-3 line-clamp-2 text-zinc-600 dark:text-zinc-400">
                                    {post.excerpt}
                                </p>

                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-sm text-zinc-500">
                                        By {post.user.name}
                                    </span>
                                    <Link
                                        href={`/posts/${post.slug}`}
                                        className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                                    >
                                        Read more →
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {posts.last_page > 1 && (
                    <div className="mt-16 flex justify-center gap-2">
                        {posts.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                className={`flex h-10 min-w-10 items-center justify-center rounded-lg px-3 text-sm font-medium transition ${
                                    link.active
                                        ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                                        : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800'
                                } ${!link.url ? 'pointer-events-none opacity-40' : ''}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </BlogLayout>
    );
}