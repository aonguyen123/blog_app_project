import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PageHeader, Tag, Form, Card, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import FormPost from './../FormPost';
import allActions from './../../../../actions';
import allConfigs from './../../../../config';

export default function ToolPost(props) {
    const { history, userInfo } = props;
    const [mentionsChange, setMentionsChange] = useState([]);
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const mentions = useSelector(state => state.postReducer.mentions);
    const loadingButton = useSelector(state => state.uiReducer.loadingButton);
    

    const checkMentions = (mentions, mentionChange) => {
        let result = [];
        for (let i=0; i<mentionChange.length; i++) {
            for (let j=0; j<mentions.length; j++) {
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

		const formData = new FormData();
        if (values.upload_image !== undefined) {
            for (let i = 0; i < values.upload_image.length; i++) {
                formData.append(
                    'pictures',
                    values.upload_image[i].originFileObj
                );
            }
		}
		if(mentionsArr.length > 0 )
		{
			for (let i = 0; i < mentionsArr.length; i++) {
				formData.append('mentionList', mentionsArr[i]);
			}
		}
		formData.set('idUser', idUser);
		values.posts !== undefined ? formData.set('posts', values.posts) : formData.set('posts', '');
        dispatch(allActions.postActions.createPost(formData, history));
    };
    const changeMentions = mentionChange => {
        setMentionsChange(mentionChange);
    };
    
    return (
        <Form form={form} onFinish={handleClickPost}>
            <Card
                title={formatMessage({id: 'home.createPost'})}
                size="small"
                loading={Object.keys(userInfo).length === 0 ? true : false}
                hoverable={true}
                actions={[
                    <Button
                        icon={<EditOutlined />}
                        type="link"
                        htmlType="submit"
                        loading={loadingButton}
                    >
                        <FormattedMessage id='home.btnPost' />
                    </Button>
                ]}
            >
                <PageHeader
                    title={userInfo.nickname}
                    tags={<Tag color="blue">Online</Tag>}
                    avatar={{
                        src: userInfo.avatar
                        //'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4'
                    }}
                    style={{ margin: '0px', padding: '0px' }}
                >
                    <FormPost changeMentions={changeMentions} />
                </PageHeader>
            </Card>
        </Form>
    );
}
