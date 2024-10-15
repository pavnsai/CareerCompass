import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CareerCompass2.css';

gsap.registerPlugin(ScrollTrigger);

const CareerCompass2 = () => {
    const wrapperRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        if (wrapperRef.current && cardsRef.current.length > 0) {
            const cards = cardsRef.current;
            const numCards = cards.length;
            const cardHeight = 150; // Height of each card
            const totalHeight = cardHeight * numCards;

            gsap.set(cards, {
                y: (i) => i * cardHeight, // Initial staggered position
                zIndex: (i) => numCards - i, // Ensure proper stacking order
            });

            cards.forEach((card, index) => {
                ScrollTrigger.create({
                    trigger: card,
                    start: "top bottom-=150",
                    end: "top top+=50",
                    scrub: true,
                    onUpdate: (self) => {
                        const progress = self.progress;
                        gsap.to(card, {
                            y: Math.max((numCards - index - 1) * cardHeight * (1 - progress), 0),
                            ease: "none",
                            immediateRender: false
                        });
                    }
                });
            });

            ScrollTrigger.create({
                trigger: wrapperRef.current,
                start: "top top",
                end: () => `+=${totalHeight}`,
                pin: true,
                pinSpacing: false,
                scrub: true,
            });
        }
    }, []);

    return (
        <>
            <section className="intro-section">
                <h1>Welcome to Our Application</h1>
                <p>This is an introductory section with some welcoming text.</p>
            </section>
            <section className="stackable-cards-section">
                <div className="left-content">
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
            </section>
        </>
    );
};

export default CareerCompass2;
