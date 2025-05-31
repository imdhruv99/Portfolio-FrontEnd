'use client';

import { Icon } from '@iconify/react';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { gsap } from 'gsap';

import { useThemeColors } from '@/hooks/useThemeColors';
import experienceData from '@/constants/ExperienceData';

interface ExperienceItem {
    id: number;
    company: string;
    designation: string;
    period: string;
    description: string[];
    technologies: string[];
    color: string;
}

interface ImmersiveViewProps {
    experience: ExperienceItem;
    colors: ReturnType<typeof useThemeColors>['colors'];
    activeIndex: number;
    totalExperiences: number;
    onNext: () => void;
    onPrev: () => void;
}

const ImmersiveView = ({
    experience,
    colors,
    activeIndex,
    totalExperiences,
    onNext,
    onPrev
}: ImmersiveViewProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center p-4"
        >
            {/* Background */}
            <motion.div
                className="absolute inset-0"
                style={{
                    background: `radial-gradient(circle at center, ${experience.color}15 0%, transparent 70%)`
                }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 8, repeat: Infinity }}
            />

            {/* Navigation */}
            <button
                onClick={onPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center magnetic z-50"
            >
                <Icon icon="ph:arrow-left" className="w-6 h-6 text-white" />
            </button>

            <button
                onClick={onNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center magnetic z-50"
            >
                <Icon icon="ph:arrow-right" className="w-6 h-6 text-white" />
            </button>

            {/* Main Content */}
            <motion.div
                key={activeIndex}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-5xl mx-auto text-center"
            >
                <motion.div
                    className="w-24 h-24 mx-auto mb-8 rounded-3xl flex items-center justify-center"
                    style={{ backgroundColor: `${experience.color}20` }}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <Icon icon="ph:building-office" className="w-12 h-12" style={{ color: experience.color }} />
                </motion.div>

                <motion.h1
                    className={`text-4xl sm:text-6xl lg:text-7xl font-extralight ${colors.heroText} mb-4`}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                >
                    {experience.company}
                </motion.h1>

                <motion.div className="mb-12">
                    <p className={`text-xl sm:text-2xl ${colors.subtext} mb-2`}>
                        {experience.designation}
                    </p>
                    <p className={`text-lg ${colors.metaText}`}>
                        {experience.period}
                    </p>
                </motion.div>

                <motion.div
                    className="max-w-3xl mx-auto mb-12"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="space-y-4">
                        {experience.description.slice(0, 2).map((desc, index) => (
                            <motion.p
                                key={index}
                                className={`text-lg ${colors.descriptionText} leading-relaxed`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + index * 0.2 }}
                            >
                                {desc}
                            </motion.p>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="mb-8"
                >
                    <div className="flex flex-wrap justify-center gap-3">
                        {experience.technologies.map((tech, index) => (
                            <motion.span
                                key={index}
                                className={`px-4 py-2 rounded-full text-sm font-medium ${colors.techBadge} backdrop-blur-sm border border-white/20`}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.9 + index * 0.05 }}
                                whileHover={{ scale: 1.1 }}
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>

                <div className="flex justify-center gap-2">
                    {[...Array(totalExperiences)].map((_, index) => (
                        <motion.div
                            key={index}
                            className={`w-2 h-2 rounded-full ${index === activeIndex ? 'bg-white' : 'bg-white/30'}`}
                            animate={index === activeIndex ? { scale: [1, 1.5, 1] } : {}}
                            transition={{ duration: 1, repeat: Infinity }}
                        />
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};

const Experience = () => {
    const { colors } = useThemeColors();
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement | null>(null);

    // GSAP Magnetic Effect for Interactive Elements
    useEffect(() => {
        const magneticElements = containerRef.current?.querySelectorAll('.magnetic');

        magneticElements?.forEach(element => {
            const handleMouseMove = (e: MouseEvent) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                gsap.to(element, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.3,
                    ease: "power2.out"
                });
            };

            const handleMouseLeave = () => {
                gsap.to(element, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.3)"
                });
            };

            (element as HTMLElement).addEventListener('mousemove', handleMouseMove);
            (element as HTMLElement).addEventListener('mouseleave', handleMouseLeave);

            return () => {
                (element as HTMLElement).removeEventListener('mousemove', handleMouseMove);
                (element as HTMLElement).removeEventListener('mouseleave', handleMouseLeave);
            };
        });
    }, []);

    // Auto-advance
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % experienceData.length);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div ref={containerRef} className={`min-h-screen ${colors.background} relative overflow-hidden`}>
            <motion.div
                className="fixed inset-0 transition-all duration-1000"
                style={{
                    background: `radial-gradient(circle at 30% 20%, ${experienceData[activeIndex]?.color}08 0%, transparent 50%), radial-gradient(circle at 70% 80%, ${experienceData[activeIndex]?.color}05 0%, transparent 50%)`
                }}
            />

            <div className="fixed inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full opacity-20"
                        style={{
                            backgroundColor: experienceData[activeIndex]?.color || '#ffffff',
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0.2, 0.8, 0.2],
                            scale: [1, 1.5, 1]
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2
                        }}
                    />
                ))}
            </div>

            <div className="pt-24 pb-16">
                <AnimatePresence mode="wait">
                    <ImmersiveView
                        key="immersive"
                        experience={experienceData[activeIndex]}
                        colors={colors}
                        activeIndex={activeIndex}
                        totalExperiences={experienceData.length}
                        onNext={() => setActiveIndex((prev) => (prev + 1) % experienceData.length)}
                        onPrev={() => setActiveIndex((prev) => (prev - 1 + experienceData.length) % experienceData.length)}
                    />
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Experience;
