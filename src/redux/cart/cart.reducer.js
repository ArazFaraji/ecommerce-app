import { CartActionTypes } from './cart.types';
import { addItemToCart, removeItemFromCart } from './cart.utils';



const INITIAL_STATE = {
    hidden: true,
    cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                // "bang" !state.hidden just switches the current BOOL value. If currently false, then sets to true. Vice Versa. 
                hidden: !state.hidden
            };
        case CartActionTypes.ADD_ITEM:
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload)
            };
        case CartActionTypes.REMOVE_ITEM:
            return {
                ...state,
                cartItems: removeItemFromCart(state.cartItems, action.payload)
            }
        case CartActionTypes.CLEAR_ITEM_FROM_CART:
            return {
                ...state,
                // Filter is being used to say if the cartItem id does not match the action payload id (the item we are trying to remove) then we want to keep it (return true). But if the cartItem.id does match the action.payload.id then we want to filter it out (return false). Filter returns us back anything that yields true in new array. 
                cartItems: state.cartItems.filter(cartItem => cartItem.id !== action.payload.id)
            }
        default:
            return state;
    }
};

export default cartReducer;