require('dotenv').config();
const { MongoClient } = require('mongodb');



/**
 * mongodb url localhost
 */
const url = process.env.DB_URL || 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.4';


let db ;

/** Connects to the database and intializes the DB ( database ) variable */
async function connectToDB() {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  console.log('Connected to MongoDB at ', url);
  db = client.db('issuetracker');
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


/**
 * 
 * @returns Database object
 */
function getDB(){
    return db ;
}

module.exports = { connectToDB , getNextSequence , getDB }