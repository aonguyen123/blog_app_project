import React, { useState } from 'react';
import { AutoComplete, Input, Divider } from 'antd';
import './styles.css';
const { Search } = Input;

export default function SearchBox() {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);

    const onSearch = searchText => {
        setLoading(searchText ? true : false);
        setDataSource(
            !searchText
            ? []
            : [searchText, searchText.repeat(2), searchText.repeat(3)])
    };

    return (
        <div className='header-search'>            
            <Divider type='vertical' style={{height: '35px', marginLeft: 0}} />
            <AutoComplete
                key="AutoComplete"
                dataSource={dataSource}
                onSearch={onSearch}
            >
                <Search
                    size='default'
                    placeholder="search"
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            console.log('enter');
                        }
                    }}
                    onBlur={() => {
                        console.log('blur');
                    }}
                    loading={loading}
                />
            </AutoComplete>
        </div>
    );
}
