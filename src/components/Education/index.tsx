'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import educationData from '../../constants/EducationData';
import sortedCertificateData from '../../constants/CertificateData';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface EducationProps {
    isDarkTheme: boolean;
}

const Education = ({ isDarkTheme }: EducationProps) => {
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
        certificateRefs.current = Array(sortedCertificateData.length).fill(null);
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

    const lightTheme = {
        background: 'bg-gradient-to-r from-[#ffffff] via-[#f5f5f5] to-[#eaeaea]',
        text: 'text-gray-900',
        subtext: 'text-gray-600',
        accent: 'text-gray-400',
        border: 'border-gray-200',
        card: 'bg-white',
        timeline: 'bg-gray-200',
        timelineNode: 'bg-gray-400 border-white',
    };

    const darkTheme = {
        background: 'bg-gradient-to-br from-[#0e0e0e] via-[#1a1a1a] to-[#121212]',
        text: 'text-white',
        subtext: 'text-gray-400',
        accent: 'text-white/20',
        border: 'border-white/10',
        card: 'bg-white/5',
        timeline: 'bg-white/10',
        timelineNode: 'bg-white/30 border-[#121212]',
    };

    const theme = isDarkTheme ? darkTheme : lightTheme;

    // Inspirational quotes about education
    const quotes = [
        {
            text: "Education is not the filling of a pail, but the lighting of a fire.",
            author: "William Butler Yeats"
        },
        {
            text: "The beautiful thing about learning is that no one can take it away from you.",
            author: "B.B. King"
        },
        {
            text: "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.",
            author: "Malcolm X"
        }
    ];

    // Select a random quote
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    const formatPeriod = (period: string) => period.replace(' - ', ' – ');

    return (
        <section
            ref={sectionRef}
            className={`relative w-full min-h-screen ${theme.background} transition-colors duration-500 px-6 py-20`}
        >
            <div className="max-w-5xl mx-auto">
                {/* Main heading with more spacing */}
                <h1
                    ref={headingRef}
                    className={`text-4xl sm:text-5xl font-serif font-bold text-center tracking-tight leading-tight mb-16 ${theme.text}`}
                >
                    Education & Credentials
                </h1>

                {/* Quote Section */}
                <div
                    ref={quoteRef}
                    className="mb-24 max-w-3xl mx-auto text-center"
                >
                    <p className={`text-xl sm:text-2xl italic ${theme.text} mb-3`}>"{randomQuote.text}"</p>
                    <p className={`text-sm ${theme.subtext}`}>— {randomQuote.author}</p>
                </div>

                {/* Academic Journey Section */}
                <div className="mb-32">
                    <div
                        ref={educationHeaderRef}
                        className={`border-b ${theme.border} pb-3 mb-16`}
                    >
                        <h2 className={`text-3xl md:text-4xl font-serif font-bold ${theme.text}`}>
                            Academic Journey
                        </h2>
                    </div>

                    <div ref={timelineRef} className="relative">
                        <div className={`absolute left-8 sm:left-1/2 top-0 bottom-0 w-px ${theme.timeline}`}></div>

                        <div className="space-y-20">
                            {educationData.map((edu, index) => (
                                <div
                                    key={edu.id}
                                    ref={(el) => {
                                        educationRefs.current[index] = el;
                                    }}
                                    className="relative"
                                >
                                    <div className={`absolute left-8 sm:left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full ${theme.timelineNode} border-4 z-10`}></div>

                                    <div className={`relative sm:w-1/2 ${index % 2 === 0 ? 'ml-16 sm:ml-0' : 'ml-16 sm:ml-auto sm:mr-0'} ${index % 2 === 0 ? 'sm:pr-12' : 'sm:pl-12'}`}>
                                        <div className={`${theme.card} border ${theme.border} rounded-lg p-8 shadow-md hover:shadow-lg transition-all duration-300 transform perspective-1000 hover:scale-[1.02]`}>
                                            <h3 className={`text-xl font-bold ${theme.text}`}>{edu.degree}</h3>
                                            <p className={`text-sm mt-2 ${theme.accent}`}>{edu.institution}</p>
                                            <div className={`flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 pt-4 border-t ${theme.border}`}>
                                                <p className={`text-sm ${theme.subtext}`}>{formatPeriod(edu.period)}</p>
                                                <p className={`text-sm font-medium ${theme.text} mt-2 sm:mt-0`}>
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
                        className={`border-b ${theme.border} pb-3 mb-16`}
                    >
                        <h2 className={`text-3xl md:text-4xl font-serif font-bold ${theme.text}`}>
                            Professional Certifications
                        </h2>
                    </div>

                    <div
                        ref={certificatesRef}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {sortedCertificateData.map((cert, index) => (
                            <div
                                key={cert.id}
                                ref={(el) => {
                                    certificateRefs.current[index] = el;
                                }}
                                className={`${theme.card} border ${theme.border} rounded-lg p-8 shadow-md hover:shadow-xl transition-all duration-300 transform perspective-1000`}
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                <h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>{cert.title}</h3>
                                <div className={`flex justify-between items-center mt-auto pt-4 border-t ${theme.border}`}>
                                    <p className={`text-xs ${theme.accent}`}>
                                        {cert.issueDate !== '—' ? cert.issueDate : 'No date'}
                                    </p>
                                    {cert.credentialUrl && (
                                        <a
                                            href={cert.credentialUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`text-xs ${theme.subtext} hover:underline transition-colors duration-300`}
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
