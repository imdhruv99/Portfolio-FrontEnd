'use client';

import './Education.css';

interface EducationProps {
    isDarkTheme: boolean;
}

const Education = ({ isDarkTheme }: EducationProps) => {
    return (
        <div className="education-container">
            {/* Hero Section*/}
            <section className="education-hero theme-transition">
                <div className="education-background-text theme-transition">
                    Education
                </div>
            </section>
        </div>
    );
};

export default Education;
