var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, collection) {

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

    // Фильтрация по всем полям (дату передавать обязательно ВСЕГДА)
    // Вне зависисимости от того по каким парметрам ищем
    app.post('/timetable/filter', (req, res) => {
        const client = req.body.client;
        const date = req.body.date;
        const time = req.body.time;
        const trainer = req.body.trainer;
        console.log(`aaaa2${time}3aaaaa`);
    
        let arr = [client, time, trainer];
        let parametres = 0;
        let client_reg;
        let trainer_reg;
        let timeOne;
        let timeTwo;

        if(client!=''){
            client_reg = new RegExp(`${client}`, 'i');
        }
        if(trainer!=''){
            trainer_reg = new RegExp(`${trainer}`, 'i');
        }
        if(time!=" "){
            let timearr = time.split(' ');
            if(timearr[1] == ''){
                timeOne = Date.parse(`${date}T${timearr[0]}:00Z`);
                timeTwo = Date.parse(`${date}T${timearr[0]}:00Z`);
            }else{
                timeOne = Date.parse(`${date}T${timearr[0]}:00Z`);
                timeTwo = Date.parse(`${date}T${timearr[1]}:00Z`);
            }
        }
        
        for(let i =0; i<arr.length; i++){
            if(arr[i] != ''){
                parametres++;
            }
            if(arr[i]==" "){
            parametres--;
            }
        }

        if(parametres == 0){
            console.log("filter date");
            filterOnlyDate();
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

        async function filterOnlyTwo() {
            const tmp = await collection.find({date: date, $or:[{$and:[{listOfEnrolled: client_reg},{time: {$gte : timeOne, $lte: timeTwo}}]},
                                                                {$and:[{listOfEnrolled: client_reg},{trainer: trainer_reg}]},
                                                                {$and:[{time: {$gte : timeOne, $lte: timeTwo}},{trainer: trainer_reg}]}
                                                                ]}).toArray();                                          
            res.send(tmp);
        }

        async function filterOnlyDate() {
            const tmp = await collection.find({date: date}).toArray();
            parseTime(tmp);
            res.send(tmp);
        }

        async function filterOnlyOne() {
            const tmp = await collection.find({date: date, $or:[{listOfEnrolled: client_reg},{time: {$gte : timeOne, $lte: timeTwo}},{trainer: trainer_reg}]}).toArray(); 
            parseTime(tmp);                                         
            res.send(tmp);
        }

        async function filterAll() {
            const tmp = await collection.find({date: date, listOfEnrolled: client_reg, time: {$gte : timeOne, $lte: timeTwo}, trainer: trainer_reg}).toArray();                                          
            parseTime(tmp); 
            res.send(tmp);
        }

        function parseTime(arr){
            for(let i = 0; i<arr.length; i++){
               let tmp = new Date(arr[i].time).toISOString().substring(11, 16);
               arr[i].time = tmp;
            }
        }

    });

}