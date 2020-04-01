import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spin, Select, Row, Col } from 'antd';
import allActions from './../../../../actions';
import './styles.css';
const { Option } = Select;
const nullSelectItem = {
    label: '',
    key: ''
};

export default function GeographicView({ value = {}, onChange }) {
    const dispatch = useDispatch();
    const provinces = useSelector(state => state.geocodeReducer.provinces);
    const districts = useSelector(state => state.geocodeReducer.districts);
    const loadingFetchData = useSelector(
        state => state.uiReducer.loadingFetchData
    );

    useEffect(() => {
        dispatch(allActions.geocodeActions.getProvinces());
    }, [dispatch]);

    const triggerChange = changedValue => {
        if (onChange) {
            onChange({
                ...value,
                ...changedValue
            });
        }
    };

    const conversionObject = () => {
        if (!value) {
            return {
                province: nullSelectItem,
                district: nullSelectItem
            };
        }
        const { province, district } = value;
        return {
            province: province || nullSelectItem,
            district: district || nullSelectItem
        };
    };
    const getOption = list => {
        return list.map(item => (
            <Option key={item.id} value={item.id}>
                {item.name}
            </Option>
        ));
    };
    const getProvinceOption = () => {
        if (provinces.length !== 0) {
            return getOption(provinces);
        }
        return [];
    };
    const getDistrictOption = () => {
        if (districts.length !== 0) {
            return getOption(districts);
        }
        return [];
    };
    const handleChangeDistrictItem = newDistrict => {
        triggerChange({
            district: newDistrict,
            province: value.province
        })
    };
    const handleChangeProvince = newProvince => {
        triggerChange({
            province: newProvince,
            district: nullSelectItem
        });
        dispatch(allActions.geocodeActions.getDistricts(newProvince.key));
    };
    const {province, district} = conversionObject();

    return (
        <Row>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Spin spinning={loadingFetchData} wrapperClassName="row" size="small">
                    <Select
                        showSearch
                        className="item"
                        onChange={handleChangeProvince}
                        value={province}
                        style={{float: 'left'}}
                        labelInValue
                        filterOption={(input, option) =>
                            option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {getProvinceOption()}
                    </Select>
                    <Select
                        showSearch
                        className="item"
                        labelInValue
                        style={{float: 'right'}}
                        value={district}
                        onChange={handleChangeDistrictItem}
                        filterOption={(input, option) =>
                            option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {getDistrictOption()}
                    </Select>
                </Spin>
            </Col>
        </Row>
    );
};
