import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import { ToolPost, ListContent } from './Components';

export default function Home(props) {
    const { history } = props;
    const userInfo = useSelector(state => state.userReducer.userInfo);    

    return (
        <>
            <Row gutter={[20, 20]}>
                <Col xl={14} lg={14} md={14} sm={24} xs={24}>
                    <ToolPost history={history} userInfo={userInfo} />
                </Col>
                <Col xl={10} lg={10} md={10} sm={24} xs={24}>
                    {/* <Affix offsetTop={20}>
                        
                    </Affix> */}
                </Col>
            </Row>
            <Row gutter={[20, 20]}>
                <Col xl={14} lg={14} md={14} sm={24} xs={24}>
                    <ListContent history={history} />
                </Col>
            </Row>
        </>
    );
}
