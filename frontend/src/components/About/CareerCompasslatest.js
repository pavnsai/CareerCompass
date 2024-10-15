import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CareerCompass2.css';

gsap.registerPlugin(ScrollTrigger);

const CareerCompass2 = () => {
    const wrapperRef = useRef(null);
    const cardsRef = useRef([]);
    const leftContentRef = useRef(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        if (wrapperRef.current && cardsRef.current.length > 0 && leftContentRef.current) {
            const cards = cardsRef.current;
            const numCards = cards.length;
            const cardHeight = 150; // Height of each card
            const cardSpacing = 20; // Space between cards
            const totalHeight = (cardHeight + cardSpacing) * (numCards - 1);

            // Initial setup for cards
            gsap.set(cards, {
                y: (i) => i * (cardHeight + cardSpacing), // Stack cards from top to bottom
                zIndex: (i) => i + 1, // Ensure proper stacking order
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
                tl.to(card, {
                    y: (i) => Math.max(0, (i - index) * (cardHeight + cardSpacing)),
                    duration: 1 / numCards,
                    ease: "none",
                }, 0);
            });

            // Pin the left content
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                end: `bottom bottom+=${totalHeight}`,
                pin: leftContentRef.current,
                pinSpacing: false
            });
        }
    }, []);

    return (
        <>
            <section className="intro-section">
                <h1>Welcome to Our Application</h1>
                <p>This is an introductory section with some welcoming text.</p>
            </section>
            <section className="stackable-cards-section" ref={sectionRef}>
                <div className="left-content" ref={leftContentRef}>
                    <h1>That was just the beginning, you will also learn</h1>
                </div>
                <div className="right-content" ref={wrapperRef}>
                    <div className="cards">
                        {['DAY 1: Find your Objective & TG', 'DAY 2: Profile Optimisation', 'DAY 3: Another Topic', 'DAY 4: Advanced Strategies', 'DAY 5: Final Review'].map((text, index) => (
                            <div key={index} className="card" ref={el => cardsRef.current[index] = el}>{text}</div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="architecture-section">
                <h2>Application Architecture</h2>
                <p>Details about the application's architecture, components, and design.</p>
                <h2>Second Architecture</h2>
                <p>Details about the second application's architecture.</p>
                <h2>Third Architecture</h2>
                <p>Third application's architecture.</p>
                <h2>Fourth Architecture</h2>
                <p>Here is the fourth application's architecture.</p>
                <h2>Fifth Architecture</h2>
                <p>fifth application's architecture.</p>
                <h2>Sixth Architecture</h2>
                <p>Here is the sixth application's architecture.</p>
                <h2>Architecture number seven</h2>
                <p>Here is the seventh application's architecture.</p>
                <h2>Eight Architecture</h2>
                <p>eight application's architecture.</p>
                <h2>Final Architecture</h2>
                <p>final application's architecture.</p>
            </section>
        </>
    );
};

export default CareerCompass2;
