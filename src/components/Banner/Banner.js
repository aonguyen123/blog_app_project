import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import animateWork from 'assets/animate_work.json';

export default function Banner() {
    const containerRef = useRef(null);

    useEffect(() => {
        lottie.loadAnimation({
            container: containerRef.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: animateWork
        });
    }, []);

    return (
        <div ref={containerRef}></div>
    )
}