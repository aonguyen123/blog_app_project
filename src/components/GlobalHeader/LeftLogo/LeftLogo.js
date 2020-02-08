import React from 'react';
import logo from './../../../assets/logo.svg';
import { Link } from 'react-router-dom';
import './styles.css';

export default function LeftLogo() {

    return (
        <div className='logo-header'>
            <Link to='/home'>
                <img src={logo} alt='logo' width='30px' height='30px' />
                <span>Alimama</span>
            </Link>
        </div>
    )
}