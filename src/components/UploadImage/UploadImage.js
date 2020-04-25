import { message } from 'antd';
import allCommons from '../../common';
import firebaseConfig from '../../firebase';

export function customRequest(onSuccess, onError, file, onProgress, uploadTask, uploadSuccess) {
    const hideAction = message.loading(
        'Action uploading photo in progress...',
        0
    );
    
    uploadTask.on(
        'state_changed',
        snapshot => {
            let percent =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            onProgress({ percent });
        },
        err => {
            onError(err);
            hideAction();
            message.success('Cancel upload photo success', 4);
            
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
                    uploadSuccess();
                    hideAction();
                    message.success('Upload photo success', 4);
                    return true;
                });
        }
    );
}
export function propsUpload() {
    return {
        beforeUpload: file => {
            if (!allCommons.uploadCommon.beforeUpload(file)) {
                return false;
            }
        },
        listType: 'picture'
    }
}
export function onRemove(file, uploadTask) {
    uploadTask.cancel();
};