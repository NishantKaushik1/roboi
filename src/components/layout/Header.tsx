'use client';

import { useState, useEffect } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { HiUser, HiArrowRightOnRectangle, HiMoon, HiSun } from 'react-icons/hi2';

export default function Header({
    // logoUrl = '/nayara-logo.png',
    title = 'Nayara Admin Side',
    subtitle = 'Video Analytics · 7,000+ Pumps · Real-Time AI',
    user = { name: 'Admin User', email: 'admin@nayara.com', avatar: null }
}) {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        // On mount, check localStorage or system preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
            if (savedTheme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        if (theme === 'dark') {
            setTheme('light');
            localStorage.setItem('theme', 'light');
            document.documentElement.classList.remove('dark');
        } else {
            setTheme('dark');
            localStorage.setItem('theme', 'dark');
            document.documentElement.classList.add('dark');
        }
    };

    return (
        <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            {/* Left: Logo & Title */}
            <div className="flex items-center gap-4">
                {/* Logo Placeholder */}
                <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-50">
                    {/* Replace with <Image /> when asset is available */}
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-green-400" />
                </div>

                <div className="flex flex-col">
                    <h1 className="text-sm font-bold text-blue-900 dark:text-white">{title}</h1>
                    <span className="text-xs text-[#595959] dark:text-[#8C8C8C]">{subtitle}</span>
                </div>
            </div>

            {/* Right: Profile Dropdown */}
            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                    <button className="flex items-center gap-3 rounded-full outline-none hover:bg-gray-50 dark:hover:bg-gray-800 p-1 pr-2 transition-colors">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                            <HiUser className="h-5 w-5" />
                        </div>
                        {/* <HiChevronDown className="h-4 w-4 text-[#8C8C8C]" /> */}
                    </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                    <DropdownMenu.Content
                        className="z-50 min-w-[200px] rounded-lg border border-gray-200 bg-white p-2 shadow-lg animate-in fade-in-80 data-[side=bottom]:slide-in-from-top-2 dark:border-gray-800 dark:bg-gray-900"
                        sideOffset={5}
                        align="end"
                    >
                        <div className="px-2 py-1.5">
                            <p className="text-sm font-medium text-[#1C2347] dark:text-white">{user.name}</p>
                            <p className="text-xs text-[#595959] truncate">{user.email}</p>
                        </div>

                        <DropdownMenu.Separator className="my-1 h-px bg-gray-100 dark:bg-gray-800" />

                        <DropdownMenu.Item className="flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-2 text-sm text-gray-700 outline-none hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
                            <HiUser className="h-4 w-4" />
                            Profile Details
                        </DropdownMenu.Item>

                        <DropdownMenu.Item
                            className="flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-2 text-sm text-gray-700 outline-none hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                            onSelect={(e) => {
                                e.preventDefault();
                                toggleTheme();
                            }}
                        >
                            {theme === 'dark' ? <HiSun className="h-4 w-4" /> : <HiMoon className="h-4 w-4" />}
                            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                        </DropdownMenu.Item>

                        <DropdownMenu.Separator className="my-1 h-px bg-gray-100 dark:bg-gray-800" />

                        <DropdownMenu.Item className="flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-2 text-sm text-red-600 outline-none hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20">
                            <HiArrowRightOnRectangle className="h-4 w-4" />
                            Sign Out
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        </header>
    );
}
