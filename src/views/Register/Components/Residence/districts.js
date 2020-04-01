import axios from 'axios';

const formatDistrict = districts => {
    let arrDistrict = [];
    let district = {};
    if (districts.length !== 0) {
        districts.forEach(item => {
            district.value = item.name;
            district.label = item.name;

            arrDistrict.push(district);
            district = {};
        });
    }
    return arrDistrict;
};
const loadDistricts = async province => {
    const result = await axios.get(
        `https://dc.tintoc.net/app/api-customer/public/districts?provinceId.equals=${province}`
    );
    const data = formatDistrict(result.data);
    return data;
};

export default {
    loadDistricts
}