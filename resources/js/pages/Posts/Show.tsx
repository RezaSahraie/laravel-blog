import { Head, Link } from '@inertiajs/react';

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
            user: { id: number; name: string };
            created_at: string;
        }>;
    };
}

export default function Show({ post }: Props) {
    return (
        <>
            <Head title={post.title} />

            <div className="min-h-screen bg-[#0a0a0b]">
                {/* Cover Image */}
                {post.cover_image && (
                    <div className="relative h-96 w-full overflow-hidden">
                        <img
                            src={post.cover_image}
                            alt={post.title}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent" />
                    </div>
                )}

                <div className="mx-auto max-w-5xl px-6 py-16">
                    {/* Category & Date */}
                    <div className="mb-6 flex items-center gap-4 text-sm text-zinc-400">
                        <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
                            {post.category.name}
                        </span>
                        <span>
                            {post.published_at
                                ? new Date(post.published_at).toLocaleDateString('en-US', {
                                      month: 'long',
                                      day: 'numeric',
                                      year: 'numeric',
                                  })
                                : 'Draft'}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                        {post.title}
                    </h1>

                    {/* Author */}
                    <div className="mt-6 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-sm font-semibold text-white">
                            {post.user.name.charAt(0)}
                        </div>
                        <span className="font-medium text-zinc-300">{post.user.name}</span>
                    </div>

                    {/* Content */}
                    <div
                        className="prose prose-invert prose-lg mt-10 max-w-none space-y-6"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Comments */}
                    <div className="mt-20">
                        <h3 className="text-lg font-semibold text-white">Comments</h3>

                        {post.comments.length === 0 ? (
                            <p className="mt-4 text-zinc-500">No comments yet.</p>
                        ) : (
                            <div className="mt-6 space-y-8">
                                {post.comments.map((comment) => (
                                    <div key={comment.id} className="border-l border-violet-500/30 pl-6">
                                        <div className="flex items-center gap-3">
                                            <div className="text-sm font-medium text-violet-300">
                                                {comment.user.name}
                                            </div>
                                            <div className="text-xs text-zinc-500">
                                                {new Date(comment.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <p className="mt-2 text-zinc-300">{comment.body}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}