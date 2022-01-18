//import the data
import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import { USERS } from '../shared/users';

export const initialState = {
    users: USERS,
};

//store.dispatch({ type: 'TICK', payload: 'was set in other page' });

// create your reducer
/*
const reducer = (state = {tick: 'init'}, action) => {
    switch (action.type) {
      case HYDRATE:
        return {...state, ...action.payload};
      case 'TICK':
        return {...state, tick: action.payload};
      default:
        return state;
    }
  };*/

export const reducer = (state = initialState, action) => {
    const nextState = {
        ...state, // use previous state
        ...action.payload, // apply delta from hydration
    };
    //console.log("state "+state+" action = "+action)
    switch (action.type) {
        case HYDRATE:
            if (state.count) nextState.count = state.count; // preserve count value on client side navigation
            return { ...state, ...action.payload, nextState };
        case 'TICK':
            return { ...state, tick: action.payload, nextState };
        case 'ADD_USER':
            return { ...state, ...action.payload, nextState}
        default:
            return combineReducers(state, action, nextState);
    }
    
};



// create your reducer
/*
const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        };
        if (state.count) nextState.count = state.count; // preserve count value on client side navigation
        return nextState;
    } else {
        return combinedReducer(state, action);
    }
};
*/