import React from 'react';
// import { Link } from 'react-router-dom';
// Connect is a higher order component that lets us modify our component to have access to things related to Redux. 
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart } from '../../redux/user/user.actions';

// import './header.styles.scss';
import { HeaderContainer, LogoContainer, OptionsContainer, OptionDiv, OptionLink } from './header.styles'

const Header = ({ currentUser, hidden, signOutStart }) => (
    <HeaderContainer>
        <LogoContainer to="/">
            <Logo className='logo' />
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to='/shop'>
                SHOP
            </OptionLink>
            <OptionLink to='/shop'>
                CONTACT
            </OptionLink>
            {
                currentUser ? (
                    <OptionDiv onClick={signOutStart}>
                        SIGN OUT
                    </OptionDiv>
                ) : (
                    <OptionLink to='/signin'>SIGN IN</OptionLink>
                )
            }
            <CartIcon />
        </OptionsContainer>
        {
            hidden ? null
            :
            <CartDropdown />
        }
    </HeaderContainer>
)

// // const mapStateToProps = state => ({     in the below line we take this existing line, destructure it with nested values. Such as 'currentUser' is being destructured from 'user' which is being destructured from state. 
// const mapStateToProps = ({user: { currentUser }, cart: { hidden }}) => ({
// //     currentUser: state.user.currentUser     ----now that new destructured values are in this function we can change this line to the following
//     currentUser,
//     hidden
// });


// // This would be another way to write the code to get state from the selector. But we can further simplify by using createStructuredSelector that we imported already. 
// const mapStateToProps = state => ({
//     currentUser: selectCurrentUser(state),
//     hidden: selectCartHidden(state)
// });

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
});


export default connect(mapStateToProps, mapDispatchToProps)(Header);