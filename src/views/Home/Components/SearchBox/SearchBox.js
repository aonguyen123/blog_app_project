import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

export default function SearchBox({searchUser, loadingData, searchEmpty}) {

    const onSearch = (value, event) => {
        if(!value) return;
        searchUser(value);
    }
    const onChange = (e) => {
        if(!e.target.value) {
            searchEmpty();
        }
    }

    return (
        <Search
            placeholder="Search here"
            loading={loadingData}
            onSearch={onSearch}
            onChange={onChange}
        />
    );
}
