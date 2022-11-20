require('dotenv').config();


// port number 
const port = process.env.UI_SERVER_PORT || 8000;

// express object
// Creating an express Object
const   express = require('express');


// express application
const app = express();


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
app.use(express.static( 'public' ))

// UI_API_Endpoint
// Our react app will use this to make request to the graphql server
const UI_API_ENDPOINT = process.env.UI_API_ENDPOINT || "http://localhost:3000/graphql"; 
const env = { UI_API_ENDPOINT }

app.get('/env.js' , ( req, res ) => {
    res.send(`window.ENV = ${JSON.stringify(env)})`);
})



// Starting up the server
// Listening in on specified port
app.listen( port , () => {
    // Log Event
    console.log( `🚀UI SERVER LISTENING: ${ port }` )
})