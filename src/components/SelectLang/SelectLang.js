import React from 'react';
import { GlobalOutlined } from '@ant-design/icons';
import { getLocale, setLocale } from 'umi-plugin-react/locale';
import { Menu } from 'antd';
import { HeaderDropdown } from './../../components';
import './styles.css';

export default function SelectLang() {
    const selectedLang = getLocale();
    const changeLang = ({ key }) => setLocale(key);

    const locales = ['vi-VN', 'en-US'];
    const languageLabels = {
        'vi-VN': 'Viet Nam',
        'en-US': 'English'
    };
    const languageIcons = {
        'vi-VN': '🇨🇳',
        'en-US': '🇺🇸'
    };
    const langMenu = (
        <Menu selectedKeys={[selectedLang]} onClick={changeLang}>
            {locales.map(locale => (
                <Menu.Item key={locale}>
                    <span role="img" aria-label={languageLabels[locale]}>
                        {languageIcons[locale]}
                    </span>{' '}
                    {languageLabels[locale]}
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <HeaderDropdown overlay={langMenu} placement="bottomRight">
            <span className='dropDown-lang'>
                <GlobalOutlined title="Change Language" />
            </span>
        </HeaderDropdown>
    );
}
