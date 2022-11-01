require('dotenv').config()


// port number 
const port = process.env.UI_SERVER_PORT || 8000

// express object
// Creating an express Object
const   express = require('express')

// express application
const app = express()

// Creating middileware for serving up static files
app.use( express.static( 'public' ))


const UI_API_ENDPOINT = process.env.UI_API_ENDPOINT || "http://localhost:3000/graphql" ; 
const env = { UI_API_ENDPOINT }

app.get('/env.js' , ( req, res ) => {
    res.send(`window.ENV = ${JSON.stringify(env)})`)
})



// Starting up the server
// Listening in on specified port
app.listen( port , function(){
    // Log Event
    console.log( `🚀UI SERVER LISTENING: ${ port }` )
})