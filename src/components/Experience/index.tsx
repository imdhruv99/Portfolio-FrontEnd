'use client';

import { Icon } from '@iconify/react';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useThemeColors } from '@/hooks/useThemeColors';
import experienceData from '@/constants/ExperienceData';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface ExperienceItem {
    id: number;
    company: string;
    designation: string;
    period: string;
    description: string[];
    technologies: string[];
    color: string;
}

interface ExperienceCardProps {
    experience: ExperienceItem;
    colors: ReturnType<typeof useThemeColors>['colors'];
    index: number;
}

const ExperienceCard = ({ experience, colors, index }: ExperienceCardProps) => {
    return (
        <motion.div
            className="flex-shrink-0 w-screen h-screen flex items-center justify-center p-8"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
        >
            <div className="max-w-4xl mx-auto text-center">
                {/* Company Icon */}
                <motion.div
                    className="w-24 h-24 mx-auto mb-8 rounded-3xl flex items-center justify-center"
                    style={{ backgroundColor: `${experience.color}20` }}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <Icon
                        icon="ph:building-office"
                        className="w-12 h-12"
                        style={{ color: experience.color }}
                    />
                </motion.div>

                {/* Designation */}
                <motion.h1
                    className={`text-4xl sm:text-6xl lg:text-7xl font-extralight ${colors.heroText} mb-4`}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                >
                    {experience.designation}
                </motion.h1>

                {/* Company & Period */}
                <motion.div className="mb-12">
                    <p className={`text-xl sm:text-2xl ${colors.subtext} mb-2`}>
                        {experience.company}
                    </p>
                    <p className={`text-lg ${colors.metaText}`}>
                        {experience.period}
                    </p>
                </motion.div>

                {/* Description */}
                <motion.div
                    className="max-w-3xl mx-auto mb-12"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="space-y-2">
                        {experience.description.slice(0, 7).map((desc, descIndex) => (
                            <motion.p
                                key={descIndex}
                                className={`text-md ${colors.descriptionText} leading-relaxed text-justify`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + descIndex * 0.2 }}
                            >
                                {desc}
                            </motion.p>
                        ))}
                    </div>
                </motion.div>

                {/* Technologies */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="mb-8"
                >
                    <div className="flex flex-wrap justify-center gap-3">
                        {experience.technologies.map((tech, techIndex) => (
                            <motion.span
                                key={techIndex}
                                className={`px-4 py-2 rounded-full text-sm font-medium ${colors.techBadge} backdrop-blur-sm border border-white/20`}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.9 + techIndex * 0.05 }}
                                whileHover={{ scale: 1.1 }}
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

const Experience = () => {
    const { colors } = useThemeColors();
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const horizontalRef = useRef<HTMLDivElement | null>(null);

    // Horizontal Scroll Effect
    useEffect(() => {
        if (!horizontalRef.current || !containerRef.current) return;

        const horizontalElement = horizontalRef.current;
        const containerElement = containerRef.current;

        // Calculate total width needed for horizontal scroll
        const totalWidth = experienceData.length * window.innerWidth;

        // Slower Scroll
        gsap.set(containerElement, {
            height: totalWidth * 1.5
        });

        // Create horizontal scroll animation with slower scrub
        const scrollTween = gsap.to(horizontalElement, {
            x: -(totalWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
                trigger: containerElement,
                start: "top top",
                end: "bottom bottom",
                scrub: 2,
                pin: horizontalElement,
                invalidateOnRefresh: true,
                anticipatePin: 1,
                onUpdate: (self) => {
                    const newIndex = Math.round(self.progress * (experienceData.length - 1));
                    setActiveIndex(newIndex);
                }
            }
        });

        // Handle resize
        const handleResize = () => {
            scrollTween.scrollTrigger?.refresh();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            scrollTween.scrollTrigger?.kill();
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Magnetic Effect for Interactive Elements
    useEffect(() => {
        const magneticElements = document.querySelectorAll('.magnetic');

        const handleMouseMove = (e: MouseEvent) => {
            const target = e.currentTarget as HTMLElement;
            const rect = target.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(target, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: "power2.out"
            });
        };

        const handleMouseLeave = (e: MouseEvent) => {
            const target = e.currentTarget as HTMLElement;
            gsap.to(target, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.3)"
            });
        };

        magneticElements.forEach(element => {
            (element as HTMLElement).addEventListener('mousemove', handleMouseMove);
            (element as HTMLElement).addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            magneticElements.forEach(element => {
                (element as HTMLElement).removeEventListener('mousemove', handleMouseMove);
                (element as HTMLElement).removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);


    return (
        <div ref={containerRef} className="relative">
            {/* Fixed Background */}
            <motion.div
                className="fixed inset-0 transition-all duration-1000 pointer-events-none"
                style={{
                    background: `${colors.background}, radial-gradient(circle at 30% 20%, ${experienceData[activeIndex]?.color}08 0%, transparent 50%), radial-gradient(circle at 70% 80%, ${experienceData[activeIndex]?.color}05 0%, transparent 50%)`
                }}
            />

            {/* Animated Particles */}
            <div className="fixed inset-0 pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full opacity-20"
                        style={{
                            backgroundColor: experienceData[activeIndex]?.color || '#ffffff',
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -150, 0],
                            opacity: [0.2, 0.8, 0.2],
                            scale: [1, 1.8, 1]
                        }}
                        transition={{
                            duration: 4 + Math.random() * 3,
                            repeat: Infinity,
                            delay: Math.random() * 3
                        }}
                    />
                ))}
            </div>

            {/* Horizontal Scroll Container */}
            <div
                ref={horizontalRef}
                className="flex w-fit h-screen"
                style={{
                    width: `${experienceData.length * 100}vw`,
                }}
            >
                <AnimatePresence mode="wait">
                    {experienceData.map((experience, index) => (
                        <ExperienceCard
                            key={experience.id}
                            experience={experience}
                            colors={colors}
                            index={index}
                        />
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
                    <Icon icon="ph:mouse" className="w-4 h-4 text-white/70" />
                    <span className="text-sm text-white/70">Scroll to explore</span>
                </div>
            </motion.div>
        </div>
    );
};

export default Experience;
