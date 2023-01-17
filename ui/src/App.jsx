

import React from 'react';
import * as ReactDOM from 'react-dom/client'
import 'babel-polyfill';
import 'whatwg-fetch';
import { BrowserRouter as Router  } from 'react-router-dom';
import Page from './Page.jsx';

const element = (
    <Router>
        <Page/>
    </Router>
)

const root = ReactDOM.createRoot( document.getElementById('content') )
root.render( element )
if(module.hot){
    module.hot.accept();
}