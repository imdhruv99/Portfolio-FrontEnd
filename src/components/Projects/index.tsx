import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { Icon } from '@iconify/react';

import projectData from '@/constants/projectsData';
import techIconMap from '@/constants/techIconMap';
import NavigationDots from '../NavigationDots';

// Main component
const Projects = () => {
    const [currentProject, setCurrentProject] = useState(0);
    const [isDark, setIsDark] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const indexRef = useRef<HTMLDivElement>(null);
    const techRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);

    const project = projectData[currentProject];

    // Check if mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const tl = gsap.timeline();

        // Initial animations
        tl.fromTo(indexRef.current,
            { opacity: 0, x: -50 },
            { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
        )
            .fromTo(cardRef.current,
                { opacity: 0, y: 100, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" },
                "-=0.5"
            )
            .fromTo(titleRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
                "-=0.8"
            )
            .fromTo(descRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
                "-=0.6"
            )
            .fromTo(techRef.current,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
                "-=0.6"
            )
            .fromTo(linksRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
                "-=0.4"
            );
    }, []);

    useEffect(() => {
        // Animate on project change
        const tl = gsap.timeline();
        tl.to([titleRef.current, descRef.current, techRef.current], {
            opacity: 0,
            y: 20,
            duration: 0.3,
            ease: "power2.in"
        })
            .to([titleRef.current, descRef.current, techRef.current], {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out"
            });
    }, [currentProject]);

    const navigateProject = (direction: 'next' | 'prev') => {
        if (direction === 'next') {
            setCurrentProject((prev) => (prev + 1) % projectData.length);
        } else {
            setCurrentProject((prev) => (prev - 1 + projectData.length) % projectData.length);
        }
    };

    const scrollLocked = useRef(false);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    // Touch handlers for mobile
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (scrollLocked.current) return;

        const swipeDistance = touchStartX.current - touchEndX.current;
        const minSwipeDistance = 50;

        if (Math.abs(swipeDistance) > minSwipeDistance) {
            scrollLocked.current = true;

            if (swipeDistance > 0) {
                navigateProject('next');
            } else {
                navigateProject('prev');
            }

            setTimeout(() => {
                scrollLocked.current = false;
            }, 1000);
        }
    };

    const handleScroll = useCallback((e: WheelEvent) => {
        if (scrollLocked.current || isMobile) return;

        // Small deltas from sensitive devices shouldn't trigger a change
        if (Math.abs(e.deltaY) < 40) return;

        scrollLocked.current = true;

        if (e.deltaY > 0) {
            navigateProject('next');
        } else if (e.deltaY < 0) {
            navigateProject('prev');
        }

        // Lock scroll for a set time
        setTimeout(() => {
            scrollLocked.current = false;
        }, 1000); // delay adjusted to match animation duration
    }, [isMobile]);

    useEffect(() => {
        if (!isMobile) {
            window.addEventListener('wheel', handleScroll, { passive: true });
            return () => {
                window.removeEventListener('wheel', handleScroll);
            };
        }
    }, [handleScroll, isMobile]);

    return (
        <div
            className={`min-h-screen overflow-hidden relative transition-colors duration-500 ${isDark
                ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900'
                : 'bg-gradient-to-br from-gray-100 via-white to-gray-100'
                }`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Main content */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-8">
                {/* Index number - Responsive positioning */}
                <div ref={indexRef} className="absolute left-4 sm:left-8 top-4 sm:top-1/2 sm:transform sm:-translate-y-1/2">
                    <div className={`text-xs sm:text-sm font-light tracking-wider mb-2 ${isDark ? 'text-white/30' : 'text-gray-400'}`}>
                        {String(currentProject + 1).padStart(4, '0')}
                    </div>
                    <div className={`w-8 sm:w-12 h-px ${isDark ? 'bg-white/30' : 'bg-gray-400'}`} />
                </div>

                {/* Main card */}
                <div ref={cardRef} className="relative w-full max-w-5xl">
                    {/* Technology tags - Mobile responsive */}
                    <div ref={techRef} className="absolute -top-12 sm:-top-16 right-0 left-0 sm:left-auto">
                        {/* Mobile: Horizontal scrolling */}
                        <div className="block sm:hidden">
                            <div className="flex gap-2 overflow-x-auto pb-2 px-4 scrollbar-hide">
                                <div className="flex gap-2 flex-nowrap">
                                    {project.technicalStack.map((tech, index) => {
                                        const iconKey = tech.replace(/\s+/g, '').replace(/\./g, '').replace(/-/g, '').replace(/js/i, 'Js');
                                        const icon = techIconMap[iconKey]?.[isDark ? 'dark' : 'light'] || `logos:${iconKey.toLowerCase()}`;

                                        return (
                                            <div
                                                key={tech}
                                                className={`flex items-center gap-2 text-xs tracking-wider backdrop-blur-sm border px-3 py-1.5 rounded-full transition-all duration-300 whitespace-nowrap ${isDark
                                                    ? 'text-white/70 bg-white/5 border-white/10'
                                                    : 'text-gray-600 bg-white/50 border-gray-200'
                                                    }`}
                                                style={{ animationDelay: `${index * 0.1}s` }}
                                            >
                                                <Icon icon={icon} width="14" height="14" />
                                                <span>{tech}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Desktop: Flex wrap */}
                        <div className="hidden sm:flex flex-wrap gap-2 justify-end max-w-5xl">
                            {project.technicalStack.map((tech, index) => {
                                const iconKey = tech.replace(/\s+/g, '').replace(/\./g, '').replace(/-/g, '').replace(/js/i, 'Js');
                                const icon = techIconMap[iconKey]?.[isDark ? 'dark' : 'light'] || `logos:${iconKey.toLowerCase()}`;

                                return (
                                    <div
                                        key={tech}
                                        className={`flex items-center gap-2 text-xs tracking-wider backdrop-blur-sm border px-3 py-2 rounded-full transition-all duration-300 ${isDark
                                            ? 'text-white/70 bg-white/5 border-white/10 hover:bg-white/10'
                                            : 'text-gray-600 bg-white/50 border-gray-200 hover:bg-white/80'
                                            }`}
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <Icon icon={icon} width="16" height="16" />
                                        <span>{tech}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Card container - Responsive aspect ratio */}
                    <div className={`relative aspect-[4/3] sm:aspect-video rounded-2xl sm:rounded-3xl overflow-hidden backdrop-blur-sm border shadow-2xl transition-all duration-300 ${isDark
                        ? 'bg-gray-900/30 border-white/10'
                        : 'bg-white/40 border-gray-200/50'
                        }`}>
                        {/* Content overlay */}
                        <div className={`absolute inset-0 ${isDark
                            ? 'bg-gradient-to-t from-black/60 via-transparent to-black/20'
                            : 'bg-gradient-to-t from-white/60 via-transparent to-white/20'
                            }`} />

                        {/* Project title and description */}
                        <div className="absolute bottom-0 left-0 p-4 sm:p-8 max-w-full sm:max-w-2xl">
                            <h1 ref={titleRef} className={`text-3xl sm:text-5xl md:text-7xl font-light tracking-tight mb-2 sm:mb-4 ${isDark ? 'text-white' : 'text-gray-900'} break-words`}>
                                {project.title.toUpperCase()}
                            </h1>
                            <p ref={descRef} className={`text-xs sm:text-sm md:text-base leading-relaxed ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                                {project.description}
                            </p>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute top-4 sm:top-6 left-4 sm:left-6 flex gap-2 sm:gap-3">
                            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse" />
                            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                        </div>
                    </div>

                    {/* Project details - Mobile responsive */}
                    <div ref={linksRef} className="mt-4 sm:mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className={`text-xs sm:text-sm tracking-wider ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                            <span className="block font-medium">{project.category.toUpperCase()}</span>
                            <span className="block capitalize">{project.difficulty}</span>
                        </div>

                        {/* GitHub links - Mobile responsive */}
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
                            {project.link?.map((url, idx) => {
                                const repoName = url.split('/').pop() || 'Repository';
                                return (
                                    <a
                                        key={idx}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex items-center gap-2 text-xs sm:text-sm tracking-wider backdrop-blur-sm border px-3 sm:px-4 py-2 rounded-full transition-all duration-300 ${isDark
                                            ? 'text-white/70 bg-white/5 border-white/10 hover:bg-white/10 hover:text-white'
                                            : 'text-gray-600 bg-white/50 border-gray-200 hover:bg-white/80 hover:text-gray-900'
                                            }`}
                                    >
                                        <Icon
                                            icon={techIconMap.Github[isDark ? 'dark' : 'light']}
                                            width="14"
                                            height="14"
                                            className="sm:w-4 sm:h-4"
                                        />
                                        <span className="truncate">{repoName}</span>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation dots - Responsive positioning */}
            <NavigationDots
                currentIndex={currentProject}
                total={projectData.length}
                isDark={isDark}
                setCurrentProject={setCurrentProject}
                isMobile={isMobile}
            />

            {/* Ambient particles - Responsive */}
            <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: isMobile ? 15 : 30 }).map((_, i) => (
                    <div
                        key={i}
                        className={`absolute w-1 h-1 rounded-full animate-pulse ${isDark ? 'bg-white/10' : 'bg-gray-400/20'}`}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 3}s`
                        }}
                    />
                ))}
            </div>

            {/* Mobile swipe indicator */}
            {isMobile && (
                <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center">
                    <div className={`text-xs ${isDark ? 'text-white/40' : 'text-gray-500'} flex items-center gap-2`}>
                        <Icon icon="material-symbols:swipe-left" width="16" height="16" />
                        <span>Swipe to navigate</span>
                        <Icon icon="material-symbols:swipe-right" width="16" height="16" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Projects;
