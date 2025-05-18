import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Icon } from '@iconify/react';

type NavigationDotsProps = {
    currentIndex: number;
    total: number;
    isDark: boolean;
    setCurrentProject: (index: number) => void;
    isMobile?: boolean;
};

const NavigationDots = ({ currentIndex, total, isDark, setCurrentProject, isMobile = false }: NavigationDotsProps) => {
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
        const amount = 40; // px to scroll

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
            <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 flex items-center gap-3 z-20 bg-black/20 backdrop-blur-md rounded-full px-4 py-2">
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
                    className="flex gap-3 overflow-x-auto max-w-48 scrollbar-hide"
                >
                    {Array.from({ length: total }).map((_, index) => {
                        const isActive = index === currentIndex;
                        return (
                            <div
                                key={index}
                                ref={isActive ? activeDotRef : null}
                                onClick={() => setCurrentProject(index)}
                                className={`cursor-pointer w-2 h-2 rounded-full transition-all duration-300 flex-shrink-0 ${isActive
                                    ? `${isDark ? 'bg-white' : 'bg-gray-800'} scale-125`
                                    : `${isDark ? 'bg-white/30' : 'bg-gray-400/50'}`
                                    }`}
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
            {/* Up arrow */}
            <button
                onClick={() => scrollDots('up')}
                className={`p-1 rounded-full transition-colors hover:scale-110 ${isDark ? 'text-white' : 'text-gray-800'}`}
                aria-label="Scroll up"
            >
                <Icon icon="mdi:chevron-up" width="20" height="20" />
            </button>

            {/* Dots container */}
            <div
                ref={dotsWrapperRef}
                className="flex flex-col gap-3 overflow-y-auto max-h-48 px-1 scrollbar-thin scrollbar-thumb-gray-400/50 scrollbar-track-transparent"
            >
                {Array.from({ length: total }).map((_, index) => {
                    const isActive = index === currentIndex;
                    return (
                        <div
                            key={index}
                            ref={isActive ? activeDotRef : null}
                            onClick={() => setCurrentProject(index)}
                            className={`cursor-pointer w-2 h-2 rounded-full transition-all duration-300 ${isActive
                                ? `${isDark ? 'bg-white' : 'bg-gray-800'} scale-125`
                                : `${isDark ? 'bg-white/30' : 'bg-gray-400/50'}`
                                }`}
                        />
                    );
                })}
            </div>

            {/* Down arrow */}
            <button
                onClick={() => scrollDots('down')}
                className={`p-1 rounded-full transition-colors hover:scale-110 ${isDark ? 'text-white' : 'text-gray-800'}`}
                aria-label="Scroll down"
            >
                <Icon icon="mdi:chevron-down" width="20" height="20" />
            </button>
        </div>
    );
};

export default NavigationDots;
