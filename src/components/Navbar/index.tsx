'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

import {
    HouseSimple,
    Briefcase,
    GraduationCap,
    LightbulbFilament,
    UserCircle,
    GithubLogo,
    InstagramLogo,
    LinkedinLogo,
    Sun,
    Moon
  } from '@phosphor-icons/react';

type NavItem = {
    id: string;
    label: string;
    icon: React.ElementType | null;
    path: string | null;
    type?: string;
};

const navItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: HouseSimple, path: '/' },
    { id: 'experience', label: 'Experience', icon: Briefcase, path: '/experience' },
    { id: 'education', label: 'Education', icon: GraduationCap, path: '/education' },
    { id: 'projects', label: 'Projects', icon: LightbulbFilament, path: '/projects' },
    { id: 'contact', label: 'Contact', icon: UserCircle, path: '/contact' },
    { id: 'separator-1', label: 'separator-1', type: 'separator', icon: null, path: null },
    { id: 'github', label: 'Github', icon: GithubLogo, path: 'https://github.com/imdhruv99' },
    { id: 'instagram', label: 'Instagram', icon: InstagramLogo, path: 'https://www.instagram.com/_imdhruv99_/' },
    { id: 'linkedin', label: 'LinkedIn', icon: LinkedinLogo, path: 'https://www.linkedin.com/in/imdhruv99/' },
    { id: 'separator-2', label: 'separator-2', type: 'separator', icon: null, path: null },
    { id: 'theme', label: 'Toggle Theme', icon: null, path: null },
];

const Navbar = () => {
    const [showTooltip, setShowTooltip] = useState<string>('');
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const { theme, setTheme } = useTheme();
    const isDarkTheme = theme === 'dark';
    const navRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const resetIcons = (index: number) => {
        const transformations = [
            { offset: -2 },
            { offset: -1 },
            { offset: 0 },
            { offset: 1 },
            { offset: 2 },
        ];

        transformations.forEach(({ offset }) => {
            const itemIndex = index + offset;
            const item = itemsRef.current[itemIndex];
            if (item) {
                item.style.transform = 'scale(1) translateY(0)';
            }
        });
    };

    const focusIcon = (index: number) => {
        if (focusedIndex !== null) {
            resetIcons(focusedIndex);
        }
        setFocusedIndex(index);

        const transformations = [
            { offset: -2, scale: 1.1, translateY: 0 },
            { offset: -1, scale: 1.2, translateY: -6 },
            { offset: 0, scale: 1.5, translateY: -10 },
            { offset: 1, scale: 1.2, translateY: -6 },
            { offset: 2, scale: 1.1, translateY: 0 },
        ];

        transformations.forEach(({ offset, scale, translateY }) => {
            const itemIndex = index + offset;
            const item = itemsRef.current[itemIndex];
            if (item && !navItems[itemIndex]?.type) {
                item.style.transform = `scale(${scale}) translateY(${translateY}px)`;
            }
        });
    };

    const handleNavigation = (path: string | null) => {
        if (path) {
            if (path.startsWith('http')) {
                window.open(path, '_blank');
            }
        }
    };

    const toggleTheme = () => {
        setTheme(isDarkTheme ? 'light' : 'dark');
    };

    if (!isMounted) {
        return null;
    }

    return (
        <div className="fixed bottom-2 sm:bottom-4 lg:bottom-8 2xl:bottom-12 left-1/2 transform -translate-x-1/2 z-50 w-[90%] sm:w-auto">
            <nav
                ref={navRef}
                className={`flex gap-1 sm:gap-2 lg:gap-3 p-2 sm:p-3 lg:p-4 rounded-full ${
                    isDarkTheme ? 'bg-neutral-900 shadow-lg shadow-black/30' : 'bg-white shadow-lg shadow-black/10'
                } transition-all duration-300`}
            >
                {navItems.map((item, index) =>
                    item.type === 'separator' ? (
                        <div
                            key={item.id}
                            className="w-px h-6 sm:h-7 lg:h-8 bg-gray-300 dark:bg-gray-700 my-auto mx-1 opacity-20"
                        />
                    ) : (
                        <div
                            key={item.id}
                            ref={(el) => { itemsRef.current[index] = el; }}
                            className="relative flex-1 flex-shrink-0 min-w-10 sm:min-w-12 lg:min-w-14 h-10 sm:h-12 lg:h-14 flex items-center justify-center rounded-full cursor-pointer origin-bottom transition-transform duration-200"
                            onMouseEnter={() => {
                                setShowTooltip(item.id);
                                focusIcon(index);
                            }}
                            onMouseLeave={() => {
                                setShowTooltip('');
                                if (focusedIndex !== null) {
                                    resetIcons(focusedIndex);
                                    setFocusedIndex(null);
                                }
                            }}
                            onClick={() =>
                                item.id === 'theme'
                                    ? toggleTheme()
                                    : handleNavigation(item.path)
                            }
                        >
                            {item.path && !item.path.startsWith('http') ? (
                                <Link
                                    href={item.path}
                                    className="flex items-center justify-center w-full h-full"
                                >
                                    <div className={`w-8 sm:w-9 lg:w-10 h-8 sm:h-9 lg:h-10 flex items-center justify-center rounded-full ${
                                        isDarkTheme ? 'bg-white/10 hover:bg-white/20' : 'bg-black/5 hover:bg-black/10'
                                    } transition-all duration-200`}>
                                        {item.icon && (
                                            <item.icon
                                                className={`${
                                                    isDarkTheme ? 'text-gray-300 group-hover:text-white' : 'text-gray-600 group-hover:text-black'
                                                } transition-colors duration-200`}
                                                size={24}
                                            />
                                        )}
                                    </div>
                                </Link>
                            ) : (
                                <div
                                    className={`w-8 sm:w-9 lg:w-10 h-8 sm:h-9 lg:h-10 flex items-center justify-center rounded-full ${
                                        isDarkTheme ? 'bg-white/10 hover:bg-white/20' : 'bg-black/5 hover:bg-black/10'
                                    } transition-all duration-200`}
                                >
                                    {item.id === 'theme' ? (
                                        isDarkTheme ? (
                                            <Sun
                                                className="text-gray-300 transition-colors duration-200"
                                                size={24}
                                            />
                                        ) : (
                                            <Moon
                                                className="text-gray-600 transition-colors duration-200"
                                                size={24}
                                            />
                                        )
                                    ) : item.icon ? (
                                        <item.icon
                                            className={`${
                                                isDarkTheme ? 'text-gray-300' : 'text-gray-600'
                                            } transition-colors duration-200`}
                                            size={24}
                                        />
                                    ) : null}
                                </div>
                            )}
                            {showTooltip === item.id && (
                                <div
                                    className={`absolute top-[-1.75rem] sm:top-[-2rem] lg:top-[-2.5rem] left-1/2 transform -translate-x-1/2 ${
                                        isDarkTheme ? 'bg-neutral-800 text-white' : 'bg-white text-black'
                                    } px-2 py-1 rounded-lg text-xs sm:text-sm whitespace-nowrap shadow-lg pointer-events-none
                                    font-serif animate-fadeIn z-50`}
                                    style={{
                                        animation: 'fadeIn 0.2s ease-in-out forwards',
                                        fontFamily: 'Cormorant Garamond, serif'
                                    }}
                                >
                                    {item.label}
                                </div>
                            )}
                        </div>
                    ),
                )}
            </nav>
        </div>
    );
};

export default Navbar;
