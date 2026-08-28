import { Link } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import { index as postsIndex } from '@/routes/posts';

export default function BlogLayout({ children }: PropsWithChildren) {
    return <div className="min-h-screen bg-[#f4f1ea] text-[#171714] selection:bg-[#d9ff52] selection:text-black">
        <header className="sticky top-0 z-50 border-b-2 border-[#171714] bg-[#f4f1ea]/95 backdrop-blur-md"><div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-10"><Link href={postsIndex()} className="text-2xl font-black tracking-[-.08em]">READLY<span className="text-[#ff5a36]">/</span></Link><nav className="flex items-center gap-2"><Link href={postsIndex()} className="rounded-full px-4 py-2 text-xs font-black uppercase tracking-wider transition hover:bg-[#d9ff52]">All posts</Link><span className="hidden h-5 w-px bg-black/20 sm:block"/><span className="hidden text-xs font-bold text-black/45 sm:block">Good ideas, no noise.</span></nav></div></header>
        <main>{children}</main>
        <footer className="mt-24 border-t-2 border-[#171714] bg-[#171714] text-[#f4f1ea]"><div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-12 sm:px-10 md:flex-row md:items-end md:justify-between"><div><Link href={postsIndex()} className="text-3xl font-black tracking-[-.08em]">READLY<span className="text-[#ff7658]">/</span></Link><p className="mt-3 max-w-sm text-sm leading-6 text-white/45">A deliberately simple place for useful writing, sharp opinions and things worth remembering.</p></div><p className="text-xs font-bold uppercase tracking-wider text-white/30">© {new Date().getFullYear()} Readly</p></div></footer>
    </div>;
}
