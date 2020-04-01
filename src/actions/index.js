import authenticatedActions from './authenticated.action';
import geocodeActions from './geocode.action';
import errorActions from './error.action';
import uiActions from './ui.action';
import userActions from './user.action';
import postActions from './post.action';

const allActions = {
    authenticatedActions,
    geocodeActions,
    errorActions,
    uiActions,
    userActions,
    postActions
}
export default allActions;