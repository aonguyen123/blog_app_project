import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { css } from 'glamor';
import './styles.css';

export default function ScrollToBottomCom({children, height, width}) {

    const ROOT_CSS = css({
        height,
        width
    });    

    return (
        <ScrollToBottom className={ROOT_CSS} debounce={0}>
            {children}
        </ScrollToBottom>
    )
}