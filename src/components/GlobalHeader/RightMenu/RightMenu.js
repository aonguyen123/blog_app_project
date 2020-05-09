import React from 'react';
import AvatarDropdown from './../AvatarDropdown';
import NoticeIcon from './../NoticeIcon';
import SelectLang from './../SelectLang';
import './styles.css';

export default function RightMenu({userCurrent}) {
    return (
        <div className='right-menu'>
            <NoticeIcon />
            <AvatarDropdown userCurrent={userCurrent} />
            <SelectLang />
        </div>
    )
}