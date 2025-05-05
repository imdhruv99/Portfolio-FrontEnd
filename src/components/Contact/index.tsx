'use client';

import { useEffect, useState } from 'react';
import {
    GithubLogo,
    Mailbox,
    LinkedinLogo,
    ArrowUpRight,
} from '@phosphor-icons/react';

interface ContactProps {
    isDarkTheme: boolean;
}

const Contact = ({ isDarkTheme }: ContactProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="relative w-full min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-transparent">
            <div className="flex flex-col items-center justify-center min-h-[80vh] max-w-3xl mx-auto text-center z-10">
                <div className={`backdrop-blur-md rounded-2xl shadow-xl px-6 sm:px-10 py-10 w-full border ${isDarkTheme ? 'bg-white/5 border-white/10' : 'bg-white/60 border-gray-200'} transition-colors`}>
                    <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-4">
                        Let&apos;s Connect
                    </h1>
                    <p className="text-sm sm:text-base opacity-70 mb-8 leading-relaxed font-serif">
                        Whether you&apos;re looking to collaborate, have a question, or just want to say hello — I&apos;m always open to meaningful conversations and new opportunities.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            {
                                title: 'LinkedIn',
                                text: 'Connect professionally',
                                icon: <LinkedinLogo size={24} weight="fill" />,
                                link: 'https://linkedin.com/in/imdhruv99',
                            },
                            {
                                title: 'Email',
                                text: 'Send me a message',
                                icon: <Mailbox size={24} weight="fill" />,
                                link: 'mailto:dhruvprajapati.work@gmail.com',
                            },
                            {
                                title: 'GitHub',
                                text: 'View my code',
                                icon: <GithubLogo size={24} weight="fill" />,
                                link: 'https://github.com/imdhruv99',
                            },
                        ].map((item, idx) => (
                            <a
                                key={idx}
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`group flex flex-col items-center text-center p-5 rounded-xl transition-transform duration-300 hover:-translate-y-1 ${isDarkTheme ? 'bg-white/10 border border-white/10' : 'bg-white/80 border border-gray-200'} backdrop-blur-lg`}
                            >
                                <div className="mb-3 text-primary">
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-semibold font-serif">
                                    {item.title}
                                </h3>
                                <p className="text-xs opacity-60">{item.text}</p>
                                <ArrowUpRight
                                    size={18}
                                    weight="bold"
                                    className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                />
                            </a>
                        ))}
                    </div>

                    <p className="text-xs sm:text-sm opacity-60 mt-8 pt-6 border-t border-white/10 font-serif">
                        Typically responds within 24–48 hours. Looking forward to hearing from you.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Contact;
