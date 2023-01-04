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

}