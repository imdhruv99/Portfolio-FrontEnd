'use client';

import gsap from 'gsap';
import { Tooltip } from 'react-tooltip';
import { Icon } from '@iconify/react';
import { GithubLogo } from '@phosphor-icons/react';
import { useEffect, useRef, useState, useLayoutEffect } from 'react';

import projectData from '@/constants/projectsData';

const techIconMap: Record<string, { light: string; dark: string }> = {
    Ansible: { light: 'logos:ansible', dark: 'logos:ansible' },
    AWS: { light: 'skill-icons:aws-dark', dark: 'skill-icons:aws-light' },
    CSS: { light: 'logos:css-3', dark: 'logos:css-3' },
    CV2: { light: 'simple-icons:opencv', dark: 'simple-icons:opencv' },
    Django: { light: 'skill-icons:django', dark: 'simple-icons:django' },
    Docker: { light: 'logos:docker-icon', dark: 'logos:docker-icon' },
    ELKStack: { light: 'simple-icons:elasticstack', dark: 'simple-icons:elasticstack' },
    ExpressJs: { light: 'simple-icons:express', dark: 'simple-icons:express' },
    Flask: { light: 'logos:flask', dark: 'bxl:flask' },
    Gin: { light: 'simple-icons:gin', dark: 'simple-icons:gin' },
    Go: { light: 'logos:go', dark: 'logos:go' },
    Helm: { light: 'logos:helm', dark: 'catppuccin:helm' },
    HTML: { light: 'logos:html-5', dark: 'logos:html-5' },
    JavaScript: { light: 'logos:javascript', dark: 'logos:javascript' },
    Jenkins: { light: 'logos:jenkins', dark: 'logos:jenkins' },
    JupyterNotebook: { light: 'logos:jupyter', dark: 'logos:jupyter' },
    Keras: { light: 'devicon:keras', dark: 'devicon:keras' },
    Kubernetes: { light: 'logos:kubernetes', dark: 'logos:kubernetes' },
    Matplotlib: { light: 'devicon:matplotlib', dark: 'devicon:matplotlib' },
    MongoDB: { light: 'logos:mongodb-icon', dark: 'logos:mongodb-icon' },
    NodeJs: { light: 'logos:nodejs-icon', dark: 'logos:nodejs-icon' },
    Numpy: { light: 'logos:numpy', dark: 'logos:numpy' },
    OAuth2: { light: 'devicon-plain:oauth', dark: 'devicon-plain:oauth' },
    Pandas: { light: 'logos:pandas', dark: 'devicon-plain:pandas-wordmark' },
    PHP: { light: 'logos:php', dark: 'logos:php' },
    Postgres: { light: 'logos:postgresql', dark: 'logos:postgresql' },
    Python: { light: 'logos:python', dark: 'logos:python' },
    Redis: { light: 'logos:redis', dark: 'logos:redis' },
    Sklearn: { light: 'skill-icons:scikitlearn-dark', dark: 'skill-icons:scikitlearn-light' },
    Tensorflow: { light: 'logos:tensorflow', dark: 'logos:tensorflow' },
    Terraform: { light: 'logos:terraform-icon', dark: 'logos:terraform-icon' },
    XGBoost: { light: 'simple-icons:xgboost', dark: 'simple-icons:xgboost' },
};

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
                duration: 0.8,
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
                <h1 className={`text-4xl sm:text-6xl font-bold font-serif mb-6 ${theme.text}`}>
                    Projects
                </h1>
                <p className={`text-lg sm:text-xl font-light max-w-2xl mx-auto ${theme.subtext}`}>
                    A diverse portfolio of real-world projects spanning web development, machine learning, DevOps, and backend systems—demonstrating hands-on expertise with modern tech stacks, scalable architectures, and AI-driven solutions.
                </p>
            </div>

            {/* Project Grid */}
            <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
                {projectData.map((project) => (
                    <div
                        key={project.id}
                        className={`project-card ${theme.card} flex flex-col justify-between p-6 rounded-xl transition-all duration-300 h-[10rem] relative`}
                    >
                        {/* Top Section */}
                        <div>
                            <h2 className={`text-xl font-semibold ${theme.text}`}>
                                {project.title}
                            </h2>
                            <p className={`text-sm mt-1 ${theme.subtext}`}>{project.category}</p>

                            {/* Tech Stack Icons */}
                            <div className="flex flex-wrap gap-2 mt-2">
                                {project.technicalStack.map((tech, idx) => {
                                    const iconKey = tech.replace(/\s+/g, '').replace(/\./g, '').replace(/-/g, '').replace(/js/i, 'Js');
                                    const icon = techIconMap[iconKey]?.[isDarkTheme ? 'dark' : 'light'] || `logos:${iconKey.toLowerCase()}`;
                                    return (
                                        <div key={idx}>
                                            <Icon
                                                icon={icon}
                                                width="22"
                                                height="22"
                                                className="opacity-80 hover:opacity-100 transition-transform hover:scale-110"
                                                data-tooltip-id={`tooltip-${project.id}-${idx}`}
                                                data-tooltip-content={tech}
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

                        {/* Bottom-right GitHub Links */}
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
                                        <GithubLogo
                                            size={22}
                                            weight="duotone"
                                            className={`transition-transform group-hover:scale-110 ${theme.iconColor}`}
                                        />
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
