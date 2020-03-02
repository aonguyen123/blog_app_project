import React from 'react';
import './styles.css';

export default function PostListContent(props) {
    const { data } = props;
    return (
        <div className='listContent'>
            <div className='description'>{data.content}</div>
            <div className='extra'>
                <a href={data.href}>{data.owner}</a> 发布在 <a href={data.href}>{data.href}</a>
            </div>
        </div>
    );
}
