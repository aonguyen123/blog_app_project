import { call, put, race, take, select } from 'redux-saga/effects';
import allActions from './../actions';
import {
    BAD_REQUSET,
    SUCCESS,    
    UNAUTHORIZED
} from './../constants/status_code';
import { SIGN_OUT } from './../constants/types';
import allServices from './../services';
import allAuthSaga from './auth.saga';
import allConfigs from '../config';

function* createPost(posts, mentions, idUser, urlImages) {
    try {
        const { response } = yield race({
            response: call(
                allServices.postService.createPost,
                posts,
                mentions,
                idUser,
                urlImages
            ),
            signout: take(SIGN_OUT)
        });
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
                const payload = yield select(
                    state => state.postReducer.postCreate
                );
                const { posts, mentions, idUser, urlImages } = payload;
                const data = yield call(
                    createPost,
                    posts,
                    mentions,
                    idUser,
                    urlImages
                );
                return data;
            }
            return false;
        } else {
            yield put(allActions.postActions.createPostError(data.message));
        }
    }
}
function* createPostFlowSaga({ payload }) {
    const { posts, mentions, idUser, urlImages } = payload;
    yield put(allActions.uiActions.showLoadingButton());
    const data = yield call(createPost, posts, mentions, idUser, urlImages);
    if (data) {
        yield put(allActions.postActions.createPostSuccess(data.message));
    }

    yield put(allActions.uiActions.hideLoadingButton());
}

function* fetchPost(page, page_size) {
    try {
        const { response } = yield race({
            response: call(allServices.postService.fetchPost, page, page_size),
            signout: take(SIGN_OUT)
        });
        if (response && response.status === SUCCESS) {
            return response.data;
        }
    } catch (e) {
        const { status, data } = e.response;
        if (status === BAD_REQUSET) {
            yield put(allActions.postActions.fetchPostOver(data.message));
        } else if (status === UNAUTHORIZED) {
            const payload = {
                refreshToken: allConfigs.tokenConfigs.getToken().refreshToken
            };
            const result = yield call(allAuthSaga.reAuth, { payload });
            if (result) {
                const payload = yield select(
                    state => state.postReducer.postFetch
                );
                const { page, page_size } = payload;
                const data = yield call(fetchPost, page, page_size);
                return data;
            }
            return false;
        } else {
            yield put(allActions.postActions.fetchPostError(data.message));
        }
    }
}
function* fetchPostFlowSaga({ payload }) {
    const { page, page_size } = payload;

    const data = yield call(fetchPost, page, page_size);
    if (data) {
        yield put(allActions.postActions.fetchPostSuccess(data.posts));
    }
}

function* fetchPostById(idUser, page, page_size) {
    try {
        const { response } = yield race({
            response: call(
                allServices.postService.fetchPostById,
                idUser,
                page,
                page_size
            ),
            signout: take(SIGN_OUT)
        });
        if (response && response.status === SUCCESS) {
            return response.data;
        }
    } catch (e) {
        const { status, data } = e.response;
        if (status === BAD_REQUSET) {
            yield put(allActions.postActions.fetchPostByIdOver(data.message));
        } else if (status === UNAUTHORIZED) {
            const payload = {
                refreshToken: allConfigs.tokenConfigs.getToken().refreshToken
            };
            const result = yield call(allAuthSaga.reAuth, { payload });
            if (result) {
                const payload = yield select(
                    state => state.postReducer.postByIdFetch
                );
                const { page, page_size, idUser } = payload;
                const data = yield call(fetchPostById, idUser, page, page_size);
                return data;
            }
            return false;
        } else {
            yield put(allActions.postActions.fetchPostByIdError(data.message));
        }
    }
}
function* fetchPostByIdFlowSaga({ payload }) {
    const { idUser, page, page_size } = payload;
    const data = yield call(fetchPostById, idUser, page, page_size);
    if (data) {
        yield put(allActions.postActions.fetchPostByIdSuccess(data.postsById));
    }
}

const allPostSaga = {
    createPostFlowSaga,
    fetchPostFlowSaga,
    fetchPostByIdFlowSaga
};

export default allPostSaga;
