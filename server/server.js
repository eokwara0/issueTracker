const express = require('express');
const fs = require("fs");
const {ApolloServer , UserInputError} = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { MongoClient }  = require('mongodb');

/**
 * mongodb url localhost >> 
 */
const url = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.4';
 
// Atlas URL - replace UUU with user, PPP with password, XXX with hostname
// const url = 'mongodb+srv://UUU:PPP@cluster0-XXX.mongodb.net/issuetracker?retryWrites=true';
// mLab URL - replace UUU with user, PPP with password, XXX with hostname
// const url = 'mongodb://UUU:PPP@XXX.mlab.com:33533/issuetracker';

let db ;

const GraphQLDate = new GraphQLScalarType({
    name : 'GraphQLDate',
    description: 'A Data() type in GraphQL as a scalar',
    parseValue(value){
        // return new Date(value);
        const dateValue = new Date(value);
        return isNaN(dateValue) ? undefined : dateValue;
    },
    parseLiteral(ast){
        // return (ast.kind == Kind.STRING) ? new Date(ast.value) : undefined;
        if(ast.kind == Kind.STRING){
            const value = new Date(ast.value);
            return isNaN(value) ? undefined : value;
        }
    },
    serialize(value){
        return value.toISOString();
    }
});


const issuesDB = [
 {
 id: 1, status: 'New', owner: 'Ravan', effort: 5,
 created: new Date('2019-01-15'), due: undefined,
 title: 'Error in console when clicking Add',
 },
 {
 id: 2, status: 'Assigned', owner: 'Eddie', effort: 14,
 created: new Date('2019-01-16'), due: new Date('2019-02-01'),
 title: 'Missing bottom border on panel',
 },
];


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
// JSON.stringify()

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
    // console.log(issues)
    return issues;
}

let connectToDB  = async () => {
    const client = new MongoClient(url, {useNewUrlParser : true , useUnifiedTopology: true});
    await client.connect();
    console.log('Connected to MongoDB at ',url);
    db = client.db('issuetracker');
}

function issueAdd(_,{ issue }){
    validateIssue(issue);
    issue.created = new Date();
    issue.id = issuesDB.length + 1;
    issuesDB.push(issue);
    return issue ;

}

const app = express();
app.use(express.static('public')) ;

const server = new ApolloServer({ 
    typeDefs:fs.readFileSync(__dirname+"\\Issue.graphql",'utf-8'),
    resolvers,
    formatError : error => {
        console.log(error);
        return error ;
    }
},(async function (){
    try{
        await connectToDB();
        app.listen(3000,() => {console.log('App started on port 3000');})
    }catch(err){
        console.log('ERROR:',err);
    }
})());

server.applyMiddleware({app,path:'/graph'});


// -----------------------------


// app.listen(3000, () => {
//     console.log("App started on port 3000");
// });

