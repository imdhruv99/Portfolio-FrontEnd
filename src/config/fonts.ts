import localFont from 'next/font/local';

export const classyVogue = localFont({
    src: './../../public/fonts/Classy Vogue Stylish Serif Font.woff2',
    variable: '--font-classy-vogue',
    display: 'swap',
    weight: '400',
    preload: true,
});

export const eireneSans = localFont({
    src: './../../public/fonts/EireneSans-Regular.woff2',
    variable: '--font-classy-vogue',
    display: 'swap',
    weight: '400',
    preload: true,
});

export const eireneSansBold = localFont({
    src: './../../public/fonts/EireneSans-Bold.woff2',
    variable: '--font-classy-vogue',
    display: 'swap',
    weight: '400',
    preload: true,
});


// Font utility classes
export const fontClasses = {
    classyVogue: classyVogue.className,
    eireneSans: eireneSans.className,
    eireneSansBold: eireneSansBold.className,
} as const;

// CSS variables for use in styles
export const fontVariables = {
    classyVogue: classyVogue.variable,
    eireneSans: eireneSans.variable,
    eireneSansBold: eireneSansBold.variable,
} as const;

// Combined font variables string
export const allFontVariables = `${classyVogue.variable} ${eireneSans.variable} ${eireneSansBold.variable}`;

// Font utility functions
export const getFontClass = (fontName: keyof typeof fontClasses) => {
    return fontClasses[fontName];
};

export const getFontVariable = (fontName: keyof typeof fontVariables) => {
    return fontVariables[fontName];
};
