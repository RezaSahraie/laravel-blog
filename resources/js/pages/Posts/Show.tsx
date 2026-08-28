import { Head, Link, useForm, usePage } from '@inertiajs/react';
import BlogLayout from '@/layouts/BlogLayout';
import { index as postsIndex } from '@/routes/posts';
import { FormEvent } from 'react';

interface Props { post: { id:number; title:string; slug:string; excerpt:string; content:string; cover_image:string|null; published_at:string|null; user:{id:number;name:string}; category:{id:number;name:string;slug:string}; comments:Array<{id:number;body:string;user:{id:number;name:string}|null;created_at:string}>; }; }
export default function Show({ post }: Props) {
 const { auth } = usePage().props as any;
 const { data,setData,post:submit,processing,errors,reset }=useForm({body:''});
 const submitComment=(e:FormEvent)=>{e.preventDefault();submit(`/posts/${post.slug}/comments`,{onSuccess:()=>reset('body')});};
 return <BlogLayout><Head title={post.title}/><article className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20">
  <div className="mb-8 flex flex-wrap items-center gap-3 text-sm"><Link href={postsIndex()} className="rounded-full bg-cyan-50 px-3.5 py-1.5 text-xs font-bold text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-300">{post.category.name}</Link><span className="text-slate-400">•</span><time className="text-slate-500">{post.published_at?new Date(post.published_at).toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'}):'Draft'}</time></div>
  <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">{post.title}</h1>
  <p className="mt-6 max-w-3xl text-xl leading-8 text-slate-600 dark:text-slate-400">{post.excerpt}</p>
  <div className="mt-8 flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 font-bold text-slate-950">{post.user.name.charAt(0)}</div><div><p className="text-sm font-bold">{post.user.name}</p><p className="text-xs text-slate-500">Author</p></div></div>
  {post.cover_image&&<div className="mt-10 overflow-hidden rounded-3xl"><img src={post.cover_image} alt={post.title} className="h-auto w-full object-cover"/></div>}
  <div className="prose prose-slate dark:prose-invert prose-headings:font-bold prose-a:text-cyan-600 dark:prose-a:text-cyan-300 mt-12 max-w-none leading-8" dangerouslySetInnerHTML={{__html:post.content}}/>
  <section className="mt-20 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-white/10 dark:bg-white/[.035]"><h2 className="text-2xl font-black">Join the conversation <span className="text-slate-400">({post.comments.length})</span></h2>
   {auth?.user?<form onSubmit={submitComment} className="mt-6 space-y-3"><textarea value={data.body} onChange={e=>setData('body',e.target.value)} rows={4} placeholder="Share your thoughts..." className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10 dark:border-white/10 dark:bg-white/5"/>{errors.body&&<p className="text-sm text-red-600">{errors.body}</p>}<button disabled={processing} className="rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 disabled:opacity-50 dark:bg-white dark:text-slate-950">{processing?'Posting...':'Post comment'}</button></form>:<p className="mt-4 text-sm text-slate-500"><Link href="/login" className="font-bold text-cyan-600 dark:text-cyan-300">Sign in</Link> to leave a comment.</p>}
   <div className="mt-8 space-y-6">{post.comments.map(c=><div key={c.id} className="flex gap-3 border-t border-slate-100 pt-6 dark:border-white/10"><div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-100 text-sm font-bold dark:bg-white/10">{c.user?.name?.charAt(0)??'?'}</div><div><div className="flex flex-wrap items-center gap-2"><span className="text-sm font-bold">{c.user?.name??'Anonymous'}</span><span className="text-xs text-slate-400">{new Date(c.created_at).toLocaleDateString()}</span></div><p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{c.body}</p></div></div>)}</div>
  </section>
  <Link href={postsIndex()} className="mt-10 inline-flex text-sm font-bold text-cyan-600 dark:text-cyan-300">← Back to articles</Link>
 </article></BlogLayout>;
}
