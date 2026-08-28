import { Head, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

interface Category {
    id: number;
    name: string;
}

interface Post {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    category_id: number;
    cover_image: string | null;
    is_published: boolean;
}

interface Props {
    post: Post;
    categories: Category[];
}

export default function Edit({ post, categories }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category_id: post.category_id.toString(),
        cover_image: '',
        is_published: post.is_published,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        put(`/dashboard/posts/${post.id}`);
    };

    return (
        <div className="mx-auto max-w-2xl px-6 py-12">
            <Head title="Edit Post" />

            <h1 className="mb-8 text-2xl font-bold">Edit Post</h1>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <label className="mb-1 block text-sm font-medium">Title</label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className="w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
                    />
                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">Excerpt</label>
                    <textarea
                        value={data.excerpt}
                        onChange={(e) => setData('excerpt', e.target.value)}
                        rows={2}
                        className="w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
                    />
                    {errors.excerpt && <p className="mt-1 text-sm text-red-600">{errors.excerpt}</p>}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">Content</label>
                    <textarea
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                        rows={8}
                        className="w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
                    />
                    {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">Category</label>
                    <select
                        value={data.category_id}
                        onChange={(e) => setData('category_id', e.target.value)}
                        className="w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
                    >
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">Cover Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                setData('cover_image' as any, e.target.files[0]);
                            }
                        }}
                        className="block w-full text-sm text-zinc-500 file:mr-4 file:rounded-lg file:border-0 file:bg-zinc-900 file:px-4 file:py-2 file:text-white hover:file:bg-zinc-800 dark:file:bg-white dark:file:text-zinc-900"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="is_published"
                        checked={data.is_published}
                        onChange={(e) => setData('is_published', e.target.checked)}
                        className="rounded border-zinc-300"
                    />
                    <label htmlFor="is_published" className="text-sm">
                        Published
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full rounded-lg bg-zinc-900 px-5 py-2 text-white disabled:opacity-50 dark:bg-white dark:text-zinc-900"
                >
                    {processing ? 'Saving...' : 'Update Post'}
                </button>
            </form>
        </div>
    );
}