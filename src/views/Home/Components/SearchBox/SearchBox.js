import React from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
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
            placeholder={formatMessage({id: 'home.friends.searchPlacehoder'})}
            loading={loadingData}
            onSearch={onSearch}
            onChange={onChange}
        />
    );
}
