import React from 'react';
import ReactDom from 'react-dom';
require("babel-core/register");
require("babel-polyfill");
import App from './components/app.jsx';

ReactDom.render(< App />, document.getElementById('root'));
