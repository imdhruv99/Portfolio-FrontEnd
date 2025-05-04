'use client';

import { useState, useEffect } from 'react';
import {
    GithubLogo,
    Mailbox,
    LinkedinLogo,
    ArrowUpRight,
} from '@phosphor-icons/react';
import './Contact.css';

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
        <div className="contact-container">
            {/* Hero Section with Background Text Effect */}
            <section className="contact-hero theme-transition">
                <div className="contact-background-text theme-transition">
                    Contact
                </div>
                <div className="contact-background-text contact-second-text theme-transition">
                    Connect
                </div>
                <div className="contact-background-text contact-third-text theme-transition">
                    Collaborate
                </div>

                <div className="contact-overlay-content animate-fadeIn">
                    <h1 className="contact-title">Get in Touch</h1>
                    <p className="contact-subtitle">
                        Let's build something amazing together. I'm always open
                        to new opportunities and exciting projects.
                    </p>

                    {/* Contact Cards Container */}
                    <div className="contact-cards-container">
                        {/* LinkedIn Card */}
                        <a
                            href="https://linkedin.com/in/imdhruv99"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-card linkedin-card"
                        >
                            <div className="contact-card-icon">
                                <LinkedinLogo weight="bold" size={24} />
                            </div>
                            <div className="contact-card-content">
                                <h3 className="contact-card-title">LinkedIn</h3>
                                <p className="contact-card-description">
                                    Let's connect professionally
                                </p>
                            </div>
                            <div className="contact-card-arrow">
                                <ArrowUpRight weight="bold" size={20} />
                            </div>
                        </a>

                        {/* Email Card */}
                        <a
                            href="mailto:dhruvprajapati.work@gmail.com"
                            className="contact-card email-card"
                        >
                            <div className="contact-card-icon">
                                <Mailbox weight="bold" size={24} />
                            </div>
                            <div className="contact-card-content">
                                <h3 className="contact-card-title">Email</h3>
                                <p className="contact-card-description">
                                    Send me a message directly
                                </p>
                            </div>
                            <div className="contact-card-arrow">
                                <ArrowUpRight weight="bold" size={20} />
                            </div>
                        </a>

                        {/* GitHub Card */}
                        <a
                            href="https://github.com/imdhruv99"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-card github-card"
                        >
                            <div className="contact-card-icon">
                                <GithubLogo weight="bold" size={24} />
                            </div>
                            <div className="contact-card-content">
                                <h3 className="contact-card-title">GitHub</h3>
                                <p className="contact-card-description">
                                    Explore my code repositories
                                </p>
                            </div>
                            <div className="contact-card-arrow">
                                <ArrowUpRight weight="bold" size={20} />
                            </div>
                        </a>
                    </div>

                    {/* Message Section */}
                    <div className="contact-message">
                        <p>
                            Whether you're looking to collaborate on a project,
                            have a question about my work, or just want to say
                            hello, I'd love to hear from you. I typically
                            respond within 24-48 hours.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
