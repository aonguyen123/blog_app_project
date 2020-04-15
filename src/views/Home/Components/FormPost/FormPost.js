import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Mentions, Upload, Modal } from 'antd';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { PlusOutlined } from '@ant-design/icons';
import allCommons from './../../../../common';
import allActions from './../../../../actions';
import firebaseConfig from './../../../../firebase';
import './styles.css';

const { Option, getMentions } = Mentions;
const { Item } = Form;

const normFile = ({ file, fileList }) => {
    const newFileLists = [...fileList].filter(file =>
        allCommons.uploadCommon.filterFileUpload(file)
    );
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
                <FormattedMessage id="home.btnUpload" />
            </div>
        </div>
    );
    const onSearch = search => {
        if (search) {
            dispatch(allActions.userActions.searchUser(search));
        } else {
            dispatch(allActions.userActions.searchUserSuccess([]));
        }
    };
    const propsUpload = {
        beforeUpload: file => {
            if(!allCommons.uploadCommon.beforeUpload(file))
            {
                return false;
            }
        },
        listType: 'picture-card',
        multiple: true,
        onPreview: handlePreview
    };
    const onSelect = (option, prefix) => {
        const arr = [];
        let newMention = {
            key: option.children[1].key,
            value: option.value
        };
        arr.push(newMention);
        dispatch(allActions.postActions.setMentions(arr));
    };
    const onChange = value => {
        const mentionsChange = getMentions(value);
        dispatch(allActions.postActions.setPost(value));
        changeMentions(mentionsChange);
    };
    const handleChangeUpload = info => {
        const urls = [];
        info.fileList.forEach(el => {
            if (el.response) {
                urls.push(el.response.url);
            }
        });
        dispatch(allActions.postActions.setUrlImages(urls));
    };
    const customRequest = option => {
        const { onSuccess, onError, file, onProgress } = option;
        const uploadTask = firebaseConfig.firebase.storage
            .ref(`/images/${file.name}`)
            .put(file);
        uploadTask.on(
            'state_changed',
            snapshot => {
                let percent =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                onProgress({ percent });
            },
            err => {
                onError(err);
            },
            () => {
                firebaseConfig.firebase.storage
                    .ref('images')
                    .child(file.name)
                    .getDownloadURL()
                    .then(urlFirebase => {
                        const rs = {
                            name: file.name,
                            status: 'done',
                            url: urlFirebase
                        };
                        onSuccess(rs, file);
                    });
            }
        );
    };
    return (
        <>
            <Item name="posts">
                <Mentions
                    style={{ width: '100%' }}
                    placeholder={formatMessage({
                        id: 'home.placeholder.formPost'
                    })}
                    loading={loading}
                    onSearch={onSearch}
                    rows={3}
                    onSelect={onSelect}
                    onChange={onChange}
                >
                    {searchResult.map((value, key) => (
                        <Option
                            key={value._id}
                            value={value.searchUser}
                            className="antd-dynamic-option"
                        >
                            <img src={value.photoURL} alt={value.searchUser} />
                            <span key={value._id}>{value.searchUser}</span>
                        </Option>
                    ))}
                </Mentions>
            </Item>
            <Item
                name="upload_image"
                valuePropName="fileList"
                getValueFromEvent={normFile}
            >
                <Upload
                    {...propsUpload}
                    onChange={handleChangeUpload}
                    customRequest={customRequest}
                >
                    {uploadButton}
                </Upload>
            </Item>
            <Modal
                visible={previewVisible}
                footer={null}
                onCancel={handleCancel}
            >
                <img alt="post" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    );
}
