import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './components/App.jsx';
import setAuthorizationToken from './utils/setAuthorizationToken';
import style from './styles/main.scss';

const store = configureStore();

setAuthorizationToken(localStorage.getItem('token'));
ReactDOM.render(
<Provider store={store}>
<App />
</Provider>,
 document.getElementById('app'));
