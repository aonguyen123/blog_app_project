import { call, put, race, take } from 'redux-saga/effects';
import allActions from './../actions';
import { SUCCESS } from './../constants/status_code';
import allServices from './../services';
import allAuthSaga from './auth.saga';
import { SIGN_OUT } from '../constants/types';

function* getProvinces() {
    yield put(allActions.uiActions.showLoadingFetchData());
    try {
        const resp = yield call(allServices.geocodeService.getProvinces);
        const { status, data } = resp;
        if (status === SUCCESS) {
            yield put(allActions.geocodeActions.getProvincesSuccess(data));
        } else {
            yield put(
                allActions.geocodeActions.getProvincesError(
                    'Fetch provinces error'
                )
            );
        }
    } catch (e) {
        yield put(
            allActions.errorActions.serverError('Server error or network error')
        );
    }
    yield put(allActions.uiActions.hideLoadingFetchData());
}

function* getDistricts({ payload: provinceId }) {
    yield put(allActions.uiActions.showLoadingFetchData());
    try {
        const resp = yield call(
            allServices.geocodeService.getDistricts,
            provinceId
        );
        const { data, status } = resp;
        if (status === SUCCESS) {
            yield put(allActions.geocodeActions.getDistrictsSuccess(data));
        } else {
            yield put(
                allActions.geocodeActions.getDistrictsError(
                    'Fetch districts error'
                )
            );
        }
    } catch (e) {
        yield put(
            allActions.errorActions.serverError('Server error or network error')
        );
    }
    yield put(allActions.uiActions.hideLoadingFetchData());
}

function* getCurrentPlace(lat, lon) {
    try {
        const { response } = yield race({
            response: call(allServices.geocodeService.getCurrentPlace, lat, lon),
            signout: take(SIGN_OUT)
        });
        if(response && response.status === SUCCESS)
        {
            return response.data;
        }
    } catch (e) {
        yield put(allActions.errorActions.serverError(e.response.data.message));
    }
}
function* getWeatherFlowSaga({ payload }) {
    const { lat, lon, history } = payload;
    const { result } = yield race({
        result: call(allAuthSaga.authorize),
        signout: take(SIGN_OUT)
    });
    if (result) {
        const data = yield call(getCurrentPlace, lat, lon);
        if(data)
        {
            yield put(allActions.geocodeActions.getWeatherSuccess(data));
        }
    }
    else if(!result) {
        yield call(allAuthSaga.signout, {payload: { history }});
    }
}

const allGeocodeSaga = {
    getProvinces,
    getDistricts,
    getWeatherFlowSaga
};

export default allGeocodeSaga;
