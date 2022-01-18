import {applyMiddleware, createStore} from 'redux';
import {createWrapper, HYDRATE} from 'next-redux-wrapper';
import {nextReduxCookieMiddleware, wrapMakeStore} from "next-redux-cookie-wrapper";
import { reducer } from './reducer';


// create a makeStore function
const makeStore = wrapMakeStore(() =>
	createStore(
		reducer,
		applyMiddleware(
			nextReduxCookieMiddleware({
				subtrees: ["my.subtree"],
			})
		)
	)
)

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, {debug: true});