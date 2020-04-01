import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Cascader, Spin } from 'antd';
import allActions from './../../../../actions';
import districts from './districts';


export default function Residence({value = {}, onChange}) {
    const [residences, setResidences] = useState([]);
    
    const dispatch = useDispatch();
    const provinces = useSelector(state => state.geocodeReducer.provinces);
    const loadingFetchProvince = useSelector(
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
    const formatProvince = provinces => {
        let arrProvince = [];
        let province = {};
        if (provinces.length !== 0) {
            provinces.forEach(item => {
                province.key = item.code;
                province.value = item.name;
                province.label = item.name;
                province.isLeaf = false;

                arrProvince.push(province);
                province = {};
            });
        }
        return arrProvince;
    };

    useEffect(() => {
        const residences = formatProvince(provinces);
        setResidences(residences);
    }, [provinces]);

    const loadData = async selectedOptions => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;

        const children = await districts.loadDistricts(targetOption.key);
        if (children.length !== 0) {
            targetOption.loading = false;
            targetOption.children = children;
            setResidences([...residences]);
        }
    };
    const onChangeResidence = (value) => {
        triggerChange({
            valueResidence: value
        })
    }

    return (
        <Spin spinning={loadingFetchProvince} wrapperClassName='row-residence'>
            <Cascader options={residences} loadData={loadData} changeOnSelect onChange={onChangeResidence} />
        </Spin>
    );
}
