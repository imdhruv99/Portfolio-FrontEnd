'use client';

import gsap from 'gsap';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { useThemeColors } from '@/hooks/useThemeColors';

const Contact = () => {
    const { colors: theme, isDarkTheme, isLoading } = useThemeColors();
    const [mounted, setMounted] = useState(false);
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const headingRef = useRef<HTMLHeadingElement | null>(null);
    const paraRef = useRef<HTMLParagraphElement | null>(null);
    const buttonRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const bgRef = useRef<HTMLDivElement | null>(null);
    const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        setMounted(true);
    }, []);

    useLayoutEffect(() => {
        if (!mounted) return;

        const validButtons = buttonRefs.current.filter(Boolean);
        const validIcons = iconRefs.current.filter(Boolean);

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        if (headingRef.current && paraRef.current) {
            tl.fromTo(headingRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
                .fromTo(paraRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.5')
                .fromTo(validButtons, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.15 }, '-=0.4');
        }

        if (validIcons.length > 0) {
            validIcons.forEach((icon) => {
                if (!icon) return;

                gsap.set(icon, {
                    x: gsap.utils.random(-20, 20),
                    y: gsap.utils.random(-20, 20),
                    rotation: gsap.utils.random(-10, 10),
                });

                gsap.to(icon, {
                    y: gsap.utils.random(-100, 100),
                    x: gsap.utils.random(-100, 100),
                    rotation: gsap.utils.random(-20, 20),
                    duration: gsap.utils.random(15, 30),
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                    delay: gsap.utils.random(0, 8),
                });
            });
        }

        return () => {
            gsap.killTweensOf(validIcons);
        };
    }, [mounted]);

    if (!mounted || isLoading) return null;

    const contacts = [
        {
            label: 'LinkedIn',
            link: 'https://linkedin.com/in/imdhruv99',
            icon: 'mdi:linkedin',
        },
        {
            label: 'Email',
            link: 'mailto:dhruvprajapati.work@gmail.com',
            icon: 'mdi:email',
        },
        {
            label: 'GitHub',
            link: 'https://github.com/imdhruv99',
            icon: 'mdi:github',
        },
    ];

    const iconNames = [
        'mdi:linkedin',
        'mdi:github',
        'mdi:instagram',
        'mdi:facebook',
        'mdi:twitter',
        'mdi:dribbble',
        'mdi:behance',
        'mdi:youtube',
        'mdi:reddit',
        'mdi:snapchat',
        'mdi:whatsapp',
        'mdi:medium',
        'mdi:discord',
    ];

    const generateFloatingIcons = () => {
        const icons = [];
        const sizes = [16, 20, 24, 28];
        const usedCombinations = new Map();
        const positionedIcons = [];
        const minDistance = 150;

        for (let i = 0; i < 30; i++) {
            let iconIndex, sizeIndex, combination;
            let x, y;
            let validPosition = false;
            let attempts = 0;

            do {
                iconIndex = Math.floor(Math.random() * iconNames.length);
                sizeIndex = Math.floor(Math.random() * sizes.length);
                combination = `${iconIndex}-${sizeIndex}`;
                attempts++;
            } while (usedCombinations.has(combination) && attempts < 50);

            usedCombinations.set(combination, true);

            attempts = 0;
            do {
                x = Math.random() * 90 + 5;
                y = Math.random() * 90 + 5;
                validPosition = true;

                for (const pos of positionedIcons) {
                    const dx = Math.abs(pos.x - x);
                    const dy = Math.abs(pos.y - y);
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < minDistance / 10) {
                        validPosition = false;
                        break;
                    }
                }

                attempts++;
            } while (!validPosition && attempts < 30);

            positionedIcons.push({ x, y });

            icons.push({
                component: (
                    <Icon
                        icon={iconNames[iconIndex]}
                        width={sizes[sizeIndex]}
                        height={sizes[sizeIndex]}
                        className={isDarkTheme ? 'brightness-125' : 'brightness-90'}
                    />
                ),
                x,
                y,
            });
        }

        return icons;
    };

    const floatingIcons = generateFloatingIcons();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <section
            ref={sectionRef}
            className={`relative w-full min-h-screen ${theme.background} transition-colors duration-500 flex items-center justify-center px-6 overflow-hidden`}
        >
            {/* Floating Icons */}
            <div ref={bgRef} className="fixed inset-0 overflow-hidden pointer-events-none">
                {floatingIcons.map((icon, index) => (
                    <div
                        key={index}
                        ref={(el) => { iconRefs.current[index] = el; }}
                        className={`absolute ${theme.iconColor} transition-colors duration-500`}
                        style={{
                            top: `${icon.y}%`,
                            left: `${icon.x}%`,
                            opacity: Math.random() * 0.25 + 0.15,
                            transform: `rotate(${Math.random() * 30 - 15}deg)`,
                            zIndex: -1,
                        }}
                    >
                        {icon.component}
                    </div>
                ))}
            </div>

            {/* Contact Section */}
            <div className="max-w-5xl w-full flex flex-col md:flex-row items-center justify-between gap-16 py-24 z-10">
                <div className="md:w-1/2 text-center md:text-left">
                    <h1
                        ref={headingRef}
                        className={`text-4xl sm:text-5xl font-serif font-bold mb-6 leading-tight ${theme.text}`}
                    >
                        Let&apos;s Have a Conversation
                    </h1>
                    <p
                        ref={paraRef}
                        className={`text-lg sm:text-xl font-light ${theme.subtext}`}
                    >
                        I value genuine connections and creative discussions. Whether it&apos;s collaboration, mentorship, or curiosity — feel free to reach out.
                    </p>
                </div>

                <div className="md:w-1/2 w-full flex flex-col gap-5 items-center md:items-start">
                    {contacts.map((contact, index) => (
                        <a
                            key={index}
                            href={contact.link}
                            ref={(el) => {
                                buttonRefs.current[index] = el;
                            }}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group flex justify-center items-center w-64 px-6 py-4 rounded-full transition-all duration-300 ${theme.button} border ${theme.border} shadow-sm hover:scale-105`}
                        >
                            <div className="flex items-center gap-3">
                                <Icon icon={contact.icon} width={22} height={22} />
                                <span className="font-medium text-sm tracking-wide">{contact.label}</span>
                            </div>
                        </a>
                    ))}

                    <p className={`mt-10 text-sm text-center md:text-left ${theme.subtext}`}>
                        Typically responds within 24–48 hours. Let&apos;s create something meaningful.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Contact;
