import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Tag, Input } from 'antd';
import './styles.css';

export default function Interests({
    idUser,
    userCurrentId,
    createInterest,
    interests,
    removeInterest
}) {
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
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
        removeInterest(removedTag.label);
    };
    const handleInputConfirm = () => {
        const inputValue1 = inputValue;
        if (
            inputValue1 &&
            interests.filter(
                tag => tag.label === inputValue1.trim().toLowerCase()
            ).length === 0 &&
            inputValue1.length < 15
        ) {
            createInterest(inputValue.trim().toLowerCase());
        }
        setInputVisible(false);
        setInputValue('');
    };

    return (
        <div className="tags">
            <div className="tagsTitle">Interests</div>
            {interests && interests.map((item, key) => (
                <Tag
                    key={key}
                    closable={userCurrentId === idUser ? true : false}
                    color="purple"
                    onClose={() => handleClose(item)}
                >
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
            {!inputVisible && userCurrentId === idUser && (
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
