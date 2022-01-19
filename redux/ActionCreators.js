import { baseUrl } from '../shared/baseUrl';
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

export const fetchUsers = () => dispatch => {
    return fetch(baseUrl + 'users')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(users => dispatch(addUsers(users)))
        .catch(error => dispatch(usersFailed(error.message)));
};

export const usersFailed = errMess => ({
    type: ActionTypes.USERS_FAILED,
    payload: errMess
});

export const addPicture = picture => ({
    type: ActionTypes.ADD_PICTURE,
    payload: user
});

export const addPictures = pictures => ({
    type: ActionTypes.ADD_PICTURES,
    payload: users
});

export const picturesFailed = errMess => ({
    type: ActionTypes.PICTURES_FAILED,
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