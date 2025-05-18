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
    const cardRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const indexRef = useRef<HTMLDivElement>(null);
    const techRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);

    const project = projectData[currentProject];

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
    const handleScroll = useCallback((e: WheelEvent) => {
        if (scrollLocked.current) return;

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
    }, []);


    useEffect(() => {
        window.addEventListener('wheel', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('wheel', handleScroll);
        };
    }, [handleScroll]);


    return (
        <div className={`min-h-screen overflow-hidden relative transition-colors duration-500 ${isDark
            ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900'
            : 'bg-gradient-to-br from-gray-100 via-white to-gray-100'
            }`}>

            {/* Main content */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-8">
                {/* Index number */}
                <div ref={indexRef} className="absolute left-8 top-1/2 transform -translate-y-1/2">
                    <div className={`text-sm font-light tracking-wider mb-2 ${isDark ? 'text-white/30' : 'text-gray-400'
                        }`}>
                        {String(currentProject + 1).padStart(4, '0')}
                    </div>
                    <div className={`w-12 h-px ${isDark ? 'bg-white/30' : 'bg-gray-400'}`} />
                </div>

                {/* Main card */}
                <div ref={cardRef} className="relative w-full max-w-5xl">

                    {/* Technology tags */}
                    <div ref={techRef} className="absolute -top-16 right-0 flex flex-wrap gap-2 z-20 max-w-5xl justify-end">
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


                    {/* Card container */}
                    <div className={`relative aspect-video rounded-3xl overflow-hidden backdrop-blur-sm border shadow-2xl transition-all duration-300 ${isDark
                        ? 'bg-gray-900/30 border-white/10'
                        : 'bg-white/40 border-gray-200/50'
                        }`}>

                        {/* Content overlay */}
                        <div className={`absolute inset-0 ${isDark
                            ? 'bg-gradient-to-t from-black/60 via-transparent to-black/20'
                            : 'bg-gradient-to-t from-white/60 via-transparent to-white/20'
                            }`} />

                        {/* Project title and description */}
                        <div className="absolute bottom-0 left-0 p-8 max-w-2xl">
                            <h1 ref={titleRef} className={`text-5xl md:text-7xl font-light tracking-tight mb-4 ${isDark ? 'text-white' : 'text-gray-900'
                                }`}>
                                {project.title.toUpperCase()}
                            </h1>
                            <p ref={descRef} className={`text-sm md:text-base leading-relaxed ${isDark ? 'text-white/70' : 'text-gray-700'
                                }`}>
                                {project.description}
                            </p>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute top-6 left-6 flex gap-3">
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                            <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                        </div>
                    </div>

                    {/* Project details */}
                    <div ref={linksRef} className="mt-8 flex items-center justify-between">
                        <div className={`text-sm tracking-wider ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                            <span className="block font-medium">{project.category.toUpperCase()}</span>
                            <span className="block capitalize">{project.difficulty}</span>
                        </div>

                        {/* GitHub links */}
                        <div className="flex gap-4">
                            {project.link?.map((url, idx) => {
                                const repoName = url.split('/').pop() || 'Repository';
                                return (
                                    <a
                                        key={idx}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex items-center gap-2 text-sm tracking-wider backdrop-blur-sm border px-4 py-2 rounded-full transition-all duration-300 ${isDark
                                            ? 'text-white/70 bg-white/5 border-white/10 hover:bg-white/10 hover:text-white'
                                            : 'text-gray-600 bg-white/50 border-gray-200 hover:bg-white/80 hover:text-gray-900'
                                            }`}
                                    >
                                        <Icon
                                            icon={techIconMap.Github[isDark ? 'dark' : 'light']}
                                            width="16"
                                            height="16"
                                        />
                                        <span>{repoName}</span>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation dots */}
            <NavigationDots
                currentIndex={currentProject}
                total={projectData.length}
                isDark={isDark}
                setCurrentProject={setCurrentProject}
            />

            {/* Ambient particles */}
            <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 30 }).map((_, i) => (
                    <div
                        key={i}
                        className={`absolute w-1 h-1 rounded-full animate-pulse ${isDark ? 'bg-white/10' : 'bg-gray-400/20'
                            }`}
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
