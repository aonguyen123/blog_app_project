import React from 'react';
import { Link } from 'react-router-dom';
import { Result, Typography } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

const { Paragraph, Text } = Typography;

export default function Results({ error }) {
    return (
        <Result
            status="error"
            title="Mission Failed"
            subTitle="Please check and modify the following information before request."
            extra={[<Link key='back_home' to="/">Back to home</Link>]}
        >
            <div className="desc">
                <Paragraph>
                    <Text
                        strong
                        style={{
                            fontSize: 16
                        }}
                    >
                        The content you requested has the following can error:
                    </Text>
                </Paragraph>
                {error.map((value, key) => (
                    <Paragraph key={key}>
                        <CloseCircleOutlined className="site-result-demo-error-icon" />{' '}
                        {value}
                    </Paragraph>
                ))}
            </div>
        </Result>
    );
}
