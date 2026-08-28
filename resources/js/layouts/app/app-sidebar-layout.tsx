import type { AppLayoutProps } from '@/types';
import { Link } from '@inertiajs/react';

export default function AppSidebarLayout({ children }: AppLayoutProps) {
    return <div className="min-h-screen bg-[#111318] text-[#f5f5f0]"><header className="sticky top-0 z-50 border-b border-white/10 bg-[#111318]/95 backdrop-blur-xl"><div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-10"><Link href="/dashboard" className="text-xl font-black tracking-[-.06em]">STUDIO<span className="text-[#d9ff52]">/</span></Link><nav className="flex items-center gap-2"><Link href="/dashboard/posts" className="rounded-full px-4 py-2 text-xs font-bold text-white/60 hover:bg-white/10 hover:text-white">Posts</Link><Link href="/dashboard/categories" className="rounded-full px-4 py-2 text-xs font-bold text-white/60 hover:bg-white/10 hover:text-white">Categories</Link><Link href="/posts" className="ml-2 rounded-full border border-white/15 px-4 py-2 text-xs font-bold hover:bg-white hover:text-black">View site ↗</Link></nav></div></header><main>{children}</main></div>;
}
