import { Head, useForm, router } from '@inertiajs/react';
import { FormEvent } from 'react';
import AppLayout from '@/layouts/app-layout';

interface Category { id:number; name:string; slug:string; posts_count:number; }
interface Props { categories: Category[]; }

export default function Index({ categories }: Props) {
    const { data,setData,post,processing,errors,reset } = useForm({ name:'' });
    const submit=(e:FormEvent)=>{e.preventDefault();post('/dashboard/categories',{onSuccess:()=>reset()});};
    const remove=(id:number)=>{if(confirm('Delete this category?')) router.delete(`/dashboard/categories/${id}`);};
    return <AppLayout breadcrumbs={[{title:'Categories',href:'/dashboard/categories'}]}>
        <Head title="Categories" />
        <div className="min-h-full bg-slate-50/70 p-5 dark:bg-slate-950 sm:p-8"><div className="mx-auto max-w-6xl space-y-8">
            <div><p className="text-xs font-black uppercase tracking-[.2em] text-cyan-600">Content system</p><h1 className="mt-2 text-3xl font-black tracking-tight">Categories</h1><p className="mt-2 text-sm text-slate-500">Organize your publishing topics and keep the blog easy to explore.</p></div>
            <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[.04]"><h2 className="text-lg font-black">New category</h2><p className="mt-1 text-sm text-slate-500">Give a topic a clear, memorable name.</p><form onSubmit={submit} className="mt-6 space-y-4"><input value={data.name} onChange={e=>setData('name',e.target.value)} placeholder="e.g. Laravel, Design, Career" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10 dark:border-white/10 dark:bg-white/5"/>{errors.name&&<p className="text-sm text-red-500">{errors.name}</p>}<button disabled={processing} className="w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 disabled:opacity-50 dark:bg-white dark:text-slate-950">{processing?'Creating...':'Create category'}</button></form></section>
                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[.04]"><h2 className="text-lg font-black">Your topics</h2><p className="mt-1 text-sm text-slate-500">{categories.length} categor{categories.length===1?'y':'ies'}</p><div className="mt-5 divide-y divide-slate-100 dark:divide-white/10">{categories.length===0?<p className="py-12 text-center text-sm text-slate-500">No categories yet.</p>:categories.map(cat=><div key={cat.id} className="flex items-center justify-between gap-4 py-4"><div className="min-w-0"><p className="truncate font-bold">{cat.name}</p><p className="mt-1 text-xs text-slate-400">/{cat.slug} · {cat.posts_count} post{cat.posts_count===1?'':'s'}</p></div><button onClick={()=>remove(cat.id)} disabled={cat.posts_count>0} className="rounded-xl px-3 py-2 text-xs font-bold text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-30 dark:hover:bg-red-500/10">Delete</button></div>)}</div></section>
            </div>
        </div></div>
    </AppLayout>;
}
