import React from 'react';
import { connect } from 'react-redux';

import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss'

const CartIcon = ({ toggleCartHidden, itemCount }) => (
    <div className="cart-icon" onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon' />
        <span className='item-count'>{itemCount}</span>
    </div>
);


const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});


// .reduce works as it takes in 2 arguments. The accumulator and the element. As it iterates through an array it adds in what we tell it to from each element. This is adding total quantities together to display the total number of items in the cart. The 0 declares the original value of the accumulator for when it reduces through the first element in the array. 

// Below is called a selector because it lets us select a specific piece of State. 
// We will be adding in cache from Reselect to avoid a component like this from re-rendering the DOM when its state values haven't changed. 

// const mapStateToProps = ({ cart: { cartItems } }) => ({
//     itemCount: cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity, 0)
// });       THIS CAN NOW BE RE-WRITTEN AS BELOW

const mapStateToProps = state => ({
    itemCount: selectCartItemsCount(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);