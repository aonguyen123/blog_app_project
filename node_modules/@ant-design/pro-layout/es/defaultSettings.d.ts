import { MenuTheme } from 'antd/es/menu/MenuContext';
export declare type ContentWidth = 'Fluid' | 'Fixed';
export interface Settings {
    /**
     * theme for nav menu
     */
    navTheme: MenuTheme | 'realDark' | undefined;
    /**
     * nav menu position: `sidemenu` or `topmenu`
     */
    layout: 'sidemenu' | 'topmenu';
    /**
     * layout of content: `Fluid` or `Fixed`, only works when layout is topmenu
     */
    contentWidth: ContentWidth;
    /**
     * sticky header
     */
    fixedHeader: boolean;
    /**
     * sticky siderbar
     */
    fixSiderbar: boolean;
    menu: {
        locale?: boolean;
        defaultOpenAll?: boolean;
    };
    title: string;
    iconfontUrl: string;
    primaryColor: string;
    colorWeak?: boolean;
}
declare const defaultSettings: Settings;
export default defaultSettings;
