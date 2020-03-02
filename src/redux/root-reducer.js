// Root reducer represents the overall reducer, based on all the reducers that it pulls in. 

import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
// The below import lets us use local storage on the browser. 
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

const persistConfig = {
    key: 'root',
    storage, 
    // whitelist is a property that is an array that contains the string names of any of the reducers we want to persist through our app. In our current app our user is being handled by Firebase authentication so we do not need to persist it. 
    whitelist: ['cart']
}


// We now have to create a variable based on our previous export (commented out below) so we can wrap the rootReducer into the persistReducer with its configuration. 
const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer
});

export default persistReducer(persistConfig, rootReducer);





// export default combineReducers({
//     user: userReducer,
//     cart: cartReducer
// });