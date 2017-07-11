import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import App from './components/App.jsx';
import style from './styles/main.css';
import js from './js/main';

ReactDOM.render(
<Router><App/></Router>, document.getElementById('app'));
