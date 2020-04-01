import React from 'react';
import { ContentPopover } from './../../../../components';
import './styles.css';

export default function PostListContent(props) {
    const { data, mentions } = props;

    return (
        <div className='listContent'>
            <div className='description'>{data}</div>
            <div className='extra'>
                {mentions.map(value => (
                    <ContentPopover key={value._id} user={value.idUser} />
                ))}
            </div>
        </div>
    );
}
