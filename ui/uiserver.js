require('dotenv').config()


const port = process.env.UI_SERVER_PORT || 8000

const   express = require('express')

const app = express()

app.use( express.static( 'public' ))


app.listen( port , function(){
    console.log( `🚀UI SERVER LISTENING: ${port}` )
})