import React from 'react';
import { SiderMenuProps } from '../SiderMenu/SiderMenu';
import './index.less';
import { HeaderViewProps } from '../Header';
export interface TopNavHeaderProps extends SiderMenuProps {
    logo?: React.ReactNode;
    onCollapse?: (collapse: boolean) => void;
    rightContentRender?: HeaderViewProps['rightContentRender'];
}
declare const TopNavHeader: React.FC<TopNavHeaderProps>;
export default TopNavHeader;
