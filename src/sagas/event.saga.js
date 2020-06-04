import { call, put } from 'redux-saga/effects';
import allActions from './../actions';
import { SUCCESS, UNAUTHORIZED } from './../constants/status_code';
import allServices from './../services';
import allAuthSaga from './auth.saga';
import allConfigs from '../config';

function* fetchEvents(idUser) {
    try {
        const response = yield call(allServices.eventService.fetchEvents, idUser);
        if (response && response.status === SUCCESS) {
            return response.data;
        }
    } catch (e) {
        const { data, status } = e.response;
        if (status === UNAUTHORIZED) {
            const payload = {
                refreshToken: allConfigs.tokenConfigs.getToken().refreshToken
            };
            const result = yield call(allAuthSaga.reAuth, { payload });
            if (result) {
                const data = yield call(fetchEvents, idUser);
                return data;
            }
            return false;
        } else {
            yield put(allActions.eventsActions.fetchEventsError(data.message));
        }
    }
}
function* fetchEventFlowSaga({payload: {idUser}}) {
    yield put(allActions.uiActions.showLoadingFetchEvent());
    const data = yield call(fetchEvents, idUser);
    if (data) {
        yield put(allActions.eventsActions.fetchEventsSuccess(data.events));
    }
    yield put(allActions.uiActions.hideLoadingFetchEvent());
}
function* removeEvent(idEvent) {
    try {
        const response = yield call(allServices.eventService.removeEvent, idEvent);
        if (response && response.status === SUCCESS) {
            return response.data;
        }
    } catch (e) {
        const { data, status } = e.response;
        if (status === UNAUTHORIZED) {
            const payload = {
                refreshToken: allConfigs.tokenConfigs.getToken().refreshToken
            };
            const result = yield call(allAuthSaga.reAuth, { payload });
            if (result) {
                const data = yield call(removeEvent, idEvent);
                return data;
            }
            return false;
        } else {
            yield put(allActions.eventsActions.removeEventError(data.message));
        }
    }
}
function* removeEventFlowSaga({payload: {idEvent}}) {
    yield put(allActions.uiActions.showLoadingFetchEvent());
    const data = yield call(removeEvent, idEvent);
    if (data) {
        yield put(allActions.eventsActions.removeEventSuccess(idEvent));
    }
    yield put(allActions.uiActions.hideLoadingFetchEvent());
}

function* removeAllEvent(eventType) {
    try {
        const response = yield call(allServices.eventService.removeAllEvents, eventType);
        if (response && response.status === SUCCESS) {
            return response.data;
        }
    } catch (e) {
        const { data, status } = e.response;
        if (status === UNAUTHORIZED) {
            const payload = {
                refreshToken: allConfigs.tokenConfigs.getToken().refreshToken
            };
            const result = yield call(allAuthSaga.reAuth, { payload });
            if (result) {
                const data = yield call(removeAllEvent, eventType);
                return data;
            }
            return false;
        } else {
            yield put(allActions.eventsActions.removeAllEventError(data.message));
        }
    }
}
function* removeAllEventFlowSaga({payload: {eventType}}) {
    yield put(allActions.uiActions.showLoadingFetchEvent());
    const data = yield call(removeAllEvent, eventType);
    if (data) {
        yield put(allActions.eventsActions.removeAllEventSuccess(eventType));
    }
    yield put(allActions.uiActions.hideLoadingFetchEvent());
}

function* fetchHistorys(page, page_size, idUser) {
    try {
        const response = yield call(allServices.eventService.fetchHistorys, page, page_size, idUser);
        if (response && response.status === SUCCESS) {
            return response.data;
        }
    } catch (e) {
        const { data, status } = e.response;
        if (status === UNAUTHORIZED) {
            const payload = {
                refreshToken: allConfigs.tokenConfigs.getToken().refreshToken
            };
            const result = yield call(allAuthSaga.reAuth, { payload });
            if (result) {
                const data = yield call(fetchHistorys, page, page_size, idUser);
                return data;
            }
            return false;
        } else {
            yield put(allActions.eventsActions.fetchHistorysError(data.message));
        }
    }
}
function* fetchHistorysFlowSaga({payload: {page, page_size, idUser}}) {
    yield put(allActions.uiActions.showLoadingFetchData());
    const data = yield call(fetchHistorys, page, page_size, idUser);
    if (data && data.message === 'LOADED ALL') {
        yield put(allActions.eventsActions.fetchHistorysOver(data.historys));
    } else {
        yield put(allActions.eventsActions.fetchHistorysSuccess(data.historys));
    }
    yield put(allActions.uiActions.hideLoadingFetchData());
}
function* loadMoreHistorysFlowSaga({payload: {page, page_size, idUser}}) {
    const data = yield call(fetchHistorys, page, page_size, idUser);
    if (data && data.message === 'LOADED ALL') {
        yield put(allActions.eventsActions.fetchHistorysOver(data.historys));
    } else {
        yield put(allActions.eventsActions.fetchHistorysSuccess(data.historys));
    }
}

export default {
    fetchEventFlowSaga,
    removeEventFlowSaga,
    removeAllEventFlowSaga,
    fetchHistorysFlowSaga,
    loadMoreHistorysFlowSaga
}