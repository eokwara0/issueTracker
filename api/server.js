const express = require('express');
const fs = require("fs");
const {ApolloServer , UserInputError} = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { MongoClient }  = require('mongodb');
const { log  , table } = require('console');
require( 'dotenv').config()


/**
 * mongodb url localhost >> 
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
const port = process.env.API_SERVER_PORT || 3000 

let db ;


/**
 * @Defining GrapQL Schema for our GraphQLScalar Type ( GraphQLDate )
 */
const GraphQLDate = new GraphQLScalarType({
    name : 'GraphQLDate',           // Scalar definition
    description: 'A Data() type in GraphQL as a scalar', // Scalar description

    /**
     * 
     * @param {Incoming issue value } value 
     * @returns  Date object if the values is a valid data string else returns undefined 
     */
    parseValue(value){
        const dateValue = new Date(value);
        return isNaN(dateValue) ? undefined : dateValue;
    },

    /**
     * 
     * @param {Incoming Data value} ast 
     * @returns  Date object else undefined 
     */
    parseLiteral(ast){
        if(ast.kind == Kind.STRING){
            const value = new Date(ast.value);
            return isNaN(value) ? undefined : value;
        }
    },
    serialize(value){
        return value.toISOString();
    }
});



/**
 * 
 * @param {issue to be validated } issue 
 * Validates issue request coming from the client .
 */
function validateIssue(issue){
    const errors = [];
    if (issue.title.length < 3){
        errors.push('Field "title" must be at least 3 characters long.');
    }
    if (issue.status == 'Assinged' && !issue.owner){
        errors.push('Field "owner" is required when status is "Assinged"');
    }
    if (errors.length > 0){ 
        throw new UserInputError('Invalid input(s)',{errors:errors}); 
    }
}

// ---------------------

let aboutMessage = "Issue Tracker API v1.0";

const resolvers = {
    Query:{
        about: () => aboutMessage,
        issueList,
    },Mutation:{
        setAboutMessage,
        issueAdd,
    },
    GraphQLDate,
};


function setAboutMessage(_,{ message }) {
    return aboutMessage= message ;
}


async function issueList(){
    const issues = await db.collection('issues').find({}).toArray();
    issuesDB = issues 
    return issues;
}

async function connectToDB(){
    const client = new MongoClient(url, {useNewUrlParser : true , useUnifiedTopology: true});
    await client.connect();
    console.log('Connected to MongoDB at ',url);
    db = client.db('issuetracker');
}

async function issueAdd(_,{ issue }){
    validateIssue(issue);
    issue.created = new Date();
    issue.id = await getNextSequence( 'issues')
    const result = await db.collection('issues').insertOne( issue) ;
    const savedIssue = await db.collection('issues').findOne({ _id : result.insertedId }) 
    return savedIssue 

}

/**
 * @type { express Object } creating an express app
 */
const app = express();

// creating middleware for serving static files
// app.use(express.static('public')) ;


/**
 * Creating ApolloServer for Local API Server
 * @Initializing our express server 
 */
const server = new ApolloServer({ 
    typeDefs:fs.readFileSync("./Issue.graphql",'utf-8'),
    resolvers,
    formatError : error => {
        console.error(error);
        return error ;
    }
},(async function (){
    try{
        await connectToDB();                // connecting to mongoDB localDataBase system
        app.listen(port,() => {log(`API Server started on port ${port}`);}) // Starting our express server
    }catch(err){
        log('ERROR:',err);
    }
})());


/**
 * applying the GraphQL middleware configuration
 */
server.applyMiddleware({app,path:'/graphql'});


async function getNextSequence( name ){

    const data = await db.collection('issues').count()
    const incr = data + 1
    const result = await db.collection( 'counters' ).findOneAndUpdate(
        { _id : name },{$set : { current : incr } },
        { returnOriginal : false }
    );
    return result.value.current
}