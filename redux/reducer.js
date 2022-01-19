//import the data
import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import { USERS } from '../shared/users';

export const initialState = {
    users: USERS,
};

export const reducer = (state = initialState, action) => {
    const nextState = {
        ...state, // use previous state
        ...action.payload, // apply delta from hydration
    };
    switch (action.type) {
        case HYDRATE:
            if (state.count) nextState.count = state.count; // preserve count value on client side navigation
            return { ...state, ...action.payload, nextState };
        case 'TICK':
            return { ...state, tick: action.payload, nextState };
        case 'ADD_USER':
            return { ...state, addUser: action.payload, nextState}
        default:
            return combineReducers(state, action);
    }
    
};