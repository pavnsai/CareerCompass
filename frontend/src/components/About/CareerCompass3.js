import React, { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CareerCompass3.css';
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaRocket, FaChartLine, FaBriefcase, FaCode, FaServer, FaDatabase } from 'react-icons/fa';
import { SiAmazonapigateway } from "react-icons/si";
import { SiAuthelia } from "react-icons/si";
import { FaBuildingColumns } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

const CareerCompass2 = () => {
    const wrapperRef = useRef(null);
    const cardsRef = useRef([]);
    const leftContentRef = useRef(null);
    const sectionRef = useRef(null);
    const architectureSectionRef = useRef(null);
    const { userIsAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

    const handleGetStarted = () => {
        gsap.killTweensOf(cardsRef.current);
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        navigate('/login');
    }

    const enterMenuStyle = () => {
        return userIsAuthenticated() ? { display: 'none' } : { display: 'block' };
    };

    const handleScrollToArchitecture = () => {
        if (architectureSectionRef.current) {
            architectureSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleResize = useCallback(() => {
        setIsMobile(window.innerWidth <= 1024);
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);

    useEffect(() => {
        if (wrapperRef.current && cardsRef.current.length > 0 && leftContentRef.current && !isMobile) {
            const cards = cardsRef.current;
            const numCards = cards.length;
            const cardHeight = 200;
            const cardGap = 30;
            const visibleHeight = 70;
            const totalHeight = (cardHeight + cardGap) * numCards;

            gsap.set(cards, {
                y: (i) => i * (cardHeight + cardGap),
                zIndex: (i) => i + 1,
            });

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

            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                end: `bottom bottom+=${totalHeight}`,
                pin: leftContentRef.current,
                pinSpacing: false
            });

            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: `bottom bottom-=${window.innerHeight / 2}`,
                onEnter: handleScrollToArchitecture,
                once: true
            });
        } else if (isMobile) {
            gsap.set(cardsRef.current, { clearProps: "all" });
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        }
    }, [isMobile]);

    return (
        <>
            <section className="intro-section">
                <h1>Your Ultimate Guide to Career Success</h1>
                <p>Keep track of your job applications easily and effortlessly. Try it now.</p>
                <div className="buttons">
                    <button className="start-now-btn" onClick={handleGetStarted}>Get Started</button>
                    <button className="architecture-btn" onClick={handleScrollToArchitecture}>Architecture</button>
                </div>
            </section>

            <section className={`stackable-cards-section ${isMobile ? 'mobile' : ''}`} ref={sectionRef}>
                <div className="left-content" ref={leftContentRef}>
                    <h1>CareerCompass</h1>
                    <p>CareerCompass is your ultimate tool for managing and organizing your job search. Designed with job seekers in mind, our web-based application streamlines the process of tracking job applications, helping you stay organized and focused on landing your dream job.</p>
                    <div className="feature" style={{background:'#F3D250'}}>
                        <div>
                            <h2><span>Why CareerCompass?</span></h2>
                            <p>At CareerCompass, we aim to revolutionize the job search experience by providing a powerful and user-friendly platform. Our goal is to simplify job application management,
                                making it easier for you to track and manage all your job applications in one place.</p>
                        </div>
                    </div>
                    <div className="feature" style={{background: '#90CCF4'}}>
                        <div>
                            <h2><span> Built on proven Design Patterns</span></h2>
                            <p>At CareerCompass, we use essential design patterns to ensure a robust, scalable, and maintainable application. MVC organizes our codebase, Singleton manages resources, and Dependency Injection enhances testability. The Factory, Builder, Strategy, and Observer patterns further improve flexibility and efficiency, ensuring high quality and reliability in our platform.</p>
                        </div>
                    </div>
                </div>
                <div className="right-content" ref={wrapperRef}>
                    <h2>Key Features</h2>
                    <div className="cards">
                        {[
                            {
                                pattern: 'User Registration and Verification',
                                description: 'Securely register with personal details and verify your account via email, SMS, or phone call.',
                                bgColor: '#F3D250',
                                className: 'bg-yellow'
                            },
                            {
                                pattern: 'Job Application Management',
                                description: 'Create, edit, star, and archive job applications. Use tags to categorize your applications for easy tracking.',
                                bgColor: '#90CCF4',
                                className: 'bg-blue'
                            },
                            {
                                pattern: 'Secure Authentication',
                                description: 'Protect your data with secure login using bearer tokens.',
                                bgColor: '#F78888',
                                className: 'bg-red'
                            },
                            {
                                pattern: 'REST API Integration',
                                description: 'Enjoy seamless data access and interaction between the frontend and backend.',
                                bgColor: '#F3D250',
                                className: 'bg-yellow'
                            },
                        ].map(({pattern, description,bgColor,className}, index) => (
                            <div key={index} className={`card ${className}`} style={{background: bgColor}} ref={el => cardsRef.current[index] = el}>
                                <button className="card-heading">{pattern}</button>
                                <span>
                                    {description}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="architecture-section" ref={architectureSectionRef}>
                <div className="architecture-header">
                    <h2><FaBuildingColumns className="section-icon"/> Architecture</h2>
                    <p>Our application architecture ensures high scalability, reliability, and maintainability.</p>
                </div>
                <div className="architecture-content">
                    <div className="architecture-image-container">
                        <div class="architecture-image-wrapper">
                        <img src="https://career-compass-assets.s3.amazonaws.com/CareerCompassArchitecture.png" alt="Architecture Diagram"
                             className="architecture-image"/>
                        </div>
                    </div>
                    <div className="architecture-details">
                        {[
                            {
                                icon: FaBriefcase,
                                title: "Client-Side",
                                description: "Built with React.js and hosted on Amazon S3, our platform delivers fast, responsive interfaces through Amazon CloudFront."
                            },
                            {
                                icon: FaServer,
                                title: "Server-Side",
                                description: "Powered by AWS Lambda and Spring Boot, our serverless backend ensures scalable and efficient processing."
                            },
                            {
                                icon: FaDatabase,
                                title: "Database",
                                description: "Amazon RDS handles our relational data with high availability, scalability, and secure VPC access."
                            },
                            {
                                icon: SiAmazonapigateway,
                                title: "APIs",
                                description: "Managed by Amazon API Gateway, our APIs provide secure and reliable communication with built-in DDoS protection."
                            },
                            {
                                icon: SiAuthelia,
                                title: "Authentication",
                                description: "User authentication is handled by Amazon Cognito, providing secure access control and identity management to protect user data."
                            },
                            {
                                icon: FaRocket,
                                title: "Deployment",
                                description: "AWS services like Route 53, CloudFront, and Lambda ensure robust, scalable, and cost-effective hosting."
                            }
                        ].map((item, index) => (
                            <div key={index} className="architecture-card">
                                <item.icon className="arch-icon"/>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default CareerCompass2;