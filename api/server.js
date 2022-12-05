/* eslint-disable padded-blocks */
/* eslint-disable no-console */

require('dotenv').config();
const express = require('express');
const { connectToDB } = require('./db');
const { installHandler } = require('./api_handler')

// Atlas URL - replace UUU with user, PPP with password, XXX with hostname
// const url = 'mongodb+srv://UUU:PPP@cluster0-XXX.mongodb.net/issuetracker?retryWrites=true';
// mLab URL - replace UUU with user, PPP with password, XXX with hostname
// const url = 'mongodb://UUU:PPP@XXX.mlab.com:33533/issuetracker';


