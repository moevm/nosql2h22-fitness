var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, collection) {
    
    // Запись в коллекцию нового документа
    app.post('/clients', (req, res) => {
        const note = { text: req.body.body, title: req.body.title };
        collection.insertOne(note, (err, result) => {
          if (err) { 
            res.send({ 'error': 'An error has occurred' }); 
          } else {
            res.send("Server got your note!");
          }
        });
      });

    // Получение документа по айди
    app.get('/clients/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        collection.findOne(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(item);
            } 
        });
    });

    // Получение всех документов коллекции
    app.get('/clients', (req, res) => {
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