import React from 'react';
import { Link } from 'react-router-dom';
import logo from 'assets/logo.png';
import './styles.css';

export default function LeftLogo() {
    
    return (
        <div className="logo-header">
            <Link to="/home">
                <img alt='logo' src={logo} width={38} height={38} />
                <span className="name-app">Alicon</span>
            </Link>
        </div>
    );
}
