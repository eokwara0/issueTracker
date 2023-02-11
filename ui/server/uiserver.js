/* eslint-disable global-require */
import dotenv from 'dotenv';
import path from 'path';
import express from 'express';
// import proxy from 'http-proxy-middleware';
// eslint-disable-next-line import/no-extraneous-dependencies
import SourceMapSupport from 'source-map-support';
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import render from './render.jsx';


// express application
const app = express();


SourceMapSupport.install();
dotenv.config();


// port number
const port = process.env.UI_SERVER_PORT || 8000;


// Enabling hot module replacement
const enableHMR = (process.env.ENABLE_HMR || 'true') === 'true';
if (enableHMR && (process.env.NODE_ENV !== 'production')) {
  console.log('Adding dev middleware, enabling HMR');

  const webpack = require('webpack');
  const devMiddleware = require('webpack-dev-middleware');
  const hotMiddleware = require('webpack-hot-middleware');

  const config = require('../webpack.config.js')[0];
  config.entry.app.push('webpack-hot-middleware/client');
  config.plugins = config.plugins || [];
  config.plugins.push(new webpack.HotModuleReplacementPlugin());

  const compiler = webpack(config);
  app.use(devMiddleware(compiler));
  app.use(hotMiddleware(compiler));
}

// importing http-proxy-middleware object
// const proxy = require('http-proxy-middleware');


// Getting proxy target from environment
// In this case http://localhost:3000
// This will allow for use to make calls to our api endpoint securely
// const apiProxyTarget = process.env.API_PROXY_TARGET ;

// // if apiProxyTarget exists
// // create a middleware that will link  our
// //frontend request to our API endpoint
// if(apiProxyTarget){
//     console.log( apiProxyTarget )
//     app.use('/graphql' , proxy({ target : apiProxyTarget }))
// }


// Creating middileware for serving up static files
app.use(express.static('public'));

// UI_API_Endpoint
// Our react app will use this to make request to the graphql server
const UI_API_ENDPOINT = process.env.UI_API_ENDPOINT || 'http://localhost:3000/graphql';
const env = { UI_API_ENDPOINT };

app.get('/env.js', (req, res) => {
  res.send(`window.ENV = ${JSON.stringify(env)})`);
});

/** 🚀About component endpoint
 * The reason for this is that we want to render the component on the server rather than on the client side.
 * When ever a page is reloaded or refreshed.
 * 
 */
app.get('/about', render);

app.get('*', (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
});

// Starting up the server
// Listening in on specified port
app.listen(port, () => {
  // Log Event
  console.log(`🚀UI SERVER LISTENING: ${port}`);
});
