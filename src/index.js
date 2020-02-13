import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import store from './redux/store';

ReactDOM.render(
    // provider is a component that is the parent of EVERYTHING in the application. As the parent (once its passed the store object) it allows us to get access from the rest of the application to everything in the STORE of redux. We can dispatch actions to the store or pull values from the store into our other components.
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
