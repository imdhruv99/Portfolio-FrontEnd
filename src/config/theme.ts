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
}

export interface Theme {
    name: string;
    colors: ThemeColors;
}

export const themes: Record<string, Theme> = {
    light: {
        name: 'light',
        colors: {
            background: 'bg-gradient-to-br from-[#ffffff] via-[#f9f9f9] to-[#efefef]',
            text: 'text-gray-900',
            subtext: 'text-gray-600',
            border: 'border-gray-300',
            card: 'bg-gradient-to-br from-[#f4f4f4] to-[#ffffff] shadow-lg',
            gradientOverlay: 'bg-gradient-to-t from-white/70 via-transparent to-white/30',
            button: 'bg-gray-100 hover:bg-white text-gray-900',
            techBadge: 'text-gray-700 bg-white border-gray-200 hover:bg-gray-100',
            iconColor: 'text-gray-400',
            indexLine: 'bg-gray-400',
            indexText: 'text-gray-400',
            pulseDot: 'bg-gray-400/20',
        },
    },
    dark: {
        name: 'dark',
        colors: {
            background: 'bg-gradient-to-br from-[#0e0e0e] via-[#1a1a1a] to-[#121212]',
            text: 'text-white',
            subtext: 'text-white/60',
            border: 'border-white/10',
            card: 'bg-[#2c2c2c]/80',
            gradientOverlay: 'bg-gradient-to-t from-black/50 via-transparent to-black/20',
            button: 'bg-white/10 hover:bg-white/20 text-white',
            techBadge: 'text-white/70 bg-white/5 border-white/10 hover:bg-white/10',
            iconColor: 'text-white/30',
            indexLine: 'bg-white/30',
            indexText: 'text-white/30',
            pulseDot: 'bg-white/10',
        },
    },
};

export const getTheme = (themeName: string): Theme => {
    return themes[themeName] || themes.light;
};
