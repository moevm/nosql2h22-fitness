const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/";
const mongo = new MongoClient(url);

mongo.connect(function(err, client){

    const db = client.db("helloDB");
    const collection = db.collection("test");
    // collection.insertOne({_id: 1, text: "hello world"})
    // collection.deleteOne({id: 5})
    collection.countDocuments(async function (err, result) {

        if (err) {
            return console.log(err);
        }
        console.log(`В коллекции test ${result} документ(ов)`);
        const cursor = collection.find()
        await cursor.forEach(console.dir);

        client.close();
    });
});
// const mongo = require('mongodb').MongoClient
//
// mongo.connect(
//     'mongodb://localhost:27017',
//     (err, client) => {
//         if (err) {
//             console.log('Connection error: ', err)
//             throw err
//         }
//
//         console.log('Connected')
//         const db = client.db('helloDB')
//         const users = db.createCollection('users')
//         // users.insertOne(
//         //     { id: 1, login: 'login1', name: 'name1', gender: 'male' },
//         //     (err, result) => {
//         //         if (err) {
//         //             console.log('Unable insert user: ', err)
//         //             throw err
//         //         }
//         //     }
//         // )
//         users.find();
//
//         client.close()
//     }
// )

