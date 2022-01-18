import * as ActionTypes from './ActionTypes';

export const POSTS = (state = { errMess: null, posts: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_POSTS:
            return {...state, errMess: null, posts: action.payload};

        case ActionTypes.POSTS_FAILED:
            return {...state, errMess: action.payload};

        case ActionTypes.ADD_POST:
            const post = action.payload;
            return {...state, posts: state.posts.concat(post)};

        default:
            return state;
    }
}