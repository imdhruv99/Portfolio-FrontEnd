'use client';

import gsap from 'gsap';
import Image from 'next/image';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import educationData from '../../constants/EducationData';
import certificateData from '../../constants/CertificateData';

import { useThemeColors } from '@/hooks/useThemeColors';
import { fontClasses } from '@/config/fonts';


if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const Education = () => {
    const { colors: theme, isDarkTheme, isLoading } = useThemeColors();
    const [mounted, setMounted] = useState(false);
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const headingRef = useRef<HTMLHeadingElement | null>(null);
    const quoteRef = useRef<HTMLDivElement | null>(null);
    const educationHeaderRef = useRef<HTMLDivElement | null>(null);
    const certificationHeaderRef = useRef<HTMLDivElement | null>(null);
    const timelineRef = useRef<HTMLDivElement | null>(null);
    const certificatesRef = useRef<HTMLDivElement | null>(null);

    const educationRefs = useRef<(HTMLDivElement | null)[]>([]);
    const certificateRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        educationRefs.current = Array(educationData.length).fill(null);
        certificateRefs.current = Array(certificateData.length).fill(null);
        setMounted(true);
    }, []);

    useLayoutEffect(() => {
        if (!mounted) return;

        const ctx = gsap.context(() => {
            // Heading animation
            gsap.fromTo(
                headingRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
            );

            // Quote animation
            gsap.fromTo(
                quoteRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power2.out" }
            );

            // Education header animation
            gsap.fromTo(
                educationHeaderRef.current,
                { x: -50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: "back.out(1.2)" }
            );

            // Education items animation
            educationRefs.current.forEach((el, index) => {
                gsap.fromTo(
                    el,
                    {
                        x: -70,
                        opacity: 0,
                        rotationY: -15
                    },
                    {
                        x: 0,
                        opacity: 1,
                        rotationY: 0,
                        duration: 0.9,
                        delay: 0.3 + index * 0.2,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top bottom-=100",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });

            // Certification header animation
            gsap.fromTo(
                certificationHeaderRef.current,
                { x: -50, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: certificationHeaderRef.current,
                        start: "top bottom-=50",
                        toggleActions: "play none none reverse"
                    },
                    ease: "back.out(1.2)"
                }
            );

            // Certificate cards animation
            gsap.fromTo(
                certificateRefs.current,
                {
                    y: 50,
                    opacity: 0,
                    scale: 0.9,
                    rotationX: 5
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    rotationX: 0,
                    duration: 0.7,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: certificatesRef.current,
                        start: "top bottom-=100",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Hover animations for certificate cards
            certificateRefs.current.forEach(card => {
                if (!card) return;
                card.addEventListener('mouseenter', () => {
                    gsap.to(card, {
                        scale: 1.03,
                        rotationY: 5,
                        rotationX: 5,
                        boxShadow: isDarkTheme
                            ? "0 25px 50px -12px rgba(0, 0, 0, 0.7)"
                            : "0 20px 25px -5px rgba(0, 0, 0, 0.08)",
                        duration: 0.4,
                        ease: "power2.out"
                    });
                });

                card.addEventListener('mouseleave', () => {
                    gsap.to(card, {
                        scale: 1,
                        rotationY: 0,
                        rotationX: 0,
                        boxShadow: isDarkTheme
                            ? "0 10px 15px -3px rgba(0, 0, 0, 0.5)"
                            : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        duration: 0.4,
                        ease: "power2.out"
                    });
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [mounted, isDarkTheme]);

    if (!mounted) return null;

    const formatPeriod = (period: string) => period.replace(' - ', ' - ');

    // sorting certificate data based on priority
    const proficiencyLevelOrder = {
        'Specialist': 0,
        'Advanced': 1,
        'Intermediate': 2,
        'Beginner': 3
    };

    const certificateDataByPriority = [...certificateData].sort((a, b) => {
        return proficiencyLevelOrder[a.proficiencyLevel] - proficiencyLevelOrder[b.proficiencyLevel];
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <section
            ref={sectionRef}
            className={`relative w-full min-h-screen ${theme.background} transition-colors duration-500 px-6 py-20`}
        >
            <div className="max-w-5xl mx-auto">
                {/* Main heading with more spacing */}
                <h1
                    ref={headingRef}
                    className={`${fontClasses.classyVogue} text-4xl sm:text-5xl font-serif font-bold text-center tracking-tight leading-tight mb-16 ${theme.educationText}`}
                >
                    Scholarly Achievements
                </h1>

                <div className="w-full border-t border-gray-400 opacity-30 mb-8" />

                {/* Academic Journey Section */}
                <div className="mb-32">
                    <div
                        ref={educationHeaderRef}
                        className={`${theme.educationBorder} pb-3 mb-16 text-center`}
                    >
                        <h2 className={`${fontClasses.classyVogue} text-3xl md:text-4xl font-serif font-bold ${theme.educationText}`}>
                            Academic Journey
                        </h2>
                    </div>

                    <div ref={timelineRef} className="relative">
                        <div className={`absolute left-8 sm:left-1/2 top-0 bottom-0 w-px ${theme.educationTimeLine}`}></div>

                        <div className="space-y-20">
                            {educationData.map((edu, index) => (
                                <div
                                    key={edu.id}
                                    ref={(el) => {
                                        educationRefs.current[index] = el;
                                    }}
                                    className="relative"
                                >
                                    <div className={`absolute left-8 sm:left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full ${theme.educationTimeLineNode} border-4 z-10`}></div>

                                    <div className={`relative sm:w-1/2 ${index % 2 === 0 ? 'ml-16 sm:ml-0' : 'ml-16 sm:ml-auto sm:mr-0'} ${index % 2 === 0 ? 'sm:pr-12' : 'sm:pl-12'}`}>
                                        <div className={`${theme.educationCard} border ${theme.educationBorder} rounded-lg p-8 shadow-md hover:shadow-lg transition-all duration-300 transform perspective-1000 hover:scale-[1.02]`}>
                                            <h3 className={`text-xl font-bold ${theme.educationText}`}>{edu.degree}</h3>
                                            <p className={`text-sm mt-2 ${theme.educationSubtext}`}>{edu.institution}</p>
                                            <div className={`flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 pt-4 border-t ${theme.educationBorder}`}>
                                                <p className={`text-sm ${theme.educationSubtext}`}>{formatPeriod(edu.period)}</p>
                                                <p className={`text-sm font-medium ${theme.educationText} mt-2 sm:mt-0`}>
                                                    Grade: {edu.grade}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Certifications Section */}
                <div className="pt-10">
                    <div
                        ref={certificationHeaderRef}
                        className={`${theme.educationBorder} pb-3 mb-16 text-center`}
                    >
                        <h2 className={`${fontClasses.classyVogue} text-3xl md:text-4xl font-serif font-bold ${theme.educationText}`}>
                            Professional Certifications
                        </h2>
                    </div>

                    <div
                        ref={certificatesRef}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-32"
                    >
                        {certificateDataByPriority.map((cert, index) => (
                            <div
                                key={cert.id}
                                ref={(el) => {
                                    certificateRefs.current[index] = el;
                                }}
                                className={`${theme.educationCard} border ${theme.educationBorder} rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 transform perspective-1000 flex flex-col`}
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                {/* Certificate image and title in a row */}
                                <div className="flex items-center mb-6">
                                    {/* Square certificate image with white background */}
                                    <div className={`w-16 h-16 flex-shrink-0 mr-4 rounded-lg overflow-hidden ${theme.educationBadgeBackground} shadow-sm`}>
                                        {cert.image ? (
                                            <div className="w-full h-full relative bg-white">
                                                <Image
                                                    src={cert.image}
                                                    alt={`${cert.title} certificate`}
                                                    layout="fill"
                                                    objectFit="contain"
                                                    className="p-1"
                                                />
                                            </div>
                                        ) : (
                                            <div className={`w-full h-full flex items-center justify-center ${theme.educationBadgeBackground}`}>
                                                <span className={`text-xs font-medium ${theme.educationSubtext}`}>No Image</span>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <h3 className={`text-lg font-semibold ${theme.educationText} line-clamp-2`}>{cert.title}</h3>
                                        <p className={`text-sm ${theme.educationSubtext} mt-1`}>{cert.issuer}</p>
                                    </div>
                                </div>

                                {/* Skills badges - if available */}
                                {cert.skills && cert.skills.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {cert.skills.slice(0, 3).map((skill, i) => (
                                            <span
                                                key={i}
                                                className={`text-xs px-2 py-1 rounded-full ${isDarkTheme ? 'bg-white/10 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                        {cert.skills.length > 3 && (
                                            <span
                                                className={`text-xs px-2 py-1 rounded-full ${isDarkTheme ? 'bg-white/10 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
                                            >
                                                +{cert.skills.length - 3} more
                                            </span>
                                        )}
                                    </div>
                                )}

                                {/* Push the bottom content to the bottom with flex-grow */}
                                <div className="flex-grow"></div>

                                {/* Horizontal line and date/verification - positioned at bottom */}
                                <div className={`border-t ${theme.educationBorder} mt-auto pt-4 flex justify-between items-center`}>
                                    <p className={`text-xs ${theme.educationSubtext}`}>
                                        {cert.issueDate !== '—' ? cert.issueDate : 'No date'}
                                    </p>
                                    {cert.credentialUrl && (
                                        <a
                                            href={cert.credentialUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`text-xs ${isDarkTheme ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} hover:underline transition-colors duration-300`}
                                        >
                                            Verify →
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Education;
