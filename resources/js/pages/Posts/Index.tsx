import { Head, Link } from '@inertiajs/react';

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
    cover_image: string | null;
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
        <>
            <Head title="Blog" />

            <div className="min-h-screen bg-[#0a0a0b] text-white">
                {/* Hero Header */}
                <div className="relative overflow-hidden border-b border-white/10">
                    <div className="absolute inset-0 bg-gradient-to-b from-violet-950/40 via-transparent to-transparent"></div>
                    <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
                        <div className="max-w-2xl">
                            <p className="mb-4 text-sm font-medium tracking-widest text-violet-400 uppercase">
                                The Blog
                            </p>
                            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                                Ideas worth<br />
                                <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                                    sharing
                                </span>
                            </h1>
                            <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
                                Deep dives, tutorials, and thoughts on building modern products.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Posts */}
                <div className="mx-auto max-w-6xl px-6 py-16">
                    {posts.data.length === 0 ? (
                        <div className="py-32 text-center">
                            <p className="text-zinc-500 text-lg">No posts published yet.</p>
                        </div>
                    ) : (
                        <div className="grid gap-6">
                            {posts.data.map((post, index) => (
                                <Link
                                    key={post.id}
                                    href={`/posts/${post.slug}`}
                                    className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 transition-all duration-500 hover:border-violet-500/40 hover:bg-zinc-900"
                                >
                                    <div className="flex flex-col md:flex-row">
                                        {/* Content */}
                                        <div className="flex flex-1 flex-col justify-between p-8 md:p-10">
                                            <div>
                                                <div className="mb-5 flex items-center gap-4">
                                                    <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
                                                        {post.category.name}
                                                    </span>
                                                    <span className="text-sm text-zinc-500">
                                                        {post.published_at
                                                            ? new Date(post.published_at).toLocaleDateString('en-US', {
                                                                  month: 'short',
                                                                  day: 'numeric',
                                                                  year: 'numeric',
                                                              })
                                                            : 'Draft'}
                                                    </span>
                                                </div>

                                                <h2 className="text-2xl font-semibold leading-snug tracking-tight text-white transition-colors group-hover:text-violet-300 md:text-3xl">
                                                    {post.title}
                                                </h2>

                                                <p className="mt-4 line-clamp-2 text-zinc-400 leading-relaxed">
                                                    {post.excerpt}
                                                </p>
                                            </div>

                                            <div className="mt-8 flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-sm font-semibold text-white">
                                                        {post.user.name.charAt(0)}
                                                    </div>
                                                    <span className="text-sm font-medium text-zinc-300">
                                                        {post.user.name}
                                                    </span>
                                                </div>

                                                <span className="flex items-center gap-2 text-sm font-medium text-zinc-400 transition-all group-hover:translate-x-1 group-hover:text-violet-300">
                                                    Read more
                                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
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
                                    className={`flex h-10 min-w-[40px] items-center justify-center rounded-lg px-3 text-sm font-medium transition-colors ${
                                        link.active
                                            ? 'bg-violet-600 text-white'
                                            : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'
                                    } ${!link.url ? 'pointer-events-none opacity-40' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}