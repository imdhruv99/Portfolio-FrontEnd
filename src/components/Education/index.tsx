'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface EducationProps {
    isDarkTheme: boolean;
}

const Education = ({ isDarkTheme }: EducationProps) => {
    const [mounted, setMounted] = useState(false);
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const headingRef = useRef<HTMLHeadingElement | null>(null);
    const paraRef = useRef<HTMLParagraphElement | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useLayoutEffect(() => {
        if (!mounted) return;

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        if (headingRef.current && paraRef.current) {
            tl.fromTo(
                headingRef.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1 }
            ).fromTo(
                paraRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 },
                '-=0.5'
            );
        }

        return () => {
            gsap.killTweensOf([headingRef.current, paraRef.current]);
        };
    }, [mounted]);

    if (!mounted) return null;

    const lightTheme = {
        background: 'bg-gradient-to-br from-[#ffffff] via-[#f5f5f5] to-[#eaeaea]',
        text: 'text-gray-900',
        subtext: 'text-gray-600',
        accent: 'text-neutral-500',
    };

    const darkTheme = {
        background: 'bg-gradient-to-br from-[#0f0f0f] via-[#1b1b1b] to-[#121212]',
        text: 'text-gray-100',
        subtext: 'text-gray-400',
        accent: 'text-gray-600',
    };

    const theme = isDarkTheme ? darkTheme : lightTheme;

    return (
        <section
            ref={sectionRef}
            className={`relative w-full min-h-screen ${theme.background} transition-colors duration-500 px-6 py-24 flex items-center justify-center`}
        >
            <div className="max-w-4xl w-full text-center space-y-10">
                <h1
                    ref={headingRef}
                    className={`text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight leading-tight ${theme.text}`}
                >
                    My Academic Journey
                </h1>
                <p
                    ref={paraRef}
                    className={`text-lg sm:text-xl font-light max-w-2xl mx-auto ${theme.subtext}`}
                >
                    A timeline shaped by passion, discipline, and discovery. From foundational concepts to advanced research, each chapter of my education has built the lens through which I view the world.
                </p>

                {/* Timeline placeholder */}
                <div className="w-full mt-20 space-y-16">
                    {/* You can map these from data if desired */}
                    <div className="border-l-2 pl-6 border-gray-300 dark:border-white/10">
                        <h3 className={`text-xl font-semibold ${theme.text}`}>Bachelor of Technology in Computer Science</h3>
                        <p className={`text-sm mt-1 ${theme.accent}`}>XYZ University · 2017 – 2021</p>
                        <p className={`mt-2 text-sm ${theme.subtext}`}>
                            Specialized in software systems, algorithms, and human-centered computing.
                        </p>
                    </div>
                    <div className="border-l-2 pl-6 border-gray-300 dark:border-white/10">
                        <h3 className={`text-xl font-semibold ${theme.text}`}>High School – Science</h3>
                        <p className={`text-sm mt-1 ${theme.accent}`}>ABC Senior Secondary School · 2015 – 2017</p>
                        <p className={`mt-2 text-sm ${theme.subtext}`}>
                            Focused on mathematics, physics, and foundational programming.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Education;
