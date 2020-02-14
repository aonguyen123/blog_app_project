import './Header.less';
import React, { Component } from 'react';
import { BasicLayoutProps } from './BasicLayout';
import { GlobalHeaderProps } from './GlobalHeader';
import { Settings } from './defaultSettings';
import { WithFalse } from './typings';
export interface HeaderViewProps extends Partial<Settings>, GlobalHeaderProps {
    isMobile?: boolean;
    collapsed?: boolean;
    logo?: React.ReactNode;
    menuRender?: BasicLayoutProps['menuRender'];
    headerRender?: BasicLayoutProps['headerRender'];
    rightContentRender?: WithFalse<(props: HeaderViewProps) => React.ReactNode>;
    siderWidth?: number;
    hasSiderMenu?: boolean;
}
interface HeaderViewState {
    visible: boolean;
}
declare class HeaderView extends Component<HeaderViewProps, HeaderViewState> {
    renderContent: () => import("history").History.PoorMansUnknown;
    render(): React.ReactNode;
}
export default HeaderView;
