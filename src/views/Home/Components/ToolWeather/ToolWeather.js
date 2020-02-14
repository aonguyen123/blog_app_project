import React from 'react';
import { Card, Icon } from 'antd';
import {
    ChartCard,
    MiniArea,
} from 'ant-design-pro/lib/Charts';
import NumberInfo from 'ant-design-pro/lib/NumberInfo';
import moment from 'moment';

export default function ToolWeather() {
    const visitData = [];
    const beginDay = new Date().getTime();
    for (let i = 0; i < 20; i += 1) {
        visitData.push({
            x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format(
                'YYYY-MM-DD'
            ),
            y: Math.floor(Math.random() * 100) + 10
        });
    }

    return (
        <Card size="small" title="Today weather" style={{ height: '100%' }}>
            <Card.Meta
                description="Weather"
                title="Binh Tan, Tay Son, Binh Dinh"
                avatar={<Icon type="cloud" style={{ fontSize: '20px' }} />}
            />

            <ChartCard
                title="搜索用户数量"
                total={8846}
                contentHeight={163}
                bordered={false}
            >
                <NumberInfo
                    subTitle={<span>本周访问</span>}
                    total={12321}
                    status="up"
                    subTotal={17.1}
                />
                <MiniArea line height={45} data={visitData} />
            </ChartCard>
        </Card>
    );
}
