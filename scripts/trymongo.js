const { MongoClient } = require('mongodb');


const url = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.4';

// const url = 'mongodb://localhost/';
// Atlas Url -- replace UUU with user, PPP with password , XXX with hostname
// const url = 'mongodb_srv://eokwara:04041975Ee-@cluster0-XXX.mongodb.net/issuetracker?retryWrites=true';

// mLab URL - replace UUU with user, PPP with password, XXX with hostname
// const url = 'mongodb://UUU:PPP@XXX.mlab.com:33533/issuetracker';



function testWithCallbacks(callback){
    console.log('\n---- testWithCallbacks ----');

    const client = new MongoClient(url,{useNewUrlParser:true , useUnifiedTopology: true })
    client.connect((err, res) => {
        if (err){
            callback(err);
            return ;
        }
        console.log('connected to MongoDB');
        const db = client.db('issuetracker')
        const collection = db.collection('employees');

        const employee = { id : 1 , name : 'A. Callback ', age : 23 };
        collection.insertOne(employee, (err, result) => {
            if (err) {
                client.close();
                callback(err);
                return ;
            }
            console.log('Result of insert:\n',result.insertedId);
            collection.find({_id: result.insertedId}).toArray((err , docs) => {
                if(err){
                    client.close();
                    callback(err);
                    return;
                }
                console.log('Result of find:\n',docs);
                client.close();
                callback(err);
            })
        })
    })
}

async function testAsync(){
    console.log('\n---- testWithCallbacks ----');

    const client = new MongoClient(url,{useNewUrlParser:true , useUnifiedTopology: true })
    try{
        await client.connect();
        console.log('connected to MongoDB')
        const db = client.db('issuetracker')
        const collection = db.collection('employees');
        const employee = { id : 2 , name : "b. Async", age : 16 }
        const result = await collection.insertOne(employee);
        console.log('Result of insert: \n', result.insertedId)
        const data = await collection.find({_id: result.insertedId}).toArray();
        console.log('Result of find: \n', data)
    }catch (err){
        console.log('error connecting to MongoDB') ;
    }finally{
        client.close();
    }
}

// // Calling testing with callbacks
testWithCallbacks(function(err){
    if(err){
        console.log(err);
    }
    testAsync()
})



// // Calling testing with callbacks


// const { MongoClient , ServerApiVersion} = require('mongodb');
// const uri = "mongodb+srv://eokwara:04041975Ee-@appenvironment.mqehcaq.mongodb.net/?retryWrites=true&w=majority";

// const client = new MongoClient(uri,{useNewUrlParser:true, useUnifiedTopology:true,serverApi:ServerApiVersion.v1});
// client.connect(async (err, res) => {
//     if (err){
//         console.log(err);
//     }else{
//         const collection = client.db('issuetracker').collection('issues');
//         const finding = collection.find({_id: {$gt:0}},{})
//         await finding.forEach((e) => console.log(e))
//         client.close();
//     }
    
// })

