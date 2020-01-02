import { Upload, Button, Icon } from 'antd';
import React from 'react';

class ImportFile extends React.Component {
    state = {
        fileList: []
    };

    handleChange = info => {
        let fileList = [...info.fileList];
        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-1);

        // 2. Read from response and show file link
        console.log(fileList);
        fileList = fileList.map(file => {
            if (file.response) {
                // Component will show file.url as link
                file.url = file.response.url;
            }
            return file;
        });

        this.setState({ fileList });
    };

    render() {
        const props = {
            action: 'http://localhost:4000/api/getFile',
            onChange: this.handleChange,
            multiple: true
        };
        return (
            <Upload {...props} fileList={this.state.fileList}>
                <Button>
                    <Icon type="upload" /> Upload
                </Button>
            </Upload>
        );
    }
}
export default ImportFile;