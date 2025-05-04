'use client';

import './Projects.css';

interface ProjectsProps {
    isDarkTheme: boolean;
}

const Projects = ({ isDarkTheme }: ProjectsProps) => {
    return (
        <div className="projects-container">
            {/* Hero Section*/}
            <section className="projects-hero theme-transition">
                <div className="projects-background-text theme-transition">
                    Projects
                </div>
            </section>
            {/* { Timeline Section } */}
        </div>
    );
};

export default Projects;
