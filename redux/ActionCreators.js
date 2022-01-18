import * as ActionTypes from './ActionTypes';

export const addPost = post => ({
    type: ActionTypes.ADD_POST,
    payload: post
});

export const addPosts = posts => ({
    type: ActionTypes.ADD_POSTS,
    payload: posts
});

export const postsFailed = errMess => ({
    type: ActionTypes.POSTS_FAILED,
    payload: errMess
});

export const addUser = user => ({
    type: ActionTypes.ADD_USER,
    payload: user
});

export const addUsers = users => ({
    type: ActionTypes.ADD_USERS,
    payload: users
});

export const usersFailed = errMess => ({
    type: ActionTypes.USERS_FAILED,
    payload: errMess
});

export const adding = adding => ({
    type: ActionTypes.ADDING,
    payload: adding
})

export const loading = loading => ({
    type: ActionTypes.LOADING,
    payload: loading
})