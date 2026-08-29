import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { FormEvent } from 'react';
import BlogLayout from '@/layouts/BlogLayout';
import { index as postsIndex } from '@/routes/posts';

interface Comment {
    id: number;
    body: string;
    created_at: string;
    user: { name: string } | null;
}

interface Props {
    post: {
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        cover_image_url: string | null;
        published_at: string | null;
        user: { name: string };
        category: { name: string };
        comments: Comment[];
    };
}

function formatDate(value: string | null, options: Intl.DateTimeFormatOptions) {
    if (!value) return 'Draft';
    return new Date(value).toLocaleDateString('en-US', options);
}

export default function Show({ post }: Props) {
    const { auth } = usePage().props as any;
    const { data, setData, post: send, processing, errors, reset } = useForm({ body: '' });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        send(`/posts/${post.slug}/comments`, { onSuccess: () => reset() });
    };

    return (
        <BlogLayout>
            <Head title={post.title} />

            <div className="border-b border-border bg-secondary/40">
                <article className="mx-auto max-w-3xl px-6 py-14 sm:px-8 sm:py-20">
                    <Link
                        href={postsIndex()}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-primary uppercase"
                    >
                        <ArrowLeft className="size-3.5" />
                        Back to stories
                    </Link>

                    <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-semibold tracking-wide uppercase">
                        <span className="rounded-full bg-accent/10 px-3 py-1.5 text-accent">{post.category.name}</span>
                        <span className="text-muted-foreground">
                            {formatDate(post.published_at, { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                    </div>

                    <h1 className="mt-6 font-display text-4xl leading-[1.08] font-semibold tracking-tight sm:text-6xl">{post.title}</h1>
                    <p className="mt-6 text-xl leading-8 text-muted-foreground">{post.excerpt}</p>

                    <div className="mt-8 flex items-center gap-3 border-t border-border pt-6">
                        <div className="grid size-10 place-items-center rounded-full bg-primary font-display text-sm font-semibold text-primary-foreground">
                            {post.user.name[0]}
                        </div>
                        <span className="text-sm font-semibold">{post.user.name}</span>
                    </div>
                </article>
            </div>

            <article className="mx-auto max-w-3xl px-6 py-14 sm:px-8">
                {post.cover_image_url && (
                    <img src={post.cover_image_url} alt="" className="-mt-24 w-full rounded-3xl border border-border shadow-lg sm:-mt-28" />
                )}

                <div
                    className="prose prose-lg mt-8 max-w-none leading-8 text-foreground prose-headings:font-display prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-strong:text-foreground"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <section className="mt-20 border-t border-border pt-10">
                    <h2 className="flex items-center gap-2 font-display text-2xl font-semibold">
                        <MessageCircle className="size-5 text-primary" />
                        Comments <span className="text-muted-foreground">{post.comments.length}</span>
                    </h2>

                    {auth?.user ? (
                        <form onSubmit={submit} className="mt-6">
                            <textarea
                                value={data.body}
                                onChange={(e) => setData('body', e.target.value)}
                                rows={4}
                                placeholder="Add something thoughtful..."
                                className="w-full rounded-2xl border border-border bg-card px-4 py-4 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                            />
                            {errors.body && <p className="mt-2 text-sm text-destructive">{errors.body}</p>}
                            <button
                                disabled={processing}
                                className="mt-3 rounded-full bg-primary px-6 py-3 text-xs font-semibold tracking-wide text-primary-foreground uppercase transition hover:-translate-y-0.5 disabled:opacity-50"
                            >
                                {processing ? 'Posting...' : 'Post comment'}
                            </button>
                        </form>
                    ) : (
                        <div className="mt-6 rounded-2xl border border-border bg-secondary/50 p-5 text-sm font-medium">
                            Want to join the conversation?{' '}
                            <Link href="/login" className="font-semibold text-primary underline underline-offset-4">
                                Sign in to comment.
                            </Link>
                        </div>
                    )}

                    <div className="mt-8 space-y-6">
                        {post.comments.map((c) => (
                            <div key={c.id} className="border-b border-border pb-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-semibold">{c.user?.name ?? 'Reader'}</span>
                                    <span className="text-xs text-muted-foreground">{new Date(c.created_at).toLocaleDateString()}</span>
                                </div>
                                <p className="mt-2 text-sm leading-6 text-muted-foreground">{c.body}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </article>
        </BlogLayout>
    );
}
