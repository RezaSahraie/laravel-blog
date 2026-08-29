import { Link, usePage } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSplitLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    const { name } = usePage().props;

    return (
        <div className="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-foreground p-10 text-background lg:flex">
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_120%,color-mix(in_oklab,var(--color-primary)_35%,transparent),transparent)]"
                />
                <Link
                    href={home()}
                    className="relative z-20 flex items-center gap-2 font-display text-lg font-semibold"
                >
                    <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground">
                        <AppLogoIcon className="size-5 fill-current" />
                    </span>
                    {name}
                </Link>
                <p className="relative z-20 mt-auto max-w-xs text-sm leading-6 text-background/60">
                    A calm, considered place to read and write.
                </p>
            </div>
            <div className="w-full lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <Link
                        href={home()}
                        className="relative z-20 flex items-center justify-center gap-2 lg:hidden"
                    >
                        <span className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground">
                            <AppLogoIcon className="size-5 fill-current" />
                        </span>
                        <span className="font-display text-lg font-semibold">{name}</span>
                    </Link>
                    <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center">
                        <h1 className="font-display text-xl font-semibold">{title}</h1>
                        <p className="text-sm text-balance text-muted-foreground">
                            {description}
                        </p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
