import { Head, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

interface Category {
    id: number;
    name: string;
}

interface Props {
    categories: Category[];
}

export default function Create({ categories }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        excerpt: '',
        content: '',
        category_id: categories[0]?.id?.toString() ?? '',
        cover_image: '',
        is_published: false,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post('/dashboard/posts');
    };

    return (
        <div className="mx-auto max-w-2xl px-6 py-12">
            <Head title="New Post" />
            <h1 className="mb-8 text-2xl font-bold">New Post</h1>

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
                    {errors.category_id && (
                        <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>
                    )}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">Cover image URL (optional)</label>
                    <input
                        type="text"
                        value={data.cover_image}
                        onChange={(e) => setData('cover_image', e.target.value)}
                        className="w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
                    />
                </div>

                <label className="flex items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        checked={data.is_published}
                        onChange={(e) => setData('is_published', e.target.checked)}
                    />
                    Publish now
                </label>

                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-lg bg-zinc-900 px-5 py-2 text-white disabled:opacity-50 dark:bg-white dark:text-zinc-900"
                >
                    {processing ? 'Saving...' : 'Create Post'}
                </button>
            </form>
        </div>
    );
}