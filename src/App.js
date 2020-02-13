import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';



class App extends React.Component {
  // constructor() {             we have removed this constructor now that we have implemented redux to handle state management of user. 
  //   super();

  //   this.state = { 
  //     currentUser: null
  //   }
  // };

  unsubscribeFromAuth = null


  // Below checks the status of a signed in user via Google when component mounts. When they log in, updates state of currentUser.
  componentDidMount() {
    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // if a user signs in (userAuth is not null), we get back the userRef from createuserprofiledocument method from userauth object being passed in. If there was a document there we get back the userRef. If there is no document there we create a new object/document (in firebase.utils.js) and get back userRef. 
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        // We are going to subscribe/listen to the userRef and get back the first state of this data. Then we set state of our local app with the snapShot ID and data.
        userRef.onSnapshot(snapShot => {
          // this.setState({
          //   currentUser: 
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            });
          // }, () => {
          //   // We need to pass a second function as a parameter in setState as the second parameter where we do the console log, and then setState will call our function(console.log) after state as been propagated.
          //   console.log(this.state);
        });
        // console.log(this.state) console logging here can't go after state because state is asynchronous. 
      }
      // if user logs out, we set currentUser to null which is what we get back from the userAuth library if no logged in user. 
      setCurrentUser(userAuth);
    })
  };

  // This prevents a memory leak by making sure when this component is ummounted the user is logged off. 
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  };


  render() {
    return (
      <div>
        {/* <Header currentUser={this.state.currentUser} /> */}
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route 
            exact 
            path='/signin' 
            render={() => 
              this.props.currentUser ? (
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
}

const mapStatetoProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStatetoProps, mapDispatchToProps)(App);
