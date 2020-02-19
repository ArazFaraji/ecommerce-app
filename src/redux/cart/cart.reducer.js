import { CartActionTypes } from './cart.types'



const INITIAL_STATE = {
    hidden: true
};

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                // "bang" !state.hidden just switches the current BOOL value. If currently false, then sets to true. Vice Versa. 
                hidden: !state.hidden
            }
        default:
            return state;
    }
};

export default cartReducer;