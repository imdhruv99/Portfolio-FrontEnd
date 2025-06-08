import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Icon } from '@iconify/react';

type NavigationDotsProps = {
    currentIndex: number;
    total: number;
    isDark: boolean;
    setCurrentProject: (index: number) => void;
    isMobile?: boolean;
    className?: string;
};

const NavigationDots = ({ currentIndex, total, isDark, setCurrentProject, isMobile = false, className }: NavigationDotsProps) => {
    const dotsWrapperRef = useRef<HTMLDivElement>(null);
    const activeDotRef = useRef<HTMLDivElement>(null);

    // Animate all dots on mount
    useEffect(() => {
        if (dotsWrapperRef.current) {
            const animationProps = isMobile
                ? { opacity: 0, y: 20 }
                : { opacity: 0, x: 20 };

            gsap.fromTo(
                dotsWrapperRef.current.children,
                animationProps,
                {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.05,
                    delay: 1,
                }
            );
        }
    }, [isMobile]);

    // Auto-scroll to the active dot when it changes
    useEffect(() => {
        if (activeDotRef.current && !isMobile) {
            activeDotRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        if (activeDotRef.current && isMobile) {
            activeDotRef.current.scrollIntoView({ behavior: 'smooth', inline: 'center' });
        }
    }, [currentIndex, isMobile]);

    // Scroll handlers for navigation buttons
    const scrollDots = (direction: 'up' | 'down' | 'left' | 'right') => {
        if (!dotsWrapperRef.current) return;

        const amount = 100; // px to scroll
        const newIndex =
            direction === 'left' || direction === 'up'
                ? Math.max(0, currentIndex - 1)
                : Math.min(total - 1, currentIndex + 1);

        setCurrentProject(newIndex);

        if (isMobile) {
            dotsWrapperRef.current.scrollBy({
                left: direction === 'left' ? -amount : direction === 'right' ? amount : 0,
                behavior: 'smooth',
            });
        } else {
            dotsWrapperRef.current.scrollBy({
                top: direction === 'up' ? -amount : direction === 'down' ? amount : 0,
                behavior: 'smooth',
            });
        }
    };

    if (isMobile) {
        // Mobile horizontal layout
        return (
            <div className={`fixed bottom-16 left-1/2 transform -translate-x-1/2 flex items-center gap-3 z-20 px-4 py-2 ${className}`}>
                {/* Left arrow */}
                <button
                    onClick={() => scrollDots('left')}
                    className={`p-1 rounded-full transition-colors hover:scale-110 ${isDark ? 'text-white/70' : 'text-gray-600'}`}
                    aria-label="Scroll left"
                >
                    <Icon icon="mdi:chevron-left" width="18" height="18" />
                </button>

                {/* Dots container */}
                <div
                    ref={dotsWrapperRef}
                    className="flex gap-4 overflow-x-auto max-w-[70vw] scrollbar-hide px-2"
                >
                    {Array.from({ length: total }).map((_, index) => {
                        const isActive = index === currentIndex;
                        return (
                            <div
                                key={index}
                                ref={isActive ? activeDotRef : null}
                                aria-label={`Go to project ${index + 1}`}
                                onClick={() => setCurrentProject(index)}
                                className={`cursor-pointer w-3 h-3 rounded-full transition-all duration-300 flex-shrink-0 border-2 ${isActive
                                    ? `${isDark ? 'bg-white border-white' : 'bg-gray-800 border-gray-800'} scale-125`
                                    : `${isDark ? 'bg-white/20 border-white/30' : 'bg-gray-400/30 border-gray-300'}`
                                    }`}
                                title={`Project ${index + 1}`}
                            />
                        );
                    })}
                </div>

                {/* Right arrow */}
                <button
                    onClick={() => scrollDots('right')}
                    className={`p-1 rounded-full transition-colors hover:scale-110 ${isDark ? 'text-white/70' : 'text-gray-600'}`}
                    aria-label="Scroll right"
                >
                    <Icon icon="mdi:chevron-right" width="18" height="18" />
                </button>
            </div>
        );
    }

    // Desktop vertical layout
    return (
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-2 z-20">

            {/* Dots container */}
            <div
                ref={dotsWrapperRef}
                className="flex flex-col gap-3 overflow-y-auto max-h-48 px-1 pr-2 items-end scrollbar-thin scrollbar-thumb-gray-400/50 scrollbar-track-transparent min-w-[1.5rem]"
            >
                {Array.from({ length: total }).map((_, index) => {
                    const isActive = index === currentIndex;
                    return (
                        <div
                            key={index}
                            ref={isActive ? activeDotRef : null}
                            onClick={() => setCurrentProject(index)}
                            className={`cursor-pointer transition-all duration-300 ${isActive
                                ? `w-6 h-2 rounded-full ${isDark ? 'bg-white' : 'bg-gray-800'} self-end`
                                : `w-2 h-2 rounded-full ${isDark ? 'bg-white/30' : 'bg-gray-400/50'}`
                                }`}
                        />

                    );
                })}
            </div>
        </div>
    );
};

export default NavigationDots;
