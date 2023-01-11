var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, collection) {

    // Фильтрация по имени
    app.get('/trainers/filter/:fio', (req, res) => {
        const fio = req.params.fio;
        async function filter() {
            try {
            const tmp = await collection.find({FIO: fio}).toArray();
                res.send(tmp)
            }catch(err) {
                console.log(err);
            }
        }
        filter()
    });
    
    // Получение документа по имени
    app.get('/trainers/:fio', (req, res) => {
        const fio = req.params.fio;
        collection.findOne({FIO: fio}, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(item)
            } 
        });
    });

    // Получение всех документов коллекции
    app.get('/trainers', (req, res) => {
        async function getAllDocuments() {
            try {
                const tmp = await collection.find().toArray();
                // console.log(tmp);
                res.send(tmp)
                 
            }catch(err) {
                console.log(err);
            }
        }
        getAllDocuments();
    });

    app.post('/trainers/filter', (req, res) => {
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
            console.log("filter 0 param");
            getAllDocuments();
        }

        async function filterOnlyTwo() {
            // console.log("я тут, флаг 3");
            const tmp = await collection.find({$or:[{$and:[{FIO: fio_reg},{telephone: tel_reg}]},
                                                            {$and:[{FIO: fio_reg},{email: email_reg}]},
                                                            {$and:[{telephone: tel_reg},{email: email_reg}]}
                                                            ]}).toArray();    
            res.send(tmp);
        }

        async function filterOnlyOne() {
            const tmp = await collection.find({$or:[{FIO: fio_reg},{telephone: tel_reg},{email: email_reg}]}).toArray(); 
            res.send(tmp);
        }

        async function filterAll() {
            const tmp = await collection.find({FIO: fio_reg, telephone: tel_reg, email: email_reg}).toArray();                                          
            res.send(tmp);
        }
        async function getAllDocuments() {
            try {
                const tmp = await collection.find().toArray();
                res.send(tmp)
            }catch(err) {
                console.log(err);
            }
        }
    });

    app.post('/trainers_page/filter', (req, res) => {
        const programm = req.body.programm;
        const trainer = req.body.trainer;
    
        let parametres = 0;
        let programm_reg;
        let trainer_reg;

        if(programm!=''){
            programm_reg = new RegExp(`${programm}`, 'i');
            parametres++;
        }
        if(trainer!=''){
            trainer_reg = new RegExp(`${trainer}`, 'i');
            parametres++;
        }
        
        if(parametres == 0){
            console.log("send all trainers");
            getAllDocuments();
        }
        if(parametres == 2){
            filterOnlyTwo();
            console.log("filter trainers 2 param");
            
        }
        if(parametres == 1){
            console.log("filter trainer 1 param");
            filterOnlyOne();
        }

        async function filterOnlyTwo() {
            const tmp = await collection.find({$and:[{programm: programm_reg},{FIO: trainer_reg}]}).toArray();    
            res.send(tmp);
        }
        
        async function getAllDocuments() {
            try {
                const tmp = await collection.find().toArray();
                res.send(tmp)
                 
            }catch(err) {
                console.log(err);
            }
        }

        async function filterOnlyOne() {
            const tmp = await collection.find({$or:[{programm: programm_reg},{FIO: trainer_reg}]}).toArray();                                         
            res.send(tmp);
        }

    });

}