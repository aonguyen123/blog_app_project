import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Tag, Input } from 'antd';
import './styles.css';

export default function Interests() {
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [newTags, setNewTags] = useState([]);
    let auto = undefined;

    useEffect(() => {
        if (inputVisible) {
            auto.focus();
        }
    }, [inputVisible, auto]);
    const showInput = () => {
        setInputVisible(true);
    };
    const handleInputChange = e => {
        setInputValue(e.target.value);
    };
    const handleClose = removedTag => {
        const tags = newTags.filter(tag => tag.key !== removedTag.key);
        setNewTags(tags);
    };
    const handleInputConfirm = () => {
        const inputValue1 = inputValue;
        let newTags1 = newTags;
        if (
            inputValue1 &&
            newTags1.filter(tag => tag.label === inputValue1).length === 0
        ) {
            newTags1 = [
                ...newTags1,
                {
                    key: `new-${newTags1.length}`,
                    label: inputValue1
                }
            ];
        }
        setNewTags([...newTags1]);
        setInputVisible(false);
        setInputValue('');
    };

    return (
        <div className="tags">
            <div className="tagsTitle">Interests</div>
            {newTags.map(item => (
                <Tag key={item.key} closable onClose={() => handleClose(item)}>
                    {item.label}
                </Tag>
            ))}
            {inputVisible && (
                <Input
                    ref={ref => (auto = ref)}
                    type="text"
                    size="small"
                    style={{
                        width: 78
                    }}
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                />
            )}
            {!inputVisible && (
                <Tag
                    onClick={showInput}
                    style={{
                        background: '#fff',
                        borderStyle: 'dashed'
                    }}
                >
                    <PlusOutlined />
                </Tag>
            )}
        </div>
    );
}
