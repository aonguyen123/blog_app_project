import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Mentions, Upload, Modal } from 'antd';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { PlusOutlined } from '@ant-design/icons';
import allCommons from './../../../../common';
import allActions from './../../../../actions';
import './styles.css';

const { Option, getMentions } = Mentions;
const { Item } = Form;

const normFile = ({file, fileList}) => {
    const newFileLists = [...fileList].filter(file => allCommons.uploadCommon.filterFileUpload(file));
    return newFileLists;
};

export default function FormPost(props) {
    const { changeMentions } = props;

    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const loading = useSelector(state => state.uiReducer.loadingFetchData);
    const searchResult = useSelector(state => state.userReducer.searchResult);
    const dispatch = useDispatch();

    const handleCancel = () => setPreviewVisible(false);
    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await allCommons.uploadCommon.getBase64(
                file.originFileObj
            );
        }
        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
    };
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div className="ant-upload-text">
                <FormattedMessage id='home.btnUpload' />
            </div>
        </div>
    );
    const onSearch = search => {
        dispatch(allActions.userActions.searchUser(search));
    };
    const propsUpload = {
        beforeUpload: file => {
            allCommons.uploadCommon.beforeUpload(file);
            return false;
        },
        listType: 'picture-card',
        multiple: true,
        onPreview: handlePreview,    
    };
    const onSelect = (option, prefix) => {
        const arr = [];
        let newMention = {
            key: option.children[1].key,
            value: option.value
        }
        arr.push(newMention);
        dispatch(allActions.postActions.setMentions(arr));
    }
    const onChange = value => {
        const mentionsChange = getMentions(value);
        changeMentions(mentionsChange);
    }

    return (
        <>
            <Item name="posts">
                <Mentions
                    style={{ width: '100%' }}
                    placeholder={formatMessage({id: 'home.placeholder.formPost'})}
                    loading={loading}
                    onSearch={onSearch}
                    rows={3}
                    onSelect={onSelect}
                    onChange={onChange}
                >

                    {searchResult.map((value, key) => (
                        <Option
                            key={value._id}
                            value={value.nickname}
                            className="antd-dynamic-option"
                        >
                            {value.avatar ? <img src={value.avatar} alt={value.nickname} /> : null}
                            <span key={value._id}>{value.nickname}</span>
                        </Option>
                    ))}
                </Mentions>
            </Item>
            <Item
                name="upload_image"
                valuePropName="fileList"
                getValueFromEvent={normFile}
            >
                <Upload {...propsUpload}>
                    {uploadButton}
                </Upload>
            </Item>
            <Modal
                visible={previewVisible}
                footer={null}
                onCancel={handleCancel}
            >
                <img
                    alt="post"
                    style={{ width: '100%' }}
                    src={previewImage}
                />
            </Modal>
        </>
    );
}
