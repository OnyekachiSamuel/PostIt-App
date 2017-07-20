import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import configureStore from './store/configureStore';
import App from './components/App.jsx';
import style from './styles/main.scss';
import js from './js/main';

const store = configureStore();
ReactDOM.render(
<Provider store={store}>
      <App/>
</Provider>, document.getElementById('app'));
