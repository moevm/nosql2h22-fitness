var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {
    
    const clients_collection = db.collection('clients');
    const trainer_collection = db.collection('trainer');
    const users_collection = db.collection('users');
    const timetable_collection = db.collection('timetable');

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

    app.post('/lk_timetable/filter', (req, res) => {
        const fio = req.body.fio;
        const date = req.body.date;
        const time = req.body.time;
    
        let parametres = 0;
        let timeOne;
        let timeTwo;
        let flag = 0;

        if(time != " "){
            let timearr = time.split(' ');
            // console.log('timearr: '+ timearr);
            if(timearr[1] == ''){
                // console.log("я тут в сплите 1");
                flag = 1;
                timeOne = Date.parse(`${date}T${timearr[0]}:00Z`);
                // timeTwo = Date.parse(`${date}T${timearr[0]}:00Z`);
            }
            if(timearr[0] == ''){
                // console.log("я тут в сплите 2");
                flag = 2;
                // timeOne = Date.parse(`${date}T${timearr[1]}:00Z`);
                timeTwo = Date.parse(`${date}T${timearr[1]}:00Z`);
            }
            if(timearr[0] != '' && timearr[1] != ''){
                // console.log("я тут в сплите 3");
                flag = 3;
                timeOne = Date.parse(`${date}T${timearr[0]}:00Z`);
                timeTwo = Date.parse(`${date}T${timearr[1]}:00Z`);
            }
            parametres = 1;
        }

        if(parametres == 0){
            console.log("filter lk_timetable only date");  
            filterOnlyDate();
        }
        if(parametres == 1){
            console.log("filter lk_timetable with time");
            (flag < 3) ? filterOneT() : filterTime();
        }

        async function filterOnlyDate() {
            const tmp = await timetable_collection.find({$and:[{date: date}, {$or: [{listOfEnrolled: fio}, {trainer: fio}]}]}).toArray();
            parseTime(tmp);
            res.send(tmp);
        }

        async function filterTime() {
            const tmp = await timetable_collection.find({$and: [{date: date}, {$or: [{listOfEnrolled: fio}, {trainer: fio}]}, {time: {$gte : timeOne, $lte: timeTwo}}]}).sort({"time": 1}).toArray();
            parseTime(tmp);                                         
            res.send(tmp);
        }
        async function filterOneT() {
            if(flag == 2){
                const tmp = await timetable_collection.find({$and:[{date: date},{$or: [{listOfEnrolled: fio}, {trainer: fio}]}, {time: {$lte: timeTwo}}]}).sort({"time": 1}).toArray(); 
                parseTime(tmp);                                         
                res.send(tmp);
            }
            if(flag == 1){
                const tmp = await timetable_collection.find({$and:[{date: date},{$or: [{listOfEnrolled: fio}, {trainer: fio}]}, {time: {$gte : timeOne}}]}).sort({"time": 1}).toArray(); 
                parseTime(tmp);                                         
                res.send(tmp);
            }
            if(flag == 0){
                const tmp = await timetable_collection.find({$and:[{date: date},{$or: [{listOfEnrolled: fio}, {trainer: fio}]}]}).toArray(); 
                parseTime(tmp);                                         
                res.send(tmp);
            }
            
        }

        function parseTime(arr){
            for(let i = 0; i<arr.length; i++){
               let tmp = new Date(arr[i].time).toISOString().substring(11, 16);
               arr[i].time = tmp;
            }
        }

    });

}