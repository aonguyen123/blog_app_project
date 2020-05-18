import authService from './auth.service';
import geocodeService from './geocode.service';
import userService from './user.service';
import postService from './post.service';
import firebaseService from './firebase.service';
import chatsService from './chats.service';
import commentService from './comment.service';

const allService = {
    authService,
    geocodeService,
    userService,
    postService,
    firebaseService,
    chatsService,
    commentService
};

export default allService;