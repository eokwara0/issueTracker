import React from 'react';
import ReactDOMServer from 'react-dom/server';
import About from '../src/About.jsx';
import template from './template.js';


/**
 * renders the About component on the server
 * @param {request} request
 * @param {response} response
 */
function render(req,res ) {

    /**  converting About component into String */
    const body = ReactDOMServer.renderToString(<About/>);

    /** 
     * sends the string 
     * representation whenever a user requests for the page 
     * */
    res.send(template(body));

}

// return render function
export default render;