import authService from './auth.service';
import geocodeService from './geocode.service';
import userService from './user.service';
import postService from './post.service';
import firebaseService from './firebase.service';
import chatsService from './chats.service';

const allService = {
    authService,
    geocodeService,
    userService,
    postService,
    firebaseService,
    chatsService
};

export default allService;