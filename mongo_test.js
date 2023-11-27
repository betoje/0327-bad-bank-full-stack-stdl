const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
let db = null;

// connect to mongo
MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
    console.log("Connected successfully to db server");

    // connect to myproject database
    db = client.db('myproject-bb');
});

// create user account using the collection.insertOne function
function create(name, email, password) {
    // TODO: populate this function based off the video
    return new Promise((resolve, reject) => {    
        const collection = db.collection('customers');
        const doc = {name, email, password, balance: 0};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });    
    })
}

// return all users by using the collection.find method
function all() {
    // TODO: populate this function based off the video
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('customers')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

let name = 'user' + Math.floor(Math.random()*10000);
let email = name + '@mit.edu';
let password = 'secret';

create(name, email, password).
then((customer) => {
    console.log(customer);
//    res.send(user);            
});

all().
then((customer) => {
    console.log(customer);
//    res.send(user);            
});

// clean up
// db.close();