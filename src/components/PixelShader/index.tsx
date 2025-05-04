'use client';

import './PixelShader.css';

import React, { useRef, useEffect } from 'react';

interface PixelShaderProps {
    isDarkTheme: boolean;
}

const PixelShader: React.FC<PixelShaderProps> = ({ isDarkTheme }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const targetRef = useRef<HTMLDivElement>(null);
    const requestIdRef = useRef<number>(0);
    const mousePos = useRef({ x: 0, y: 0 });

    // Set up the pixel shader
    useEffect(() => {
        const canvas = canvasRef.current;
        const target = document.querySelector('.contact-hero') as HTMLElement;

        if (!canvas || !target) return;

        // Set canvas to match target size
        const updateCanvasSize = () => {
            const rect = target.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
        };

        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Handle mouse movement
        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mousePos.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
        };

        // Handle mouse enter/leave
        const handleMouseEnter = () => {
            if (targetRef.current) {
                targetRef.current.classList.add('active');
            }

            // Start animation
            if (!requestIdRef.current) {
                animate();
            }
        };

        const handleMouseLeave = () => {
            if (targetRef.current) {
                targetRef.current.classList.remove('active');
            }

            // Stop animation
            if (requestIdRef.current) {
                cancelAnimationFrame(requestIdRef.current);
                requestIdRef.current = 0;

                // Clear canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        };

        target.addEventListener('mousemove', handleMouseMove);
        target.addEventListener('mouseenter', handleMouseEnter);
        target.addEventListener('mouseleave', handleMouseLeave);

        // Create an offscreen canvas for capturing the target content
        const offscreenCanvas = document.createElement('canvas');
        const offscreenCtx = offscreenCanvas.getContext('2d', { alpha: true });

        // Animation function
        const animate = () => {
            const { width, height } = canvas;

            // Pixel size (adjust for different effects)
            const pixelSize = 10;
            const radius = 150; // Pixelation radius

            // Capture current state
            offscreenCanvas.width = width;
            offscreenCanvas.height = height;

            // First clear the offscreen canvas
            if (offscreenCtx) {
                offscreenCtx.clearRect(0, 0, width, height);

                // Then clear the main canvas
                ctx.clearRect(0, 0, width, height);

                // Draw text content from target to offscreen canvas
                const targetElements = target.querySelectorAll(
                    '.contact-background-text, .contact-overlay-content',
                );
                const tempDiv = document.createElement('div');
                tempDiv.style.position = 'absolute';
                tempDiv.style.left = '-9999px';

                targetElements.forEach((element) => {
                    // Clone the element for rendering
                    const clone = element.cloneNode(true) as HTMLElement;
                    tempDiv.appendChild(clone);
                    document.body.appendChild(tempDiv);

                    const styles = window.getComputedStyle(element as Element);
                    const rect = (element as Element).getBoundingClientRect();
                    const targetRect = target.getBoundingClientRect();

                    // Apply styles to clone
                    clone.style.fontFamily = styles.fontFamily;
                    clone.style.fontSize = styles.fontSize;
                    clone.style.fontWeight = styles.fontWeight;
                    clone.style.color = styles.color;
                    clone.style.textAlign = styles.textAlign;

                    // Draw text to offscreen canvas
                    if (offscreenCtx) {
                        offscreenCtx.save();
                        offscreenCtx.textAlign =
                            styles.textAlign as CanvasTextAlign;
                        offscreenCtx.font = `${styles.fontWeight} ${styles.fontSize} ${styles.fontFamily}`;
                        offscreenCtx.fillStyle = styles.color;

                        // Calculate position relative to target
                        const x = rect.left - targetRect.left;
                        const y = rect.top - targetRect.top;

                        if (
                            element.classList.contains(
                                'contact-background-text',
                            )
                        ) {
                            offscreenCtx.globalAlpha = 0.07; // Match the opacity from CSS
                        }

                        // Draw the element content to canvas
                        offscreenCtx.fillText(
                            clone.textContent || '',
                            x + rect.width / 2,
                            y + rect.height / 2,
                        );
                        offscreenCtx.restore();
                    }

                    // Clean up
                    document.body.removeChild(tempDiv);
                });

                // Now apply pixelation effect
                for (let y = 0; y < height; y += pixelSize) {
                    for (let x = 0; x < width; x += pixelSize) {
                        // Calculate distance from mouse
                        const dx = x - mousePos.current.x;
                        const dy = y - mousePos.current.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        // Only apply effect within radius
                        if (distance < radius) {
                            // Get color from original image
                            const imgData = offscreenCtx.getImageData(
                                x,
                                y,
                                pixelSize,
                                pixelSize,
                            );

                            // Calculate average color for the pixel block
                            let r = 0,
                                g = 0,
                                b = 0,
                                a = 0,
                                count = 0;
                            for (let i = 0; i < imgData.data.length; i += 4) {
                                r += imgData.data[i];
                                g += imgData.data[i + 1];
                                b += imgData.data[i + 2];
                                a += imgData.data[i + 3];
                                count++;
                            }

                            r = Math.floor(r / count);
                            g = Math.floor(g / count);
                            b = Math.floor(b / count);
                            a = Math.floor(a / count);

                            // Set pixel effect intensity based on distance
                            const intensity = 1 - distance / radius;
                            const effectSize = Math.max(
                                2,
                                Math.floor(pixelSize * intensity),
                            );

                            // Draw pixelated block
                            if (a > 0) {
                                // Only draw visible pixels
                                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a / 255})`;
                                ctx.fillRect(x, y, effectSize, effectSize);
                            }
                        }
                    }
                }
            }

            // Continue animation
            requestIdRef.current = requestAnimationFrame(animate);
        };

        // Clean up
        return () => {
            window.removeEventListener('resize', updateCanvasSize);
            target.removeEventListener('mousemove', handleMouseMove);
            target.removeEventListener('mouseenter', handleMouseEnter);
            target.removeEventListener('mouseleave', handleMouseLeave);

            if (requestIdRef.current) {
                cancelAnimationFrame(requestIdRef.current);
            }
        };
    }, [isDarkTheme]);

    return (
        <div ref={targetRef} className="pixel-shader-container">
            <canvas ref={canvasRef} className="pixel-shader-canvas" />
        </div>
    );
};

export default PixelShader;
