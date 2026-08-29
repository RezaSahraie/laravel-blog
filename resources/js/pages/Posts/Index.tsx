import { Head, Link } from '@inertiajs/react';
import { ArrowUpRight } from 'lucide-react';
import BlogLayout from '@/layouts/BlogLayout';
import { show as postsShow } from '@/routes/posts';

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    published_at: string | null;
    cover_image_url: string | null;
    user: { name: string };
    category: { name: string };
}

interface PageLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    posts: {
        data: Post[];
        current_page: number;
        last_page: number;
        links: PageLink[];
    };
}

function formatDate(value: string | null) {
    if (!value) return 'Draft';
    return new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function Index({ posts }: Props) {
    const [featured, ...rest] = posts.data;
    const isFirstPage = posts.current_page === 1;
    const showFeatured = isFirstPage && featured;
    const gridPosts = showFeatured ? rest : posts.data;

    return (
        <BlogLayout>
            <Head title="Latest stories" />
            <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8 sm:py-20">
                <div className="flex flex-col justify-between gap-6 border-b border-border pb-10 md:flex-row md:items-end">
                    <div>
                        <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">The archive</p>
                        <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight sm:text-6xl">
                            Latest stories<span className="text-primary">.</span>
                        </h1>
                        <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
                            Ideas, guides, reviews and honest opinions &mdash; pick something interesting and stay a while.
                        </p>
                    </div>
                </div>

                {posts.data.length === 0 ? (
                    <div className="py-32 text-center">
                        <p className="font-display text-2xl font-semibold">Nothing published yet.</p>
                        <p className="mt-2 text-sm text-muted-foreground">Check back soon &mdash; the first story is on its way.</p>
                    </div>
                ) : (
                    <>
                        {showFeatured && (
                            <Link
                                href={postsShow(featured.slug)}
                                className="group mt-12 grid gap-8 overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition hover:shadow-lg lg:grid-cols-2"
                            >
                                <div className="aspect-[16/10] overflow-hidden bg-secondary lg:aspect-auto">
                                    {featured.cover_image_url ? (
                                        <img
                                            src={featured.cover_image_url}
                                            alt=""
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="grid h-full min-h-64 place-items-center font-display text-4xl font-semibold text-primary/30">
                                            {featured.category.name}
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col justify-center p-8 sm:p-10">
                                    <div className="flex items-center gap-3 text-xs font-semibold tracking-wide uppercase">
                                        <span className="rounded-full bg-accent/10 px-3 py-1 text-accent">{featured.category.name}</span>
                                        <span className="text-muted-foreground">{formatDate(featured.published_at)}</span>
                                    </div>
                                    <h2 className="mt-5 font-display text-3xl leading-tight font-semibold tracking-tight transition group-hover:text-primary sm:text-4xl">
                                        {featured.title}
                                    </h2>
                                    <p className="mt-4 line-clamp-3 text-sm leading-6 text-muted-foreground">{featured.excerpt}</p>
                                    <div className="mt-6 flex items-center justify-between">
                                        <span className="text-xs font-semibold text-muted-foreground">By {featured.user.name}</span>
                                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                                            Read story
                                            <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        )}

                        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                            {gridPosts.map((post) => (
                                <article key={post.id} className="group flex flex-col">
                                    <Link href={postsShow(post.slug)} className="block overflow-hidden rounded-2xl border border-border bg-secondary">
                                        <div className="aspect-[4/3] overflow-hidden">
                                            {post.cover_image_url ? (
                                                <img
                                                    src={post.cover_image_url}
                                                    alt=""
                                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="grid h-full place-items-center font-display text-2xl font-semibold text-primary/25">
                                                    {post.category.name}
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                    <div className="mt-4 flex items-center gap-3 text-[11px] font-semibold tracking-wide uppercase">
                                        <span className="text-primary">{post.category.name}</span>
                                        <span className="text-muted-foreground">{formatDate(post.published_at)}</span>
                                    </div>
                                    <h2 className="mt-3 font-display text-xl leading-snug font-semibold tracking-tight">
                                        <Link href={postsShow(post.slug)} className="transition group-hover:text-primary">
                                            {post.title}
                                        </Link>
                                    </h2>
                                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
                                    <span className="mt-3 text-xs font-semibold text-muted-foreground">By {post.user.name}</span>
                                </article>
                            ))}
                        </div>
                    </>
                )}

                {posts.last_page > 1 && (
                    <div className="mt-16 flex flex-wrap justify-center gap-2">
                        {posts.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url || '#'}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                                    link.active
                                        ? 'border-primary bg-primary text-primary-foreground'
                                        : 'border-border hover:border-primary hover:text-primary'
                                } ${!link.url ? 'pointer-events-none opacity-30' : ''}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </BlogLayout>
    );
}
