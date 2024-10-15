import React, {useCallback, useEffect, useRef} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CareerCompass2.css';
import { useAuth } from "../Context/AuthContext";
import {useNavigate} from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const CareerCompass2 = () => {
    const wrapperRef = useRef(null);
    const cardsRef = useRef([]);
    const leftContentRef = useRef(null);
    const sectionRef = useRef(null);
    const architectureSectionRef = useRef(null);
    const { userIsAuthenticated } = useAuth();
    const navigate = useNavigate();
    const handleGetStarted=()=>{
        gsap.killTweensOf(cardsRef.current);
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        navigate('/login');
    }
    const enterMenuStyle = () => {
        return userIsAuthenticated() ? { display: 'none' } : { display: 'block' };
    };

    // Smoothly scrolls to the architecture section
    const handleScrollToArchitecture = () => {
        if (architectureSectionRef.current) {
            architectureSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        if (wrapperRef.current && cardsRef.current.length > 0 && leftContentRef.current) {
            const cards = cardsRef.current;
            const numCards = cards.length;
            const cardHeight = 200;
            const cardGap = 30;
            const visibleHeight = 50;
            const totalHeight = (cardHeight + cardGap) * numCards;

            // Initial setup for cards
            gsap.set(cards, {
                y: (i) => i * (cardHeight + cardGap),
                zIndex: (i) => i + 1,
            });

            // Create a timeline for card stacking
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: `+=${totalHeight}`,
                    pin: true,
                    anticipatePin: 1,
                    scrub: 0.5,
                }
            });

            cards.forEach((card, index) => {
                if (index > 0) {
                    tl.to(card, {
                        y: index * visibleHeight,
                        duration: 1,
                        ease: "power1.inOut",
                    }, (index - 1) / (numCards - 1));
                }
            });

            // Pin the left content
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                end: `bottom bottom+=${totalHeight}`,
                pin: leftContentRef.current,
                pinSpacing: false
            });

            // Scroll to next section when stacking is complete
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: `bottom bottom-=${window.innerHeight / 2}`,
                onEnter: handleScrollToArchitecture,
                once: true
            });
        }
    }, []);

    return (
        <>
            <section className="intro-section">
                <h1>Your Job Search Organized</h1>
                <p>Keep track of your job applications easily and effortlessly. Try it now.</p>
                <div className="buttons">
                    <button className="start-now-btn" onClick={handleGetStarted}>Start Now</button>
                    <button className="architecture-btn" onClick={handleScrollToArchitecture}>Architecture</button>
                </div>
            </section>

            <section className="stackable-cards-section" ref={sectionRef}>
                <div className="left-content" ref={leftContentRef}>
                    <h1>CareerCompass</h1>
                    <p>CareerCompass is a cutting-edge web application designed to streamline and simplify your job search journey.
                        Our platform empowers job seekers with a user-friendly interface to manage their applications
                        effortlessly. Create personalized job search tags, maintain a list of target companies, track
                        application statuses, and store essential information all in one place.</p>
                    <h2>Why CareerCompass?</h2>
                    <p>In today's competitive job market, managing job applications can be overwhelming. CareerCompass
                        is here to alleviate that stress by offering a powerful tool that organizes and optimizes your
                        job search process.</p>
                    <h2>Behind the Scenes: Robust Architecture</h2>
                    <p>Our backend is built with industry-standard practices, incorporating key Object-Oriented Design
                        Patterns to enhance performance and scalability. We leverage Singleton, Factory, Strategy,
                        Facade, and Builder patterns within our Spring Boot application, ensuring a robust and efficient
                        system that supports our REST APIs.</p>
                    <h2>Start your journey with CareerCompass today and experience a smarter, more organized approach to
                        job searching!</h2>
                </div>
                <div className="right-content" ref={wrapperRef}>
                    <div className="cards">
                        {['Singleton Pattern', 'Factory Pattern', 'Strategy Pattern', 'Facade Pattern', 'Builder Pattern'].map((text, index) => (
                            <div key={index} className="card" ref={el => cardsRef.current[index] = el}>
                                <button className="card-heading">{text}:</button>
                                <ul>
                                    <li>{text}</li>
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="architecture-section" ref={architectureSectionRef}>
                <h2>Architecture</h2>
                <img src="CareerCompassArchitecture.png" alt="Architecture Diagram" className="architecture-image"/>
                <p>The architecture of our application is designed to ensure high scalability, reliability, and
                    maintainability. Below is an overview of the architecture diagram, which outlines the key components
                    and their interactions:</p>
                <div className="architecture-details">
                    <div className="architecture-card">
                        <h3>Client-Side</h3>
                        <p>The frontend is built with React.js, providing a dynamic and responsive user interface.</p>
                    </div>
                    <div className="architecture-card">
                        <h3>Server-Side</h3>
                        <p>The backend is implemented with Spring Boot, handling business logic and communication with
                            the database.</p>
                    </div>
                    <div className="architecture-card">
                        <h3>Database</h3>
                        <p>We use MySQL for persistent data storage, ensuring data integrity and efficient querying.</p>
                    </div>
                    <div className="architecture-card">
                        <h3>APIs</h3>
                        <p>RESTful APIs facilitate communication between the frontend and backend services.</p>
                    </div>
                    <div className="architecture-card">
                        <h3>Authentication</h3>
                        <p>Secure authentication mechanisms are implemented to protect user data and ensure privacy.</p>
                    </div>
                    <div className="architecture-card">
                        <h3>Deployment</h3>
                        <p>The application is deployed on AWS, leveraging services like EC2, RDS, and S3 for hosting and
                            data storage.</p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CareerCompass2;
