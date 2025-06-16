// src/components/PageTransition/index.tsx
'use client';

import React, { useRef, useEffect, useCallback, createContext, useContext } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import gsap from 'gsap';
import { useThemeColors } from '@/hooks/useThemeColors';

// Define the context type
interface PageTransitionContextType {
    startTransition: (callback: () => void) => void;
}

// Create the context
const PageTransitionContext = createContext<PageTransitionContextType | undefined>(undefined);

// Custom hook to use the page transition context
export const usePageTransition = () => {
    const context = useContext(PageTransitionContext);
    if (!context) {
        throw new Error('usePageTransition must be used within a PageTransitionProvider');
    }
    return context;
};

interface PageTransitionProps {
    children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
    const pathname = usePathname();
    const squaresRef = useRef<HTMLDivElement[]>([]);
    const pageContentRef = useRef<HTMLDivElement>(null);
    const { colors } = useThemeColors();

    const numberOfSquares = 25; // A 5x5 grid (adjust for more or fewer)

    // Function to get the background color dynamically
    const getTransitionBackgroundColor = useCallback(() => {
        // Your theme uses Tailwind classes like 'bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#0f0f0f]'
        // We need a solid color for the squares. Let's extract the 'to' color or pick a sensible one.
        const bgColorMatch = colors.background.match(/to-\[([^\]]+)\]/);
        if (bgColorMatch && bgColorMatch[1]) {
            return bgColorMatch[1]; // Returns the hex or rgb string directly
        }
        // Fallback to a base color from your themes if the regex doesn't match
        return colors.background.includes('dark') ? '#0f0f0f' : '#efefef';
    }, [colors.background]);

    const animateIn = useCallback(() => {
        if (squaresRef.current.length > 0) {
            // Animate squares out
            gsap.to(squaresRef.current, {
                scale: 0,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.inOut',
                stagger: {
                    grid: 'auto', // Automatically determine grid layout
                    from: 'random', // Start animation from random squares
                    amount: 0.6, // Total duration for stagger to complete
                },
                onComplete: () => {
                    // Hide the container after animation to prevent interaction
                    if (squaresRef.current[0]?.parentElement) {
                        squaresRef.current[0].parentElement.style.display = 'none';
                    }
                    // Reset properties for next animation
                    gsap.set(squaresRef.current, { clearProps: 'all' });
                },
            });
        }

        // Animate page content in
        if (pageContentRef.current) {
            gsap.fromTo(
                pageContentRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.5 } // Content appears after squares start receding
            );
        }
    }, []);

    const animateOut = useCallback((callback: () => void) => {
        const transitionColor = getTransitionBackgroundColor();

        if (squaresRef.current.length > 0) {
            // Ensure the container is visible before animation
            if (squaresRef.current[0]?.parentElement) {
                squaresRef.current[0].parentElement.style.display = 'grid';
            }

            // Set initial state for squares
            gsap.set(squaresRef.current, {
                backgroundColor: transitionColor,
                scale: 0,
                opacity: 0,
            });

            // Animate squares in
            gsap.to(squaresRef.current, {
                scale: 1,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.inOut',
                stagger: {
                    grid: 'auto',
                    from: 'random', // Animate from a random point
                    amount: 0.6,
                },
                onComplete: callback, // Navigate after animation completes
            });
        } else {
            callback(); // Fallback if no squares are rendered
        }
    }, [getTransitionBackgroundColor]);

    useEffect(() => {
        // Trigger animateIn when the component mounts or pathname changes (new page loaded)
        animateIn();
    }, [pathname, animateIn]);

    const startTransition = useCallback((callback: () => void) => {
        animateOut(callback);
    }, [animateOut]);

    // Create the square elements
    const squares = Array.from({ length: numberOfSquares }).map((_, i) => (
        <div
            key={i}
            ref={el => { if (el) squaresRef.current[i] = el; }}
            className="w-full h-full"
            style={{ backgroundColor: getTransitionBackgroundColor() }} // Set initial color
        />
    ));

    return (
        <PageTransitionContext.Provider value={{ startTransition }}>
            <div ref={pageContentRef} className="min-h-screen">
                {children}
            </div>
            <div
                className={`fixed top-0 left-0 w-full h-full z-[1000] grid`}
                style={{
                    display: 'none', // Initially hidden
                    gridTemplateColumns: `repeat(${Math.sqrt(numberOfSquares)}, 1fr)`,
                    gridTemplateRows: `repeat(${Math.sqrt(numberOfSquares)}, 1fr)`,
                }}
            >
                {squares}
            </div>
        </PageTransitionContext.Provider>
    );
};

export default PageTransition;
