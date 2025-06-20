import gsap from 'gsap';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function scrambleText(element: HTMLElement, originalText: string, duration = 1) {
    const chars = letters.split('');
    let frameCount = 0;

    const scramble = () => {
        frameCount++;
        if (frameCount % 10 !== 0) return;

        const scrambled = originalText
            .split('')
            .map(char => (char === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)]))
            .join('');
        element.textContent = scrambled;
    };

    return gsap.to({}, {
        duration,
        ease: 'none',
        onUpdate: scramble,
        onComplete: () => {
            element.textContent = originalText;
        }
    });
}
