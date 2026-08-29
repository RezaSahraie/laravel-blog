import { Head, useForm, router } from '@inertiajs/react';
import { Folder, Plus, Trash2 } from 'lucide-react';
import { FormEvent } from 'react';
import AppLayout from '@/layouts/app-layout';

interface Category {
    id: number;
    name: string;
    slug: string;
    posts_count: number;
}

interface Props {
    categories: Category[];
}

export default function Index({ categories }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({ name: '' });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post('/dashboard/categories', { onSuccess: () => reset() });
    };

    const remove = (id: number) => {
        if (confirm('Delete this category?')) router.delete(`/dashboard/categories/${id}`);
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Categories', href: '/dashboard/categories' }]}>
            <Head title="Categories" />
            <div className="min-h-full bg-secondary/30 p-5 sm:p-8">
                <div className="mx-auto max-w-6xl space-y-8">
                    <div>
                        <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">Content system</p>
                        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">Categories</h1>
                        <p className="mt-2 text-sm text-muted-foreground">Organize your publishing topics and keep the blog easy to explore.</p>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
                        <section className="h-fit rounded-3xl border border-border bg-card p-6 shadow-sm">
                            <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
                                <Plus className="size-4 text-primary" />
                                New category
                            </h2>
                            <p className="mt-1 text-sm text-muted-foreground">Give a topic a clear, memorable name.</p>
                            <form onSubmit={submit} className="mt-6 space-y-4">
                                <input
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="e.g. Laravel, Design, Career"
                                    className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                                />
                                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                                <button
                                    disabled={processing}
                                    className="w-full rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 disabled:opacity-50"
                                >
                                    {processing ? 'Creating...' : 'Create category'}
                                </button>
                            </form>
                        </section>

                        <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                            <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
                                <Folder className="size-4 text-primary" />
                                Your topics
                            </h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                {categories.length} categor{categories.length === 1 ? 'y' : 'ies'}
                            </p>
                            <div className="mt-5 divide-y divide-border">
                                {categories.length === 0 ? (
                                    <p className="py-12 text-center text-sm text-muted-foreground">No categories yet.</p>
                                ) : (
                                    categories.map((cat) => (
                                        <div key={cat.id} className="flex items-center justify-between gap-4 py-4">
                                            <div className="min-w-0">
                                                <p className="truncate font-semibold">{cat.name}</p>
                                                <p className="mt-1 text-xs text-muted-foreground">
                                                    /{cat.slug} &middot; {cat.posts_count} post{cat.posts_count === 1 ? '' : 's'}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => remove(cat.id)}
                                                disabled={cat.posts_count > 0}
                                                title={cat.posts_count > 0 ? 'Move or delete its posts first' : 'Delete category'}
                                                className="grid size-9 shrink-0 place-items-center rounded-xl text-destructive transition hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-30"
                                            >
                                                <Trash2 className="size-4" />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
