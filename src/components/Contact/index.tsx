'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { GithubLogo, Mailbox, LinkedinLogo } from '@phosphor-icons/react';
import gsap from 'gsap';

interface ContactProps {
    isDarkTheme: boolean;
}

const Contact = ({ isDarkTheme }: ContactProps) => {
    const [mounted, setMounted] = useState(false);
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const headingRef = useRef<HTMLHeadingElement | null>(null);
    const paraRef = useRef<HTMLParagraphElement | null>(null);
    const buttonRefs = useRef<(HTMLAnchorElement | null)[]>([]);

    useEffect(() => {
        setMounted(true);
    }, []);

    useLayoutEffect(() => {
        if (!mounted) return;

        const validButtons = buttonRefs.current.filter(Boolean);

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        if (headingRef.current && paraRef.current) {
            tl.fromTo(
                headingRef.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1 }
            )
                .fromTo(
                    paraRef.current,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8 },
                    '-=0.5'
                )
                .fromTo(
                    validButtons,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6, stagger: 0.15 },
                    '-=0.4'
                );
        }
    }, [mounted]);

    if (!mounted) return null;

    const lightTheme = {
        background: 'bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#ffffff] via-[#f6f6f6] to-[#ececec]',
        text: 'text-gray-800',
        subtext: 'text-gray-500',
        border: 'border-gray-200',
        button: 'bg-white hover:bg-gray-100 text-gray-900',
    };

    const darkTheme = {
        background: 'bg-gradient-to-br from-[#0e0e0e] via-[#1a1a1a] to-[#121212]',
        text: 'text-white',
        subtext: 'text-gray-400',
        border: 'border-white/10',
        button: 'bg-white/5 hover:bg-white/10 text-white',
    };

    const theme = isDarkTheme ? darkTheme : lightTheme;

    const contacts = [
        {
            label: 'LinkedIn',
            link: 'https://linkedin.com/in/imdhruv99',
            icon: <LinkedinLogo size={22} />,
        },
        {
            label: 'Email',
            link: 'mailto:dhruvprajapati.work@gmail.com',
            icon: <Mailbox size={22} />,
        },
        {
            label: 'GitHub',
            link: 'https://github.com/imdhruv99',
            icon: <GithubLogo size={22} />,
        },
    ];

    return (
        <section
            ref={sectionRef}
            className={`w-full min-h-screen ${theme.background} transition-colors duration-500 flex items-center justify-center px-6`}
        >
            <div className="max-w-5xl w-full flex flex-col md:flex-row items-center justify-between gap-16 py-24">
                {/* Left Side */}
                <div className="md:w-1/2 text-center md:text-left">
                    <h1
                        ref={headingRef}
                        className={`text-4xl sm:text-5xl font-serif font-bold mb-6 leading-tight ${theme.text}`}
                    >
                        Let’s Have a Conversation
                    </h1>
                    <p
                        ref={paraRef}
                        className={`text-lg sm:text-xl font-light ${theme.subtext}`}
                    >
                        I value genuine connections and creative discussions. Whether it&apos;s collaboration, mentorship, or curiosity — feel free to reach out.
                    </p>
                </div>

                {/* Right Side */}
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
                            className={`group flex items-center justify-center gap-3 w-64 px-6 py-4 rounded-full transition-all duration-300 ${theme.button} border ${theme.border} shadow-sm`}
                        >
                            {contact.icon}
                            <span className="font-medium text-sm tracking-wide">{contact.label}</span>
                        </a>
                    ))}

                    <p className={`mt-10 text-sm text-center md:text-left ${theme.subtext}`}>
                        Typically responds within 24–48 hours. Let’s create something meaningful.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Contact;
