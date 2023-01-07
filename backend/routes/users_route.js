var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {
    
    const clients_collection = db.collection('clients');
    const trainer_collection = db.collection('trainer');
    const users_collection = db.collection('users')

    // Регистрация нового пользователя
    app.post('/registration', (req, res) => {
        const note = { FIO: req.body.fio, email: req.body.email, telephone: req.body.telephone, pwd: req.body.pwd, type: req.body.type};
        users_collection.insertOne(note, (err, result)=>{
            if (err) { 
                res.send({ 'error': 'An error has occurred user' }); 
              } else {
                console.log(`\nAdd new user: ${req.body.fio}`);
              }
        });

        if(req.body.type == 'trainer'){
            trainer_collection.insertOne({ FIO: req.body.fio, email: req.body.email, telephone: req.body.telephone, listOfClients: []}, (err, result)=>{
                if (err) { 
                    res.send({ 'error': 'An error has occurred trainer' }); 
                  } else {
                    console.log(`User add to collection of trainers.\n`);
                  }
            });
        }else{
            clients_collection.insertOne({ FIO: req.body.fio, email: req.body.email, telephone: req.body.telephone, programm: "-", trainer: "-" }, (err, result)=>{
                if (err) { 
                    res.send({ 'error': 'An error has occurred client' }); 
                  } else {
                    console.log(`User add to collection of clients.\n`);
                  }
            });
        }
        users_collection.findOne({FIO: req.body.fio}, async (err, result)=>{
            await res.send(result._id);
        })
        // res.send("New user is created");
    });

    // Вход пользователя
    app.post('/login', (req, res) => {
        const note = {email: req.body.email, pwd: req.body.pwd};
        users_collection.findOne(note, async (err, result)=>{
            if (err) { 
                res.send({ 'error': 'Введены неверные данные.' }); 
            }else{
                if(result == undefined){
                    res.send("Такого пользователя не зарегистрированои либо введены неверные данные.")
                }else if(result.type == 'admin'){
                    res.send(result)
                }else if(result.type == 'client'){
                    let tmp = await clients_collection.findOne({FIO: result.FIO})
                    tmp.type = 'client';
                    res.send(tmp);
                }else{
                    let tmp = await trainer_collection.findOne({FIO: result.FIO})
                    tmp.type = 'trainer';
                    res.send(tmp);
                }
            }
        });

    });

    

    // Получение документа по айди
    app.get('/users/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        users_collection.findOne(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(item);
            } 
        });
    });

    // Получение всех документов коллекции
    app.get('/users', (req, res) => {
        async function getAllDocuments() {
            try {
                const tmp = await users_collection.find().toArray();
                // console.log(tmp);
                res.send(tmp)
                 
            }catch(err) {
                console.log(err);
            }
        }
        getAllDocuments();
    })

}