'use client';

import gsap from 'gsap';
import { GithubLogo } from '@phosphor-icons/react';
import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import projectData from '@/constants/projectsData';


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
            gsap.from('.project-card', {
                opacity: 0,
                y: 40,
                stagger: 0.1,
                duration: 0.7,
                ease: 'power2.out',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    if (!mounted) return null;

    const theme = isDarkTheme
        ? {
            background: 'bg-gradient-to-br from-[#0f0f0f] via-[#1c1c1c] to-[#0d0d0d]',
            text: 'text-white',
            subtext: 'text-gray-400',
            card: 'bg-white/5 border border-white/10',
            iconColor: 'text-white/80',
        }
        : {
            background: 'bg-gradient-to-r from-[#ffffff] via-[#f5f5f5] to-[#ececec]',
            text: 'text-gray-900',
            subtext: 'text-gray-600',
            card: 'bg-white border border-gray-200 shadow-md',
            iconColor: 'text-gray-800',
        };

    return (
        <section
            ref={sectionRef}
            className={`relative min-h-screen flex flex-col items-center justify-start transition-colors duration-500 px-6 py-20 ${theme.background}`}
        >
            {/* Title */}
            <div className="max-w-4xl w-full text-center z-10 mb-16">
                <h1 className={`text-4xl sm:text-6xl font-bold font-serif mb-6 ${theme.text}`}>
                    Projects
                </h1>
                <p className={`text-lg sm:text-xl font-light max-w-2xl mx-auto ${theme.subtext}`}>
                    A diverse portfolio of real-world projects spanning web development, machine learning, DevOps, and backend systems—demonstrating hands-on expertise with modern tech stacks, scalable architectures, and AI-driven solutions.
                </p>
            </div>

            {/* Vertical Project List */}
            <div className="w-full max-w-4xl flex flex-col gap-6">
                {projectData.map((project) => (
                    <div
                        key={project.id}
                        className={`project-card ${theme.card} p-6 rounded-xl transition-all duration-300`}
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div>
                                <h2 className={`text-xl font-semibold ${theme.text}`}>
                                    {project.title}
                                </h2>
                                <p className={`text-sm ${theme.subtext}`}>{project.category}</p>
                            </div>
                            <div className="flex gap-3 mt-2 sm:mt-0">
                                {project.link?.map((url, idx) => {
                                    const repoName = url.split('/').pop();
                                    return (
                                        <a
                                            key={idx}
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title={repoName}
                                            className="group"
                                        >
                                            <GithubLogo
                                                size={24}
                                                weight="duotone"
                                                className={`transition-transform group-hover:scale-110 ${theme.iconColor}`}
                                            />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
