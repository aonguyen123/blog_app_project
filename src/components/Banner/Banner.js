import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import banner from 'assets/banner.json';

export default function Banner() {
    const containerRef = useRef(null);

    useEffect(() => {
        lottie.loadAnimation({
            container: containerRef.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: banner
        });
    }, []);

    return (
        <div style={{height: '500px'}} ref={containerRef}></div>
    )
}