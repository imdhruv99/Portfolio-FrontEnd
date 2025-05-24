'use client';

import './Projects.css';

import React, { useEffect, useRef, useState, useCallback, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { Icon } from '@iconify/react';

import projectData from '@/constants/projectsData';
import techIconMap from '@/constants/techIconMap';
import NavigationDots from '../NavigationDots';

interface ProjectProps {
    isDarkTheme: boolean;
}

const Projects = ({ isDarkTheme }: ProjectProps) => {
    const [currentProject, setCurrentProject] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    const cardRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const indexRef = useRef<HTMLDivElement>(null);
    const techRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const scrollLocked = useRef(false);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const project = projectData[currentProject];

    const theme = isDarkTheme
        ? {
            background: 'bg-gradient-to-br from-[#0e0e0e] via-[#1a1a1a] to-[#121212]',
            text: 'text-white',
            subtext: 'text-white/60',
            border: 'border-white/10',
            card: 'bg-[#2c2c2c]/80',
            gradientOverlay: 'bg-gradient-to-t from-black/50 via-transparent to-black/20',
            button: 'bg-white/10 hover:bg-white/20 text-white',
            techBadge: 'text-white/70 bg-white/5 border-white/10 hover:bg-white/10',
            iconColor: 'text-white/30',
            indexLine: 'bg-white/30',
            indexText: 'text-white/30',
            pulseDot: 'bg-white/10',
        }
        : {
            background: 'bg-gradient-to-br from-[#ffffff] via-[#f9f9f9] to-[#efefef]',
            text: 'text-gray-900',
            subtext: 'text-gray-600',
            border: 'border-gray-300',
            card: 'bg-gradient-to-br from-[#f4f4f4] to-[#ffffff] shadow-lg',
            gradientOverlay: 'bg-gradient-to-t from-white/70 via-transparent to-white/30',
            button: 'bg-gray-100 hover:bg-white text-gray-900',
            techBadge: 'text-gray-700 bg-white border-gray-200 hover:bg-gray-100',
            iconColor: 'text-gray-400',
            indexLine: 'bg-gray-400',
            indexText: 'text-gray-400',
            pulseDot: 'bg-gray-400/20',
        };

    // Animate on project change
    const animateProjectChange = useCallback((direction: 'next' | 'prev', newIndex: number) => {
        if (scrollLocked.current) return;
        scrollLocked.current = true;

        const tl = gsap.timeline({
            defaults: { ease: 'power2.inOut', overwrite: 'auto', force3D: true },
            onComplete: () => {
                scrollLocked.current = false;
            },
        });

        const elementsToAnimate = [titleRef.current, descRef.current, techRef.current, linksRef.current];

        // Animate elements out
        tl.to(elementsToAnimate, {
            opacity: 0,
            y: direction === 'next' ? -20 : 20,
            duration: 0.4,
            stagger: {
                each: 0.07,
                from: 'start'
            },
            onComplete: () => {
                setCurrentProject(newIndex);
            }
        })
            .to(cardRef.current, {
                opacity: 0.8,
                scale: 0.98,
                duration: 0.4,
                ease: 'power2.in',
            }, '<')
            .set(elementsToAnimate, { y: direction === 'next' ? 20 : -20 })

            // Animate card and elements in
            .to(cardRef.current, {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                ease: 'power2.out',
            })
            .to(elementsToAnimate, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: {
                    each: 0.08,
                    from: 'end'
                },
                ease: 'power2.out',
            }, '<0.1');

        // Index animation
        gsap.fromTo(indexRef.current,
            { opacity: 0, x: direction === 'next' ? -10 : 10 },
            { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out', delay: 0.1 }
        );
    }, []);


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
            const direction = swipeDistance > 0 ? 'next' : 'prev';
            const newIndex = direction === 'next'
                ? (currentProject + 1) % projectData.length
                : (currentProject - 1 + projectData.length) % projectData.length;

            animateProjectChange(direction, newIndex);
        }
    };

    const handleScroll = useCallback(
        (e: WheelEvent) => {
            // Check if user is scrolling significantly and not just minor jitters
            if (scrollLocked.current || isMobile || Math.abs(e.deltaY) < 30) return;

            const direction = e.deltaY > 0 ? 'next' : 'prev';
            const newIndex = direction === 'next'
                ? (currentProject + 1) % projectData.length
                : (currentProject - 1 + projectData.length) % projectData.length;

            animateProjectChange(direction, newIndex);
        },
        [isMobile, currentProject, animateProjectChange]
    );

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Initial load animation with useLayoutEffect to run before paint
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power2.out', force3D: true } });
            tl.from(indexRef.current, { opacity: 0, x: -30, duration: 0.5 })
                .from(cardRef.current, { opacity: 0, y: 30, scale: 0.97, duration: 0.6 }, '-=0.3')
                .from([titleRef.current, descRef.current], { opacity: 0, y: 10, stagger: 0.1, duration: 0.4 }, '-=0.3')
                .from([techRef.current, linksRef.current], { opacity: 0, y: 5, stagger: 0.07, duration: 0.35 }, '-=0.3');
        });

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        // Ensure scroll event listener is only active when not on mobile
        if (!isMobile) {
            window.addEventListener('wheel', handleScroll, { passive: true });
            return () => window.removeEventListener('wheel', handleScroll);
        }
    }, [handleScroll, isMobile]);

    return (
        <div
            className={`min-h-screen overflow-hidden relative transition-colors duration-500 ${theme.background}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-8">

                {/* Index */}
                <div
                    ref={indexRef}
                    className={`absolute left-4 sm:left-8 top-4 sm:top-1/2 sm:transform sm:-translate-y-1/2`}
                >
                    <div className={`text-lg sm:text-2xl font-light tracking-widest mb-3 transition-transform duration-500 ${theme.indexText}`}>
                        {String(currentProject + 1).padStart(4, '0')}
                    </div>
                    <div className={`w-10 sm:w-14 h-px ${theme.indexLine}`} />
                </div>

                {/* Main Card Component */}
                {/* Tech Icon */}
                <div ref={cardRef} className={`relative w-full max-w-5xl`}>
                    <div ref={techRef} className="absolute -top-12 sm:-top-16 right-0 left-0 sm:left-auto">
                        <div className="block sm:hidden">
                            <div className="flex gap-2 overflow-x-auto pb-2 px-4 scrollbar-hide">
                                {project.technicalStack.map((tech) => {
                                    const key = tech.replace(/\s+|\.|-/g, '').replace(/js/i, 'Js');
                                    const icon = techIconMap[key]?.[isDarkTheme ? 'dark' : 'light'] || `logos:${key.toLowerCase()}`;
                                    return (
                                        <div key={tech} className={`flex items-center gap-2 text-xs tracking-wider backdrop-blur-sm border px-3 py-1.5 rounded-full whitespace-nowrap ${theme.techBadge}`}>
                                            <Icon icon={icon} width="14" height="14" />
                                            <span>{tech}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="hidden sm:flex flex-wrap gap-2 justify-end max-w-5xl">
                            {project.technicalStack.map((tech) => {
                                const key = tech.replace(/\s+|\.|-/g, '').replace(/js/i, 'Js');
                                const icon = techIconMap[key]?.[isDarkTheme ? 'dark' : 'light'] || `logos:${key.toLowerCase()}`;
                                return (
                                    <div key={tech} className={`flex items-center gap-2 text-xs tracking-wider backdrop-blur-sm border px-3 py-2 rounded-full ${theme.techBadge}`}>
                                        <Icon icon={icon} width="16" height="16" />
                                        <span>{tech}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    {/* Card Details */}
                    <div className={`relative aspect-[4/3] sm:aspect-video rounded-2xl sm:rounded-3xl overflow-hidden backdrop-blur-sm border shadow-2xl transition-all duration-300 ${theme.card} ${theme.border}`}>
                        <div className={`absolute inset-0 ${theme.gradientOverlay}`} />

                        <div className="absolute bottom-0 left-0 p-4 sm:p-8 max-w-full sm:max-w-2xl">
                            <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-md mb-3 ${theme.subtext} bg-white/10 backdrop-blur-sm`}>{project.yearOfDevelopment}</span>
                            <h1 ref={titleRef} className={`will-change-transform text-3xl sm:text-5xl md:text-5xl font-light tracking-tight mb-2 sm:mb-4 ${theme.text} break-words leading-tight`}>
                                {project.title.toUpperCase()}
                            </h1>
                            <p ref={descRef} className={`text-xs sm:text-sm md:text-base leading-relaxed ${theme.subtext} max-w-2xl`}>
                                {project.description}
                            </p>
                        </div>

                        {/* Status Dots */}
                        <div className="absolute top-4 sm:top-6 left-4 sm:left-6 flex gap-2 sm:gap-3">
                            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse" />
                            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                        </div>
                    </div>

                    <div ref={linksRef} className="mt-4 sm:mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 w-full">

                            <div className="flex items-center justify-between w-full sm:block">
                                <div className={`text-xs sm:text-sm tracking-wider ${theme.subtext}`}>
                                    <span className="block font-medium">{project.category.toUpperCase()}</span>
                                </div>

                                <div className="flex sm:hidden">
                                    {project.link?.map((url, idx) => (
                                        <a key={idx} href={url} target="_blank" rel="noopener noreferrer" className={`ml-2 flex items-center gap-2 text-xs tracking-wider backdrop-blur-sm border px-3 py-2 rounded-full ${theme.button} ${theme.border}`}>
                                            <Icon icon={techIconMap.Github[isDarkTheme ? 'dark' : 'light']} width="14" height="14" />
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div className="hidden sm:flex flex-row gap-4">
                                {project.link?.map((url, idx) => (
                                    <a key={idx} href={url} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 text-sm tracking-wider backdrop-blur-sm border px-4 py-2 rounded-full ${theme.button} ${theme.border}`}>
                                        <Icon icon={techIconMap.Github[isDarkTheme ? 'dark' : 'light']} width="16" height="16" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <NavigationDots
                currentIndex={currentProject}
                total={projectData.length}
                isDark={isDarkTheme}
                setCurrentProject={setCurrentProject}
                isMobile={isMobile}
            />

            {/* Background Dots */}
            <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: isMobile ? 15 : 30 }).map((_, i) => (
                    <div
                        key={i}
                        className={`absolute rounded-full w-1 h-1 opacity-20 ${theme.pulseDot}`}
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${i * 0.5}s`,
                            animationDuration: `${3 + Math.random() * 2}s`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Projects;
