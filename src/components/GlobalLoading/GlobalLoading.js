import React from 'react';
import { Spin } from 'antd';

import './styles.css';

export default function GlobalLoading() {
    return (        
        <div className='global-loading'>
            <Spin size='large' tip='Loading' />
        </div>
    )
}