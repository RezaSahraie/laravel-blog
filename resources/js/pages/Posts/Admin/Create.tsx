import { Head, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import AppLayout from '@/layouts/app-layout';

interface Category {
    id: number;
    name: string;
}

interface Props {
    categories: Category[];
}

const field =
    'mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10';

export default function Create({ categories }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        excerpt: '',
        content: '',
        category_id: categories[0]?.id?.toString() ?? '',
        cover_image: null as File | null,
        is_published: false,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post('/dashboard/posts', { forceFormData: true });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'New post', href: '/dashboard/posts/create' }]}>
            <Head title="Create post" />
            <div className="min-h-full bg-secondary/30 p-5 sm:p-8">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-8">
                        <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">Publishing studio</p>
                        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">Create something worth reading.</h1>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Share an article, tutorial, opinion, review, or anything useful to your readers.
                        </p>
                    </div>
                    <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[1fr_320px]">
                        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
                            <label className="text-sm font-semibold">
                                Title
                                <input
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Give your idea a strong title"
                                    className={field}
                                />
                                {errors.title && <p className="mt-1 text-xs text-destructive">{errors.title}</p>}
                            </label>
                            <label className="mt-6 block text-sm font-semibold">
                                Summary
                                <textarea
                                    value={data.excerpt}
                                    onChange={(e) => setData('excerpt', e.target.value)}
                                    rows={3}
                                    placeholder="What will readers get from this article?"
                                    className={field}
                                />
                                {errors.excerpt && <p className="mt-1 text-xs text-destructive">{errors.excerpt}</p>}
                            </label>
                            <label className="mt-6 block text-sm font-semibold">
                                Article content
                                <textarea
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    rows={18}
                                    placeholder="Start writing your article..."
                                    className={field}
                                />
                                {errors.content && <p className="mt-1 text-xs text-destructive">{errors.content}</p>}
                            </label>
                        </div>
                        <aside className="space-y-5">
                            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                                <h2 className="font-display font-semibold">Publish settings</h2>
                                <label className="mt-5 block text-sm font-semibold">
                                    Category
                                    <select value={data.category_id} onChange={(e) => setData('category_id', e.target.value)} className={field}>
                                        {categories.map((c) => (
                                            <option key={c.id} value={c.id}>
                                                {c.name}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                <label className="mt-5 flex cursor-pointer items-center gap-3 rounded-2xl bg-secondary p-4 text-sm">
                                    <input
                                        type="checkbox"
                                        checked={data.is_published}
                                        onChange={(e) => setData('is_published', e.target.checked)}
                                        className="size-4 rounded accent-primary"
                                    />
                                    <span>
                                        <b className="block">Publish now</b>
                                        <small className="text-muted-foreground">Make this article visible immediately.</small>
                                    </span>
                                </label>
                                <button
                                    disabled={processing}
                                    className="mt-5 w-full rounded-2xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 disabled:opacity-50"
                                >
                                    {processing ? 'Publishing...' : data.is_published ? 'Publish article' : 'Save draft'}
                                </button>
                            </div>
                            <label className="block rounded-3xl border border-dashed border-border bg-card p-6 text-sm">
                                <b>Cover image</b>
                                <span className="mt-1 block text-xs text-muted-foreground">Optional visual for your article.</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setData('cover_image', e.target.files?.[0] ?? null)}
                                    className="mt-4 w-full text-xs text-muted-foreground file:mr-3 file:rounded-lg file:border-0 file:bg-secondary file:px-3 file:py-2 file:text-xs file:font-semibold"
                                />
                            </label>
                        </aside>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
