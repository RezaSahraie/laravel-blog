import { Link } from '@inertiajs/react';
import { FileText, Folder, LayoutGrid, Globe2 } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { dashboard } from '@/routes';

export function AppSidebar() {
    const items = [
        { title: 'Overview', href: dashboard(), icon: LayoutGrid },
        { title: 'Posts', href: '/dashboard/posts', icon: FileText },
        { title: 'Categories', href: '/dashboard/categories', icon: Folder },
        { title: 'View blog', href: '/posts', icon: Globe2 },
    ];
    return <Sidebar collapsible="icon" variant="inset">
        <SidebarHeader><SidebarMenu><SidebarMenuItem><SidebarMenuButton size="lg" asChild><Link href={dashboard()}><AppLogo /></Link></SidebarMenuButton></SidebarMenuItem></SidebarMenu></SidebarHeader>
        <SidebarContent><SidebarMenu className="gap-1 p-2">{items.map(item=>{const Icon=item.icon;return <SidebarMenuItem key={item.title}><SidebarMenuButton asChild tooltip={item.title}><Link href={item.href}><Icon/><span>{item.title}</span></Link></SidebarMenuButton></SidebarMenuItem>})}</SidebarMenu></SidebarContent>
        <SidebarFooter><NavUser /></SidebarFooter>
    </Sidebar>;
}
