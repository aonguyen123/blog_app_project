import React from 'react';
import { AvatarDropdown, SelectLang, NoticeView } from './../../../components';
import './styles.css';

export default function RightMenu() {
    return (
        <div className='right-menu'>
            <NoticeView />
            <AvatarDropdown />
            <SelectLang />
        </div>
    )
}