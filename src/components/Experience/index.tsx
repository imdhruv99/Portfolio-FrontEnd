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
    image: string;
}

interface BentoCardProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    style?: React.CSSProperties;
    isDarkTheme: boolean
}

const BentoCard = ({ children, className = '', delay = 0, style, isDarkTheme }: BentoCardProps) => (
    <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay }}
        viewport={{ once: true, margin: "-50px" }}
        className={`backdrop-blur-xl bg-white/5 border ${isDarkTheme ? 'border-white/10' : 'border-gray-200'} rounded-3xl p-6 hover:bg-white/10 transition-all duration-300 ${className}`}
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
    const { colors, isDarkTheme } = useThemeColors();
    const baseDelay = index * 0.1;

    return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
            <div className="w-full max-w-7xl mx-auto">
                <div className="grid grid-cols-14 grid-rows-14 gap-4 h-[90vh] min-h-[600px]">

                    {/* First Row */}

                    {/* Company Logo Image */}
                    <BentoCard
                        className="col-span-6 sm:col-span-4 row-span-3 flex justify-center items-center"
                        delay={baseDelay + 0.1}
                        isDarkTheme={isDarkTheme}
                    >
                        <div>
                            <Image
                                src={experience.image}
                                alt="Company Logo"
                                layout="fill"
                                objectFit="contain"
                                className="p-1"
                            />
                        </div>
                    </BentoCard>

                    {/* I will add some design here */}
                    <BentoCard
                        className="col-span-6 sm:col-span-3 row-span-3 flex flex-col justify-center items-center text-center"
                        delay={baseDelay}
                        style={{ background: `${colors.card}` }}
                        isDarkTheme={isDarkTheme}
                    >
                        <div>Just Design</div>
                    </BentoCard>

                    {/* Company Name and Period */}
                    <BentoCard
                        className="col-span-6 sm:col-span-3 row-span-3 flex flex-col justify-center items-center text-center"
                        delay={baseDelay}
                        style={{ background: `${colors.card}` }}
                        isDarkTheme={isDarkTheme}
                    >
                        <h3 className={`text-lg sm:text-xl font-semibold ${colors.text} mb-2`}>
                            {experience.company}
                        </h3>
                        <p className={`text-sm ${colors.subtext}`}>{experience.period}</p>
                    </BentoCard>

                    {/* Icon Cloud */}
                    <BentoCard
                        className="col-span-6 sm:col-span-4 row-span-6 flex flex-col justify-center items-center text-center"
                        delay={baseDelay}
                        style={{ background: `${colors.card}` }}
                        isDarkTheme={isDarkTheme}
                    >
                        <div> Tech Icon Cloud will come here</div>
                    </BentoCard>

                    {/* Second Row */}

                    {/* Some Design again will be here */}
                    <BentoCard
                        className="col-span-6 sm:col-span-4 row-span-3 flex justify-center items-center"
                        delay={baseDelay + 0.1}
                        isDarkTheme={isDarkTheme}
                    >
                        <div>
                            I will add some design here again
                        </div>
                    </BentoCard>

                    {/* Designation */}
                    <BentoCard
                        className="col-span-12 sm:col-span-6 row-span-3 flex items-center justify-center relative overflow-hidden"
                        delay={baseDelay + 0.3}
                        style={{ background: `${colors.card}` }}
                        isDarkTheme={isDarkTheme}
                    >
                        <div className="relative z-10 text-center">
                            <h1
                                className={`text-2xl sm:text-4xl lg:text-5xl font-light ${colors.text}`}
                            >
                                {experience.designation}
                            </h1>
                        </div>
                    </BentoCard>

                    {/* Third Row */}

                    {/* Description */}
                    <BentoCard
                        className="col-span-12 sm:col-span-10 row-span-4 overflow-y-auto custom-scrollbar"
                        delay={baseDelay + 0.4}
                        isDarkTheme={isDarkTheme}
                    >
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
                                    />
                                    <ul className="list-disc">
                                        <li className={`text-sm sm:text-base ${colors.descriptionText} text-justify`}>
                                            {desc}
                                        </li>
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </BentoCard>

                    {/* Some element again will be here */}
                    <BentoCard
                        className="col-span-6 sm:col-span-4 row-span-4 flex justify-center items-center"
                        delay={baseDelay + 0.1}
                        isDarkTheme={isDarkTheme}
                    >
                        <div>
                            I will add some design here again
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
            {/* Floating Particles */}
            <div
                className="fixed inset-0 transition-all duration-1000 pointer-events-none"
                style={{
                    background: `${colors.background}, radial-gradient(circle at 30% 20%, ${colors.pulseDot} 0%, transparent 50%), radial-gradient(circle at 70% 80%, ${colors.pulseDot} 0%, transparent 50%)`
                }}
            />

            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full opacity-30"
                    style={{
                        backgroundColor: colors.floatingElement,
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
                                backgroundColor: activeIndex === index ? colors.iconColor : 'transparent',
                                borderColor: colors.iconColor
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
