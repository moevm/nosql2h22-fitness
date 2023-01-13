var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, collection) {

    // Сначала новые
    app.get('/review/new', (req, res) => {
        async function filter() {
            try {
            const tmp = await collection.find({}).sort({"date": 1}).toArray();
                res.send(tmp)
            }catch(err) {
                console.log(err);
            }
        }
        filter()
    });

    // Сначала старые
    app.get('/review/old', (req, res) => {
        async function getAllDocuments() {
            try {
                const tmp = await collection.find().sort({'date': -1}).toArray();
                // console.log(tmp);
                res.send(tmp)
                 
            }catch(err) {
                console.log(err);
            }
        }
        getAllDocuments();
    });

    //По дате формата 2023-01-15
    app.post('/review/date', (req, res) => {
        const date = Date.parse(`${req.body.date}T00:00:00Z`);
        async function getAllDocuments() {
            try {
                const tmp = await collection.find({date: date}).toArray();
                // console.log(tmp);
                res.send(tmp)
                 
            }catch(err) {
                console.log(err);
            }
        }
        getAllDocuments();
    });

    //Добавление отзыва
    app.post('/review/add', (req, res) => {
        console.log(Date.parse(`${req.body.date}T00:00:00.000Z`));
        const note = {date: Date.parse(`${req.body.date}T00:00:00.000Z`), author: req.body.author, review: req.body.review};
        collection.insertOne(note, (err, result)=>{
            if (err) { 
                res.send({ 'error': 'An error has occurred review' }); 
              } else {
                console.log(`\n`);
                async function filter() {
                    try {
                    const tmp = await collection.find({}).sort({"date": 1}).toArray();
                        res.send(tmp)
                    }catch(err) {
                        console.log(err);
                    }
                }
                filter()
              }
        });
    });

}