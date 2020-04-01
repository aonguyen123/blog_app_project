import React from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { Spin } from 'antd';

import './styles.css';

export default function FetchDataLoading(props) {
    const { ...rest } = props;
    return (        
        <div className='global-loading'>
            <Spin {...rest} tip={formatMessage({id: 'fetchDataLoading.tooltip'})} />
        </div>
    )
}