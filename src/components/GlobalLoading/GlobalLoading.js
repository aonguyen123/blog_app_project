import React from 'react';
import { Spin } from 'antd';

import './styles.css';

export default function GlobalLoading(props) {
    const { ...rest } = props;
    return (        
        <div className='global-loading'>
            <Spin {...rest} tip='Loading' />
        </div>
    )
}