import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Icon } from '@iconify/react';

type NavigationDotsProps = {
    currentIndex: number;
    total: number;
    isDark: boolean;
    setCurrentProject: (index: number) => void;
};

const NavigationDots = ({ currentIndex, total, isDark, setCurrentProject }: NavigationDotsProps) => {
    const dotsWrapperRef = useRef<HTMLDivElement>(null);
    const activeDotRef = useRef<HTMLDivElement>(null);

    // Animate all dots on mount
    useEffect(() => {
        if (dotsWrapperRef.current) {
            gsap.fromTo(
                dotsWrapperRef.current.children,
                { opacity: 0, x: 20 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    stagger: 0.05,
                    delay: 1,
                }
            );
        }
    }, []);

    // Auto-scroll to the active dot when it changes
    useEffect(() => {
        if (activeDotRef.current) {
            activeDotRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [currentIndex]);

    // Scroll handlers for up/down buttons
    const scrollDots = (direction: 'up' | 'down') => {
        if (!dotsWrapperRef.current) return;
        const amount = 40; // px to scroll
        dotsWrapperRef.current.scrollBy({
            top: direction === 'up' ? -amount : amount,
            behavior: 'smooth',
        });
    };

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
