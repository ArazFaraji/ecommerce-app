import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors'
import { toggleCartHidden } from '../../redux/cart/cart.actions.js';

import './cart-dropdown.styles.scss';

const CartDropdown = ({ cartItems, history, dispatch }) => (
    <div className="cart-dropdown">
        <div className="cart-items">
            {
                cartItems.length ? 
                cartItems.map(cartItem => (
                    <CartItem key={cartItem.id} item={cartItem} />
                ))
                :
                <span className="empty-message">Your cart is empty</span>
            }
        </div>
        <CustomButton 
            onClick={() => {
                history.push('/checkout');
                dispatch(toggleCartHidden())
            }}
        >
            GO TO CHECKOUT
        </CustomButton>
    </div>
);



// Now that we have included Reselect we can change the following to use our Cart Selectors. 

// const mapStateToProps = ({ cart: { cartItems } }) => ({
//     cartItems
// })



// const mapStateToProps = state => ({
//     cartItems: selectCartItems(state)
// });


const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});


// WithRouter is a higher order componenet. HoC return components and take components as arguments. withRouter is taking the component that got returned from the connect call as its componenent argument. The order they are wrapped matters. withRouter passes the match history and location objects into the component that is being wrapped. We want what comes out of connect componenent to receive those props. When components are wrapped are like they are evaluated from the inside out. 
// This allows our CartDropdown component to get the PROPS called History (we included it up top now)

// Connect also passes dispatch into our component as a prop if we do not supply a second argument (usually mapDispatchtoProps). 
export default withRouter(connect(mapStateToProps)(CartDropdown));