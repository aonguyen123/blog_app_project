import React from 'react';
import { Form, Input, Row, Col, Select, Button } from 'antd';
import GeographicView from './../GeographicView';
const { Item } = Form;
const { TextArea } = Input;
const { Option } = Select;

export default function FormSettingView(props) {
    const handleFinish = values => {
        console.log(values);
    };
    const prefixSelector = (
        <Select style={{ width: 70 }} value='84'>
            <Option value="84">+84</Option>
        </Select>
    );
    const checkProvince = (rule, value) => {
        if (value) {
            const { province, district } = value;
            if (province || district) {
                if (!province.key) {
                    return Promise.reject(
                        'Please input your province or city!'
                    );
                }
                if (!district.key) {
                    return Promise.reject('Please input your district!');
                }
            }
        }
        return Promise.resolve();
    };

    return (
        <div>
            <Row>
                <Col xl={15} lg={15} md={15} sm={24} xs={24}>
                    <Form
                        onFinish={handleFinish}
                        layout="vertical"
                        initialValues={{
                            country: 'Việt Nam',
                            prefix: '84'
                        }}
                    >
                        <Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email'
                                }
                            ]}
                        >
                            <Input />
                        </Item>
                        <Item
                            label="Nickname"
                            name="nickname"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your nickname'
                                }
                            ]}
                        >
                            <Input />
                        </Item>
                        <Item label="Personal profile" name="profile">
                            <TextArea rows={3} />
                        </Item>
                        <Item
                            label="Phone Number"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your phone number!'
                                }
                            ]}
                        >
                            <Input
                                type="number"
                                addonBefore={prefixSelector}
                                style={{ width: '100%' }}
                            />
                        </Item>
                        <Item
                            label="Country"
                            name="country"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your country!'
                                }
                            ]}
                        >
                            <Select style={{ width: '100%' }}>
                                <Option value="Việt Nam">Việt Nam</Option>
                                <Option value="tets">test</Option>
                            </Select>
                        </Item>
                        <Item
                            label="Province or city"
                            name="province"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Please input your province or city'
                                },
                                {
                                    validator: checkProvince
                                }
                            ]}
                        >
                            <GeographicView />
                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit">
                                Update Information
                            </Button>
                        </Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}
