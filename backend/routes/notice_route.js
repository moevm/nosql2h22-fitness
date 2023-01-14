var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, collection) {

    //Получение всех уведомлений
    app.get('/notice', (req, res) => {
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

}