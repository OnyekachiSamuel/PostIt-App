import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';
import configureStore from './store/configureStore';
import App from './components/App.jsx';
import { signIn } from '../client/actions/signInAction';
import setAuthorizationToken from './utils/setAuthorizationToken';
import style from './styles/main.scss';

const store = configureStore();

if (localStorage.token) {
  setAuthorizationToken(localStorage.getItem('token'));
  store.dispatch(signIn(jwt.decode(localStorage.token)));
}
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);

