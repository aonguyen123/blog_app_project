import React, { useState, useEffect, useRef } from 'react';
import { Comment, Avatar, Form, Input, Button } from 'antd';
import { CommentOutlined } from '@ant-design/icons';
import { formatMessage } from 'umi-plugin-react/locale';

const { TextArea } = Input;

function Editor({onChange, value, onSubmit, submitting}) {
    const onKeyDown = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onSubmit(value);
        }
    }

    return (
        <div>
            <Form.Item>
                <TextArea rows={2} onChange={onChange} value={value} onKeyDown={onKeyDown} />
            </Form.Item>
            <Form.Item>
                <Button
                    htmlType="submit"
                    loading={submitting}
                    onClick={() => onSubmit(value)}
                    type="primary"
                    size="small"
                    icon={<CommentOutlined />}
                >
                    {formatMessage({id: 'comment.addComment'})}
                </Button>
            </Form.Item>
        </div>
    );
}

export default function CommentEditor({userInfo, addCommentPost, loadingButton}) {
    const [value, setValue] = useState('');
    const resetRef = useRef();

    useEffect(() => {
        resetRef.current = loadingButton;
    }, [loadingButton]);
    const reset = resetRef.current;
    useEffect(() => {
        if(!loadingButton && reset) {
            setValue('');
        }
    }, [reset, loadingButton]);

    const handleChange = e => {
        setValue(e.target.value);
    }



    return (
        <Comment
            avatar={
                <Avatar
                    src={userInfo.photoURL}
                    alt=''
                />
            }
            content={
                <Editor
                    onChange={handleChange}
                    onSubmit={addCommentPost}
                    submitting={loadingButton}
                    value={value}
                />
            }
        />
    );
}
