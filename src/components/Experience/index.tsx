'use client';

import { Icon } from '@iconify/react';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeColors } from '@/hooks/useThemeColors';
import { getExperienceData } from '@/constants/ExperienceData';


interface ExperienceItem {
    id: number;
    company: string;
    designation: string;
    period: string;
    description: string[];
    technologies: string[];
    color: string;
    image: string;
}

interface BentoCardProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    style?: React.CSSProperties;
}

const BentoCard = ({ children, className = '', delay = 0, style }: BentoCardProps) => (
    <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay }}
        viewport={{ once: true, margin: "-50px" }}
        className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all duration-300 ${className}`}
        style={style}
        whileHover={{ scale: 1.02, y: -5 }}
    >
        {children}
    </motion.div>
);

interface ExperienceGridProps {
    experience: ExperienceItem;
    index: number;
}

const ExperienceGrid = ({ experience, index }: ExperienceGridProps) => {
    const baseDelay = index * 0.1;

    return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
            <div className="w-full max-w-7xl mx-auto">
                {/* Grid Container */}
                <div className="grid grid-cols-12 grid-rows-12 gap-4 h-[90vh] min-h-[600px]">

                    {/* Stats/Metrics - Top Right */}
                    <BentoCard
                        className="col-span-6 sm:col-span-3 row-span-3 flex flex-col justify-center items-center text-center"
                        delay={baseDelay + 0.1}
                    >
                        <div>
                            <Image
                                src={experience?.image}
                                alt="Company Logo"
                                layout="fill"
                                objectFit="contain"
                                className="p-1"
                            />
                        </div>
                    </BentoCard>

                    {/* Company Name - Top Left */}
                    <BentoCard
                        className="col-span-6 sm:col-span-4 row-span-3 flex flex-col justify-center"
                        delay={baseDelay}
                        style={{ background: `linear-gradient(135deg, ${experience.color}20, ${experience.color}10)` }}
                    >
                        <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                            {experience.company}
                        </h3>
                        <p className="text-sm text-gray-400">{experience.period}</p>
                    </BentoCard>

                    {/* Timeline Indicator - Far Right */}
                    <BentoCard
                        className="hidden sm:block col-span-5 row-span-6 relative overflow-hidden"
                        delay={baseDelay + 0.2}
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            cloud will come here
                        </div>
                    </BentoCard>

                    {/* Central Designation - Main Focus */}
                    <BentoCard
                        className="col-span-12 sm:col-span-7 row-span-3 flex items-center justify-center text-center relative overflow-hidden"
                        delay={baseDelay + 0.3}
                        style={{ background: `linear-gradient(135deg, ${experience.color}15, transparent)` }}
                    >
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-5">
                            {[...Array(20)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-2 h-2 rounded-full"
                                    style={{
                                        backgroundColor: experience.color,
                                        left: `${Math.random() * 100}%`,
                                        top: `${Math.random() * 100}%`,
                                    }}
                                    animate={{
                                        scale: [1, 1.5, 1],
                                        opacity: [0.3, 0.8, 0.3],
                                    }}
                                    transition={{
                                        duration: 3 + Math.random() * 2,
                                        repeat: Infinity,
                                        delay: Math.random() * 2,
                                    }}
                                />
                            ))}
                        </div>

                        <div className="relative z-10">
                            <motion.h1
                                className="text-2xl sm:text-4xl lg:text-5xl font-light text-white mb-4 leading-tight"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                            >
                                {experience.designation}
                            </motion.h1>
                            <motion.div
                                className="w-24 h-1 mx-auto rounded-full"
                                style={{ backgroundColor: experience.color }}
                                animate={{ width: [60, 100, 60] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />
                        </div>
                    </BentoCard>

                    {/* Description - Large Bottom Left */}
                    <BentoCard
                        className="col-span-12 sm:col-span-8 row-span-5 overflow-y-auto custom-scrollbar"
                        delay={baseDelay + 0.4}
                    >
                        <div className="flex items-center mb-4">
                            <Icon icon="ph:article" className="w-5 h-5 text-gray-400 mr-2" />
                            <h4 className="text-lg font-medium text-white">Key Achievements</h4>
                        </div>
                        <div className="space-y-4">
                            {experience.description.map((desc, descIndex) => (
                                <motion.div
                                    key={descIndex}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: baseDelay + 0.5 + descIndex * 0.1 }}
                                    className="flex items-start space-x-3"
                                >
                                    <div
                                        className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                                        style={{ backgroundColor: experience.color }}
                                    />
                                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                                        {desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </BentoCard>

                    {/* Technologies - Bottom Right */}
                    <BentoCard
                        className="col-span-12 sm:col-span-4 row-span-5"
                        delay={baseDelay + 0.5}
                    >
                        <div className="flex items-center mb-4">
                            <Icon icon="ph:code" className="w-5 h-5 text-gray-400 mr-2" />
                            <h4 className="text-lg font-medium text-white">Tech Stack</h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {experience.technologies.map((tech, techIndex) => (
                                <motion.span
                                    key={techIndex}
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{
                                        delay: baseDelay + 0.6 + techIndex * 0.05,
                                        type: "spring",
                                        stiffness: 300
                                    }}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/10 text-white/90 border border-white/20 backdrop-blur-sm"
                                    style={{
                                        boxShadow: `0 0 20px ${experience.color}20`,
                                    }}
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </div>
                    </BentoCard>
                </div>
            </div>
        </div>
    );
};

const Experience = () => {
    const { colors, isDarkTheme } = useThemeColors();
    const experienceData = getExperienceData(isDarkTheme);
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Intersection Observer for tracking active section
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = parseInt(entry.target.getAttribute('data-index') || '0');
                    setActiveIndex(index);
                }
            });
        }, observerOptions);

        const sections = document.querySelectorAll('.experience-section');
        sections.forEach((section) => observer.observe(section));

        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };
    }, []);

    return (
        <div ref={containerRef} className="relative">
            {/* Dynamic Background */}
            <div
                className="fixed inset-0 transition-all duration-1000 pointer-events-none"
                style={{
                    background: `${colors.background}, radial-gradient(circle at 30% 20%, ${experienceData[activeIndex]?.color}08 0%, transparent 50%), radial-gradient(circle at 70% 80%, ${experienceData[activeIndex]?.color}05 0%, transparent 50%)`
                }}
            />

            {/* Floating Particles */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full opacity-30"
                        style={{
                            backgroundColor: experienceData[activeIndex]?.color || '#ffffff',
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -100, 0],
                            x: [0, Math.random() * 50 - 25, 0],
                            opacity: [0.3, 0.8, 0.3],
                            scale: [1, 1.5, 1]
                        }}
                        transition={{
                            duration: 4 + Math.random() * 3,
                            repeat: Infinity,
                            delay: Math.random() * 3
                        }}
                    />
                ))}
            </div>

            {/* Progress Indicator */}
            <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
                <div className="flex flex-col space-y-4">
                    {experienceData.map((_, index) => (
                        <motion.div
                            key={index}
                            className={`w-3 h-3 rounded-full border-2 cursor-pointer transition-all duration-300 ${activeIndex === index
                                ? 'scale-125'
                                : 'scale-100 opacity-50'
                                }`}
                            style={{
                                backgroundColor: activeIndex === index ? experienceData[activeIndex].color : 'transparent',
                                borderColor: experienceData[index].color
                            }}
                            whileHover={{ scale: 1.3 }}
                            onClick={() => {
                                document.querySelector(`[data-index="${index}"]`)?.scrollIntoView({
                                    behavior: 'smooth'
                                });
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Experience Sections */}
            <div className="relative z-10">
                <AnimatePresence mode="wait">
                    {experienceData.map((experience, index) => (
                        <div
                            key={experience.id}
                            className="experience-section"
                            data-index={index}
                        >
                            <ExperienceGrid
                                experience={experience}
                                index={index}
                            />
                        </div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Scroll Hint */}
            <motion.div
                className="fixed bottom-8 right-8 z-50"
                initial={{ opacity: 1 }}
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20">
                    <Icon icon="ph:arrow-down" className="w-4 h-4 text-white/70" />
                    <span className="text-sm text-white/70">Scroll to explore</span>
                </div>
            </motion.div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 2px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 2px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.5);
                }
            `}</style>
        </div>
    );
};

export default Experience;
