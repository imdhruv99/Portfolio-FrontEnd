'use client';

import Image from 'next/image';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import educationData from '../../constants/EducationData';
import sortedCertificateData from '../../constants/CertificateData';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface EducationProps {
    isDarkTheme: boolean;
}

const Education = ({ isDarkTheme }: EducationProps) => {
    const [mounted, setMounted] = useState(false);
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const headingRef = useRef<HTMLHeadingElement | null>(null);
    const canvasRef = useRef<HTMLDivElement | null>(null);
    const educationHeaderRef = useRef<HTMLDivElement | null>(null);
    const certificationHeaderRef = useRef<HTMLDivElement | null>(null);
    const timelineRef = useRef<HTMLDivElement | null>(null);
    const certificatesRef = useRef<HTMLDivElement | null>(null);

    // Refs for education and certificate items
    const educationRefs = useRef<(HTMLDivElement | null)[]>([]);
    const certificateRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Three.js scene reference
    const sceneRef = useRef<any>(null);

    // Initialize refs arrays
    useEffect(() => {
        educationRefs.current = Array(educationData.length).fill(null);
        certificateRefs.current = Array(sortedCertificateData.length).fill(null);
        setMounted(true);
    }, []);

    // 3D Certificate Animation effect
    const setupThreeJS = () => {
        if (!canvasRef.current) return;

        // Clear any existing content
        while (canvasRef.current.firstChild) {
            canvasRef.current.removeChild(canvasRef.current.firstChild);
        }

        // Setup scene
        const scene = new THREE.Scene();
        const canvasWidth = canvasRef.current.clientWidth;
        const canvasHeight = 300; // Fixed height for the 3D banner

        // Camera
        const camera = new THREE.PerspectiveCamera(50, canvasWidth / canvasHeight, 0.1, 1000);
        camera.position.z = 5;

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(canvasWidth, canvasHeight);
        renderer.setClearColor(0x000000, 0);
        canvasRef.current.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);

        // Create floating certificates (stylized cubes)
        const certificates = [];
        const colors = isDarkTheme
            ? [0x2dd4bf, 0x0d9488, 0x0f766e] // Teal shades for dark theme
            : [0x14b8a6, 0x0d9488, 0x115e59]; // Teal shades for light theme

        for (let i = 0; i < 15; i++) {
            const geometry = new THREE.BoxGeometry(0.8, 0.5, 0.05);
            const material = new THREE.MeshPhongMaterial({
                color: colors[Math.floor(Math.random() * colors.length)],
                transparent: true,
                opacity: 0.8,
                specular: 0x555555,
                shininess: 30
            });

            const certificate = new THREE.Mesh(geometry, material);

            // Random positions across the scene
            certificate.position.x = (Math.random() - 0.5) * 10;
            certificate.position.y = (Math.random() - 0.5) * 4;
            certificate.position.z = (Math.random() - 0.5) * 5;

            // Random rotation
            certificate.rotation.x = Math.random() * Math.PI;
            certificate.rotation.y = Math.random() * Math.PI;

            scene.add(certificate);
            certificates.push({
                mesh: certificate,
                rotSpeed: (Math.random() - 0.5) * 0.01,
                floatSpeed: 0.005 + Math.random() * 0.005,
                floatRange: 0.2 + Math.random() * 0.3,
                initialY: certificate.position.y
            });
        }

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);

            // Animate each certificate
            certificates.forEach(cert => {
                // Gentle rotation
                cert.mesh.rotation.x += cert.rotSpeed;
                cert.mesh.rotation.y += cert.rotSpeed * 1.5;

                // Floating effect
                cert.mesh.position.y = cert.initialY + Math.sin(Date.now() * cert.floatSpeed) * cert.floatRange;
            });

            renderer.render(scene, camera);
        };

        animate();

        // Handle window resize
        const handleResize = () => {
            if (!canvasRef.current) return;
            const newWidth = canvasRef.current.clientWidth;
            camera.aspect = newWidth / canvasHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, canvasHeight);
        };

        window.addEventListener('resize', handleResize);

        // Store references for cleanup
        sceneRef.current = {
            cleanup: () => {
                window.removeEventListener('resize', handleResize);
                if (canvasRef.current) {
                    canvasRef.current.removeChild(renderer.domElement);
                }
            }
        };
    };

    // Initialize ThreeJS when component mounts
    useEffect(() => {
        if (mounted && canvasRef.current) {
            setupThreeJS();
        }

        return () => {
            if (sceneRef.current) {
                sceneRef.current.cleanup();
            }
        };
    }, [mounted, isDarkTheme]);

    // GSAP Animations
    useLayoutEffect(() => {
        if (!mounted) return;

        const ctx = gsap.context(() => {
            // Main heading animation
            gsap.fromTo(
                headingRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out"
                }
            );

            // 3D banner reveal
            if (canvasRef.current) {
                gsap.fromTo(
                    canvasRef.current,
                    { opacity: 0 },
                    {
                        opacity: 1,
                        duration: 1.5,
                        delay: 0.3,
                        ease: "power2.inOut"
                    }
                );
            }

            // Education header animation
            gsap.fromTo(
                educationHeaderRef.current,
                { x: -50, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    delay: 0.5,
                    ease: "back.out(1.2)"
                }
            );

            // Education timeline items animation
            educationRefs.current.forEach((el, index) => {
                gsap.fromTo(
                    el,
                    {
                        x: -70,
                        opacity: 0,
                        rotationY: -15
                    },
                    {
                        x: 0,
                        opacity: 1,
                        rotationY: 0,
                        duration: 0.9,
                        delay: 0.3 + (index * 0.2),
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top bottom-=100",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });

            // Certification header animation
            gsap.fromTo(
                certificationHeaderRef.current,
                { x: -50, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: certificationHeaderRef.current,
                        start: "top bottom-=50",
                        toggleActions: "play none none reverse"
                    },
                    ease: "back.out(1.2)"
                }
            );

            // Certificate cards staggered animation
            gsap.fromTo(
                certificateRefs.current,
                {
                    y: 50,
                    opacity: 0,
                    scale: 0.9,
                    rotationX: 5
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    rotationX: 0,
                    duration: 0.7,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: certificatesRef.current,
                        start: "top bottom-=100",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Add hover animations for certificate cards
            certificateRefs.current.forEach(card => {
                if (!card) return;

                // Create hover effect animation
                card.addEventListener('mouseenter', () => {
                    gsap.to(card, {
                        scale: 1.03,
                        rotationY: 5,
                        rotationX: 5,
                        boxShadow: isDarkTheme
                            ? "0 25px 50px -12px rgba(0, 0, 0, 0.7)"
                            : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                        duration: 0.4,
                        ease: "power2.out"
                    });
                });

                card.addEventListener('mouseleave', () => {
                    gsap.to(card, {
                        scale: 1,
                        rotationY: 0,
                        rotationX: 0,
                        boxShadow: isDarkTheme
                            ? "0 10px 15px -3px rgba(0, 0, 0, 0.5)"
                            : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        duration: 0.4,
                        ease: "power2.out"
                    });
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [mounted, isDarkTheme]);

    if (!mounted) return null;

    // Use the original theme from your code
    const lightTheme = {
        background: 'bg-gradient-to-br from-[#ffffff] via-[#f5f5f5] to-[#eaeaea]',
        text: 'text-gray-900',
        subtext: 'text-gray-600',
        accent: 'text-neutral-500',
    };

    const darkTheme = {
        background: 'bg-gradient-to-br from-[#0f0f0f] via-[#1b1b1b] to-[#121212]',
        text: 'text-gray-100',
        subtext: 'text-gray-400',
        accent: 'text-neutral-600',
    };

    const theme = isDarkTheme ? darkTheme : lightTheme;

    // Function to format date for better display
    const formatPeriod = (period: string) => {
        return period.replace(' - ', ' – ');
    };

    return (
        <section
            ref={sectionRef}
            className={`relative w-full ${theme.background} transition-colors duration-500 px-4 sm:px-6 py-16 md:py-20`}
        >
            <div className="max-w-6xl mx-auto">
                {/* Main Header */}
                <h1
                    ref={headingRef}
                    className={`text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-center tracking-tight leading-tight ${theme.text}`}
                >
                    Education & Credentials
                </h1>

                {/* 3D Certificate Animation Banner */}
                {/* <div
                    ref={canvasRef}
                    className="w-full h-64 my-8 relative overflow-hidden"
                    aria-hidden="true"
                ></div> */}

                {/* Education Section */}
                <div className="mb-20">
                    <div
                        ref={educationHeaderRef}
                        className="border-b border-gray-200 dark:border-gray-800 pb-3 mb-12"
                    >
                        <h2 className={`text-3xl md:text-4xl font-serif font-bold ${theme.text}`}>
                            Academic Journey
                        </h2>
                    </div>

                    <div ref={timelineRef} className="relative">
                        {/* Timeline line */}
                        <div className={`absolute left-8 sm:left-1/2 top-0 bottom-0 w-px bg-gray-200 dark:bg-neutral-800`}></div>

                        {/* Timeline items */}
                        <div className="space-y-16">
                            {educationData.map((edu, index) => (
                                <div
                                    key={edu.id}
                                    ref={(el) => {
                                        educationRefs.current[index] = el;
                                    }}
                                    className="relative"
                                >
                                    {/* Timeline node */}
                                    <div className={`absolute left-8 sm:left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-neutral-500 border-4 border-white dark:border-neutral-900 z-10`}></div>

                                    {/* Content card with alternating layout on desktop */}
                                    <div className={`
                    relative sm:w-1/2 ${index % 2 === 0 ? 'ml-16 sm:ml-0' : 'ml-16 sm:ml-auto sm:mr-0'}
                    ${index % 2 === 0 ? 'sm:pr-12' : 'sm:pl-12'}
                  `}>
                                        <div className={`
                      bg-white dark:bg-neutral-800 rounded-lg p-6
                      shadow-lg hover:shadow-xl transition-all duration-300
                      transform perspective-1000 hover:scale-[1.02]
                    `}>
                                            <h3 className={`text-xl font-bold ${theme.text}`}>{edu.degree}</h3>
                                            <p className={`text-sm mt-2 ${theme.accent}`}>{edu.institution}</p>
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-3 pt-3 border-t border-gray-100 dark:border-neutral-700">
                                                <p className={`text-sm ${theme.subtext}`}>{formatPeriod(edu.period)}</p>
                                                <p className={`text-sm font-medium ${theme.text} mt-1 sm:mt-0`}>
                                                    Grade: {edu.grade}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Date marker for mobile */}
                                        <div className="sm:hidden flex items-center mt-2 ml-2">
                                            <span className={`text-xs ${theme.subtext}`}>{formatPeriod(edu.period)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Certifications Section */}
                <div className="pt-10">
                    <div
                        ref={certificationHeaderRef}
                        className="border-b border-gray-200 dark:border-neutral-800 pb-3 mb-12"
                    >
                        <h2 className={`text-3xl md:text-4xl font-serif font-bold ${theme.text}`}>
                            Professional Certifications
                        </h2>
                    </div>

                    <div
                        ref={certificatesRef}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {sortedCertificateData.map((cert, index) => (
                            <div
                                key={cert.id}
                                ref={(el) => {
                                    certificateRefs.current[index] = el;
                                }}
                                className={`
                  bg-white dark:bg-neutral-800 rounded-lg p-6
                  shadow-md transition-all duration-300
                  flex flex-col h-full transform perspective-1000
                `}
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                {/* <div className="mb-4 flex items-center">
                                    {cert.logo ? (
                                        <Image
                                            src={cert.logo}
                                            alt={`${cert.issuer} logo`}
                                            width={40}
                                            height={40}
                                            className="object-contain mr-3"
                                        />
                                    ) : (
                                        <div className={`w-10 h-10 rounded-md flex items-center justify-center bg-neutral-100 dark:bg-neutral-900`}>
                                            <span className={`text-lg font-bold text-neutral-600 dark:text-neutral-300`}>
                                                {cert.issuer.charAt(0)}
                                            </span>
                                        </div>
                                    )}
                                    <div className={`text-xs uppercase tracking-wider font-semibold ${theme.accent}`}>{cert.issuer}</div>
                                </div> */}

                                <h3 className={`text-lg font-semibold mb-3 ${theme.text}`}>{cert.title}</h3>

                                <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100 dark:border-neutral-700">
                                    <p className={`text-xs ${theme.accent}`}>
                                        {cert.issueDate !== '—' ? cert.issueDate : 'No date'}
                                    </p>
                                    {cert.credentialUrl && (
                                        <a
                                            href={cert.credentialUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`text-xs text-neutral-600 dark:text-neutral-400 hover:underline transition-colors duration-300`}
                                        >
                                            Verify →
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Education;
