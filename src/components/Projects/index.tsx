'use client';

import './Projects.css';

import React, { useEffect, useRef, useState, useCallback, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { Icon } from '@iconify/react';
import Image from 'next/image'; // Import Next.js Image component

import projectData from '@/constants/projectsData';
import techIconMap from '@/constants/techIconMap';
import NavigationDots from '../NavigationDots';

import { useThemeColors } from '@/hooks/useThemeColors';

// Function to request device motion permission for iOS 13+
const requestDeviceMotionPermission = async (): Promise<boolean> => {
    if (
        typeof DeviceMotionEvent !== 'undefined' &&
        'requestPermission' in DeviceMotionEvent &&
        typeof DeviceMotionEvent.requestPermission === 'function'
    ) {
        try {
            const permissionState = await DeviceMotionEvent.requestPermission();
            if (permissionState === 'granted') {
                return true;
            } else {
                console.warn('Permission to access device motion denied.');
                return false;
            }
        } catch (error) {
            console.error('Error requesting device motion permission:', error);
            return false;
        }
    }

    // For other platforms/browsers that don’t need explicit permission
    return true;
};

const Projects = () => {
    const { colors: theme, isDarkTheme, isLoading } = useThemeColors();
    const [currentProject, setCurrentProject] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [deviceMotionPermissionGranted, setDeviceMotionPermissionGranted] = useState(false);

    const cardRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
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

    // This state is crucial for managing the content for the "next" card
    const [displayProject, setDisplayProject] = useState(projectData[0]);


    // This effect ensures that `displayProject` updates when `currentProject` changes,
    // and then triggers the animation.
    useEffect(() => {
        if (!scrollLocked.current) {
            // This is for initial load or direct navigation (e.g., from dots)
            setDisplayProject(projectData[currentProject]);
        }
    }, [currentProject]);


    // Animate on project change
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
            onStart: () => {
                // Instantly set the content of the *new* project before animation starts
                // This means the old content will "push out" the new content
                setDisplayProject(projectData[newIndex]);
            },
            onComplete: () => {
                // Ensure the currentProject state is updated after animation
                setCurrentProject(newIndex);
                scrollLocked.current = false;
            },
        });

        const currentYOffset = cardElement.getBoundingClientRect().top; // Get current visual position

        if (direction === 'next') {
            // Current card moves up and out (opacity fades out quickly)
            // New card comes from bottom and moves to center
            tl.to(cardElement, {
                y: '-=100%', // Move up by its own height
                opacity: 0,
                duration: 0.5,
                ease: 'power2.in',
            })
                .set(cardElement, { y: '100%', opacity: 0 }) // Instantly move to bottom and keep hidden
                .to(cardElement, {
                    y: '0%', // Animate to center
                    opacity: 1,
                    duration: 0.6,
                    ease: 'power2.out',
                }, '<0.1'); // Start animating in slightly before previous one finishes
        } else { // direction === 'prev'
            // Current card moves down and out (opacity fades out quickly)
            // New card comes from top and moves to center
            tl.to(cardElement, {
                y: '+=100%', // Move down by its own height
                opacity: 0,
                duration: 0.5,
                ease: 'power2.in',
            })
                .set(cardElement, { y: '-100%', opacity: 0 }) // Instantly move to top and keep hidden
                .to(cardElement, {
                    y: '0%', // Animate to center
                    opacity: 1,
                    duration: 0.6,
                    ease: 'power2.out',
                }, '<0.1'); // Start animating in slightly before previous one finishes
        }


        // Reset card rotation on project change for a clean slate
        gsap.to(cardElement, { rotateX: 0, rotateY: 0, duration: 0.4, ease: 'power2.out' });
    }, []);

    // Handle mouse move for 3D rotation for Desktop
    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (isMobile || !cardRef.current) return;

        const { left, top, width, height } = cardRef.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        const rotateY = (mouseX / (width / 2)) * 3;
        const rotateX = (mouseY / (height / 2)) * -3;

        rotationTargetX.current = rotateX;
        rotationTargetY.current = rotateY;

        if (rotationTimeline.current) {
            rotationTimeline.current.kill();
        }

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

        if (rotationTimeline.current) {
            rotationTimeline.current.kill();
        }
        rotationTimeline.current = gsap.timeline({ defaults: { ease: 'power4.out', duration: 0.8 } })
            .to(cardRef.current, {
                rotateX: 0,
                rotateY: 0,
                transformPerspective: 1000,
            });
    }, [isMobile]);

    // Use a ref to store the requestAnimationFrame ID
    const rAFId = useRef<number | null>(null);

    const handleDeviceOrientation = useCallback((e: DeviceOrientationEvent) => {
        if (!cardRef.current || !isMobile || !deviceMotionPermissionGranted) return;

        // Clear any previous animation frame request
        if (rAFId.current !== null) {
            cancelAnimationFrame(rAFId.current);
        }

        rAFId.current = requestAnimationFrame(() => {
            const beta = e.beta || 0;
            const gamma = e.gamma || 0;

            const maxTilt = 30;
            const maxRotation = 3;

            const rotateX = gsap.utils.mapRange(-maxTilt, maxTilt, maxRotation, -maxRotation, gamma);
            const rotateY = gsap.utils.mapRange(-maxTilt, maxTilt, -maxRotation, maxRotation, beta);

            rotationTargetX.current = rotateX;
            rotationTargetY.current = rotateY;

            if (rotationTimeline.current) {
                rotationTimeline.current.kill();
            }

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
        const minSwipeDistance = 50;

        if (Math.abs(swipeDistance) > minSwipeDistance) {
            const direction = swipeDistance > 0 ? 'next' : 'prev';
            const newIndex = direction === 'next'
                ? (currentProject + 1) % projectData.length
                : (currentProject - 1 + projectData.length) % projectData.length;

            animateProjectChange(direction, newIndex);
        }
    };

    const handleScroll = useCallback(
        (e: WheelEvent) => {
            if (scrollLocked.current || isMobile || Math.abs(e.deltaY) < 30) return;

            const direction = e.deltaY > 0 ? 'next' : 'prev';
            const newIndex = direction === 'next'
                ? (currentProject + 1) % projectData.length
                : (currentProject - 1 + projectData.length) % projectData.length;

            animateProjectChange(direction, newIndex);
        },
        [isMobile, currentProject, animateProjectChange]
    );

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Effect for handling device orientation listener for mobile
    useEffect(() => {
        if (isMobile) {
            if (
                typeof DeviceMotionEvent !== 'undefined' &&
                'requestPermission' in DeviceMotionEvent &&
                typeof DeviceMotionEvent.requestPermission === 'function'
            ) {
                // Permission handled by the button click
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

    // Initial load animation with useLayoutEffect to run before paint
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power2.out', force3D: true } });

            if (
                indexRef.current &&
                cardRef.current &&
                dotsRef.current
            ) {
                // Animate index number in (only opacity/x for initial load)
                tl.from(indexRef.current, { opacity: 0, x: -30, duration: 0.5 });

                // Animate card content in (grouped for cleaner animation)
                tl.from(cardRef.current, {
                    opacity: 0,
                    y: 30, // Slight initial lift
                    scale: 0.97,
                    duration: 0.7, // Longer duration for initial smooth fade-in
                    ease: 'power2.out',
                }, '-=0.3'); // Start animating card content slightly before index finishes

                // Animate background dots in
                tl.from(dotsRef.current, { x: -50, opacity: 0, duration: 0.8, ease: 'power2.out' }, '<0.1');
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

    // Handle permission request for iOS 13+
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

    // Use displayProject for rendering, which is updated by animateProjectChange
    const projectToDisplay = displayProject;


    return (
        <div
            className={`min-h-screen overflow-hidden relative transition-colors duration-500 ${theme.background}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
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
                                className={`px-6 py-3 rounded-full text-sm font-medium ${theme.button}`}
                            >
                                Enable Motion
                            </button>
                        </div>
                    )}

                {/* Index - No change in logic for this from your request */}
                <div
                    ref={indexRef}
                    className={`absolute left-4 sm:left-8 top-4 sm:top-1/2 sm:transform sm:-translate-y-1/2 will-change-transform`}
                >
                    <div className={`text-lg sm:text-2xl font-light tracking-widest mb-3 transition-transform duration-500 ${theme.indexText}`}>
                        {String(currentProject + 1).padStart(4, '0')}
                    </div>
                    <div className={`w-10 sm:w-14 h-px ${theme.indexLine}`} />
                </div>

                {/* Main Card Component - This whole div will be animated by 'y' property */}
                <div ref={cardRef} className={`relative w-full max-w-5xl will-change-transform`}>
                    <div ref={techRef} className="absolute -top-12 sm:-top-16 right-0 left-0 sm:left-auto">
                        <div className="block sm:hidden">
                            <div className="flex gap-2 overflow-x-auto pb-2 px-4 scrollbar-hide">
                                {projectToDisplay.technicalStack.map((tech) => {
                                    const key = tech.replace(/\s+|\.|-/g, '').replace(/js/i, 'Js');
                                    const icon = techIconMap[key]?.[isDarkTheme ? 'dark' : 'light'] || `logos:${key.toLowerCase()}`;
                                    return (
                                        <div key={tech} className={`flex items-center gap-2 text-xs tracking-wider backdrop-blur-sm border px-3 py-1.5 rounded-full whitespace-nowrap ${theme.techBadge}`}>
                                            <Icon icon={icon} width="14" height="14" />
                                            <span>{tech}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="hidden sm:flex flex-wrap gap-2 justify-end max-w-5xl">
                            {projectToDisplay.technicalStack.map((tech) => {
                                const key = tech.replace(/\s+|\.|-/g, '').replace(/js/i, 'Js');
                                const icon = techIconMap[key]?.[isDarkTheme ? 'dark' : 'light'] || `logos:${key.toLowerCase()}`;
                                return (
                                    <div key={tech} className={`flex items-center gap-2 text-xs tracking-wider backdrop-blur-sm border px-3 py-2 rounded-full ${theme.techBadge}`}>
                                        <Icon icon={icon} width="16" height="16" />
                                        <span>{tech}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Card Details */}
                    <div className={`relative aspect-[4/3] sm:aspect-video rounded-2xl sm:rounded-3xl overflow-hidden backdrop-blur-sm border shadow-2xl transition-all duration-300 ${theme.card} ${theme.border}`}>
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
                            <div className={`absolute inset-0 z-0 ${theme.patternBackground}`} />
                        )}

                        <div className={`absolute inset-0 z-10 ${theme.gradientOverlay}`} />

                        <div className="absolute bottom-0 left-0 p-4 sm:p-8 max-w-full sm:max-w-2xl z-20">
                            <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-md mb-3 ${theme.subtext} bg-white/10 backdrop-blur-sm`}>{projectToDisplay.yearOfDevelopment}</span>
                            <h1 ref={titleRef} className={`will-change-transform text-3xl sm:text-5xl md:text-5xl font-light tracking-tight mb-2 sm:mb-4 ${theme.text} break-words leading-tight`}>
                                {projectToDisplay.title.toUpperCase()}
                            </h1>
                            <p ref={descRef} className={`text-xs sm:text-sm md:text-base leading-relaxed ${theme.subtext} max-w-2xl`}>
                                {projectToDisplay.description}
                            </p>
                        </div>

                        {/* Status Dots */}
                        <div className="absolute top-4 sm:top-6 left-4 sm:left-6 flex gap-2 sm:gap-3 z-20">
                            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse" />
                            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                        </div>
                    </div>

                    <div ref={linksRef} className="mt-4 sm:mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 w-full">
                            <div className="flex items-center justify-between w-full sm:block">
                                <div className={`text-xs sm:text-sm tracking-wider ${theme.subtext}`}>
                                    <span className="block font-medium">{projectToDisplay.category.toUpperCase()}</span>
                                </div>

                                <div className="flex sm:hidden">
                                    {projectToDisplay.link?.map((url, idx) => (
                                        <a key={idx} href={url} target="_blank" rel="noopener noreferrer" className={`ml-2 flex items-center gap-2 text-xs tracking-wider backdrop-blur-sm border px-3 py-2 rounded-full ${theme.button} ${theme.border}`}>
                                            <Icon icon={techIconMap.Github[isDarkTheme ? 'dark' : 'light']} width="14" height="14" />
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div className="hidden sm:flex flex-row gap-4">
                                {projectToDisplay.link?.map((url, idx) => (
                                    <a key={idx} href={url} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 text-sm tracking-wider backdrop-blur-sm border px-4 py-2 rounded-full ${theme.button} ${theme.border}`}>
                                        <Icon icon={techIconMap.Github[isDarkTheme ? 'dark' : 'light']} width="16" height="16" />
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

            {/* Background Dots */}
            <div ref={dotsRef} className="absolute inset-0 pointer-events-none">
                {Array.from({ length: isMobile ? 15 : 30 }).map((_, i) => (
                    <div
                        key={i}
                        className={`absolute rounded-full w-1 h-1 opacity-20 ${theme.pulseDot}`}
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${i * 0.5}s`,
                            animationDuration: `${3 + Math.random() * 2}s`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Projects;
