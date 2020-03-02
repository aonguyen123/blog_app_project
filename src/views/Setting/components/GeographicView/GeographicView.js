import React, { forwardRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spin, Select, Row, Col } from 'antd';
import allActions from './../../../../actions';
import './styles.css';
const { Option } = Select;
const nullSelectItem = {
    label: '',
    key: ''
};

const GeographicView = forwardRef((props, ref) => {
    const dispatch = useDispatch();
    const provinces = useSelector(state => state.provincesReducer.provinces);
    const districts = useSelector(state => state.provincesReducer.districts);
    const loading = useSelector(
        state => state.provincesReducer.loadingProvince
    );

    useEffect(() => {
        dispatch(allActions.geocodeActions.getProvinces());
    }, [dispatch]);

    const conversionObject = () => {
        const { value } = props;
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
    const selectProvinceItem = item => {
        const { onChange } = props;

        dispatch(allActions.geocodeActions.getDistricts(item.key));
        if (onChange) {
            onChange({
                province: item,
                district: nullSelectItem
            });
        }
    };
    const selectDistrictItem = item => {
        const { value, onChange } = props;

        if (value && onChange) {
            onChange({
                province: value.province,
                district: item
            });
        }
    };
    const { province, district } = conversionObject();
    return (
        <Row>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Spin spinning={loading} wrapperClassName="row" size="small">
                    <Select
                        showSearch
                        className="item"
                        onSelect={selectProvinceItem}
                        loading={provinces.length !== 0 ? false : true}
                        labelInValue
                        value={province}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        {getProvinceOption()}
                    </Select>
                    <Select
                        showSearch
                        className="item"
                        labelInValue
                        value={district}
                        onSelect={selectDistrictItem}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        {getDistrictOption()}
                    </Select>
                </Spin>
            </Col>
        </Row>
    );
});

export default GeographicView;
