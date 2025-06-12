import React, { FC, memo, useRef, useEffect } from 'react';

interface DotBackgroundProps {
    dotColor?: string;
    glowColor?: string;
    gridSize?: number;
    spacing?: number;
    fadeFactor?: number;
    containerWidth: number;
    containerHeight: number;
}

const DotBackground: FC<DotBackgroundProps> = ({
    dotColor = 'rgba(128, 128, 128, 0.3)',
    glowColor = 'rgba(74, 222, 128, 0.7)',
    gridSize = 2,
    spacing = 20,
    containerWidth,
    containerHeight,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>(0);
    const dotsRef = useRef<Array<{
        x: number;
        y: number;
        opacity: number;
        baseOpacity: number;
        glowPhase: number;
        glowSpeed: number;
    }>>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || containerWidth <= 0 || containerHeight <= 0) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        canvas.width = containerWidth;
        canvas.height = containerHeight;

        // Calculate dots
        const numCols = Math.ceil(containerWidth / spacing);
        const numRows = Math.ceil(containerHeight / spacing);
        const centerX = containerWidth / 2;
        const centerY = containerHeight / 2;
        const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);

        // Create dots data
        dotsRef.current = [];
        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
                const x = col * spacing + spacing / 2;
                const y = row * spacing + spacing / 2;

                const distanceX = Math.abs(x - centerX);
                const distanceY = Math.abs(y - centerY);
                const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

                // Better fade calculation
                const fadeRatio = distance / maxDistance;
                const baseOpacity = Math.max(0.05, Math.min(1, 1 - fadeRatio * 1.2));

                dotsRef.current.push({
                    x,
                    y,
                    opacity: baseOpacity,
                    baseOpacity,
                    glowPhase: Math.random() * Math.PI * 2,
                    glowSpeed: 0.02 + Math.random() * 0.01,
                });
            }
        }

        // Parse colors
        const parseDotColor = (color: string) => {
            if (color.startsWith('rgba')) {
                const match = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
                if (match) {
                    return {
                        r: parseInt(match[1]),
                        g: parseInt(match[2]),
                        b: parseInt(match[3]),
                        a: parseFloat(match[4])
                    };
                }
            }
            return { r: 128, g: 128, b: 128, a: 0.3 };
        };

        const parseGlowColor = (color: string) => {
            if (color.startsWith('#')) {
                const hex = color.slice(1);
                return {
                    r: parseInt(hex.slice(0, 2), 16),
                    g: parseInt(hex.slice(2, 4), 16),
                    b: parseInt(hex.slice(4, 6), 16)
                };
            }
            return { r: 163, g: 139, b: 250 };
        };

        const baseDot = parseDotColor(dotColor);
        const glowDot = parseGlowColor(glowColor);

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, containerWidth, containerHeight);

            dotsRef.current.forEach(dot => {
                // Update glow phase
                dot.glowPhase += dot.glowSpeed;

                // Calculate glow intensity (0 to 1)
                const glowIntensity = (Math.sin(dot.glowPhase) + 1) / 2;

                // Interpolate between base and glow colors
                const glowInfluence = 0.3;
                const r = Math.round(baseDot.r + (glowDot.r - baseDot.r) * glowIntensity * glowInfluence);
                const g = Math.round(baseDot.g + (glowDot.g - baseDot.g) * glowIntensity * glowInfluence);
                const b = Math.round(baseDot.b + (glowDot.b - baseDot.b) * glowIntensity * glowInfluence);
                const alpha = dot.baseOpacity * (0.7 + 0.3 * glowIntensity * glowInfluence);


                // Draw dot
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, gridSize / 2, 0, Math.PI * 2);
                ctx.fill();

                // Add subtle glow effect for strong glow phases
                if (glowIntensity > 0.8) {
                    const maxShadowAlpha = 0.3;
                    ctx.shadowColor = `rgba(${glowDot.r}, ${glowDot.g}, ${glowDot.b}, ${alpha * maxShadowAlpha})`;
                    ctx.shadowBlur = 2;

                    ctx.beginPath();
                    ctx.arc(dot.x, dot.y, gridSize / 2, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.shadowBlur = 0;
                }
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [containerWidth, containerHeight, dotColor, glowColor, gridSize, spacing]);

    if (containerWidth <= 0 || containerHeight <= 0) {
        return null;
    }

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{
                pointerEvents: 'none',
                willChange: 'transform',
            }}
            width={containerWidth}
            height={containerHeight}
        />
    );
};

export default memo(DotBackground);
