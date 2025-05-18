'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
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

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Initial Load Animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
            tl.from(indexRef.current, { autoAlpha: 0, x: -40, duration: 0.6 })
                .from(cardRef.current, { autoAlpha: 0, y: 80, scale: 0.95, duration: 0.8 }, '-=0.4')
                .from([titleRef.current, descRef.current], { autoAlpha: 0, y: 30, stagger: 0.2, duration: 0.6 }, '-=0.6')
                .from([techRef.current, linksRef.current], { autoAlpha: 0, y: 20, stagger: 0.2, duration: 0.5 }, '-=0.6');
        });

        return () => ctx.revert();
    }, []);

    // On Project Change
    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
        tl.to([titleRef.current, descRef.current, techRef.current, linksRef.current], {
            autoAlpha: 0,
            y: 20,
            duration: 0.2,
        })
            .set([titleRef.current, descRef.current, techRef.current, linksRef.current], { y: -10 })
            .to([titleRef.current, descRef.current, techRef.current, linksRef.current], {
                autoAlpha: 1,
                y: 0,
                duration: 0.4,
                stagger: 0.1,
            });
    }, [currentProject]);

    const navigateProject = (direction: 'next' | 'prev') => {
        setCurrentProject((prev) =>
            direction === 'next' ? (prev + 1) % projectData.length : (prev - 1 + projectData.length) % projectData.length
        );
    };

    const scrollLocked = useRef(false);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (scrollLocked.current) return;

        const swipeDistance = touchStartX.current - touchEndX.current;
        if (Math.abs(swipeDistance) > 50) {
            scrollLocked.current = true;
            navigateProject(swipeDistance > 0 ? 'next' : 'prev');
            setTimeout(() => (scrollLocked.current = false), 700);
        }
    };

    const handleScroll = useCallback(
        (e: WheelEvent) => {
            if (scrollLocked.current || isMobile || Math.abs(e.deltaY) < 40) return;

            scrollLocked.current = true;
            requestAnimationFrame(() => {
                navigateProject(e.deltaY > 0 ? 'next' : 'prev');
            });
            setTimeout(() => (scrollLocked.current = false), 800);
        },
        [isMobile]
    );

    useEffect(() => {
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
                <div ref={indexRef} className="absolute left-4 sm:left-8 top-4 sm:top-1/2 sm:transform sm:-translate-y-1/2">
                    <div className={`text-xs sm:text-sm font-light tracking-wider mb-2 ${theme.indexText}`}>
                        {String(currentProject + 1).padStart(4, '0')}
                    </div>
                    <div className={`w-8 sm:w-12 h-px ${theme.indexLine}`} />
                </div>

                <div ref={cardRef} className="relative w-full max-w-5xl">
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

                    <div className={`relative aspect-[4/3] sm:aspect-video rounded-2xl sm:rounded-3xl overflow-hidden backdrop-blur-sm border shadow-2xl transition-all duration-300 ${theme.card} ${theme.border}`}>
                        <div className={`absolute inset-0 ${theme.gradientOverlay}`} />

                        <div className="absolute bottom-0 left-0 p-4 sm:p-8 max-w-full sm:max-w-2xl">
                            <h1 ref={titleRef} className={`text-3xl sm:text-5xl md:text-7xl font-light tracking-tight mb-2 sm:mb-4 ${theme.text} break-words`}>
                                {project.title.toUpperCase()}
                            </h1>
                            <p ref={descRef} className={`text-xs sm:text-sm md:text-base leading-relaxed ${theme.subtext}`}>
                                {project.description}
                            </p>
                        </div>

                        <div className="absolute top-4 sm:top-6 left-4 sm:left-6 flex gap-2 sm:gap-3">
                            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse" />
                            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                        </div>
                    </div>

                    <div ref={linksRef} className="mt-4 sm:mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className={`text-xs sm:text-sm tracking-wider ${theme.subtext}`}>
                            <span className="block font-medium">{project.category.toUpperCase()}</span>
                            <span className="block capitalize">{project.difficulty}</span>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
                            {project.link?.map((url, idx) => (
                                <a key={idx} href={url} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 text-xs sm:text-sm tracking-wider backdrop-blur-sm border px-3 sm:px-4 py-2 rounded-full ${theme.button} ${theme.border}`}>
                                    <Icon icon={techIconMap.Github[isDarkTheme ? 'dark' : 'light']} width="14" height="14" className="sm:w-4 sm:h-4" />
                                </a>
                            ))}
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

            <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: isMobile ? 15 : 30 }).map((_, i) => (
                    <div
                        key={i}
                        className={`absolute w-1 h-1 rounded-full animate-pulse ${theme.pulseDot}`}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 3}s`
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Projects;
