import {
    FETCH_EVENTS_SUCCESS,
    SEND_EVENT_ADD_FRIEND,
    REMOVE_EVENT_SUCCESS,
    REMOVE_ALL_EVENT_SUCCESS,
    FETCH_HISTORYS_SUCCESS,
    FETCH_HISTORYS_OVER
} from 'constants/types';

const initialState = {
    events: [],
    historys: [],
    hasMoreItems: false,
    nextPage: 1
};

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_EVENTS_SUCCESS:
            return {
                ...state,
                events: action.payload
            };
        case SEND_EVENT_ADD_FRIEND:
            return {
                ...state,
                events: [action.payload, ...state.events]
            };
        case REMOVE_EVENT_SUCCESS:
            const newEvents = removeEvent(state.events, action.payload);
            return {
                ...state,
                events: [...newEvents]
            };
        case REMOVE_ALL_EVENT_SUCCESS:
            const newAllEvents = removeAllEvent(state.events, action.payload);
            return {
                ...state,
                events: [...newAllEvents]
            };
        case FETCH_HISTORYS_SUCCESS:
            return {
                ...state,
                historys: [...state.historys, ...action.payload],
                nextPage: state.nextPage + 1,
                hasMoreItems: true
            };
        case FETCH_HISTORYS_OVER:
            return {
                ...state,
                historys: [...state.historys, ...action.payload],
                hasMoreItems: false
            }
        default:
            return state;
    }
}

function removeEvent(events, idEvent) {
    const index = events.findIndex(event => event._id === idEvent);
    if (index !== -1) {
        events.splice(index, 1);
    }
    return events;
}
function removeAllEvent(events, eventType) {
    const newEvents = events.filter(event => event.type !== eventType);
    return newEvents;
}
