import React from 'react';
import { Spin } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';

import './styles.css';

export default function LazyLoading(props) {
    const { ...rest } = props;
    return (        
        <div className='lazy-loading'>
            <Spin {...rest} tip={formatMessage({id: 'lazyLoading.tooltip'})} />
        </div>
    )
}