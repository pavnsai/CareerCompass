// CleanupContext.js
import React, { createContext, useContext, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const CleanupContext = createContext();

export const CleanupProvider = ({ children }) => {
    const cleanup = useCallback(() => {
        gsap.killTweensOf(gsap.globalTimeline.getChildren(false, true, false));
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }, []);

    return (
        <CleanupContext.Provider value={{ cleanup }}>
            {children}
        </CleanupContext.Provider>
    );
};

export const useCleanup = () => useContext(CleanupContext);
