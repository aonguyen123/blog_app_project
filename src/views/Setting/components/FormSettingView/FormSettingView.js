import React from 'react';
import { Form, Input, Row, Col, Select, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { formatMessage } from 'umi-plugin-react/locale';
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
                return Promise.reject(formatMessage({id: 'basicSetting.valid.provinceOrCity'}));
            }
            if (!district.key) {
                return Promise.reject(formatMessage({id: 'basicSetting.valid.district'}));
            }    
        }
        return Promise.resolve();
    };
    const checkNickname = (rule, value) => {
        if (value) {
            value = value.trim();
            value = value.replace(/\s+/g, '');
            if (value.length < 5) {
                return Promise.reject(formatMessage({id: 'basicSetting.valid.minNickname'}));
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
                                    message: formatMessage({id: 'basicSetting.valid.notEmail'})
                                },
                                {
                                    required: true,
                                    message: formatMessage({id: 'basicSetting.valid.email'})
                                }
                            ]}
                        >
                            <Input />
                        </Item>
                        <Item
                            label={formatMessage({id: 'setting.basicSetting.nickname'})}
                            name="nickname"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: formatMessage({id: 'basicSetting.valid.nickname'})
                                },
                                {
                                    whitespace: true,
                                    message: formatMessage({id: 'basicSetting.valid.spaceNickname'})
                                },
                                {
                                    max: 13,
                                    message: formatMessage({id: 'basicSetting.valid.maxNickname'})
                                },
                                {
                                    validator: checkNickname
                                }
                            ]}
                        >
                            <Input />
                        </Item>
                        <Item label={formatMessage({id: 'setting.basicSetting.introduce'})} name="profile">
                            <TextArea rows={3} />
                        </Item>
                        <Item
                            label={formatMessage({id: 'setting.basicSetting.phone'})}
                            name="phone"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: formatMessage({id: 'basicSetting.valid.phone'})
                                },
                                {
                                    len: 9,
                                    message: formatMessage({id: 'basicSetting.valid.notPhone'})
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
                            label={formatMessage({id: 'setting.basicSetting.province'})}
                            name="address"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: formatMessage({id: 'basicSetting.valid.provinceOrCity'})
                                },
                                {
                                    validator: checkProvince
                                }
                            ]}
                        >
                            <GeographicView provinceUser={userInfo.provinceOrCity} districtUser={userInfo.district} />
                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit" loading={loadingButton} icon={<EditOutlined />}>
                                {formatMessage({id: 'setting.basicSetting.button'})}
                            </Button>
                        </Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}
