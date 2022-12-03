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

    // Пагинация таблицы
    // app.get('/clients/page/:page', (req, res) => {
    //     let current_page = Number(req.params.page);
        
    //     let count_documents = clients_collection.countDocuments();
    //     console.log(count_documents);
    //     let count_entrys = 15;
    //     let count_pages = Math.ceil(count_documents/count_entrys);
    //     console.log(current_page);
    //     console.log(count_pages);
    //     if(Number(current_page) > count_pages+1){
    //         res.send({'error': "Больше страниц быть не может"})
    //     }else{
    //         getPage();
    //     }
    //     async function getPage() {
    //         try {
    //             const tmp = await clients_collection.find().skip((current_page*count_entrys)-15).limit(15).toArray()
    //             console.log(tmp);
    //             res.send(tmp)
    //         }catch(err) {
    //             console.log(err);
    //         }
    //     }
    // })



}