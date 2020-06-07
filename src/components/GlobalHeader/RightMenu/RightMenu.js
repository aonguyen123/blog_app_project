import React from 'react';
import AvatarDropdown from './../AvatarDropdown';
import NoticeIconView from './../NoticeIcon';
import SelectLang from './../SelectLang';
import './styles.css';

export default function RightMenu({userCurrent, events, loadingEvent}) {
    return (
        <div className='right-menu'>
            <NoticeIconView events={events} loadingEvent={loadingEvent} idCur={userCurrent._id} />
            <AvatarDropdown userCurrent={userCurrent} />
            <SelectLang />
        </div>
    )
}