var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, collection) {

    // Фильтрация по всем полям (дату передавать обязательно ВСЕГДА)
    // Вне зависисимости от того по каким парметрам ищем
    app.post('/timetable/filter', (req, res) => {
        const client = req.body.client;
        const date = req.body.date;
        const time = req.body.time;
        const trainer = req.body.trainer;

        async function filterAll() {
            try {
                let arr = [];
                const tmp = await collection.findOne({date: date});
                if(tmp){
                    for (let i = 0; i < tmp.event_note.length; i++) { 
                        if(time != ""){
                            if(tmp.event_note[i].time == time){
                                if(trainer!=""){
                                    if(tmp.event_note[i].trainer == trainer){
                                        if(client!=""){
                                            if(tmp.event_note[i].listOfEnrolled.includes(client)) {
                                                arr.push(tmp.event_note[i]);
                                            }   
                                        }else{
                                            arr.push(tmp.event_note[i]);
                                        }
                                    }
                                }else{
                                    arr.push(tmp.event_note[i]);
                                }   
                            }
                        }else if(trainer!=""){
                            if(tmp.event_note[i].trainer == trainer){
                                if(client!=""){
                                    if(tmp.event_note[i].listOfEnrolled.includes(client)) {
                                        arr.push(tmp.event_note[i]);
                                    }   
                                }else{
                                    arr.push(tmp.event_note[i]);
                                }
                            }
                        }else if(client!=""){
                            if(tmp.event_note[i].listOfEnrolled.includes(client)) {
                                arr.push(tmp.event_note[i]);
                            }   
                        }else if(client=="" && trainer=="" && time==""){
                            res.send(tmp.event_note)
                        }
                    }
                }
                res.send(arr);
            }catch(err) {
                console.log(err);
            }
        }
        filterAll();
    });

    // Получение всех документов коллекции
    app.get('/timetable', (req, res) => {
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