export interface ThemeColors {
    // Common Styles
    background: string;

    // Home Page Styles
    homeHighlightColor: string;
    homeHeroText: string;
    homeSubText: string;
    homeTechIconBackground: string;
    homeTechIconBorder: string;
    homeSectionDivider: string;
    homeHeroGradient: string;
    homeHeroGradientOverlay: string;
    homeHeroOrbitalRingDesktop: string;
    homeHeroOrbitalRingMobile: string;

    // Experience Page Styles
    experienceBentoCard: string;
    experienceBentoBorder: string;
    experienceBentoHover: string;
    experienceBentoShadow: string;
    experienceDescriptionDivider: string;
    experienceScrollbarTrack: string;
    experienceScrollbarThumb: string;
    experienceScrollbarThumbHover: string;
    experienceCard: string;
    experienceText: string;
    experienceSubText: string;
    experienceDescriptionText: string;

    // Project Page Styles
    projectPatternBackground: string;
    projectIndexText: string;
    projecHeroText: string;
    projectCategoryText: string;
    projectMetaText: string;
    projectDescriptionText: string
    projectLinkText: string;
    projectLinkButton: string;
    projectButton: string;
    projectTechBadge: string;
    projectCard: string;
    projectCardPattern: string;
    projectGradientOverlay: string;
    projectYearBadge: string;

    // Education Page Styles
    educationText: string;
    educationSubtext: string;
    educationBorder: string;
    educationTimeLine: string;
    educationTimeLineNode: string;
    educationCard: string,
    educationBadgeBackground: string;
    educationCertVerifyLink: string;

    // Contact Page Styles
    contactIcon: string;
    contactText: string;
    contactSubtext: string;
    contactButton: string;
    contactBorder: string;
    contactFormBackground: string;
    contactFormLabel: string;
    contactFormInput: string;
    contactFormInputBorder: string;
    contactFormInputFocus: string;
    contactFormPlaceholder: string;
    contactFormButton: string;
    contactFormButtonHover: string;
    contactFormButtonFocus: string;
    contactFormButtonText: string;
    contactSuccessBackground: string;
    contactSuccessBorder: string;
    contactSuccessText: string;
    contactErrorBackground: string;
    contactErrorBorder: string;
    contactErrorText: string;

    // Solar System Styles
    solarSystemSubtext: string;
}

export interface Theme {
    name: string;
    colors: ThemeColors;
}

