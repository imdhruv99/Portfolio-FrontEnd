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
    const { theme, setTheme, resolvedTheme } = useTheme();
    const isDarkTheme = theme === 'dark' || (theme === 'system' && resolvedTheme === 'dark');
    const navRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [isMounted, setIsMounted] = useState(false);
    const [mobileView, setMobileView] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        // Check if the screen is mobile sized
        const checkMobileView = () => {
            setMobileView(window.innerWidth < 640);
        };

        checkMobileView();
        window.addEventListener('resize', checkMobileView);

        return () => {
            window.removeEventListener('resize', checkMobileView);
        };
    }, []);

    // Filter out some items for mobile to prevent overcrowding
    const displayNavItems = mobileView
        ? navItems.filter(item =>
            ['home', 'experience', 'projects', 'contact', 'separator-1', 'github', 'theme'].includes(item.id))
        : navItems;

    const resetIcons = (index: number) => {
        if (mobileView) return; // Skip animation on mobile

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
        if (mobileView) return; // Skip animation on mobile

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
            if (item && !displayNavItems[itemIndex]?.type) {
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
        // Prevent multiple clicks during animation
        if (isAnimating) return;

        setIsAnimating(true);

        // Toggle theme - explicitly set to light or dark, avoiding system theme
        const newTheme = isDarkTheme ? 'light' : 'dark';
        console.log(`Changing theme from ${theme} to ${newTheme}`);
        setTheme(newTheme);

        // Reset animation state after animation completes
        setTimeout(() => {
            setIsAnimating(false);
        }, 500); // Match the animation duration
    };

    // Don't render anything during SSR
    if (!isMounted) {
        return null;
    }

    return (
        <div className="fixed bottom-2 sm:bottom-4 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-50 w-auto max-w-[95%]">
            <nav
                ref={navRef}
                className={`flex items-center justify-center ${mobileView ? 'gap-0.5' : 'gap-1 sm:gap-2 lg:gap-3'} p-1.5 sm:p-2 lg:p-4 rounded-full theme-transition ${
                    isDarkTheme ? 'bg-slate-800 shadow-lg shadow-black/30' : 'bg-slate-100 shadow-lg shadow-black/10'
                }`}
            >
                {displayNavItems.map((item, index) =>
                    item.type === 'separator' ? (
                        <div
                            key={item.id}
                            className={`w-px h-5 sm:h-6 lg:h-8 bg-gray-300 dark:bg-gray-700 my-auto mx-0.5 sm:mx-1 opacity-20 theme-transition ${
                                mobileView ? 'mx-0' : ''
                            }`}
                        />
                    ) : (
                        <div
                            key={item.id}
                            ref={(el) => { itemsRef.current[index] = el; }}
                            className={`relative flex items-center justify-center rounded-full cursor-pointer origin-bottom transition-transform duration-200 ${
                                mobileView
                                    ? 'w-10 h-10'
                                    : 'w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12'
                            }`}
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
                                    <div className={`flex items-center justify-center rounded-full theme-transition ${
                                        mobileView
                                            ? 'w-8 h-8'
                                            : 'w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9'
                                        } ${
                                        isDarkTheme ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-200 hover:bg-slate-300'
                                    }`}>
                                        {item.icon && (
                                            <item.icon
                                                className={`theme-transition ${
                                                    isDarkTheme ? 'text-slate-200' : 'text-slate-700'
                                                }`}
                                                size={mobileView ? 20 : 22}
                                            />
                                        )}
                                    </div>
                                </Link>
                            ) : (
                                <div
                                    className={`flex items-center justify-center rounded-full theme-transition ${
                                        mobileView
                                            ? 'w-8 h-8'
                                            : 'w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9'
                                        } ${
                                        isDarkTheme ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-200 hover:bg-slate-300'
                                    }`}
                                >
                                    {item.id === 'theme' ? (
                                        <div className={isAnimating ? 'theme-toggle-animation' : ''}>
                                            {isDarkTheme ? (
                                                <Sun
                                                    className="text-slate-200 theme-transition"
                                                    size={mobileView ? 20 : 22}
                                                />
                                            ) : (
                                                <Moon
                                                    className="text-slate-700 theme-transition"
                                                    size={mobileView ? 20 : 22}
                                                />
                                            )}
                                        </div>
                                    ) : item.icon ? (
                                        <item.icon
                                            className={`theme-transition ${
                                                isDarkTheme ? 'text-slate-200' : 'text-slate-700'
                                            }`}
                                            size={mobileView ? 20 : 22}
                                        />
                                    ) : null}
                                </div>
                            )}
                            {showTooltip === item.id && !mobileView && (
                                <div
                                    className={`absolute top-[-1.75rem] sm:top-[-2rem] lg:top-[-2.5rem] left-1/2 transform -translate-x-1/2 theme-transition ${
                                        isDarkTheme ? 'bg-slate-700 text-slate-200' : 'bg-slate-200 text-slate-800'
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
