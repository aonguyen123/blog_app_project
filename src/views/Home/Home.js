import React, { useContext } from 'react';
import { Row, Col } from 'antd';
import { ToolPost, ListContent } from './Components';
import Context from '../../context';
import './styles.css';

export default function Home() {
    const { userCurrent } = useContext(Context);

    return (
        <>
            <Row gutter={[16, 16]}>
                <Col xl={15} lg={15} md={15} sm={24} xs={24}>
                    <Row gutter={[20, 20]}>
                        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                            <ToolPost
                                userCurrent={userCurrent}
                            />
                        </Col>
                    </Row>
                    <Row gutter={[20, 20]}>
                        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                            <ListContent />
                        </Col>
                    </Row>
                </Col>          
                <Col xl={9} lg={9} md={9} sm={24} xs={24}>      
                </Col>
            </Row>
        </>
    );
}