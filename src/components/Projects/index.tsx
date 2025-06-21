'use client';

import './Projects.css';

import { gsap } from 'gsap';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import React, { useEffect, useRef, useState, useCallback, useLayoutEffect } from 'react';

import projectData from '@/constants/ProjectData';
import NavigationDots from '../NavigationDots';
import { useThemeColors } from '@/hooks/useThemeColors';
import techIconMap from '@/constants/TechIconMap';
import { fontClasses } from '@/config/fonts';

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

    // Touch handling for mobile swipe
    const touchStartY = useRef(0);
    const touchEndY = useRef(0);

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
                gsap.set(cardElement, { y: '0%', opacity: 1 });
            },
        });

        // Current card animating out
        if (direction === 'next') {
            tl.to(cardElement, {
                y: '-100%',
                opacity: 0,
                duration: 0.5,
                ease: 'power2.in',
            });
        } else {
            tl.to(cardElement, {
                y: '100%',
                opacity: 0,
                duration: 0.5,
                ease: 'power2.in',
            });
        }

        // Set up the new project to enter
        tl.add(() => {
            setDisplayProject(projectData[newIndex]);
            gsap.set(cardElement, {
                y: direction === 'next' ? '100%' : '-100%',
                opacity: 0,
            });
        });

        // New card animating in
        tl.to(cardElement, {
            y: '0%',
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
        }, "<");

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

    // Mobile touch handlers
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        touchStartY.current = e.touches[0].clientY;
        touchEndY.current = e.touches[0].clientY;
    }, []);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        // Prevent default scrolling behavior during swipe
        if (Math.abs(touchStartY.current - e.touches[0].clientY) > 10) {
            e.preventDefault();
        }
        touchEndY.current = e.touches[0].clientY;
    }, []);

    const handleTouchEnd = useCallback(() => {
        if (scrollLocked.current) return;

        const swipeDistanceY = touchStartY.current - touchEndY.current;
        const swipeThreshold = 50;

        if (Math.abs(swipeDistanceY) > swipeThreshold) {
            const direction = swipeDistanceY > 0 ? 'next' : 'prev';

            let newIndex;
            if (direction === 'next') {
                newIndex = (currentProject + 1) % projectData.length;
            } else {
                newIndex = (currentProject - 1 + projectData.length) % projectData.length;
            }

            animateProjectChange(direction, newIndex);
        }

        // Reset touch positions
        touchStartY.current = 0;
        touchEndY.current = 0;
    }, [currentProject, animateProjectChange]);

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
                // Permission will be requested via button
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
            if (indexRef.current && cardRef.current) {
                tl.from(indexRef.current, { opacity: 0, x: -30, duration: 0.5 });
                tl.from(cardRef.current, {
                    opacity: 0,
                    y: 30,
                    scale: 0.97,
                    duration: 0.7,
                }, '-=0.3');
                if (!isMobile && dotsRef.current) {
                    tl.from(dotsRef.current, { x: -50, opacity: 0, duration: 0.8 }, '<0.1');
                }
            }
        });
        return () => ctx.revert();
    }, [isMobile]);

    useEffect(() => {
        if (!isMobile) {
            window.addEventListener('wheel', handleScroll, { passive: true });
            return () => window.removeEventListener('wheel', handleScroll);
        } else {
            window.removeEventListener('wheel', handleScroll);
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
            style={{ touchAction: 'pan-y' }}
        >
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
                                className={`px-6 py-3 rounded-full text-sm font-medium ${theme.projectButton}`}
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
                    <div className={`${fontClasses.classyVogue} text-xs sm:text-sm ${fontClasses.classyVogue} tracking-[0.2em] ${theme.projectIndexText} opacity-60`}>
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
                                <div key={tech} className={`${fontClasses.eireneSansBold} flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-medium px-2 sm:px-3 py-1 sm:py-1.5 rounded-full ${theme.projectTechBadge} backdrop-blur-md`}>
                                    <Icon icon={icon} width={isMobile ? "12" : "14"} height={isMobile ? "12" : "14"} />
                                    <span className="hidden sm:inline">{tech}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Main Card */}
                <div ref={cardRef} className={`relative w-full max-w-6xl will-change-transform`}>
                    <div className={`relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] rounded-3xl sm:rounded-[2rem] overflow-hidden ${theme.projectCard} backdrop-blur-xl shadow-2xl`}>
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
                            <div className={`absolute inset-0 z-0 ${theme.projectCardPattern}`} />
                        )}

                        {/* Gradient Overlay */}
                        <div className={`absolute inset-0 z-10 ${theme.projectGradientOverlay}`} />

                        {/* Content Area */}
                        <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-8 lg:p-12">
                            {/* Year Badge */}
                            <div className="flex justify-between items-start">
                                <div className={`${fontClasses.eireneSans} inline-flex items-center px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium ${theme.projectYearBadge} backdrop-blur-md`}>
                                    {projectToDisplay.yearOfDevelopment}
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="space-y-4 sm:space-y-6">
                                {/* Project Title */}
                                <div className="space-y-2 sm:space-y-3">
                                    <h1 ref={titleRef} className={`${fontClasses.classyVogue} text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight ${theme.projectHeroText} leading-[0.85] break-words`}>
                                        {projectToDisplay.title.toUpperCase()}
                                    </h1>

                                    {/* Category and Description */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 mt-4 sm:mt-6">
                                        <div className="space-y-2">
                                            <p ref={descRef} className={`${fontClasses.eireneSans} text-sm sm:text-base leading-relaxed ${theme.projectDescriptionText} opacity-80`}>
                                                {projectToDisplay.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Links Section */}
                    <div ref={linksRef} className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-6 sm:gap-8">
                            <div className={`${fontClasses.eireneSans} text-xs sm:text-sm font-mono tracking-[0.15em] ${theme.projectLinkText} opacity-60`}>
                                LINKS
                            </div>
                            <div className="flex gap-3 sm:gap-4">
                                {projectToDisplay.link?.map((url, idx) => (
                                    <a
                                        key={idx}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full ${theme.projectLinkButton} backdrop-blur-md transition-all duration-300 hover:scale-105`}
                                    >
                                        <Icon icon={techIconMap.Github[isDarkTheme ? 'dark' : 'light']} width={isMobile ? "16" : "18"} height={isMobile ? "16" : "18"} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile swipe indicator*/}
                {isMobile && (
                    <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
                        <div className={`flex flex-col items-center gap-2 ${theme.projectIndexText} opacity-40`}>
                            <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center">
                                <div className="w-1 h-3 bg-current rounded-full mt-2 animate-bounce"></div>
                            </div>
                            <span className={`${fontClasses.eireneSans} text-xs`}>Swipe</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation Dots */}
            {!isMobile && (
                <NavigationDots
                    currentIndex={currentProject}
                    total={projectData.length}
                    isDark={isDarkTheme}
                    setCurrentProject={setCurrentProject}
                    isMobile={isMobile}
                />
            )}
        </div>
    );
};

export default Projects;
