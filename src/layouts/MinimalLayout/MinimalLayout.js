import React from 'react';
import './styles.css';

export default function MinimalLayout(props) {

    const { children } = props;
    return (
        <div className="root">
            <div className='main-minimal-layout'>
                {children}
            </div>
        </div>
    )
}
