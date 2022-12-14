const express = require("express");
const app = express();
const MongoClient = require('mongodb').MongoClient;
const fs = require("fs");
const bodyParser = require('body-parser');
const { log } = require("console");
const jsonParser = express.json();
const multer = require('multer');
const port = 3001;

app.use(bodyParser.json())
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
app.use(express.static(__dirname));

app.get("/", function(request, response){
    response.send("<h1>Главная страница сервера </h1>");
});

app.use(multer({dest:"uploads"}).single("filedata"));


const url = "mongodb://localhost:27017/";
const mongo = new MongoClient(url);

async function createData(collection, pathToDataFile){
    data_file = await fs.readFileSync(`${pathToDataFile}`);
    docs = await JSON.parse(data_file.toString());
    await collection.insertMany(docs, function(err, result) {
        if (err) throw err;
        console.log(`Inserted docs from ${pathToDataFile}:`, result.insertedCount);
    });
}

async function deleteData(collection) {
    await collection.deleteMany({});
    console.log('Очистка перед новым заполнением коллекции прошла успешно.\n');
}

mongo.connect(function(err, client){

    const db = client.db("fitnessDB");
    const clients_collection = db.collection('clients');
    const trainer_collection = db.collection('trainer');
    const users_collection = db.collection('users');
    const timetable_collection = db.collection('timetable')

    let path_client = './data/out_clients.json';
    let path_timetable = './data/out_timetable.json';
    let path_trainer = './data/out_trainer.json';
    let path_users = './data/out_users.json';
    
    const docs_clients = JSON.parse(data_clients.toString());
    const docs_trainer = JSON.parse(data_trainer.toString());
    const docs_users = JSON.parse(data_users.toString());
    const docs_timetable = JSON.parse(data_timetable.toString());
    // console.log(docs_timetable);
    for(let i = 0; i < docs_timetable.length; i++){
        docs_timetable[i].time = Date.parse(docs_timetable[i].time);
        // console.log(docs_timetable[i].time);
    }
    

    
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
    timetable_collection.insertMany(docs_timetable, function(err, result) {
        if (err) throw err;
        console.log('Inserted docs_timetable:', result.insertedCount);
    });

    require('./routes/client_route')(app, db);
    require('./routes/trainer_route')(app, trainer_collection);
    require('./routes/users_route')(app, db);
    require('./routes/timetable_route')(app, timetable_collection);
    
    app.post("/upload", function (req, res, next) {
        let filedata = req.file;
        // clients, timetables, trainer, users
        let collection_name = req.body.select;
        // console.log(filedata);
        fs.rename(req.file.path, 'uploads/out_' + collection_name + '.json', function (err) {
            if (err) throw err;
             console.log('renamed complete');
       });

       if(collection_name == 'clients'){
        deleteData(clients_collection);
        let path = `./uploads/out_${collection_name}.json`
        createData(clients_collection, path);
       }else if(collection_name == 'timetable'){
        deleteData(timetable_collection);
        let path = `./uploads/out_${collection_name}.json`
        createData(timetable_collection, path);
       }else if(collection_name == 'trainer'){
        deleteData(trainer_collection);
        let path = `./uploads/out_${collection_name}.json`
        createData(trainer_collection, path);
       }else if(collection_name == 'users'){
        deleteData(users_collection);
        let path = `./uploads/out_${collection_name}.json`
        createData(users_collection, path);
       }else{
            res.send('Имя коллекции некорректное')
       }
        if(!filedata)
            res.send("Ошибка при загрузке файла");
        else
            res.send("Файл загружен");
    });

    app.post("/download", function (req, res, next) {
        let collection_name = req.body.select;
        if(collection_name == 'clients'){
            exportFile(clients_collection, collection_name)
        }else if(collection_name == 'timetable'){
            exportFile(timetable_collection, collection_name)
        }else if(collection_name == 'trainer'){
            exportFile(trainer_collection, collection_name)
        }else if(collection_name == 'users'){
            exportFile(users_collection, collection_name)
        }else{
            res.send('Имя коллекции некорректное')
        }
        res.download(`./data/out_${collection_name}.json`);
    });

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
    
    async function exportFile(collection, collection_name){
        data = await getAllDocuments(collection);
        await fs.writeFileSync(`./data/out_${collection_name}.json`, JSON.stringify(data));
        console.log('Done writing to export file.');
    }

    let ctrlcPressed = 0
    async function onInterrupt() {
        if(ctrlcPressed == 0) {
            console.log('\n\nClosing connection...');
            
            clients_data = await getAllDocuments(clients_collection);
            trainer_data = await getAllDocuments(trainer_collection);
            users_data = await getAllDocuments(users_collection);
            timetable_data = await getAllDocuments(timetable_collection);
            
            for(let i = 0; i < timetable_data.length; i++){
                timetable_data[i].time = new Date(docs_timetable[i].time).toISOString();
            }
            
            await clients_collection.deleteMany({});
            await trainer_collection.deleteMany({});
            await users_collection.deleteMany({});
            await timetable_collection.deleteMany({});
            
            fs.writeFileSync('./data/out_clients.json', JSON.stringify(clients_data));
            console.log('Done writing to clients file.');
            fs.writeFileSync('./data/out_trainer.json', JSON.stringify(trainer_data));
            console.log('Done writing to trainer file.');
            fs.writeFileSync('./data/out_users.json', JSON.stringify(users_data));
            console.log('Done writing to users file.');
            fs.writeFileSync('./data/out_timetable.json', JSON.stringify(timetable_data));
            console.log('Done writing to timetable file.');
            
            await client.close()
        }
        console.log("Server close session");
        ctrlcPressed++;
        process.exit();
    }

    process.on("SIGINT", onInterrupt);
});
