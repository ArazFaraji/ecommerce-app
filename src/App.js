import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';



class App extends React.Component {
  constructor() {
    super();

    this.state = { 
      currentUser: null
    }
  };

  unsubscribeFromAuth = null


  // Below checks the status of a signed in user via Google when component mounts. When they log in, updates state of currentUser.
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // if a user signs in (userAuth is not null), we get back the userRef from createuserprofiledocument method from userauth object being passed in. If there was a document there we get back the userRef. If there is no document there we create a new object/document (in firebase.utils.js) and get back userRef. 
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        // We are going to subscribe/listen to the userRef and get back the first state of this data. Then we set state of our local app with the snapShot ID and data.
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          }, () => {
            // We need to pass a second function as a parameter in setState as the second parameter where we do the console log, and then setState will call our function(console.log) after state as been propagated.
            console.log(this.state);
          })
        });
        // console.log(this.state) console logging here can't go after state because state is asynchronous. 
      }
      // if user logs out, we set currentUser to null which is what we get back from the userAuth library if no logged in user. 
      this.setState({ currentUser: userAuth });
    })
  };

  // This prevents a memory leak by making sure when this component is ummounted the user is logged off. 
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  };


  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
