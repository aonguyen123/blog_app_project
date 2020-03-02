import React from 'react';
import { Form, Input, Row, Col, Select, Button } from 'antd';
import GeographicView from './../GeographicView';
const { Item } = Form;
const { TextArea } = Input;
const { Option } = Select;

function FormSetting(props) {
    const { getFieldDecorator } = props.form;

    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {   
                console.log('sss')
            }
        });
    };
    const prefixSelector = getFieldDecorator('prefix', {
        initialValue: '84'
    })(
        <Select style={{ width: 70 }}>
            <Option value="84">+84</Option>
        </Select>
    );
    const validatorGeographic = (_, value, callback) => {
        const { province, district } = value;

        if (!province.key) {
            callback('Please input your province or city!');
        }

        if (!district.key) {
            callback('Please input your district!');
        }

        callback();
    };
    const validate = (rule, value, callback) => {
        const { form } = props;
        if (value) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    return (
        <div>
            <Row>
                <Col xl={15} lg={15} md={15} sm={24} xs={24}>
                    <Form onSubmit={handleSubmit}>
                        <Item label="Email">
                            {getFieldDecorator('email', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your email'
                                    },
                                    {
                                        validator: validate
                                    }
                                ]
                            })(<Input />)}
                        </Item>
                        <Item label="Nickname">
                            {getFieldDecorator('nickname', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your nickname'
                                    },
                                    {
                                        validator: validate
                                    }
                                ]
                            })(
                                <Input />
                            )}
                        </Item>
                        <Item label="Personal profile">
                            {getFieldDecorator('personalProfile', {
                                rules: [
                                    {
                                        validator: validate
                                    }
                                ]
                            })(
                                <TextArea rows={3} />
                            )}
                        </Item>
                        <Item label="Phone Number">
                            {getFieldDecorator('phone', {
                                rules: [
                                    {
                                        required: true,
                                        message:
                                            'Please input your phone number!'
                                    },
                                    {
                                        validator: validate
                                    }
                                ]
                            })(
                                <Input
                                    type="number"
                                    addonBefore={prefixSelector}
                                    style={{ width: '100%' }}
                                />
                            )}
                        </Item>
                        <Item label="Country">
                            {getFieldDecorator('country', {
                                initialValue: 'Vietnam',
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your country!'
                                    }
                                ]
                            })(
                                <Select style={{ width: '100%' }}>
                                    <Option value="Vietnam">Việt Nam</Option>
                                </Select>
                            )}
                        </Item>
                        <Item label="Province or city">
                            {getFieldDecorator('geographic', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your province or city'
                                    },
                                    {
                                        validator: validate
                                    }
                                ]
                            })(<GeographicView />)}
                        </Item>
                        <Item>
                            <Button type='primary' htmlType='submit'>Update Information</Button>
                        </Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}

const FormSettingViews = Form.create({ name: 'form-settings-account' })(
    FormSetting
);
export default FormSettingViews;
