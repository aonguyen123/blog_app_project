import { call, put, race, take } from 'redux-saga/effects';
import allActions from './../actions';
import { BAD_REQUSET, SUCCESS } from './../constants/status_code';
import { SIGN_OUT } from './../constants/types';
import allServices from './../services';
import allAuthSaga from './auth.saga';

function* createPost(formData) {
    try {
        const response  = yield call(
            allServices.postService.createPost, formData);
        if (response && response.status === SUCCESS) {
            return response.data;
        }
    } catch (e) {
        yield put(allActions.errorActions.serverError(e.response.data));
    }
}
function* createPostFlowSaga({ payload }) {
    const { formData, history } = payload;
    yield put(allActions.uiActions.showLoadingButton());
    const result = yield* allAuthSaga.authorize();
    if (result) {
        const { data, signout } = yield race({
            data: call(createPost, formData),
            signout: take(SIGN_OUT)
        })
        if (data) {
            yield put(allActions.postActions.createPostSuccess(data.message, data.newPost));
        }
        else if(signout)
        {
            yield call(allAuthSaga.signout, {payload: {history}});
        }
    }
    else if(!result)      
    {
        yield call(allAuthSaga.signout, {payload: {history}});
    }
    yield put(allActions.uiActions.hideLoadingButton());
}

function* fetchPost(page, page_size) {
    try {
        const { response } = yield race({
            response: call(
                allServices.postService.fetchPost,
                page,
                page_size
            ),
            signout: take(SIGN_OUT)
        }) 
        if (response && response.status === SUCCESS) {
            return response.data;
        }
    } catch (e) {
        const { status, data } = e.response;
        if (status === BAD_REQUSET) {
            yield put(allActions.postActions.fetchPostOver(data.message));
        } else {
            yield put(allActions.errorActions.serverError(e.response.data));
        }
    }
}
function* fetchPostFlowSaga({ payload }) {
    const { history, page, page_size } = payload;
    const { result } = yield race({
        result: call(allAuthSaga.authorize),
        signout: take(SIGN_OUT)
    });
    if (result) {
        const data = yield call(fetchPost, page, page_size);
        if (data) {
            yield put(
                allActions.postActions.fetchPostSuccess(data.posts)
            );
        }
    }
    else if(!result)      
    {
        yield call(allAuthSaga.signout, {payload: {history}});
    }
}

function* fetchPostById(idUser, page, page_size) {
    try {
        const { response } = yield race({
            response: call(allServices.postService.fetchPostById, idUser, page, page_size),
            signout: take(SIGN_OUT)
        });
        if(response && response.status === SUCCESS)
        {
            return response.data;
        }
    } catch (e) {
        const { status, data } = e.response;
        if (status === BAD_REQUSET) {
            yield put(allActions.postActions.fetchPostByIdOver(data.message));
        } else {
            yield put(allActions.errorActions.serverError(e.response.data));
        }
    }
}
function* fetchPostByIdFlowSaga({payload}) {
    const { history, idUser, page, page_size } = payload;
    const { result } = yield race({
        result: call(allAuthSaga.authorize),
        signout: take(SIGN_OUT)
    })
    if(result)
    {
        const data = yield call(fetchPostById, idUser, page, page_size);
        if(data)
        {
            yield put(allActions.postActions.fetchPostByIdSuccess(data.postsById));
        }
    }
    else if(!result)
    {
        yield call(allAuthSaga.signout, {payload: {history}});
    }
    return true;
}

const allPostSaga = {
    createPostFlowSaga,
    fetchPostFlowSaga,
    fetchPostByIdFlowSaga
};

export default allPostSaga;
