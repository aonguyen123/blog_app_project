import React from 'react';
import { Button, Result } from 'antd';

export default function Authenticated() {
    return (
        <Result
            status="403"
            title="401"
            subTitle="Sorry, you are not authorized to access this page."
            extra={<Button href='/login' type="primary">Back</Button>}
        />
    );
}
