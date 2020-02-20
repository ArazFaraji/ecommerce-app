import { createStore, applyMiddleware } from 'redux';
// We are adding middleware to our store so that when actions get fired we can catch them and display them. The middlewares is between the action firing and the root reducer. Basically a function that recieve actions in and 'do something' and pass them out to root reducer. This redux-logger middleware catches the action, console logs it for us, and moves it along. 
import logger from 'redux-logger';

import rootReducer from './root-reducer';

// The middlewares that the store is expecting from redux is an array. 
const middlewares = [logger];

// making the store below. applyMiddleware is a return value and we are spreading in our middlewares inside of applyMiddleware. This spreads in all the values in the middlewares array above into the function call as individual arguements. This way if we need to add more things to the middleware we can just add it to the array value uptop. This is a scalable way to set up the store for future potential needs. 
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;