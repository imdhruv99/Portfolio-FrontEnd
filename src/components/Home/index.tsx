'use client';

import './Home.css';

interface HomeProps {
    isDarkTheme: boolean;
}

const Home = ({ isDarkTheme }: HomeProps) => {
    return (
        <div className="home-container">
            {/* Hero Section*/}
            <section className="home-hero theme-transition">
                <div className="home-background-text theme-transition">
                    Dhruv
                </div>
            </section>
        </div>
    );
};

export default Home;
