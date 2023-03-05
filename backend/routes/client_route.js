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

    async function pagination(documents, pageSize, currentPage){
        const totalPages = Math.ceil(documents/pageSize);
        if(currentPage>totalPages){
            currentPage = totalPages;
        }
        if(currentPage<1){
            currentPage = 1;
        }
        let pages_arr = [];
        for(let i=1; i<= totalPages; i++){
            pages_arr[i-1] = i;
        }
        const startIndex =  (currentPage-1)*pageSize;
        return {totalPages: totalPages, pages_arr: pages_arr, startIndex: startIndex, currentPage: currentPage}
    }

    // Получение всех документов коллекции клиентов
    app.post('/clients', (req, res) => {
        const pageSize = Number(req.body.pageSize);
        const currentPage = Number(req.body.currentPage);
        async function getAllDocuments() {
            try {
                const documents = await clients_collection.countDocuments();
                let pager = await pagination(documents, pageSize, currentPage);
                const tmp = await clients_collection.find().limit(10).toArray();
                res.send({data: tmp, pages: pager})
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

        const pageSize = Number(req.body.pageSize);
        const currentPage = Number(req.body.currentPage);
        
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
            const documents = await clients_collection.find({$or:[{$and:[{FIO: fio_reg},{telephone: tel_reg}]},
                                                                  {$and:[{FIO: fio_reg},{email: email_reg}]},
                                                                  {$and:[{telephone: tel_reg},{email: email_reg}]}
            ]}).count();
            let pager = await pagination(documents, pageSize, currentPage);
            let tmp;
            if(pager.startIndex==0){
                tmp = await clients_collection.find({$or:[{$and:[{FIO: fio_reg},{telephone: tel_reg}]},
                                                          {$and:[{FIO: fio_reg},{email: email_reg}]},
                                                          {$and:[{telephone: tel_reg},{email: email_reg}]}
                ]}).limit(pageSize).toArray();
            }else{
                tmp = await clients_collection.find({$or:[{$and:[{FIO: fio_reg},{telephone: tel_reg}]},
                                                          {$and:[{FIO: fio_reg},{email: email_reg}]},
                                                          {$and:[{telephone: tel_reg},{email: email_reg}]}
                ]}).skip(pager.startIndex).limit(pageSize).toArray();
            }
            res.send({data: tmp, pages: pager})
        }

        async function filterOnlyOne() {
            const documents = await clients_collection.find({$or:[{FIO: fio_reg},{telephone: tel_reg},{email: email_reg}]}).count(); 
            let pager = await pagination(documents, pageSize, currentPage);
            let tmp;
            if(pager.startIndex==0){
                tmp = await clients_collection.find({$or:[{FIO: fio_reg},{telephone: tel_reg},{email: email_reg}]}).limit(pageSize).toArray();
            }else{
                tmp = await clients_collection.find({$or:[{FIO: fio_reg},{telephone: tel_reg},{email: email_reg}]}).skip(pager.startIndex).limit(pageSize).toArray();
            }
            res.send({data: tmp, pages: pager})
        }

        async function filterAll() {
            const documents = await clients_collection.find({FIO: fio_reg, telephone: tel_reg, email: email_reg}).count(); 
            let pager = await pagination(documents, pageSize, currentPage);
            let tmp;
            if(pager.startIndex==0){
                tmp = await clients_collection.find({FIO: fio_reg, telephone: tel_reg, email: email_reg}).limit(pageSize).toArray();
            }else{
                tmp = await clients_collection.find({FIO: fio_reg, telephone: tel_reg, email: email_reg}).skip(pager.startIndex).limit(pageSize).toArray();
            }
            res.send({data: tmp, pages: pager})
        }

        async function getAllDocuments() {
            try {
                const documents = await clients_collection.countDocuments();
                let pager = await pagination(documents, pageSize, currentPage);
                let tmp;
                if(pager.startIndex==0){
                    tmp = await clients_collection.find().limit(pageSize).toArray();
                }else{
                    tmp = await clients_collection.find().skip(pager.startIndex).limit(pageSize).toArray();
                }
                res.send({data: tmp, pages: pager})
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

    //Покупка абонемента
    app.post('/clients/signforsubscription', (req, res) => {
        const fio = req.body.fio;
        const programm = req.body.programm;

        async function setClientData() {
            try {
                const client = await clients_collection.find({FIO: fio}).toArray();
                if(client[0].trainer == '-'){
                    await clients_collection.updateOne({FIO: fio}, {$set: {trainer: 'По абонементу', programm: programm}});
                    res.send("Вы приобрели абонемент");
                }else{
                    res.send("Вы уже записаны к тренеру/приобрели абонемент. Для смены программы обратитесь к администратору.")
                }
            }catch(err) {
                console.log(err);
            }
        }
        setClientData();
    });


}