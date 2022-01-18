import * as ActionTypes from './ActionTypes';

export const USERS = (state = { errMess: null, users: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_USERS:
            return {...state, errMess: null, users: action.payload};

        case ActionTypes.USERS_FAILED:
            return {...state, errMess: action.payload};

        case ActionTypes.ADD_USERS:
            const post = action.payload;
            return {...state, users: state.users.concat(users)};

        default:
            return users;
    }
}