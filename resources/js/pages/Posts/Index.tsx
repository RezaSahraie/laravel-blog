import { Head, Link } from '@inertiajs/react';
import BlogLayout from '@/layouts/BlogLayout';
import { show as postsShow } from '@/routes/posts';

interface User { id: number; name: string; }
interface Category { id: number; name: string; slug: string; }
interface Post { id: number; title: string; slug: string; excerpt: string; published_at: string | null; user: User; category: Category; }
interface PaginatedPosts { data: Post[]; current_page: number; last_page: number; links: { url: string | null; label: string; active: boolean }[]; }
interface Props { posts: PaginatedPosts; }

export default function Index({ posts }: Props) {
    return <BlogLayout><Head title="Articles" />
        <section className="mx-auto max-w-7xl px-5 pb-8 pt-16 sm:px-8 sm:pt-20">
            <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-cyan-700 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300"><span className="h-1.5 w-1.5 rounded-full bg-cyan-500" /> Curated stories</span>
                <h1 className="mt-6 text-5xl font-black tracking-tight sm:text-6xl">Ideas worth <span className="bg-gradient-to-r from-cyan-500 to-violet-500 bg-clip-text text-transparent">reading.</span></h1>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">Practical notes, technical deep dives, and perspectives on building better software.</p>
            </div>
        </section>
        <section className="mx-auto max-w-7xl px-5 pb-12 sm:px-8">
            {posts.data.length === 0 ? <div className="rounded-3xl border border-dashed border-slate-300 bg-white/60 py-24 text-center dark:border-white/10 dark:bg-white/[.03]"><p className="text-slate-500">No articles published yet.</p></div> :
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {posts.data.map((post, index) => <article key={post.id} className={`group flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-900/10 dark:border-white/10 dark:bg-white/[.045] ${index === 0 ? 'lg:col-span-2' : ''}`}>
                    <div className={`relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-violet-950 ${index === 0 ? 'h-64' : 'h-44'}`}><div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(34,211,238,.35),transparent_30%),radial-gradient(circle_at_20%_80%,rgba(139,92,246,.35),transparent_32%)]" /><div className="absolute bottom-5 left-5 right-5 flex items-end justify-between"><span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">{post.category.name}</span><span className="text-xs font-medium text-white/60">{post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Draft'}</span></div></div>
                    <div className="flex flex-1 flex-col p-6 sm:p-7"><h2 className={`${index === 0 ? 'text-2xl sm:text-3xl' : 'text-xl'} font-bold leading-tight tracking-tight`}><Link href={postsShow(post.slug)} className="transition group-hover:text-cyan-600 dark:group-hover:text-cyan-300">{post.title}</Link></h2><p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-400">{post.excerpt}</p><div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs dark:border-white/10"><span className="font-semibold text-slate-600 dark:text-slate-300">{post.user.name}</span><Link href={postsShow(post.slug)} className="font-bold text-cyan-600 dark:text-cyan-300">Read story →</Link></div></div>
                </article>)}
            </div>}
            {posts.last_page > 1 && <div className="mt-12 flex justify-center gap-2">{posts.links.map((link, index) => <Link key={index} href={link.url || '#'} dangerouslySetInnerHTML={{ __html: link.label }} className={`flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm font-semibold transition ${link.active ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950' : 'text-slate-600 hover:bg-white dark:text-slate-400 dark:hover:bg-white/5'} ${!link.url ? 'pointer-events-none opacity-30' : ''}`} />)}</div>}
        </section>
    </BlogLayout>;
}
