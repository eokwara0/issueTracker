

import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import 'whatwg-fetch';
import IssueList from './IssueList.jsx';


const element = <IssueList/>;
const root = ReactDOM.createRoot( document.getElementById('content') )
root.render( element )
if(module.hot){
    module.hot.accept();
}