export const themes: Record<string, Theme> = {
    light: {
        name: 'light',
        colors: {
            // Common Styles
            background: 'bg-gradient-to-br from-[#fafafa] via-[#f5f5f5] to-[#efefef]',

            // Home Page Styles
            homeHighlightColor: '#007BFF',
            homeHeroText: 'text-gray-900',
            homeSubText: 'text-gray-600',
            homeTechIconBackground: 'rgba(0, 0, 0, 0.05)',
            homeTechIconBorder: '1px solid rgba(0, 0, 0, 0.1)',
            homeSectionDivider: 'border-gray-400/30',
            homeHeroGradient: 'bg-gradient-to-br from-[#fafafa] via-[#f5f5f5] to-[#efefef]',
            homeHeroGradientOverlay: 'bg-[radial-gradient(ellipse_1200px_800px_at_50%_20%,_rgba(2,62,138,0.35)_0%,_rgba(0,119,182,0.25)_30%,_rgba(0,150,199,0.15)_50%,_transparent_80%)]',
            homeHeroOrbitalRingDesktop: `radial-gradient(ellipse 900px 600px at 50% 15%, rgba(2,62,138,0.25)_0%,_rgba(0,119,182,0.18)_30%,_rgba(0,150,199,0.1)_50%,_transparent_80%)`,
            homeHeroOrbitalRingMobile: `radial-gradient(ellipse 600px 400px at 50% 10%, rgba(2,62,138,0.35)_0%,_rgba(0,119,182,0.25)_40%,_transparent_80%)`,

            // Experience Page Styles
            experienceBentoCard: 'bg-white/60',
            experienceBentoBorder: 'border border-[#e5e7eb]',
            experienceBentoHover: 'hover:bg-white/80 hover:border-[#d1d5db]',
            experienceBentoShadow: 'shadow-[0_4px_12px_rgba(0,0,0,0.08)]',
            experienceDescriptionDivider: 'bg-gradient-to-r from-[#d1d5db] via-[#bbb] to-[#d1d5db]',
            experienceScrollbarTrack: 'rgba(255, 255, 255, 0.1)',
            experienceScrollbarThumb: 'rgba(0, 0, 0, 0.2)',
            experienceScrollbarThumbHover: 'rgba(0, 0, 0, 0.3)',
            experienceCard: 'bg-gradient-to-br from-white/90 to-gray-50/90 border border-white/50',
            experienceText: 'text-gray-900',
            experienceSubText: 'text-gray-600',
            experienceDescriptionText: 'text-gray-700',

            // Project Page Styles
            projectPatternBackground: 'modern-pattern-light',
            projectIndexText: 'text-gray-900 opacity-80',
            projecHeroText: 'text-gray-900',
            projectCategoryText: 'text-gray-600',
            projectMetaText: 'text-gray-500',
            projectDescriptionText: 'text-gray-700',
            projectButton: 'bg-white/80 hover:bg-white text-gray-900 border border-gray-200',
            projectLinkText: 'text-gray-500',
            projectLinkButton: 'bg-white/80 hover:bg-white text-gray-700 border border-gray-200/50',
            projectTechBadge: 'text-gray-800 bg-gray-100 border border-gray-300 hover:bg-gray-200',
            projectCard: 'bg-gradient-to-br from-white/90 to-gray-50/90 border border-white/50',
            projectCardPattern: 'geometric-pattern-light',
            projectGradientOverlay: 'bg-gradient-to-t from-white/20 via-transparent to-white/10',
            projectYearBadge: 'bg-white/90 text-gray-800 border border-gray-200/50',

            // Education Page Styles
            educationText: 'text-gray-900',
            educationSubtext: 'text-gray-600',
            educationBorder: 'border-gray-200',
            educationTimeLine: 'bg-gray-200',
            educationTimeLineNode: 'bg-gray-200',
            educationCard: 'bg-gradient-to-br from-white/90 to-gray-50/90 border border-white/50',
            educationBadgeBackground: 'bg-white',
            educationCertVerifyLink: 'text-blue-600 hover:text-blue-800',

            // Contact Page Styles
            contactIcon: 'text-gray-400',
            contactText: 'text-gray-900',
            contactSubtext: 'text-gray-600',
            contactButton: 'bg-white/80 hover:bg-white text-gray-900 border border-gray-200',
            contactBorder: 'border-gray-200',
            contactFormBackground: 'bg-white/40 border border-white/60',
            contactFormLabel: 'text-gray-700',
            contactFormInput: 'bg-white/50 text-gray-900',
            contactFormInputBorder: 'border border-gray-200/50',
            contactFormInputFocus: 'focus:border-gray-400 focus:ring-gray-300/50',
            contactFormPlaceholder: 'text-gray-400',
            contactFormButton: 'bg-gray-900 text-white',
            contactFormButtonHover: 'hover:bg-gray-800',
            contactFormButtonFocus: 'focus:ring-gray-300',
            contactFormButtonText: 'text-white',
            contactSuccessBackground: 'bg-green-50',
            contactSuccessBorder: 'border border-green-200',
            contactSuccessText: 'text-green-600',
            contactErrorBackground: 'bg-red-50',
            contactErrorBorder: 'border border-red-200',
            contactErrorText: 'text-red-600',

            // Solar System Styles
            solarSystemSubtext: 'text-gray-600',
        },
    },
    dark: {
        name: 'dark',
        colors: {
            // Common Styles
            background: 'bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#0f0f0f]',

            // Home Page Styles
            homeHighlightColor: '#42f542',
            homeHeroText: 'text-white',
            homeSubText: 'text-white/60',
            homeTechIconBackground: 'rgba(255, 255, 255, 0.05)',
            homeTechIconBorder: '1px solid rgba(255, 255, 255, 0.1)',
            homeSectionDivider: 'border-white/20',
            homeHeroGradient: 'bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#0f0f0f]',
            homeHeroGradientOverlay: 'bg-[radial-gradient(ellipse_1200px_800px_at_50%_20%,_rgba(58,90,64,0.2)_0%,_rgba(58,90,64,0.15)_30%,_rgba(58,90,64,0.1)_50%,_transparent_70%)]',
            homeHeroOrbitalRingDesktop: `radial-gradient(ellipse 900px 600px at 50% 15%, rgba(88,129,87,0.15) 0%, rgba(58,90,64,0.1) 30%, rgba(52,78,65,0.08) 50%, transparent 70%)`,
            homeHeroOrbitalRingMobile: `radial-gradient(ellipse 600px 400px at 50% 10%, rgba(88,129,87,0.2) 0%, rgba(58,90,64,0.12) 40%, transparent 70%)`,

            // Experience Page Styles
            experienceBentoCard: 'bg-[#1c1c1e]/70',
            experienceBentoBorder: 'border border-[#2c2c2e]',
            experienceBentoHover: 'hover:bg-[#2a2a2c]/80 hover:border-[#3a3a3c]',
            experienceBentoShadow: 'shadow-[0_4px_12px_rgba(0,0,0,0.3)]',
            experienceDescriptionDivider: 'bg-gradient-to-r from-[#3a3a3c] via-[#555] to-[#3a3a3c]',
            experienceScrollbarTrack: 'rgba(255, 255, 255, 0.1)',
            experienceScrollbarThumb: 'rgba(255, 255, 255, 0.3)',
            experienceScrollbarThumbHover: 'rgba(255, 255, 255, 0.5)',
            experienceCard: 'bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10',
            experienceText: 'text-white',
            experienceSubText: 'text-white/60',
            experienceDescriptionText: 'text-white/80',

            // Project Page Styles
            projectPatternBackground: 'modern-pattern-dark',
            projectIndexText: 'text-white/50',
            projecHeroText: 'text-white',
            projectCategoryText: 'text-white/70',
            projectMetaText: 'text-white/50',
            projectDescriptionText: 'text-white/80',
            projectButton: 'bg-white/10 hover:bg-white/20 text-white border border-white/10',
            projectLinkText: 'text-white/50',
            projectLinkButton: 'bg-neutral-900 border border-neutral-700',
            projectTechBadge: 'text-white/80 bg-white/10 border border-white/10 hover:bg-white/20',
            projectCard: 'bg-neutral-900 border border-neutral-700',
            projectCardPattern: 'geometric-pattern-dark',
            projectGradientOverlay: 'bg-gradient-to-t from-black/30 via-transparent to-black/10',
            projectYearBadge: 'bg-white/[0.08] text-white/90 border border-white/10',

            // Education Page Styles
            educationText: 'text-white',
            educationSubtext: 'text-white/60',
            educationBorder: 'border-white/10',
            educationTimeLine: 'bg-white/10',
            educationTimeLineNode: 'bg-neutral-500 border-neutral-700',
            educationCard: 'bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10',
            educationBadgeBackground: 'bg-white',
            educationCertVerifyLink: 'text-blue-400 hover:text-blue-300',

            // Contact Page Styles
            contactIcon: 'text-white/30',
            contactText: 'text-white',
            contactSubtext: 'text-white/60',
            contactButton: 'bg-white/10 hover:bg-white/20 text-white border border-white/10',
            contactBorder: 'border-white/10',
            contactFormBackground: 'bg-white/5 border border-white/10',
            contactFormLabel: 'text-white/80',
            contactFormInput: 'bg-white/5 text-white',
            contactFormInputBorder: 'border border-white/20',
            contactFormInputFocus: 'focus:border-white/40 focus:ring-white/20',
            contactFormPlaceholder: 'text-white/40',
            contactFormButton: 'bg-white text-black',
            contactFormButtonHover: 'hover:bg-white/90',
            contactFormButtonFocus: 'focus:ring-white/30',
            contactFormButtonText: 'text-black',
            contactSuccessBackground: 'bg-green-900/20',
            contactSuccessBorder: 'border border-green-800',
            contactSuccessText: 'text-green-400',
            contactErrorBackground: 'bg-red-900/20',
            contactErrorBorder: 'border border-red-800',
            contactErrorText: 'text-red-400',

            // Solar System Styles
            solarSystemSubtext: 'text-white/60',
        },
    },
};

export const getTheme = (themeName: string): Theme => {
    return themes[themeName] || themes.light;
};
