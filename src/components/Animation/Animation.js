import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import animate_dislike from '../../assets/animate_dislike.json';
import animate_like from '../../assets/animate_like.json';
import './styles.css';

export default function Animation({typeAnimate}) {
    const container = useRef(null);

    useEffect(() => {
        lottie.loadAnimation({
            container: container.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: typeAnimate === 'DISLIKE' ? animate_dislike : animate_like
        });
    }, [typeAnimate]);

    return (
        <div ref={container} className='animate_container'></div>
    )
}