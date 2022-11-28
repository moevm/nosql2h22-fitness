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
    })
}