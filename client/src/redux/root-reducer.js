// Root reducer represents the overall reducer, based on all the reducers that it pulls in. 

import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
// The below import lets you use local storage on the browser. 
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

const persistConfig = {
    key: 'root',
    storage, 
    // whitelist is a property that is an array that contains the string names of any of the reducers you want to persist through the app. In this current app the user is being handled by Firebase authentication so I do not need to persist it. 
    whitelist: ['cart']
}


// I now create a variable based on the previous export so I can wrap the rootReducer into the persistReducer with its configuration. 
const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer
});

export default persistReducer(persistConfig, rootReducer);

