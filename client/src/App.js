import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'


import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';
import Header from './components/header/header.component';

import { GlobalStyle } from './global.styles';

import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';



const App = ({ checkUserSession, currentUser }) => {

  // unsubscribeFromAuth = null


  // Below checks the status of a signed in user via Google when component mounts. When they log in, updates state of currentUser.
  // componentDidMount() {
  //   const { checkUserSession } = this.props;
  //   checkUserSession();
  // };


  // Brought in useEffect, passing in checkUserSession as a dependency as its passed in as props with mapStateToProps and will prevent it from firing off again (re-rendering) once a user logs in. 
  useEffect(() => {
    checkUserSession()
  }, [checkUserSession]);



  // This prevents a memory leak by making sure when this component is ummounted the user is logged off. 
  // componentWillUnmount() {
  //   this.unsubscribeFromAuth();
  // };


    return (
      <div>
      <GlobalStyle />
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route 
            exact 
            path='/signin' 
            render={() => 
              currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            } 
          />
        </Switch>
      </div>
    );
}

// const mapStatetoProps = ({ user }) => ({
//   currentUser: user.currentUser
// })

const mapStatetoProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({ 
  checkUserSession: () =>dispatch(checkUserSession())
});


export default connect(mapStatetoProps, mapDispatchToProps)(App);
