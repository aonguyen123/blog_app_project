import React, { Suspense } from 'react';
import { Layout, Affix } from 'antd';
import { GlobalLoading, GlobalHeader, GlobalFootter, SiderMenu } from './../../components';
import './styles.css';
const { Header, Content, Footer } = Layout;

export default function BasicLayout(props) {
    const { children } = props;

    return (
        <Layout>
            <Header className='header-layout-basic'>
                <GlobalHeader />
            </Header>
            <Layout style={{background: '#fff'}}>
                <Affix>
                    <SiderMenu />
                </Affix>
                <Layout>
                    <Content>
                        <div className='content-layout-basic'>
                            <Suspense fallback={<GlobalLoading />}>
                                {children}
                            </Suspense>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center', background: '#000'}} >
                        <GlobalFootter />
                    </Footer>
                </Layout>
            </Layout>
        </Layout>
    );
}
