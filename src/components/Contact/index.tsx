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
        <div className="relative w-full h-screen overflow-hidden">
            {/* Centered Background Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0 gap-[2.2vw]">
                <div className="text-[20vw] md:text-[18vw] lg:text-[15vw] font-serif font-extrabold opacity-[0.1] text-center leading-none transition-colors">
                    Contact
                </div>
                <div className="text-[18vw] md:text-[16vw] lg:text-[13vw] font-serif font-extrabold opacity-[0.08] text-center leading-none transition-colors">
                    Connect
                </div>
                <div className="text-[16vw] md:text-[14vw] lg:text-[11vw] font-serif font-extrabold opacity-[0.06] text-center leading-none transition-colors">
                    Collaborate
                </div>
            </div>

            {/* Content Card - Centered with Flex */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-full max-w-3xl mx-auto px-4">
                    <div className="bg-gradient-to-br from-white to-white/20 dark:from-black/10 dark:to-black/20 backdrop-blur-sm rounded-xl shadow-lg border border-white/10 dark:border-black/10 p-6 md:p-8 lg:p-10">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-center mb-6 relative">
                            <span className="block w-fit mx-auto">
                                Get in Touch
                                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-current opacity-30 mt-2"></span>
                            </span>
                        </h1>
                        <p className="text-base md:text-lg text-center opacity-80 max-w-2xl mx-auto mb-8 font-serif leading-relaxed">
                            Let&apos;s build something amazing together.
                            I&apos;m always open to new opportunities and
                            exciting projects.
                        </p>

                        <div className="flex flex-col md:flex-row justify-center gap-5 mb-8 w-full">
                            {/* LinkedIn */}
                            <a
                                href="https://linkedin.com/in/imdhruv99"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center p-5 bg-white/70 dark:bg-black/25 backdrop-blur-lg rounded-lg border border-white/30 dark:border-white/5 transition-all duration-300 hover:translate-y-[-3px] hover:shadow-lg hover:border-white/40 dark:hover:border-white/15 overflow-hidden relative w-full md:max-w-[280px] text-current no-underline group"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                                <div className="flex-shrink-0 mr-4 flex items-center justify-center w-11 h-11 rounded-xl bg-white/30 dark:bg-white/5 transition-all duration-300 group-hover:bg-white/15 dark:group-hover:bg-white/10 group-hover:scale-105">
                                    <LinkedinLogo weight="bold" size={24} />
                                </div>
                                <div className="flex-grow text-left">
                                    <h3 className="font-semibold text-lg font-serif mb-1">
                                        LinkedIn
                                    </h3>
                                    <p className="text-sm opacity-70">
                                        Let&apos;s connect professionally
                                    </p>
                                </div>
                                <div className="flex-shrink-0 opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
                                    <ArrowUpRight weight="bold" size={20} />
                                </div>
                            </a>

                            {/* Email */}
                            <a
                                href="mailto:dhruvprajapati.work@gmail.com"
                                className="flex items-center p-5 bg-white/70 dark:bg-black/25 backdrop-blur-lg rounded-lg border border-white/30 dark:border-white/5 transition-all duration-300 hover:translate-y-[-3px] hover:shadow-lg hover:border-white/40 dark:hover:border-white/15 overflow-hidden relative w-full md:max-w-[280px] text-current no-underline group"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                                <div className="flex-shrink-0 mr-4 flex items-center justify-center w-11 h-11 rounded-xl bg-white/30 dark:bg-white/5 transition-all duration-300 group-hover:bg-white/15 dark:group-hover:bg-white/10 group-hover:scale-105">
                                    <Mailbox weight="bold" size={24} />
                                </div>
                                <div className="flex-grow text-left">
                                    <h3 className="font-semibold text-lg font-serif mb-1">
                                        Email
                                    </h3>
                                    <p className="text-sm opacity-70">
                                        Send me a message directly
                                    </p>
                                </div>
                                <div className="flex-shrink-0 opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
                                    <ArrowUpRight weight="bold" size={20} />
                                </div>
                            </a>

                            {/* GitHub */}
                            <a
                                href="https://github.com/imdhruv99"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center p-5 bg-white/70 dark:bg-black/25 backdrop-blur-lg rounded-lg border border-white/30 dark:border-white/5 transition-all duration-300 hover:translate-y-[-3px] hover:shadow-lg hover:border-white/40 dark:hover:border-white/15 overflow-hidden relative w-full md:max-w-[280px] text-current no-underline group"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                                <div className="flex-shrink-0 mr-4 flex items-center justify-center w-11 h-11 rounded-xl bg-white/30 dark:bg-white/5 transition-all duration-300 group-hover:bg-white/15 dark:group-hover:bg-white/10 group-hover:scale-105">
                                    <GithubLogo weight="bold" size={24} />
                                </div>
                                <div className="flex-grow text-left">
                                    <h3 className="font-semibold text-lg font-serif mb-1">
                                        GitHub
                                    </h3>
                                    <p className="text-sm opacity-70">
                                        Explore my code repositories
                                    </p>
                                </div>
                                <div className="flex-shrink-0 opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
                                    <ArrowUpRight weight="bold" size={20} />
                                </div>
                            </a>
                        </div>

                        <div className="mt-8 max-w-2xl mx-auto leading-relaxed text-base opacity-85 pt-4 border-t border-white/10 dark:border-white/5">
                            <p className="text-center px-2 sm:px-4">
                                Whether you&apos;re looking to collaborate on a
                                project, have a question about my work, or just
                                want to say hello, I&apos;d love to hear from
                                you. I typically respond within 24-48 hours.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
