import React from 'react';
import { Upload } from 'antd';
import allConfigs from './../../config';

export default function RenderImagaListContent(props) {
    const { images, idUser, onPreview, onRemove } = props;

    const onPreviewImage = async file => {
        onPreview(file);
    };
    const onRemoveImage = file => {
        onRemove(file);
    }
    if (images.length > 0) {
        const fileList = [];
        let item = {};
        images.forEach(el => {
            item.uid = el._id;
            item.name = el.url;
            item.status = 'done';
            item.url = el.url;
            fileList.push(item);
            item = {};
        });
        return (
            <Upload
                listType="picture-card"
                fileList={fileList}
                showUploadList={{
                    showPreviewIcon: true,
                    showRemoveIcon:
                        allConfigs.tokenConfigs.getIdUser() === idUser
                            ? true
                            : false
                }}
                onPreview={onPreviewImage}
                onRemove={onRemoveImage}
            ></Upload>
        );
    }
    return null;
}