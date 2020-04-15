import { call, put, race, take, select } from 'redux-saga/effects';
import allActions from './../actions';
import { SUCCESS, UNAUTHORIZED } from './../constants/status_code';
import allServices from './../services';
import allAuthSaga from './auth.saga';
import { SIGN_OUT } from '../constants/types';
import allConfigs from '../config';

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
            response: call(
                allServices.geocodeService.getCurrentPlace,
                lat,
                lon
            ),
            signout: take(SIGN_OUT)
        });
        if (response && response.status === SUCCESS) {
            return response.data;
        }
    } catch (e) {
        const { status, data } = e.response;
        if(status === UNAUTHORIZED) {
            const payload = {
                refreshToken: allConfigs.tokenConfigs.getToken().refreshToken
            };
            const result = yield call(allAuthSaga.reAuth, { payload });
            if(result) {
                const payload = yield select(state => state.geocodeReducer.weatherFetch);
                const { lat, lon } = payload;
                const data = yield call(getCurrentPlace, lat, lon);
                return data;
            }
            return false;
        }
        else {
            yield put(allActions.geocodeActions.getWeatherError(data.message));
        }        
    }
}
function* getWeatherFlowSaga({ payload }) {
    const { lat, lon } = payload;
    const data = yield call(getCurrentPlace, lat, lon);
    if (data) {
        yield put(allActions.geocodeActions.getWeatherSuccess(data));
    }
}

const allGeocodeSaga = {
    getProvinces,
    getDistricts,
    getWeatherFlowSaga
};

export default allGeocodeSaga;
