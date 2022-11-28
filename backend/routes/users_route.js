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
        res.send("New user is created");
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