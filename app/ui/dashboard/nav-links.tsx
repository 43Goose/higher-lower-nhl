'use client'

import { HomeIcon, FolderPlusIcon, ArrowPathIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { name: 'Home', href: '/dashboard', icon: HomeIcon },
    { name: 'Add Player', href: '/dashboard/add', icon: FolderPlusIcon },
    { name: 'Update Players', href: '/dashboard/update', icon: ArrowPathIcon },
];

// Nav links component for Side Navigation
export default function NavLinks() {
    const pathname = usePathname();
    return (
        <>
            {links.map(link => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={`flex h-[48px] grow flex-center gap-2 rounded-md ${pathname == link.href ? 'bg-cyan-600' : 'bg-slate-950'} xsm:p-3 xsm:px-8 text-sm font-medium hover:bg-slate-800 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 2xsm:px-2`}
                    >
                        <LinkIcon className="w-6" />
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
}