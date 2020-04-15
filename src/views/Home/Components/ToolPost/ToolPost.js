import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PageHeader, Tag, Form, Card, Button, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import FormPost from './../FormPost';
import allActions from './../../../../actions';
import allConfigs from './../../../../config';

export default function ToolPost(props) {
    const { userCurrent } = props;
    const [mentionsChange, setMentionsChange] = useState([]);

    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const mentions = useSelector(state => state.postReducer.mentions);
    const loadingButton = useSelector(state => state.uiReducer.loadingButton);
    const post = useSelector(state => state.postReducer.post);
    const urlImages = useSelector(state => state.postReducer.urlImages);
    const isCreatePostSuccess = useSelector(
        state => state.postReducer.isCreatePostSuccess
    );

    useEffect(() => {
        if (isCreatePostSuccess) {
            form.resetFields();
        }
    }, [isCreatePostSuccess, form]);

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
        const idUser = allConfigs.tokenConfigs.getIdUser();
        const values = await form.validateFields();
        const mentionsArr = checkMentions(mentions, mentionsChange);
        let flag = true;
        if (values.upload_image !== undefined) {
            for (let i = 0; i < values.upload_image.length; i++) {
                if (values.upload_image[i].status === 'uploading') {
                    flag = false;
                    break;
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
    const changeMentions = mentionChange => {
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
                        disabled={
                            urlImages.length === 0 && !post ? true : false
                        }
                    >
                        <FormattedMessage id="home.btnPost" />
                    </Button>
                ]}
            >
                <PageHeader
                    title={userCurrent.displayName}
                    tags={<Tag color="blue">Online</Tag>}
                    avatar={{ src: userCurrent.photoURL }}
                    style={{ margin: '0px', padding: '0px' }}
                >
                    <FormPost changeMentions={changeMentions} />
                </PageHeader>
            </Card>
        </Form>
    );
}
