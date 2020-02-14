import React from 'react';
import { PageHeader, Icon, Tag, Row, Card, Form, Input, Col } from 'antd';
import UploadImage from './../UploadImage';
const { TextArea } = Input;

export default function ToolPost() {
    const content = (
        <>
            <Col>
                <Form>
                    <Form.Item>
                        <TextArea
                            autoSize
                            placeholder="What are you thinking?"
                            allowClear
                        />
                    </Form.Item>
                    <Form.Item>
                        <UploadImage />
                    </Form.Item>
                </Form>
            </Col>
        </>
    );

    const Content = ({ children }) => {
        return <Row>{children}</Row>;
    };

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
                <Content>{content}</Content>
            </PageHeader>
        </Card>
    );
}
