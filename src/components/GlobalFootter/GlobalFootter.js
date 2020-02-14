import React from 'react';
import { version } from './../../constants/version';

export default function GlobalFootter() {
    const d = new Date();
    const year = d.getFullYear();
    return (
        <span style={{color: '#fff'}}>
            {
                `Ao Nguyen ©${year} Created by Ao Nguyen, v${version[version.length - 1].version}`
            }
        </span>
    )
}