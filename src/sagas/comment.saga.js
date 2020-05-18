import { call, put } from 'redux-saga/effects';
import allActions from '../actions';
import allService from '../services';
import allConfigs from '../config';
import allAuthSaga from './auth.saga';
import { SUCCESS, UNAUTHORIZED } from "../constants/status_code";

function* addComment(idPost, idUser, content) {
    try {
        const response = yield call(allService.commentService.addComment, idPost, idUser, content);
        if(response && response.status === SUCCESS) {
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
                const data = yield call(addComment, idPost, idUser, content);
                return data;
            }
            return false;
        } else {
            yield put(allActions.commentActions.addCommentError(data.message));
        }
    }
}
function* addCommentFlowSaga({payload: {idPost, idUser, content}}) {
    yield put(allActions.uiActions.showLoadingButton());
    const data = yield call(addComment, idPost, idUser, content);
    if(data) {
        yield put(allActions.commentActions.addCommentSuccess(data.comment));
    }
    yield put(allActions.uiActions.hideLoadingButton());
}
function* fetchCommentByIdPost(idPost) {
    try {
        const response = yield call(allService.commentService.fetchCommentByIdPost, idPost);
        if(response && response.status === SUCCESS) {
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
                const data = yield call(fetchCommentByIdPost, idPost);
                return data;
            }
            return false;
        } else {
            yield put(allActions.commentActions.fetchCommentByIdPostError(data.message));
        }
    }
}
function* fetchCommentByIdPostFlowSaga({payload: {idPost}}) {    
    yield put(allActions.uiActions.showLoadingFetchData());
    const data = yield call(fetchCommentByIdPost, idPost);
    if(data) {
        yield put(allActions.commentActions.fetchCommentByIdPostSuccess(data));
    }
    yield put(allActions.uiActions.hideLoadingFetchData());
}

const allCommentSaga = {
    addCommentFlowSaga,
    fetchCommentByIdPostFlowSaga
}
export default allCommentSaga;