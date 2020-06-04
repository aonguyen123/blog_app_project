import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Mentions, Upload, Modal } from 'antd';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { PlusOutlined } from '@ant-design/icons';
import allCommons from 'common';
import allActions from 'actions';
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

export default function FormPost({searchResult, loadingData, onChange}) {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const uploadTask = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if(uploadTask.current !== null) {
            uploadTask.current.cancel();
        }
    }, []);

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
            dispatch(allActions.userActions.searchMentions(search));
        } else {
            dispatch(allActions.userActions.searchMentionsSuccess([]));
        }
    };
    const propsUpload = {
        beforeUpload: file => {
            if(!allCommons.uploadCommon.beforeUpload(file)) {
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
    const customRequest = option => {
        const { onSuccess, onError, file, onProgress } = option;
        uploadTask.current = firebaseConfig.firebase.storage
            .ref(`/images/${file.name}`)
            .put(file);
        uploadTask.current.on(
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
    const onChangeMention = value => {
        const mentionChange = getMentions(value);
        onChange(mentionChange);
    }

    return (
        <>
            <Item name="posts">
                <Mentions
                    style={{ width: '100%' }}
                    placeholder={formatMessage({
                        id: 'home.placeholder.formPost'
                    })}
                    loading={loadingData}
                    onSearch={onSearch}
                    rows={3}
                    onSelect={onSelect}
                    onChange={onChangeMention}
                >
                    {searchResult.map(value => (
                        <Option
                            key={value._id}
                            value={value.searchUser}
                            className="antd-dynamic-option"
                        >
                            <img src={value.photoURL} alt='myPhoto' />
                            <span key={value._id}>{value.displayName}</span>
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
