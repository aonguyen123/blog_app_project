import React from 'react';
import { TabsProps, TabPaneProps } from 'antd/es/tabs';
import { PageHeaderProps } from 'antd/es/page-header';
import './index.less';
export interface PageHeaderTabConfig {
    tabList?: TabPaneProps[];
    tabActiveKey?: TabsProps['activeKey'];
    onTabChange?: TabsProps['onChange'];
    tabBarExtraContent?: TabsProps['tabBarExtraContent'];
    tabProps?: TabsProps;
}
export interface PageHeaderWrapperProps extends PageHeaderTabConfig, Omit<PageHeaderProps, 'title'> {
    title?: React.ReactNode | false;
    content?: React.ReactNode;
    extraContent?: React.ReactNode;
    pageHeaderRender?: (props: PageHeaderWrapperProps) => React.ReactNode;
}
declare const PageHeaderWrapper: React.SFC<PageHeaderWrapperProps>;
export default PageHeaderWrapper;
