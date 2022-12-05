/* eslint-disable padded-blocks */
/* eslint-disable no-console */


const express = require('express');
const fs = require('fs');
const { ApolloServer, UserInputError } = require('apollo-server-express');
const { MongoClient } = require('mongodb');
const { log } = require('console');

const about = require('./about');
const GraphQLDate = require('./graphql_date');
require('dotenv').config();


/**
 * mongodb url localhost
 */
const url = process.env.DB_URL || 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.4';

// Atlas URL - replace UUU with user, PPP with password, XXX with hostname
// const url = 'mongodb+srv://UUU:PPP@cluster0-XXX.mongodb.net/issuetracker?retryWrites=true';
// mLab URL - replace UUU with user, PPP with password, XXX with hostname
// const url = 'mongodb://UUU:PPP@XXX.mlab.com:33533/issuetracker';


/**
 * api port number
 * @type {number}
 */
const port = process.env.API_SERVER_PORT || 3000;

let db;


// -----------------------< GraphQL Configuration >-------------------------------//


/**
 *
 * @param {issue to be validated } issue
 * Validates issue request coming from the client .
 */

function validateIssue(issue) {
  // error list
  const errors = [];

  // validates the length of the issue title
  if (issue.title.length < 3) {
    errors.push('Field "title" must be at least 3 characters long.');
  }

  /** validates if the issue has been assigned and if it has an owner */
  if (issue.status === 'Assinged' && !issue.owner) {
    errors.push('Field "owner" is required when status is "Assinged"');
  }

  /** checks if there are any errors
   * if True throw a userInputError containing the errors list
   */
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}


/** IssueList resolver */
/** query's the database and returns a list of issues  */
async function issueList() {
  const issues = await db.collection('issues').find({}).toArray();
  // issuesDB = issues;
  return issues;
}

/** returns the number of dequences in the database and adds 1 */
async function getNextSequence(name) {
  const data = await db.collection('issues').count();
  const incr = data + 1;
  const result = await db.collection('counters').findOneAndUpdate(
    { _id: name }, { $set: { current: incr } },
    { returnOriginal: false },
  );
  return result.value.current;
}


/** resolver for issueAdd mutation */
async function issueAdd(_, { issue }) {

  /** Validate issue */
  validateIssue(issue);

  /** Creates a copy of the original issue */
  /** modifies the issue  */
  const newIssue = Object.assign({}, issue);
  newIssue.created = new Date();
  newIssue.id = await getNextSequence('issues');

  /** inserts the issue inside of the database if valid issue */
  const result = await db.collection('issues').insertOne(newIssue);
  const savedIssue = await db.collection('issues').findOne({ _id: result.insertedId });
  return savedIssue;

}


/** GraphQL Resolver */
const resolvers = {
  Query: {
    about: about.getAboutMessage,
    issueList,
  },
  Mutation: {
    setAboutMessage: about.setAboutMessage,
    issueAdd,
  },
  GraphQLDate,
};


/** Connects to the database and intializes the DB ( database ) variable */
async function connectToDB() {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  console.log('Connected to MongoDB at ', url);
  db = client.db('issuetracker');
}


/**
 * @type { express Object } creating an express app
 */
const app = express();


/**
 * Reading enable core variable from environment
 * By default cors is set to true but it allows for all hosts to connect
 * So we want to disable CORS and set it to false
 * And in doing so the server will not be able to access the api without permission
 */

const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
console.log('CORS setting:', enableCors);


/**
 * Connects to the Database and starts the server.
 */
async function start() {
  try {
    await connectToDB(); // connecting to mongoDB database
    app.listen(port, () => { log(`API SERVER started on port ${port}`); }); // start server
  } catch (errormessage) {
    log('ERROR: ', errormessage);
  }
}

/**
 * Creating ApolloServer for Local API Server
 * @Initializing our express server
 */
const server = new ApolloServer({
  typeDefs: fs.readFileSync('./Issue.graphql', 'utf-8'),
  resolvers,
  formatError: (error) => {
    console.error(error);
    return error;
  },
}, start());


/**
 * applying the GraphQL middleware configuration
 * server cors implementation
 */
server.applyMiddleware({ app, path: '/graphql', cors: true });
