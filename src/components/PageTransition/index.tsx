'use client';

import gsap from 'gsap';
import { useTheme } from 'next-themes';
import { getTheme } from '@/config/theme';
import { usePathname } from 'next/navigation';
import React, { useRef, useEffect, useState, useCallback } from 'react';

interface PageTransitionProps {
    children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
    const squaresRef = useRef<HTMLDivElement[]>([]);
    const overlayRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const { theme: currentThemeName, resolvedTheme } = useTheme();

    const [displayedChildren, setDisplayedChildren] = useState(children);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const previousPathname = useRef(pathname);

    const themeColors = getTheme(currentThemeName || resolvedTheme || 'light').colors;
    const transitionColor = themeColors.pageTransitionSquaresColor;

    const initializeSquares = useCallback(() => {
        if (!overlayRef.current) return;

        const numCols = 20;
        const numRows = Math.ceil((window.innerHeight / window.innerWidth) * numCols);
        const totalSquares = numCols * numRows;

        overlayRef.current.innerHTML = '';
        squaresRef.current = [];

        // Set up the grid container
        overlayRef.current.style.display = 'grid';
        overlayRef.current.style.gridTemplateColumns = `repeat(${numCols}, 1fr)`;
        overlayRef.current.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;
        overlayRef.current.style.position = 'fixed';
        overlayRef.current.style.top = '0';
        overlayRef.current.style.left = '0';
        overlayRef.current.style.width = '100vw';
        overlayRef.current.style.height = '100vh';
        overlayRef.current.style.pointerEvents = 'none';
        overlayRef.current.style.zIndex = '9998';
        overlayRef.current.style.overflow = 'hidden'; // Hide overflow

        // Create and append squares
        for (let i = 0; i < totalSquares; i++) {
            const square = document.createElement('div');
            square.style.backgroundColor = transitionColor;
            square.style.opacity = '0';
            square.style.transform = 'scale(0)';
            overlayRef.current.appendChild(square);
            squaresRef.current.push(square);
        }
    }, [transitionColor]);

    useEffect(() => {
        initializeSquares();
        window.addEventListener('resize', initializeSquares);

        // Cleanup
        return () => {
            window.removeEventListener('resize', initializeSquares);
        };
    }, [initializeSquares]);

    useEffect(() => {
        if (pathname === previousPathname.current || isTransitioning) {
            previousPathname.current = pathname;
            if (!isTransitioning) {
                gsap.set(squaresRef.current, { opacity: 0, scale: 0 });
                setDisplayedChildren(children);
            }
            return;
        }

        setIsTransitioning(true);
        previousPathname.current = pathname;

        // Create the GSAP timeline
        const tl = gsap.timeline({
            onComplete: () => {
                setDisplayedChildren(children);

                gsap.to(squaresRef.current, {
                    opacity: 0,
                    scale: 0,
                    ease: 'power3.inOut',
                    duration: 0.5,
                    stagger: {
                        amount: 0.5,
                        grid: 'auto',
                        from: 'end',
                        each: 0.02,
                    },
                    onComplete: () => {
                        setIsTransitioning(false);
                    },
                });
            },
        });

        tl.to(squaresRef.current, {
            opacity: 1,
            scale: 1,
            ease: 'power3.inOut',
            duration: 0.8,
            stagger: {
                amount: 0.5,
                grid: 'auto',
                from: 'end',
                each: 0.03,
            },
        });
    }, [pathname, children, isTransitioning, initializeSquares]);

    return (
        <>
            {displayedChildren}
            <div ref={overlayRef} className="page-transition-overlay"></div>
        </>
    );
};

export default PageTransition;
