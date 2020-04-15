import React, { useContext } from 'react';
import { Row, Col } from 'antd';
import { ToolPost, ListContent } from './Components';
import Context from '../../context';
import './styles.css';

export default function Home(props) {
    const { history } = props;
    const userCurrent = useContext(Context);

    return (
        <>
            <Row gutter={[16, 16]}>
                <Col xl={16} lg={16} md={16} sm={24} xs={24}>
                    <Row gutter={[20, 20]}>
                        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                            <ToolPost
                                history={history}
                                userCurrent={userCurrent}
                            />
                        </Col>
                    </Row>
                    <Row gutter={[20, 20]}>
                        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                            <ListContent history={history} />
                        </Col>
                    </Row>
                </Col>
                <Col xl={8} lg={8} md={8} sm={24} xs={24}></Col>
            </Row>
        </>
    );
}
