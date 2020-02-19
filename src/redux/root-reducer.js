// Root reducer represents the overall reducer, based on all the reducers that it pulls in. 

import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';

export default combineReducers({
    user: userReducer,
    cart: cartReducer
});