const express = require("express");
const app = express();
const MongoClient = require('mongodb').MongoClient;
const fs = require("fs");
const bodyParser = require('body-parser');
const jsonParser = express.json();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));

// Обработчик перед отправкой ответа клиенту.
app.use(function(request, response, next){
    let now = new Date();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let data = `${hour}:${minutes}:${seconds} ${request.method} ${request.url}`;
    console.log(data);
    // fs.appendFile("server.log", data + "\n", function(){});
    next();
});

app.get("/", function(request, response){
    response.send("<h1>Главная страница сервера </h1>");
});

const url = "mongodb://localhost:27017/";
const mongo = new MongoClient(url);

mongo.connect(function(err, client){

    const db = client.db("fitnessDB");
    const clients_collection = db.collection('clients');
    const trainer_collection = db.collection('trainer');
    const users_collection = db.collection('users')

    const data_clients = fs.readFileSync('./data/out_clients.json');
    const data_trainer = fs.readFileSync('./data/out_trainer.json');
    const data_users = fs.readFileSync('./data/out_users.json');
    
    const docs_clients = JSON.parse(data_clients.toString());
    const docs_trainer = JSON.parse(data_trainer.toString());
    const docs_users = JSON.parse(data_users.toString());
    
    clients_collection.insertMany(docs_clients, function(err, result) {
            if (err) throw err;
            console.log('Inserted docs_clients:', result.insertedCount);
    });
    trainer_collection.insertMany(docs_trainer, function(err, result) {
        if (err) throw err;
        console.log('Inserted docs_trainer:', result.insertedCount);
    });
    users_collection.insertMany(docs_users, function(err, result) {
        if (err) throw err;
        console.log('Inserted docs_users:', result.insertedCount);
    });

    require('./routes/client_route')(app, clients_collection);
    require('./routes/trainer_route')(app, trainer_collection);
    require('./routes/users_route')(app, db);

    app.listen(port, ()=>{
        console.log("Server started at http://localhost:3001");
    });  

    async function getAllDocuments(collection) {
        try {
            const tmp = await collection.find({}).toArray();
            return(tmp)
        }catch(err) {
            console.log(err);
        }
    }

    let ctrlcPressed = 0
    async function onInterrupt() {
        if(ctrlcPressed == 0) {
            console.log('\n\nClosing connection...');
            
            clients_data = await getAllDocuments(clients_collection);
            trainer_data = await getAllDocuments(trainer_collection);
            users_data = await getAllDocuments(users_collection);
            
            await clients_collection.deleteMany({});
            await trainer_collection.deleteMany({});
            await users_collection.deleteMany({});
            
            fs.writeFileSync('./data/out_clients.json', JSON.stringify(clients_data));
            console.log('Done writing to clients file.');
            fs.writeFileSync('./data/out_trainer.json', JSON.stringify(trainer_data));
            console.log('Done writing to trainer file.');
            fs.writeFileSync('./data/out_users.json', JSON.stringify(users_data));
            console.log('Done writing to users file.');
            
            await client.close()
        }
        console.log("Server close session");
        ctrlcPressed++;
        process.exit();
    }

    process.on("SIGINT", onInterrupt);
});
