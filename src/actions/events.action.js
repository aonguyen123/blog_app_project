import { message } from 'antd';
import {
    FETCH_EVENTS,
    FETCH_EVENTS_ERROR,
    FETCH_EVENTS_SUCCESS,
    SEND_EVENT_ADD_FRIEND,
    REMOVE_EVENT,
    REMOVE_EVENT_SUCCESS,
    REMOVE_EVENT_ERROR,
    REMOVE_ALL_EVENT,
    REMOVE_ALL_EVENT_SUCCESS,
    REMOVE_ALL_EVENT_ERROR,
    FETCH_HISTORYS,
    FETCH_HISTORYS_SUCCESS,
    FETCH_HISTORYS_ERROR,
    FETCH_HISTORYS_OVER,
    LOAD_MORE_HISTORYS,
    CLEAN_HISTORYS,
    CLEAN_EVENTS,
    UN_FRIEND
} from 'constants/types';

const fetchEvents = idUser => {
    return {
        type: FETCH_EVENTS,
        payload: { idUser }
    };
};
const fetchEventsSuccess = data => {
    return {
        type: FETCH_EVENTS_SUCCESS,
        payload: data
    };
};
const fetchEventsError = error => {
    message.error(error, 4);
    return {
        type: FETCH_EVENTS_ERROR
    };
};
const cleanEvents = () => {
    return {
        type: CLEAN_EVENTS
    }
}
const sendEventAddFriend = data => {
    return {
        type: SEND_EVENT_ADD_FRIEND,
        payload: data
    };
};
const removeEvent = idEvent => {
    return {
        type: REMOVE_EVENT,
        payload: { idEvent }
    };
};
const removeEventSuccess = data => {
    return {
        type: REMOVE_EVENT_SUCCESS,
        payload: data
    };
};
const removeEventError = error => {
    message.error(error, 4);
    return {
        type: REMOVE_EVENT_ERROR
    };
};
const removeAllEvent = (eventType, idCur) => {
    return {
        type: REMOVE_ALL_EVENT,
        payload: { eventType, idCur }
    };
};
const removeAllEventSuccess = eventType => {
    return {
        type: REMOVE_ALL_EVENT_SUCCESS,
        payload: eventType
    }
}
const removeAllEventError = error => {
    message.error(error, 4);
    return {
        type: REMOVE_ALL_EVENT_ERROR
    }
}
const fetchHistorys = (page, page_size, idUser) => {
    return {
        type: FETCH_HISTORYS,
        payload: {page, page_size, idUser}
    }
}
const fetchHistorysSuccess = data => {
    return {
        type: FETCH_HISTORYS_SUCCESS,
        payload: data
    }
} 
const fetchHistorysOver = data => {
    return {
        type: FETCH_HISTORYS_OVER,
        payload: data
    }
}
const fetchHistorysError = error => {
    message.error(error, 4);
    return {
        type: FETCH_HISTORYS_ERROR
    }
}
const loadMoreHistorys = (page, page_size, idUser) => {
    return {
        type: LOAD_MORE_HISTORYS,
        payload: {page, page_size, idUser}
    }
}
const cleanHistorys = () => {
    return {
        type: CLEAN_HISTORYS
    }
}
const unFriend = idUser => {
    return {
        type: UN_FRIEND,
        payload: idUser
    }
}

export default {
    fetchEvents,
    fetchEventsSuccess,
    fetchEventsError,
    cleanEvents,
    sendEventAddFriend,
    removeEvent,
    removeEventSuccess,
    removeEventError,
    removeAllEvent,
    removeAllEventSuccess,
    removeAllEventError,
    fetchHistorys,
    fetchHistorysSuccess,
    fetchHistorysOver,
    fetchHistorysError,
    loadMoreHistorys,
    cleanHistorys,
    unFriend
};
