'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Tooltip } from 'react-tooltip';
import { Icon } from '@iconify/react';
import { useEffect, useRef, useState, useLayoutEffect } from 'react';

import projectData from '@/constants/projectsData';
import techIconMap from '@/constants/techIconMap';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsProps {
    isDarkTheme: boolean;
}

const Projects = ({ isDarkTheme }: ProjectsProps) => {
    const [mounted, setMounted] = useState(false);
    const sectionRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useLayoutEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.utils.toArray('.project-card').forEach((card, index) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                    },
                    opacity: 0,
                    y: 40,
                    duration: 0.8,
                    ease: 'power2.out',
                    delay: index * 0.05,
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    if (!mounted) return null;

    const theme = isDarkTheme
        ? {
              background:
                  'bg-gradient-to-br from-[#0f0f0f] via-[#1c1c1c] to-[#0d0d0d]',
              text: 'text-white',
              subtext: 'text-gray-400',
              card: 'bg-white/5 backdrop-blur-sm border border-white/10 shadow-md',
              iconColor: 'text-white/80',
          }
        : {
              background:
                  'bg-gradient-to-r from-[#ffffff] via-[#f5f5f5] to-[#ececec]',
              text: 'text-gray-900',
              subtext: 'text-gray-600',
              card: 'bg-white border border-gray-200 shadow-sm',
              iconColor: 'text-gray-800',
          };

    return (
        <section
            ref={sectionRef}
            className={`relative min-h-screen flex flex-col items-center transition-colors duration-500 px-6 py-20 ${theme.background}`}
        >
            {/* Section Heading */}
            <div className="max-w-4xl w-full text-center z-10 mb-16">
                <h1
                    className={`text-4xl sm:text-6xl font-bold font-serif mb-6 ${theme.text}`}
                >
                    Projects
                </h1>
                <p
                    className={`text-lg sm:text-xl font-light max-w-2xl mx-auto ${theme.subtext}`}
                >
                    A diverse portfolio of real-world projects spanning web
                    development, machine learning, DevOps, and backend
                    systems-demonstrating hands-on expertise with modern tech
                    stacks, scalable architectures, and AI-driven solutions.
                </p>
            </div>

            {/* Project Grid */}
            <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
                {projectData.map((project) => (
                    <div
                        key={project.id}
                        className={`project-card ${theme.card} flex flex-col justify-between p-6 rounded-2xl transition-all duration-500 hover:shadow-xl hover:scale-[1.02] relative group`}
                    >
                        {/* Top Section */}
                        <div>
                            <h2
                                className={`text-xl font-semibold tracking-tight ${theme.text}`}
                            >
                                {project.title}
                            </h2>
                            <p className={`text-sm mt-1 mb-3 ${theme.subtext}`}>
                                {project.category}
                            </p>

                            {/* Tech Stack Icons */}
                            <div className="flex flex-wrap gap-2 mt-2">
                                {project.technicalStack.map((tech, idx) => {
                                    const iconKey = tech
                                        .replace(/\s+/g, '')
                                        .replace(/\./g, '')
                                        .replace(/-/g, '')
                                        .replace(/js/i, 'Js');
                                    const icon =
                                        techIconMap[iconKey]?.[
                                            isDarkTheme ? 'dark' : 'light'
                                        ] || `logos:${iconKey.toLowerCase()}`;
                                    return (
                                        <div
                                            key={idx}
                                            className="w-8 h-8 flex items-center justify-center bg-white/10 dark:bg-gray-900/10 rounded-md"
                                            data-tooltip-id={`tooltip-${project.id}-${idx}`}
                                            data-tooltip-content={tech}
                                        >
                                            <Icon
                                                icon={icon}
                                                width="20"
                                                height="20"
                                                className="opacity-90 hover:opacity-100 transition-transform hover:scale-110"
                                            />
                                            <Tooltip
                                                id={`tooltip-${project.id}-${idx}`}
                                                place="top"
                                                className="z-50 rounded bg-gray-800 text-white px-2 py-1 text-sm shadow-lg"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* GitHub Links */}
                        <div className="absolute bottom-4 right-4 flex gap-3">
                            {project.link?.map((url, idx) => {
                                const repoName = url.split('/').pop();
                                return (
                                    <a
                                        key={idx}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        data-tooltip-id={`link-tooltip-${project.id}-${idx}`}
                                        data-tooltip-content={repoName}
                                        className="group"
                                    >
                                        <div className="w-8 h-8 flex items-center justify-center rounded-md bg-white/10 dark:bg-gray-900/10 hover:bg-white/20 transition-colors">
                                            <Icon
                                                icon={
                                                    techIconMap.Github[
                                                        isDarkTheme
                                                            ? 'dark'
                                                            : 'light'
                                                    ]
                                                }
                                                width="20"
                                                height="20"
                                                className={`transition-transform group-hover:scale-110 ${theme.iconColor}`}
                                            />
                                        </div>
                                        <Tooltip
                                            id={`tooltip-${project.id}-${idx}`}
                                            place="top"
                                            className="z-50 rounded bg-gray-800 text-white px-2 py-1 text-sm shadow-lg"
                                        />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
