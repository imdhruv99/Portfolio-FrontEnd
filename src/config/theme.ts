export interface ThemeColors {
    background: string;
    text: string;
    subtext: string;
    border: string;
    card: string;
    gradientOverlay: string;
    button: string;
    techBadge: string;
    iconColor: string;
    indexLine: string;
    indexText: string;
    pulseDot: string;
    timeline: string;
    timelineNode: string;
    badgeBg: string;
    patternBackground: string;
    heroText: string;
    descriptionText: string;
    categoryText: string;
    metaText: string;
    linkText: string;
    yearBadge: string;
    linkButton: string;
    cardPattern: string;
    statusDot1: string;
    statusDot2: string;
    statusDot3: string;
    floatingElement: string;
}

export interface Theme {
    name: string;
    colors: ThemeColors;
}

export const themes: Record<string, Theme> = {
    light: {
        name: 'light',
        colors: {
            background: 'bg-gradient-to-br from-[#fafafa] via-[#f5f5f5] to-[#efefef]',
            text: 'text-gray-900',
            subtext: 'text-gray-600',
            border: 'border-gray-200',
            card: 'bg-gradient-to-br from-white/90 to-gray-50/90 border border-white/50',
            gradientOverlay: 'bg-gradient-to-t from-white/20 via-transparent to-white/10',
            button: 'bg-white/80 hover:bg-white text-gray-900 border border-gray-200',
            techBadge: 'text-gray-800 bg-gray-100 border border-gray-300 hover:bg-gray-200',
            iconColor: 'text-gray-400',
            indexLine: 'bg-gray-300',
            indexText: 'text-gray-500',
            pulseDot: 'bg-gray-300/30',
            timeline: 'bg-gray-200',
            timelineNode: 'bg-gray-200',
            badgeBg: 'bg-white',
            patternBackground: 'modern-pattern-light',
            heroText: 'text-gray-900',
            descriptionText: 'text-gray-700',
            categoryText: 'text-gray-600',
            metaText: 'text-gray-500',
            linkText: 'text-gray-500',
            yearBadge: 'bg-white/90 text-gray-800 border border-gray-200/50',
            linkButton: 'bg-white/80 hover:bg-white text-gray-700 border border-gray-200/50',
            cardPattern: 'geometric-pattern-light',
            statusDot1: 'bg-emerald-400',
            statusDot2: 'bg-amber-400',
            statusDot3: 'bg-rose-400',
            floatingElement: 'bg-gray-400',
        },
    },
    dark: {
        name: 'dark',
        colors: {
            background: 'bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#0f0f0f]',
            text: 'text-white',
            subtext: 'text-white/60',
            border: 'border-white/10',
            card: 'bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10',
            gradientOverlay: 'bg-gradient-to-t from-black/30 via-transparent to-black/10',
            button: 'bg-white/10 hover:bg-white/20 text-white border border-white/10',
            techBadge: 'text-white/80 bg-white/10 border border-white/10 hover:bg-white/20',
            iconColor: 'text-white/30',
            indexLine: 'bg-white/20',
            indexText: 'text-white/50',
            pulseDot: 'bg-white/10',
            timeline: 'bg-white/10',
            timelineNode: 'bg-neutral-500 border-neutral-700',
            badgeBg: 'bg-white',
            patternBackground: 'modern-pattern-dark',
            heroText: 'text-white',
            descriptionText: 'text-white/80',
            categoryText: 'text-white/70',
            metaText: 'text-white/50',
            linkText: 'text-white/50',
            yearBadge: 'bg-white/[0.08] text-white/90 border border-white/10',
            linkButton: 'bg-white/[0.08] hover:bg-white/[0.15] text-white/80 border border-white/10',
            cardPattern: 'geometric-pattern-dark',
            statusDot1: 'bg-emerald-400',
            statusDot2: 'bg-amber-400',
            statusDot3: 'bg-rose-400',
            floatingElement: 'bg-white',
        },
    },
};

export const getTheme = (themeName: string): Theme => {
    return themes[themeName] || themes.light;
};
