// useGsapCleanup.js
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const useGsapCleanup = () => {
    useEffect(() => {
        return () => {
            // Clean up all ScrollTrigger instances
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            // Kill all GSAP animations
            gsap.killTweensOf('*');
        };
    }, []);
};