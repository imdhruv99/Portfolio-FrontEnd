'use client';

import './Contact.css';

interface ContactProps {
    isDarkTheme: boolean;
}

const Contact = ({ isDarkTheme }: ContactProps) => {
    return (
        <div className="contact-container">
            {/* Hero Section*/}
            <section className="contact-hero theme-transition">
                <div className="contact-background-text theme-transition">
                    Contact
                </div>
            </section>
            {/* { Timeline Section } */}
        </div>
    );
};

export default Contact;
