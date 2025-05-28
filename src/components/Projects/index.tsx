'use client';

import './Projects.css';

import { gsap } from 'gsap';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import React, { useEffect, useRef, useState, useCallback, useLayoutEffect } from 'react';

import projectData from '@/constants/projectsData';
import techIconMap from '@/constants/techIconMap';
import NavigationDots from '../NavigationDots';
import { useThemeColors } from '@/hooks/useThemeColors';

const requestDeviceMotionPermission = async (): Promise<boolean> => {
    if (
        typeof DeviceMotionEvent !== 'undefined' &&
        'requestPermission' in DeviceMotionEvent &&
        typeof DeviceMotionEvent.requestPermission === 'function'
    ) {
        try {
            const permissionState = await DeviceMotionEvent.requestPermission();
            return permissionState === 'granted';
        } catch {
            return false;
        }
    }
    return true;
};

const Projects = () => {
    const { colors: theme, isDarkTheme, isLoading } = useThemeColors();
    const [currentProject, setCurrentProject] = useState(0);
    const [displayProject, setDisplayProject] = useState(projectData[0]);
    const [isMobile, setIsMobile] = useState(false);
    const [deviceMotionPermissionGranted, setDeviceMotionPermissionGranted] = useState(false);

    const titleRef = useRef<HTMLHeadingElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const indexRef = useRef<HTMLDivElement>(null);
    const techRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const scrollLocked = useRef(false);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);
    const dotsRef = useRef<HTMLDivElement>(null);
    const rotationTargetX = useRef(0);
    const rotationTargetY = useRef(0);
    const rotationTimeline = useRef<gsap.core.Timeline | null>(null);
    const rAFId = useRef<number | null>(null);

    useEffect(() => {
        setDisplayProject(projectData[currentProject]);
    }, [currentProject]);

    const animateProjectChange = useCallback((direction: 'next' | 'prev', newIndex: number) => {
        if (scrollLocked.current) return;
        scrollLocked.current = true;

        const cardElement = cardRef.current;
        if (!cardElement) {
            scrollLocked.current = false;
            return;
        }

        const tl = gsap.timeline({
            defaults: { ease: 'power2.inOut', force3D: true },
            onComplete: () => {
                setCurrentProject(newIndex);
                scrollLocked.current = false;
            },
        });

        if (direction === 'next') {
            tl.to(cardElement, {
                y: '-=100%',
                opacity: 0,
                duration: 0.5,
                ease: 'power2.in',
            });
        } else {
            tl.to(cardElement, {
                y: '+=100%',
                opacity: 0,
                duration: 0.5,
                ease: 'power2.in',
            });
        }

        tl.add(() => {
            setDisplayProject(projectData[newIndex]);
            setTimeout(() => setCurrentProject(newIndex), 50);
            gsap.set(cardElement, {
                y: direction === 'next' ? '100%' : '-100%',
                opacity: 0,
            });
        });

        tl.to(cardElement, {
            y: '0%',
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
        });

        tl.to(cardElement, { rotateX: 0, rotateY: 0, duration: 0.4, ease: 'power2.out' }, "<0.3");
    }, []);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (isMobile || !cardRef.current) return;
        const { left, top, width, height } = cardRef.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        const rotateY = (mouseX / (width / 2)) * 2;
        const rotateX = (mouseY / (height / 2)) * -2;

        rotationTargetX.current = rotateX;
        rotationTargetY.current = rotateY;

        if (rotationTimeline.current) rotationTimeline.current.kill();

        rotationTimeline.current = gsap.timeline({ defaults: { ease: 'power4.out', duration: 0.6 } })
            .to(cardRef.current, {
                rotateX: rotationTargetX.current,
                rotateY: rotationTargetY.current,
                transformPerspective: 1000,
                transformOrigin: "center center",
            });
    }, [isMobile]);

    const handleMouseLeave = useCallback(() => {
        if (isMobile || !cardRef.current) return;
        if (rotationTimeline.current) rotationTimeline.current.kill();

        rotationTimeline.current = gsap.timeline({ defaults: { ease: 'power4.out', duration: 0.8 } })
            .to(cardRef.current, {
                rotateX: 0,
                rotateY: 0,
                transformPerspective: 1000,
            });
    }, [isMobile]);

    const handleDeviceOrientation = useCallback((e: DeviceOrientationEvent) => {
        if (!cardRef.current || !isMobile || !deviceMotionPermissionGranted) return;
        if (rAFId.current !== null) cancelAnimationFrame(rAFId.current);

        rAFId.current = requestAnimationFrame(() => {
            const beta = e.beta || 0;
            const gamma = e.gamma || 0;

            const rotateX = gsap.utils.mapRange(-30, 30, 2, -2, gamma);
            const rotateY = gsap.utils.mapRange(-30, 30, -2, 2, beta);

            rotationTargetX.current = rotateX;
            rotationTargetY.current = rotateY;

            if (rotationTimeline.current) rotationTimeline.current.kill();

            rotationTimeline.current = gsap.timeline({ defaults: { ease: 'power4.out', duration: 0.6 } })
                .to(cardRef.current, {
                    rotateX: rotationTargetX.current,
                    rotateY: rotationTargetY.current,
                    transformPerspective: 1000,
                    transformOrigin: "center center",
                });

            rAFId.current = null;
        });
    }, [isMobile, deviceMotionPermissionGranted]);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (scrollLocked.current) return;
        const swipeDistance = touchStartX.current - touchEndX.current;
        if (Math.abs(swipeDistance) > 50) {
            const direction = swipeDistance > 0 ? 'next' : 'prev';
            const newIndex = direction === 'next'
                ? (currentProject + 1) % projectData.length
                : (currentProject - 1 + projectData.length) % projectData.length;

            animateProjectChange(direction, newIndex);
        }
    };

    const handleScroll = useCallback((e: WheelEvent) => {
        if (scrollLocked.current || isMobile || Math.abs(e.deltaY) < 30) return;
        const direction = e.deltaY > 0 ? 'next' : 'prev';
        const newIndex = direction === 'next'
            ? (currentProject + 1) % projectData.length
            : (currentProject - 1 + projectData.length) % projectData.length;

        animateProjectChange(direction, newIndex);
    }, [isMobile, currentProject, animateProjectChange]);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) {
            if (
                typeof DeviceMotionEvent !== 'undefined' &&
                'requestPermission' in DeviceMotionEvent &&
                typeof DeviceMotionEvent.requestPermission === 'function'
            ) {
            } else {
                setDeviceMotionPermissionGranted(true);
                window.addEventListener('deviceorientation', handleDeviceOrientation);
            }
        } else {
            window.removeEventListener('deviceorientation', handleDeviceOrientation);
            if (rAFId.current !== null) {
                cancelAnimationFrame(rAFId.current);
                rAFId.current = null;
            }
        }
        return () => {
            window.removeEventListener('deviceorientation', handleDeviceOrientation);
            if (rAFId.current !== null) {
                cancelAnimationFrame(rAFId.current);
                rAFId.current = null;
            }
        };
    }, [isMobile, handleDeviceOrientation]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power2.out', force3D: true } });
            if (indexRef.current && cardRef.current && dotsRef.current) {
                tl.from(indexRef.current, { opacity: 0, x: -30, duration: 0.5 });
                tl.from(cardRef.current, {
                    opacity: 0,
                    y: 30,
                    scale: 0.97,
                    duration: 0.7,
                }, '-=0.3');
                tl.from(dotsRef.current, { x: -50, opacity: 0, duration: 0.8 }, '<0.1');
            }
        });
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (!isMobile) {
            window.addEventListener('wheel', handleScroll, { passive: true });
            return () => window.removeEventListener('wheel', handleScroll);
        }
    }, [handleScroll, isMobile]);

    const handleRequestPermission = async () => {
        const granted = await requestDeviceMotionPermission();
        setDeviceMotionPermissionGranted(granted);
        if (granted) {
            window.addEventListener('deviceorientation', handleDeviceOrientation);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    const projectToDisplay = displayProject;

    return (
        <div
            className={`min-h-screen overflow-hidden relative transition-colors duration-500 ${theme.background}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Background Pattern */}
            <div className={`fixed inset-0 ${theme.patternBackground}`} />

            <div
                className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-8"
                onMouseMove={!isMobile ? handleMouseMove : undefined}
                onMouseLeave={!isMobile ? handleMouseLeave : undefined}
            >
                {/* iOS 13+ Permission Prompt for Device Motion */}
                {isMobile && !deviceMotionPermissionGranted &&
                    typeof DeviceMotionEvent !== 'undefined' &&
                    'requestPermission' in DeviceMotionEvent &&
                    typeof DeviceMotionEvent.requestPermission === 'function'
                    && (
                        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-50 p-4">
                            <p className="text-white text-center mb-4">
                                To enable the interactive card experience, please allow access to device motion sensors.
                            </p>
                            <button
                                onClick={handleRequestPermission}
                                className={`px-6 py-3 rounded-full text-sm font-medium ${theme.button}`}
                            >
                                Enable Motion
                            </button>
                        </div>
                    )}

                {/* Index Counter */}
                <div
                    ref={indexRef}
                    className={`absolute left-4 sm:left-8 top-8 sm:top-12 will-change-transform z-20`}
                >
                    <div className={`text-xs sm:text-sm font-mono tracking-[0.2em] ${theme.indexText} opacity-60`}>
                        {String(currentProject + 1).padStart(4, '0')}
                    </div>
                </div>

                {/* Tech Stack - Top Right */}
                <div ref={techRef} className="absolute top-4 sm:top-8 right-4 sm:right-8 z-20">
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-end max-w-xs sm:max-w-sm">
                        {projectToDisplay.technicalStack.slice(0, isMobile ? 4 : 6).map((tech) => {
                            const key = tech.replace(/\s+|\.|-/g, '').replace(/js/i, 'Js');
                            const icon = techIconMap[key]?.[isDarkTheme ? 'dark' : 'light'] || `logos:${key.toLowerCase()}`;
                            return (
                                <div key={tech} className={`flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-medium px-2 sm:px-3 py-1 sm:py-1.5 rounded-full ${theme.techBadge} backdrop-blur-md`}>
                                    <Icon icon={icon} width={isMobile ? "12" : "14"} height={isMobile ? "12" : "14"} />
                                    <span className="hidden sm:inline">{tech}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Main Card */}
                <div ref={cardRef} className={`relative w-full max-w-6xl will-change-transform`}>
                    <div className={`relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] rounded-3xl sm:rounded-[2rem] overflow-hidden ${theme.card} backdrop-blur-xl shadow-2xl`}>
                        {/* Background Image or Pattern */}
                        {projectToDisplay.image ? (
                            <Image
                                src={projectToDisplay.image}
                                alt={projectToDisplay.title}
                                fill
                                style={{ objectFit: 'cover' }}
                                className="absolute inset-0 z-0"
                            />
                        ) : (
                            <div className={`absolute inset-0 z-0 ${theme.cardPattern}`} />
                        )}

                        {/* Gradient Overlay */}
                        <div className={`absolute inset-0 z-10 ${theme.gradientOverlay}`} />

                        {/* Content Area */}
                        <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-8 lg:p-12">
                            {/* Top Area - Year Badge */}
                            <div className="flex justify-between items-start">
                                <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium ${theme.yearBadge} backdrop-blur-md`}>
                                    {projectToDisplay.yearOfDevelopment}
                                </div>
                            </div>

                            {/* Bottom Area - Main Content */}
                            <div className="space-y-4 sm:space-y-6">
                                {/* Project Title */}
                                <div className="space-y-2 sm:space-y-3">
                                    <h1 ref={titleRef} className={`text-4xl sm:text-6xl lg:text-8xl font-black tracking-tight ${theme.heroText} leading-[0.85] break-words`}>
                                        {projectToDisplay.title.toUpperCase()}
                                    </h1>

                                    {/* Category and Description */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 mt-4 sm:mt-6">
                                        <div className="space-y-2">
                                            <div className={`text-xs sm:text-sm font-medium tracking-[0.15em] ${theme.categoryText} opacity-70`}>
                                                {projectToDisplay.category.toUpperCase()}
                                            </div>
                                            <div className={`text-xs sm:text-sm font-mono ${theme.metaText} opacity-50`}>
                                                WEB DEVELOPMENT
                                            </div>
                                        </div>

                                        <div className="lg:max-w-md">
                                            <p ref={descRef} className={`text-sm sm:text-base leading-relaxed ${theme.descriptionText} opacity-80`}>
                                                {projectToDisplay.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute top-4 sm:top-6 left-4 sm:left-6 flex gap-2 z-30">
                            <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${theme.statusDot1} animate-pulse`} />
                            <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${theme.statusDot2} animate-pulse`} style={{ animationDelay: '0.5s' }} />
                            <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${theme.statusDot3} animate-pulse`} style={{ animationDelay: '1s' }} />
                        </div>
                    </div>

                    {/* Links Section */}
                    <div ref={linksRef} className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-6 sm:gap-8">
                            <div className={`text-xs sm:text-sm font-mono tracking-[0.15em] ${theme.linkText} opacity-60`}>
                                LINKS
                            </div>
                            <div className="flex gap-3 sm:gap-4">
                                {projectToDisplay.link?.map((url, idx) => (
                                    <a
                                        key={idx}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full ${theme.linkButton} backdrop-blur-md transition-all duration-300 hover:scale-105`}
                                    >
                                        <Icon icon={techIconMap.Github[isDarkTheme ? 'dark' : 'light']} width={isMobile ? "16" : "18"} height={isMobile ? "16" : "18"} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <NavigationDots
                currentIndex={currentProject}
                total={projectData.length}
                isDark={isDarkTheme}
                setCurrentProject={setCurrentProject}
                isMobile={isMobile}
            />

            {/* Floating Background Elements */}
            <div ref={dotsRef} className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: isMobile ? 8 : 15 }).map((_, i) => (
                    <div
                        key={i}
                        className={`absolute rounded-full ${theme.floatingElement} opacity-20`}
                        style={{
                            width: `${Math.random() * 6 + 2}px`,
                            height: `${Math.random() * 6 + 2}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${i * 0.8}s`,
                            animationDuration: `${4 + Math.random() * 3}s`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Projects;
