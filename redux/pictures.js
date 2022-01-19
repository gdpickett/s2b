import * as ActionTypes from './ActionTypes';

export const PICTURES = (state = { errMess: null, pictures: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PICTURES:
            return {...state, errMess: null, pictures: action.payload};

        case ActionTypes.ADD_PICTURES_FAILED:
            return {...state, errMess: action.payload};

        case ActionTypes.ADD_PICTURE:
            const post = action.payload;
            return {...state, pictures: state.pictures.concat(post)};

        default:
            return state;
    }
}