import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';
import configureStore from './store/configureStore';
import App from './components/App.jsx';
import { signIn } from '../client/actions/signInAction';
import setAuthorizationToken from './utils/setAuthorizationToken';
import configureSocketController from './socket/configureSocketController';
import style from './styles/main.scss';

const store = configureStore();
const socket = configureSocketController(store.dispatch);

if (localStorage.token) {
  setAuthorizationToken(localStorage.getItem('token'));
  store.dispatch(signIn(jwt.decode(localStorage.token)));
}
ReactDOM.render(
    <Provider store={store}>
        <App socket={socket}/>
    </Provider>,
    document.getElementById('app')
);

