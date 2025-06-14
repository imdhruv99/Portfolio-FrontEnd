import localFont from 'next/font/local';

// Define font configurations
export const classyVogue = localFont({
    src: './../../public/fonts/Classy Vogue Stylish Serif Font.woff2',
    variable: '--font-classy-vogue',
    display: 'swap',
    weight: '400',
    preload: true,
});

// Font utility classes
export const fontClasses = {
    classyVogue: classyVogue.className,
} as const;

// CSS variables for use in styles
export const fontVariables = {
    classyVogue: classyVogue.variable,
} as const;

// Combined font variables string
export const allFontVariables = `${classyVogue.variable}`;

// Font utility functions
export const getFontClass = (fontName: keyof typeof fontClasses) => {
    return fontClasses[fontName];
};

export const getFontVariable = (fontName: keyof typeof fontVariables) => {
    return fontVariables[fontName];
};
