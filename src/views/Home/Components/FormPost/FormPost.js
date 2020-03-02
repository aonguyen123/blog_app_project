import React, { useState } from 'react';
import { Form, Mentions } from 'antd';
import UploadImage from './../UploadImage';
import './styles.css';

const { Option } = Mentions;

export default function FormPost() {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');

    const onSearch = search => {
        setSearch(search);
        setLoading(!!search);
        setUsers([]);
        loadGithubUsers(search);
    };
    const loadGithubUsers = key => {
        if (!key) {
            setUsers([]);
            return;
        }

        fetch(`https://api.github.com/search/users?q=${key}`)
            .then(res => res.json())
            .then(({ items = [] }) => {
                if (search !== key) return;

                setUsers(items.slice(0, 10));
                setLoading(false);
            });
    };

    return (
            <Form>
                <Form.Item>
                    <Mentions
                        style={{ width: '100%' }}
                        placeholder="What are you thinking?"
                        loading={loading}
                        onSearch={onSearch}
                        rows={3}
                    >
                        {users.map(({ login, avatar_url: avatar }) => (
                            <Option
                                key={login}
                                value={login}
                                className="antd-demo-dynamic-option"
                            >
                                <img src={avatar} alt={login} />
                                <span>{login}</span>
                            </Option>
                        ))}
                    </Mentions>
                </Form.Item>
                <Form.Item>
                    <UploadImage />
                </Form.Item>
            </Form>
    );
}