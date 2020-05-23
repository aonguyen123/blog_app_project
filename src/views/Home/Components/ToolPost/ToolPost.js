import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { PageHeader, Form, Card, Button, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import FormPost from './../FormPost';
import allActions from 'actions';

export default function ToolPost({
    userCurrent,
    loadingButton,
    mentions,
    searchResult,
    loadingData
}) {
    const [mentionsChange, setMentionsChange] = useState([]);
    const [form] = Form.useForm();
    const resetFormRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        resetFormRef.current = loadingButton;
    }, [loadingButton]);
    const preResetForm = resetFormRef.current;
    useEffect(() => {
        if (!loadingButton && preResetForm) {
            form.resetFields();
        }
    }, [loadingButton, preResetForm, form]);

    const checkMentions = (mentions, mentionChange) => {
        let result = [];
        for (let i = 0; i < mentionChange.length; i++) {
            for (let j = 0; j < mentions.length; j++) {
                if (mentions[j].value === mentionChange[i].value) {
                    result.push(mentions[j].key);
                    break;
                }
            }
        }
        if (result.length !== 0) {
            for (let i = 0; i < result.length; i++) {
                for (let j = i + 1; j <= result.length; j++) {
                    if (result[j] === result[i]) {
                        result.splice(j, 1);
                    }
                }
            }
        }
        return result;
    };
    const handleClickPost = async () => {
        const idUser = userCurrent._id;
        const values = await form.validateFields();

        if (!values?.posts && !values?.upload_image) return;

        const mentionsArr = checkMentions(mentions, mentionsChange);
        let flag = true, urlImages = [];
        if(Array.isArray(values.upload_image) && values.upload_image.length > 0) {
            for (let i = 0; i < values.upload_image.length; i++) {
                if (values.upload_image[i].status === 'uploading') {
                    flag = false;
                    break;
                } else {
                    urlImages.push(values.upload_image[i].response.url);
                }
            }
        }
        if (flag) {
            dispatch(
                allActions.postActions.createPost(
                    values.posts,
                    mentionsArr,
                    idUser,
                    urlImages
                )
            );
        } else {
            message.warning('Uploading photo, plase wait !!!', 4);
        }
    };
    const onChange = mentionChange => {
        setMentionsChange(mentionChange);
    };

    return (
        <Form form={form} onFinish={handleClickPost}>
            <Card
                title={formatMessage({ id: 'home.createPost' })}
                size="small"
                hoverable={true}
                actions={[
                    <Button
                        icon={<EditOutlined />}
                        type="link"
                        htmlType="submit"
                        loading={loadingButton}
                    >
                        <FormattedMessage id="home.btnPost" />
                    </Button>
                ]}
            >
                <PageHeader
                    title={userCurrent.displayName}
                    avatar={{ src: userCurrent.photoURL }}
                    style={{ margin: '0px', padding: '0px' }}
                >
                    <FormPost
                        searchResult={searchResult}
                        loadingData={loadingData}
                        onChange={onChange}
                    />
                </PageHeader>
            </Card>
        </Form>
    );
}
