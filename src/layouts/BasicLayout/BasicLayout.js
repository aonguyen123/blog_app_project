import React, { Suspense } from 'react';
import { Layout, Menu, Icon, Affix } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { GlobalLoading, GlobalHeader } from './../../components';
import './styles.css';
const { Header, Content, Footer, Sider } = Layout;

export default function BasicLayout(props) {
    const { children } = props;

    const handleBreak = broken => {};
    const handleCollapse = (collapsed, type) => {};

    return (
        <Layout>
            <Header className='header-layout-basic'>
                <GlobalHeader />
            </Header>
            <Layout>
                <Affix>
                    <Sider
                        style={{
                            height: '100vh',
                            borderRight: '1px solid #f0f0f0',
                            position: 'absolute',
                            zIndex: 99
                        }}
                        theme="light"
                        breakpoint="lg"
                        collapsedWidth="0"
                        onBreakpoint={handleBreak}
                        onCollapse={handleCollapse}
                    >
                        <Menu
                            theme="light"
                            mode="inline"
                            defaultSelectedKeys={['4']}
                        >
                            <Menu.Item key="1">
                                <Icon type="user" />
                                    <FormattedMessage id="menu.friend" defaultMessage="Friend" />
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="history" />
                                    <FormattedMessage id="menu.history" defaultMessage="History" /> 
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="message" />
                                    <FormattedMessage id="menu.message" defaultMessage="Message" /> 
                            </Menu.Item>
                        </Menu>
                    </Sider>
                </Affix>
                <Layout>
                    <Content style={{position: 'relative'}}>
                        <div className='content-layout-basic'>
                            <Suspense fallback={<GlobalLoading />}>
                                
                                {children}
                            </Suspense>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ao Nguyen ©2020 Created by Ao Nguyen
                    </Footer>
                </Layout>
            </Layout>
        </Layout>
    );
}
