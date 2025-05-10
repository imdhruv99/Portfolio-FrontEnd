'use client';

import { useEffect, useRef, useState } from 'react';

interface ProjectsProps {
    isDarkTheme: boolean;
}

const Projects = ({ isDarkTheme }: ProjectsProps) => {
    const [mounted, setMounted] = useState(false);
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const descRef = useRef<HTMLParagraphElement | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const theme = isDarkTheme
        ? {
            background: 'bg-gradient-to-br from-[#0f0f0f] via-[#1c1c1c] to-[#0d0d0d]',
            text: 'text-white',
            subtext: 'text-gray-400',
            iconColor: 'text-white/20',
        }
        : {
            background: 'bg-gradient-to-r from-[#ffffff] via-[#f2f2f2] to-[#e9e9e9]',
            text: 'text-gray-900',
            subtext: 'text-gray-600',
            iconColor: 'text-gray-400',
        };

    return (
        <section
            ref={sectionRef}
            className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-500 px-6 ${theme.background}`}
        >
            {/* Main Content */}
            <div className="max-w-4xl w-full text-center z-10 py-32">
                <h1
                    ref={titleRef}
                    className={`text-4xl sm:text-6xl font-bold font-serif mb-6 ${theme.text}`}
                >
                    Projects
                </h1>
                <p
                    ref={descRef}
                    className={`text-lg sm:text-xl font-light max-w-2xl mx-auto ${theme.subtext}`}
                >
                    A diverse portfolio of real-world projects spanning web development, machine learning, DevOps, and backend systems—demonstrating hands-on expertise with modern tech stacks, scalable architectures, and AI-driven solutions.
                </p>
            </div>
        </section>
    );
};

export default Projects;
