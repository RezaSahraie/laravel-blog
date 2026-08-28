import { Head, Link } from '@inertiajs/react';
import BlogLayout from '@/layouts/BlogLayout';
import { show as postsShow } from '@/routes/posts';

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

            <div className="mx-auto max-w-6xl px-6 py-16">
                {/* Header */}
                <div className="mb-12 max-w-2xl">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                        Articles
                    </h1>
                    <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
                        Thoughts on Laravel, React, Docker and building modern
                        applications.
                    </p>
                </div>

                {/* Posts Grid */}
                {posts.data.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-zinc-300 py-20 text-center dark:border-zinc-700">
                        <p className="text-zinc-500">
                            No articles published yet.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {posts.data.map((post) => (
                            <article
                                key={post.id}
                                className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
                            >
                                <div className="flex flex-1 flex-col p-6">
                                    {/* Category + Date */}
                                    <div className="mb-4 flex items-center justify-between text-sm">
                                        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                                            {post.category.name}
                                        </span>
                                        <time className="text-zinc-500 dark:text-zinc-400">
                                            {post.published_at
                                                ? new Date(
                                                      post.published_at,
                                                  ).toLocaleDateString(
                                                      'en-US',
                                                      {
                                                          month: 'short',
                                                          day: 'numeric',
                                                          year: 'numeric',
                                                      },
                                                  )
                                                : 'Draft'}
                                        </time>
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-xl leading-snug font-semibold tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                        <Link href={postsShow(post.slug)}>
                                            {post.title}
                                        </Link>
                                    </h2>

                                    {/* Excerpt */}
                                    <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                                        {post.excerpt}
                                    </p>

                                    {/* Footer */}
                                    <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-800">
                                        <span className="text-sm text-zinc-500 dark:text-zinc-400">
                                            {post.user.name}
                                        </span>
                                        <Link href={postsShow(post.slug)}
                                            className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                                        >
                                            Read →
                                        </Link>
                                    </div>
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
