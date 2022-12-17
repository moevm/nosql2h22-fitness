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
    
    
        let arr = [client, time, trainer];
        let parametres = 0;
        let client_reg;
        let trainer_reg;
        let timeOne;
        let timeTwo;
        let flag = 0;

        if(client!=''){
            client_reg = new RegExp(`${client}`, 'i');
        }
        if(trainer!=''){
            trainer_reg = new RegExp(`${trainer}`, 'i');
        }
        if(time != " "){
            let timearr = time.split(' ');
            // console.log('timearr: '+ timearr);
            if(timearr[1] == ''){
                // console.log("я тут в сплите 1");
                flag = 1;
                timeOne = Date.parse(`${date}T${timearr[0]}:00Z`);
                // timeTwo = Date.parse(`${date}T${timearr[0]}:00Z`);
            }
            if(timearr[0] == ''){
                // console.log("я тут в сплите 2");
                flag = 2;
                // timeOne = Date.parse(`${date}T${timearr[1]}:00Z`);
                timeTwo = Date.parse(`${date}T${timearr[1]}:00Z`);
            }
            if(timearr[0] != '' && timearr[1] != ''){
                // console.log("я тут в сплите 3");
                flag = 3;
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
            (flag < 3) ? filterOnlyTwoT() : filterOnlyTwo();
            console.log("filter 2 param");
            
        }
        if(parametres == 1){
            console.log("filter 1 param");
            (flag < 3) ? filterOnlyOneT() : filterOnlyOne();
        }
        if(parametres == 3){
            console.log("filter 3 param");
            (flag < 3) ? filterAllT() : filterAll();
        }

        async function filterOnlyTwo() {
            // console.log("я тут, флаг 3");
            const tmp = await collection.find({date: date, $or:[{$and:[{listOfEnrolled: client_reg},{time: {$gte : timeOne, $lte: timeTwo}}]},
                                                                {$and:[{listOfEnrolled: client_reg},{trainer: trainer_reg}]},
                                                                {$and:[{time: {$gte : timeOne, $lte: timeTwo}},{trainer: trainer_reg}]}
                                                                ]}).toArray();    
            parseTime(tmp);                                      
            res.send(tmp);
        }
        async function filterOnlyTwoT() {
            if(flag == 2){
                // console.log("я тут, флаг 2");
                const tmp = await collection.find({date: date, $or:[{$and:[{listOfEnrolled: client_reg},{time: {$lte: timeTwo}}]},
                                                                    {$and:[{listOfEnrolled: client_reg},{trainer: trainer_reg}]},
                                                                    {$and:[{time: {$lte: timeTwo}},{trainer: trainer_reg}]}
                                                                    ]}).toArray();  
                parseTime(tmp);                                        
                res.send(tmp);
            }
            if(flag == 1){
                // console.log("я тут, флаг 1");
                const tmp = await collection.find({date: date, $or:[{$and:[{listOfEnrolled: client_reg},{time: {$gte : timeOne}}]},
                                                                    {$and:[{listOfEnrolled: client_reg},{trainer: trainer_reg}]},
                                                                    {$and:[{time: {$gte : timeOne}},{trainer: trainer_reg}]}
                                                                    ]}).toArray();  
                parseTime(tmp);                                        
                res.send(tmp);
            }
            if(flag == 0){
                // console.log("я тут, флаг 0");
                const tmp = await collection.find({date: date, $or:[{$and:[{listOfEnrolled: client_reg},{trainer: trainer_reg}]}]}).toArray();
                parseTime(tmp);                                          
                res.send(tmp);
            }
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
        async function filterOnlyOneT() {
            if(flag == 2){
                const tmp = await collection.find({date: date, $or:[{listOfEnrolled: client_reg},{time: {$lte: timeTwo}},{trainer: trainer_reg}]}).toArray(); 
                parseTime(tmp);                                         
                res.send(tmp);
            }
            if(flag == 1){
                const tmp = await collection.find({date: date, $or:[{listOfEnrolled: client_reg},{time: {$gte : timeOne}},{trainer: trainer_reg}]}).toArray(); 
                parseTime(tmp);                                         
                res.send(tmp);
            }
            if(flag == 0){
                const tmp = await collection.find({date: date, $or:[{listOfEnrolled: client_reg},{trainer: trainer_reg}]}).toArray(); 
                parseTime(tmp);                                         
                res.send(tmp);
            }
            
        }

        async function filterAll() {
            const tmp = await collection.find({date: date, listOfEnrolled: client_reg, time: {$gte : timeOne, $lte: timeTwo}, trainer: trainer_reg}).toArray();                                          
            parseTime(tmp); 
            res.send(tmp);
        }
        async function filterAllT() {
            if(flag == 2){
                const tmp = await collection.find({date: date, listOfEnrolled: client_reg, time: {$lte: timeTwo}, trainer: trainer_reg}).toArray();                                          
                parseTime(tmp);                                         
                res.send(tmp);
            }
            if(flag == 1){
                const tmp = await collection.find({date: date, listOfEnrolled: client_reg, time: {$gte : timeOne}, trainer: trainer_reg}).toArray();                                          
                parseTime(tmp);                                         
                res.send(tmp);
            }
        }

        function parseTime(arr){
            for(let i = 0; i<arr.length; i++){
               let tmp = new Date(arr[i].time).toISOString().substring(11, 16);
               arr[i].time = tmp;
            }
        }

    });

}