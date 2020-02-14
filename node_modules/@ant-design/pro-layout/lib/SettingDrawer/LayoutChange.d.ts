import React from 'react';
import { Settings } from '../defaultSettings';
import { SettingItemProps } from './index';
export declare const renderLayoutSettingItem: (item: SettingItemProps) => JSX.Element;
declare const LayoutSetting: React.FC<{
    settings: Partial<Settings>;
    changeSetting: (key: string, value: any, hideLoading?: boolean) => void;
}>;
export default LayoutSetting;
