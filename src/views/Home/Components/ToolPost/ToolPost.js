import React from 'react';
import { PageHeader, Icon, Tag, Row, Col, Card } from 'antd';
import FormPost from './../FormPost';

export default function ToolPost() {
    return (
        <Card
            title="Create Post"
            size="small"
            actions={[<Icon title="post" type="edit" key="edit" />]}
        >
            <PageHeader
                title="Ao Nguyen"
                tags={<Tag color="blue">Online</Tag>}
                avatar={{
                    src:
                        'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4'
                }}
                style={{ margin: '0px', padding: '0px' }}
            >
                <Row>
                    <Col>
                        <FormPost />
                    </Col>
                </Row>
            </PageHeader>
        </Card>
    );
}
