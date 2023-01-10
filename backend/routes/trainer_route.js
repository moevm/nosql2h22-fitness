var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, collection) {

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

    // Фильтрация по всем полям
    // Вне зависисимости от того по каким парметрам ищем
    // Если ищем по одному параметру - второй передается пустой строкой
    app.post('/trainers/filter', (req, res) => {
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