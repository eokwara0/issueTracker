

const fs = require('fs');
require('dotenv').config();
const { ApolloServer} = require('apollo-server-express');
const GraphQLDate = require('./graphql_date.js');
const about = require('./about.js');
const issue = require('./issue.js');


/** GraphQL Resolver */
const resolvers = {
  Query: {
    about: about.getAboutMessage,
    issueList: issue.list,
  },
  Mutation: {
    setAboutMessage: about.setAboutMessage,
    issueAdd : issue.add ,
  },
  GraphQLDate,
};


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
});


function installHandler(app) {
 const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
 console.log('CORS setting:', enableCors);
 server.applyMiddleware({ app, path: '/graphql', cors: enableCors });
}
module.exports = { installHandler }