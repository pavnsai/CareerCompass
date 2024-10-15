// ScrollToTop.js
import { useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function ScrollToTop() {
    const { pathname } = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        // Clean up GSAP and ScrollTrigger
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        gsap.killTweensOf('*');
    }, [pathname]);

    return null;
}

export default ScrollToTop;