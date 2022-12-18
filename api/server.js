/* eslint-disable padded-blocks */
/* eslint-disable no-console */

require('dotenv').config();
const express = require('express');
const { connectToDB } = require('./model/db');
const { installHandler } = require('./model/api_handler');

// Atlas URL - replace UUU with user, PPP with password, XXX with hostname
// const url = 'mongodb+srv://UUU:PPP@cluster0-XXX.mongodb.net/issuetracker?retryWrites=true';
// mLab URL - replace UUU with user, PPP with password, XXX with hostname
// const url = 'mongodb://UUU:PPP@XXX.mlab.com:33533/issuetracker';


/** express app  */
const app = express();

/** applying the graphql middleware */
installHandler(app);

/** Port number */
const port = process.env.API_SERVER_PORT || 3000;

/** Starting the server as well as initializing database */
(async function start() {
  try {
    await connectToDB();
    app.listen(port, () => {
      console.log(`API server started on port ${port}`);
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
}());
