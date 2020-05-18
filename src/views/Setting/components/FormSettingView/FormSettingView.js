import React from 'react';
import { Form, Input, Row, Col, Select, Button } from 'antd';
import GeographicView from './../GeographicView';
const { Item } = Form;
const { TextArea } = Input;
const { Option } = Select;

export default function FormSettingView({userInfo, updateProfile, loadingButton}) {
    const handleFinish = values => {
        updateProfile(values);
    };
    const prefixSelector = (
        <Select style={{ width: 70 }} defaultValue='84'>
            <Option value="84">+84</Option>
        </Select>
    );
    const checkProvince = (rule, value) => {
        if (Object.keys(value).length > 0) {
            const { province, district } = value;
            if (!province.key) {
                return Promise.reject(
                    'Please input your province or city!'
                );
            }
            if (!district.key) {
                return Promise.reject('Please input your district!');
            }    
        }
        return Promise.resolve();
    };
    const checkNickname = (rule, value) => {
        if (value) {
            value = value.trim();
            value = value.replace(/\s+/g, '');
            if (value.length < 5) {
                return Promise.reject('Nickname of at least 5 characters');
            }
            return Promise.resolve();
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
                            email: userInfo.email,
                            nickname: userInfo.displayName,
                            profile: userInfo.description,
                            phone: userInfo.phonenumber,
                            address: {
                                province: userInfo.provinceOrCity,
                                district: userInfo.district
                            }
                        }}
                    >
                        <Item
                            label="Email"
                            name="email"
                            hasFeedback
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!'
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!'
                                }
                            ]}
                        >
                            <Input />
                        </Item>
                        <Item
                            label="Nickname"
                            name="nickname"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your nickname!'
                                },
                                {
                                    whitespace: true,
                                    message: 'Nickname does not whitespace'
                                },
                                {
                                    max: 13,
                                    message: 'Nickname cannot exceed 13 characters'
                                },
                                {
                                    validator: checkNickname
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
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your phone number!'
                                },
                                {
                                    len: 9,
                                    message: 'Phone number invalid'
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
                            label="Province or city"
                            name="address"
                            hasFeedback
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
                            <GeographicView provinceUser={userInfo.provinceOrCity} districtUser={userInfo.district} />
                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit" loading={loadingButton}>
                                Update Information
                            </Button>
                        </Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}
