'use client';

import './Experience.css';

interface ExperienceProps {
    isDarkTheme: boolean;
}

const Experience = ({ isDarkTheme }: ExperienceProps) => {
    return (
        <div className="experience-container">
            {/* Hero Section*/}
            <section className="experience-hero theme-transition">
                <div className="experience-background-text theme-transition">
                    Experience
                </div>
            </section>
        </div>
    );
};

export default Experience;
