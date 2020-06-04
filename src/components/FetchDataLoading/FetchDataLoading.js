import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { formatMessage } from 'umi-plugin-react/locale';
import { Spin } from 'antd';

import './styles.css';

export default function FetchDataLoading(props) {
    const { ...rest } = props;
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    return (        
        <div className='global-loading'>
            <Spin {...rest} tip={formatMessage({id: 'fetchDataLoading.tooltip'})} indicator={antIcon} />
        </div>
    )
}