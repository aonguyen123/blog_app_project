import authenticatedActions from './authenticated.action';
import geocodeActions from './geocode.action';
import uiActions from './ui.action';
import userActions from './user.action';
import postActions from './post.action';
import chatsActions from './chats.action';
import commentActions from './comment.action';
import errorActions from './error.action';

const allActions = {
    authenticatedActions,
    geocodeActions,
    uiActions,
    userActions,
    postActions,
    chatsActions,
    commentActions,
    errorActions
}
export default allActions;