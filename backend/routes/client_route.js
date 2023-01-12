var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {

    const clients_collection = db.collection('clients');
    const trainer_collection = db.collection('trainer');
    const users_collection = db.collection('users')

    // Обработка ссылки имени клиента в таблице админа "клиенты"
    // Результатом отсылаем запись из бд тренера, мол этот клиент у этого тренера
    // Если тренер не назначен, указывается что клиент по абонементу
    app.get('/clients/:fio', (req, res) => {
        const fio = req.params.fio;
        clients_collection.findOne({FIO: fio}, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                trainer_collection.findOne({FIO: item.trainer}, (err, tmp)=>{
                    if (err) {
                        if (item.trainer == "-"){
                            res.send({'message': "Этот клиент занимается индивидуально по абонементу"})
                        }else{
                            res.send({'error':'Client have not trainer'});
                        }
                    } else{
                        res.send(tmp)
                    }
                });
            } 
        });
    });

    // Получение всех документов коллекции клиентов
    app.get('/clients', (req, res) => {
        async function getAllDocuments() {
            try {
                const tmp = await clients_collection.find().toArray();
                res.send(tmp)
            }catch(err) {
                console.log(err);
            }
        }
        getAllDocuments();
    })

    // Фильтрация по имени
    app.get('/clients/filter/:fio', (req, res) => {
        const fio = req.params.fio;
        async function filter() {
            try {
            const tmp = await clients_collection.find({FIO: fio}).toArray();
                res.send(tmp)
            }catch(err) {
                console.log(err);
            }
        }
        filter()
    });

    app.post('/clients/filter', (req, res) => {
        const fio = req.body.fio;
        const tel = req.body.tel;
        const email = req.body.email;
        
        let arr = [fio, tel, email];
        let parametres = 0;
        let fio_reg;
        let tel_reg;
        let email_reg;

        if(fio!=''){
            fio_reg = new RegExp(`${fio}`, 'i');
        }
        if(tel!=''){
            tel_reg = new RegExp(`${tel}`, 'i');
        }
        if(email!=''){
            email_reg = new RegExp(`${email}`, 'i');
        }
        
        for(let i =0; i<arr.length; i++){
            if(arr[i] != ''){
                parametres++;
            }
        }

        if(parametres == 2){
            console.log("filter 2 param");
            filterOnlyTwo();
        }
        if(parametres == 1){
            console.log("filter 1 param");
            filterOnlyOne();
            
        }
        if(parametres == 3){
            console.log("filter 3 param");
            filterAll();
        }
        if(parametres == 0){
            getAllDocuments();
        }

        async function filterOnlyTwo() {
            // console.log("я тут, флаг 3");
            const tmp = await clients_collection.find({$or:[{$and:[{FIO: fio_reg},{telephone: tel_reg}]},
                                                            {$and:[{FIO: fio_reg},{email: email_reg}]},
                                                            {$and:[{telephone: tel_reg},{email: email_reg}]}
                                                            ]}).toArray();    
            res.send(tmp);
        }

        async function filterOnlyOne() {
            const tmp = await clients_collection.find({$or:[{FIO: fio_reg},{telephone: tel_reg},{email: email_reg}]}).toArray(); 
            res.send(tmp);
        }

        async function filterAll() {
            const tmp = await clients_collection.find({FIO: fio_reg, telephone: tel_reg, email: email_reg}).toArray();                                          
            res.send(tmp);
        }
        async function getAllDocuments() {
            try {
                const tmp = await clients_collection.find().toArray();
                res.send(tmp)
            }catch(err) {
                console.log(err);
            }
        }
    });

    // Запись к тренеру
    app.post('/clients/signfortrainer', (req, res) => {
        const fio = req.body.fio;
        const trainer = req.body.trainer;
        const programm = req.body.programm;

        async function setClientTrainerData() {
            try {
                const client = await clients_collection.find({FIO: fio}).toArray();
                if(client[0].trainer == '-'){
                    await clients_collection.updateOne({FIO: fio}, {$set: {trainer: trainer, programm: programm}});
                    delete client[0].programm;
                    delete client[0].trainer;
                    await trainer_collection.updateOne({FIO: trainer}, {$push: {listOfClients: client[0]}});
                    res.send("Вы записались к тренеру и его данные обновлены")
                }else{
                    res.send("Вы уже записаны к тренеру/приобрели абонемент. Для смены программы обратитесь к администратору.")
                }
            }catch(err) {
                console.log(err);
            }
        }

        setClientTrainerData();
    });


}