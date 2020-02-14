import './index.less';
import React, { Component } from 'react';
import { HeaderViewProps } from '../Header';
import { SiderMenuProps } from '../SiderMenu/SiderMenu';
import { WithFalse } from '../typings';
export interface GlobalHeaderProps {
    collapsed?: boolean;
    onCollapse?: (collapsed: boolean) => void;
    isMobile?: boolean;
    logo?: React.ReactNode;
    menuRender?: HeaderViewProps['menuRender'];
    collapsedButtonRender?: WithFalse<(collapsed?: boolean) => React.ReactNode>;
    rightContentRender?: HeaderViewProps['rightContentRender'];
    className?: string;
    style?: React.CSSProperties;
    menuHeaderRender?: SiderMenuProps['menuHeaderRender'];
}
export default class GlobalHeader extends Component<GlobalHeaderProps> {
    triggerResizeEvent: () => void;
    toggle: () => void;
    renderCollapsedButton: () => JSX.Element | null;
    render(): React.ReactNode;
}
