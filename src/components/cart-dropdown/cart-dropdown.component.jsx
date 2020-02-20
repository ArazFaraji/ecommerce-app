import React from 'react';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors'

import './cart-dropdown.styles.scss';

const CartDropdown = ({ cartItems }) => (
    <div className="cart-dropdown">
        <div className="cart-items">
            {
                cartItems.map(cartItem => (
                    <CartItem key={cartItem.id} item={cartItem} />
                ))
            }
        </div>
        <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
);



// Now that we have included Reselect we can change the following to use our Cart Selectors. 

// const mapStateToProps = ({ cart: { cartItems } }) => ({
//     cartItems
// })

const mapStateToProps = state => ({
    cartItems: selectCartItems(state)
});

export default connect(mapStateToProps)(CartDropdown);