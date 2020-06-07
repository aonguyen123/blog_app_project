import allCommons from 'common';

const fetchEvents = idUser => {
    return allCommons.callAPICommon.callAPI(
        `/events/fetchEvents?idUser=${idUser}`,
        'GET',
        null
    );
};
const removeEvent = idEvent => {
    return allCommons.callAPICommon.callAPI('/events/removeEvent', 'POST', {
        idEvent
    });
};
const removeAllEvents = (eventType, idCur) => {
    return allCommons.callAPICommon.callAPI('/events/removeAllEvents', 'POST', {
        eventType, idCur
    });
};
const fetchHistorys = (page, page_size, idUser) => {
    return allCommons.callAPICommon.callAPI(
        `/events/fetchHistorys?idUser=${idUser}&page=${page}&page_size=${page_size}`,
        'GET',
        null
    );
};

export default {
    fetchEvents,
    removeEvent,
    removeAllEvents,
    fetchHistorys
};
