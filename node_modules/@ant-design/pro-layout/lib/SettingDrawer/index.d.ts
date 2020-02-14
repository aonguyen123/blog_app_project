import './index.less';
import React from 'react';
import { Settings } from '../defaultSettings';
declare type MergerSettingsType<T> = Partial<T> & {
    primaryColor?: string;
    colorWeak?: boolean;
};
export interface SettingItemProps {
    title: React.ReactNode;
    action: React.ReactElement;
    disabled?: boolean;
    disabledReason?: React.ReactNode;
}
export interface SettingDrawerProps {
    settings?: MergerSettingsType<Settings>;
    collapse?: boolean;
    getContainer?: any;
    publicPath?: string;
    hideLoading?: boolean;
    hideColors?: boolean;
    hideHintAlert?: boolean;
    hideCopyButton?: boolean;
    onCollapseChange?: (collapse: boolean) => void;
    onSettingChange?: (settings: MergerSettingsType<Settings>) => void;
}
export interface SettingDrawerState extends MergerSettingsType<Settings> {
    collapse?: boolean;
    language?: string;
}
export declare const getFormatMessage: () => (data: {
    id: string;
    defaultMessage?: string | undefined;
}) => string;
/**
 * 可视化配置组件
 * @param props
 */
declare const SettingDrawer: React.FC<SettingDrawerProps>;
export default SettingDrawer;
