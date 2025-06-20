'use client';

import gsap from 'gsap';
import { JSX, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { useThemeColors } from '@/hooks/useThemeColors';
import { fontClasses } from '@/config/fonts';
import emailjs from '@emailjs/browser';

type FloatingIcon = {
    component: JSX.Element;
    x: number;
    y: number;
    initialDelay: number;
};

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

const Contact = () => {
    const { colors: theme, isDarkTheme, isLoading } = useThemeColors();
    const [mounted, setMounted] = useState(false);
    const [floatingIcons, setFloatingIcons] = useState<FloatingIcon[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [formStatus, setFormStatus] = useState<FormStatus>('idle');
    const [statusMessage, setStatusMessage] = useState('');

    const sectionRef = useRef<HTMLDivElement | null>(null);
    const headingRef = useRef<HTMLHeadingElement | null>(null);
    const paraRef = useRef<HTMLParagraphElement | null>(null);
    const formRef = useRef<HTMLFormElement | null>(null);
    const bgRef = useRef<HTMLDivElement | null>(null);
    const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Ensure component is mounted for GSAP to target elements
    useLayoutEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const iconNames = [
            'mdi:linkedin', 'mdi:github', 'mdi:instagram', 'mdi:facebook',
            'mdi:twitter', 'mdi:dribbble', 'mdi:behance', 'mdi:youtube',
            'mdi:reddit', 'mdi:snapchat', 'mdi:whatsapp', 'mdi:medium',
            'mdi:discord'
        ];

        const generateFloatingIcons = () => {
            const icons = [];
            const sizes = [16, 20, 24, 28];
            const usedCombinations = new Map();
            const positionedIcons = [];
            const minDistance = 150;

            for (let i = 0; i < 20; i++) {
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
                    // Generate coordinates in percentage
                    x = Math.random() * 90 + 5;
                    y = Math.random() * 90 + 5;
                    validPosition = true;

                    // Check distance from existing icons
                    for (const pos of positionedIcons) {
                        const dx = pos.x - x;
                        const dy = pos.y - y;
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
                    initialDelay: gsap.utils.random(0, 8),
                });
            }

            return icons;
        };

        setFloatingIcons(generateFloatingIcons());
    }, [isDarkTheme]);

    useLayoutEffect(() => {
        if (!mounted) return;

        // Ensure all refs are current when animations are created
        const headingElement = headingRef.current;
        const paraElement = paraRef.current;
        const formElement = formRef.current;
        const validIcons = iconRefs.current.filter(Boolean);

        gsap.killTweensOf([headingElement, paraElement, formElement, ...validIcons]);

        const mainContentTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

        if (headingElement && paraElement && formElement) {
            mainContentTimeline
                .fromTo(headingElement,
                    { y: 40, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1.0 },
                    0
                )
                .fromTo(paraElement,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8 },
                    0.4
                )
                .fromTo(formElement,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1.0 },
                    0.6
                );
        }

        // Floating Icons Animation
        if (validIcons.length > 0) {
            validIcons.forEach((icon, index) => {
                // Ensure the icon exists and its initialDelay is available from the state
                const iconData = floatingIcons[index];
                if (!icon || !iconData) return;

                gsap.set(icon, {
                    x: `+=${gsap.utils.random(-20, 20)}`,
                    y: `+=${gsap.utils.random(-20, 20)}`,
                    rotation: gsap.utils.random(-10, 10),
                    opacity: icon.style.opacity
                });

                gsap.to(icon, {
                    y: `+=${gsap.utils.random(-100, 100)}`,
                    x: `+=${gsap.utils.random(-100, 100)}`,
                    rotation: `+=${gsap.utils.random(-20, 20)}`,
                    duration: gsap.utils.random(15, 30),
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                    delay: iconData.initialDelay,
                    overwrite: "auto"
                });
            });
        }

        // Cleanup function for GSAP tweens
        return () => {
            if (headingElement) gsap.killTweensOf(headingElement);
            if (paraElement) gsap.killTweensOf(paraElement);
            if (formElement) gsap.killTweensOf(formElement);
            gsap.killTweensOf(validIcons);
            mainContentTimeline.kill();
        };
    }, [mounted, floatingIcons]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear status message when user starts typing again
        if (formStatus === 'success' || formStatus === 'error') {
            setFormStatus('idle');
            setStatusMessage('');
        }
    };

    const validateForm = () => {
        if (!formData.name.trim()) {
            setStatusMessage('Please enter your name');
            return false;
        }
        if (!formData.email.trim()) {
            setStatusMessage('Please enter your email');
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setStatusMessage('Please enter a valid email address');
            return false;
        }
        if (!formData.subject.trim()) {
            setStatusMessage('Please enter a subject');
            return false;
        }
        if (!formData.message.trim()) {
            setStatusMessage('Please enter your message');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            setFormStatus('error');
            return;
        }

        setFormStatus('sending');
        setStatusMessage('');

        try {
            const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
            const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
            const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

            if (!serviceId || !templateId || !publicKey) {
                throw new Error('Missing EmailJS configuration. Please check your environment variables.');
            }

            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                subject: formData.subject,
                message: formData.message,
                reply_to: formData.email,
            };

            // Send email
            const response = await emailjs.send(
                serviceId,
                templateId,
                templateParams,
                publicKey
            );

            if (response.status === 200) {
                setFormStatus('success');
                setStatusMessage('Thank you! Your message has been sent successfully.');
                setFormData({ name: '', email: '', subject: '', message: '' });

                // Auto-clear success message after 5 seconds
                setTimeout(() => {
                    setFormStatus('idle');
                    setStatusMessage('');
                }, 5000);
            } else {
                throw new Error(`EmailJS returned status: ${response.status}`);
            }
        } catch (error) {
            setFormStatus('error');

            if (error instanceof Error) {
                if (error.message.includes('Missing EmailJS configuration')) {
                    setStatusMessage('Configuration error. Please check environment variables.');
                } else if (error.message.includes('network') || error.message.includes('fetch')) {
                    setStatusMessage('Network error. Please check your internet connection.');
                } else {
                    setStatusMessage(`Error: ${error.message}`);
                }
            } else {
                setStatusMessage('Sorry, there was an error sending your message. Please try again later.');
            }
        }
    };

    const getStatusIcon = () => {
        switch (formStatus) {
            case 'success':
                return <Icon icon="mdi:check-circle" className="w-5 h-5 text-green-500" />;
            case 'error':
                return <Icon icon="mdi:alert-circle" className="w-5 h-5 text-red-500" />;
            default:
                return null;
        }
    };

    if (!mounted || isLoading) {
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
            <div
                ref={bgRef}
                className="fixed inset-0 overflow-hidden pointer-events-none"
            >
                {floatingIcons.map((icon, index) => (
                    <div
                        key={index}
                        ref={(el) => {
                            if (el) iconRefs.current[index] = el;
                        }}
                        className={`absolute ${theme.contactIcon} transition-colors duration-500 will-change-transform`}
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
            <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-between gap-20 py-24 z-10">
                <div className="lg:w-2/5 text-center lg:text-left">
                    <h1
                        ref={headingRef}
                        className={`${fontClasses.classyVogue} text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-8 leading-tight ${theme.contactText} will-change-transform`}
                    >
                        Let&apos;s Have a Conversation
                    </h1>
                    <p
                        ref={paraRef}
                        className={`${fontClasses.eireneSans} text-lg sm:text-xl font-light leading-relaxed ${theme.contactSubtext} will-change-transform`}
                    >
                        I value genuine connections and creative discussions.
                        Whether it&apos;s collaboration, mentorship, or
                        curiosity — feel free to reach out.
                    </p>
                </div>

                <div className="lg:w-3/5 w-full max-w-2xl">
                    <form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className={`${theme.contactFormBackground} ${theme.contactBorder} backdrop-blur-sm rounded-3xl p-8 sm:p-10 shadow-2xl transition-all duration-300 will-change-transform`}
                    >
                        <div className="space-y-8">
                            {/* Status Message */}
                            {statusMessage && (
                                <div
                                    className={`flex items-center gap-2 p-4 rounded-xl ${formStatus === 'success'
                                        ? `${theme.contactSuccessBackground} ${theme.contactSuccessBorder}`
                                        : `${theme.contactErrorBackground} ${theme.contactErrorBorder}`
                                        }`}
                                >
                                    {getStatusIcon()}
                                    <span
                                        className={`${fontClasses.eireneSans} text-sm ${formStatus === 'success'
                                            ? theme.contactSuccessText
                                            : theme.contactErrorText
                                            }`}
                                    >
                                        {statusMessage}
                                    </span>
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="group">
                                    <label className={`${fontClasses.eireneSansBold} block text-sm font-medium mb-3 ${theme.contactFormLabel}`}>
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className={`${fontClasses.eireneSans} w-full px-5 py-4 ${theme.contactFormInput} ${theme.contactFormInputBorder} backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 ${theme.contactFormInputFocus} placeholder:${theme.contactFormPlaceholder}`}
                                        placeholder="Enter your name"
                                    />
                                </div>

                                <div className="group">
                                    <label className={`${fontClasses.eireneSansBold} block text-sm font-medium mb-3 ${theme.contactFormLabel}`}>
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className={`${fontClasses.eireneSans} w-full px-5 py-4 ${theme.contactFormInput} ${theme.contactFormInputBorder} backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 ${theme.contactFormInputFocus} placeholder:${theme.contactFormPlaceholder}`}
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <label className={`${fontClasses.eireneSansBold} block text-sm font-medium mb-3 ${theme.contactFormLabel}`}>
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    required
                                    className={`${fontClasses.eireneSans} w-full px-5 py-4 ${theme.contactFormInput} ${theme.contactFormInputBorder} backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 ${theme.contactFormInputFocus} placeholder:${theme.contactFormPlaceholder}`}
                                    placeholder="What's this about?"
                                />
                            </div>

                            <div className="group">
                                <label className={`${fontClasses.eireneSansBold} block text-sm font-medium mb-3 ${theme.contactFormLabel}`}>
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    rows={6}
                                    className={`${fontClasses.eireneSans} w-full px-5 py-4 ${theme.contactFormInput} ${theme.contactFormInputBorder} backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 ${theme.contactFormInputFocus} resize-none placeholder:${theme.contactFormPlaceholder}`}
                                    placeholder="Tell me about your project, idea, or just say hello..."
                                />
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={formStatus === 'sending'}
                                    className={`group relative w-full sm:w-auto px-12 py-4 ${theme.contactFormButton} ${theme.contactFormButtonHover} backdrop-blur-sm rounded-xl font-medium transition-all duration-300 transform ${formStatus === 'sending'
                                        ? 'scale-95 opacity-75'
                                        : 'hover:scale-[1.02] hover:shadow-xl'
                                        } focus:outline-none focus:ring-2 ${theme.contactFormButtonFocus} disabled:cursor-not-allowed`}
                                >
                                    <span className={`${fontClasses.eireneSansBold} flex items-center justify-center gap-3 ${theme.contactFormButtonText}`}>
                                        {formStatus === 'sending' ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Message
                                                <Icon
                                                    icon="mdi:arrow-right"
                                                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                                                />
                                            </>
                                        )}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
