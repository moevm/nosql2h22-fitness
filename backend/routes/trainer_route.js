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

    async function pagination(documents, pageSize, currentPage){
        const totalPages = Math.ceil(documents/pageSize);
        if(currentPage>totalPages){
            currentPage = totalPages;
        }
        if(currentPage<1){
            currentPage = 1;
        }
        let pages_arr = [];
        for(let i=1; i<= totalPages; i++){
            pages_arr[i-1] = i;
        }
        const startIndex =  (currentPage-1)*pageSize;
        return {totalPages: totalPages, pages_arr: pages_arr, startIndex: startIndex, currentPage: currentPage}
    }

    // Получение всех документов коллекции
    app.post('/trainers', (req, res) => {
        const pageSize = Number(req.body.pageSize);
        const currentPage = Number(req.body.currentPage);
        async function getAllDocuments() {
            try {
                documents = await collection.countDocuments();
                let pager = await pagination(documents, pageSize, currentPage);
                const tmp = await collection.find().limit(10).toArray();
                res.send({data: tmp, pages: pager})
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

        const pageSize = Number(req.body.pageSize);
        const currentPage = Number(req.body.currentPage);

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
            const documents = await collection.find({$or:[{$and:[{FIO: fio_reg},{telephone: tel_reg}]},
                                                            {$and:[{FIO: fio_reg},{email: email_reg}]},
                                                            {$and:[{telephone: tel_reg},{email: email_reg}]}
            ]}).count();    
            let pager = await pagination(documents, pageSize, currentPage)  
            let tmp;
            if(pager.startIndex==0){
                tmp = await collection.find({$or:[{$and:[{FIO: fio_reg},{telephone: tel_reg}]},
                                                  {$and:[{FIO: fio_reg},{email: email_reg}]},
                                                  {$and:[{telephone: tel_reg},{email: email_reg}]}
                ]}).limit(pageSize).toArray(); 
            }else{
                tmp = await collection.find({$or:[{$and:[{FIO: fio_reg},{telephone: tel_reg}]},
                                                  {$and:[{FIO: fio_reg},{email: email_reg}]},
                                                  {$and:[{telephone: tel_reg},{email: email_reg}]}
                ]}).skip(pager.startIndex).limit(pageSize).toArray();
            }
            res.send({data: tmp, pages: pager})
        }

        async function filterOnlyOne() {
            const documents = await collection.find({$or:[{FIO: fio_reg},{telephone: tel_reg},{email: email_reg}]}).count(); 
            let pager = pagination(documents, pageSize, currentPage);
            let tmp;
            if(pager.startIndex==0){
                tmp = await collection.find({$or:[{FIO: fio_reg},{telephone: tel_reg},{email: email_reg}]}).limit(pageSize).toArray();
            }else{
                tmp = await collection.find({$or:[{FIO: fio_reg},{telephone: tel_reg},{email: email_reg}]}).skip(pager.startIndex).limit(pageSize).toArray();
            }
            res.send({data: tmp, pages: pager})
        }

        async function filterAll() {
            const documents = await collection.find({FIO: fio_reg, telephone: tel_reg, email: email_reg}).count();                                          
            let pager = pagination(documents, pageSize, currentPage)  
            let tmp;
            if(pager.startIndex==0){
                tmp = await collection.find({FIO: fio_reg, telephone: tel_reg, email: email_reg}).limit(pageSize).toArray();
            }else{
                tmp = await collection.find({FIO: fio_reg, telephone: tel_reg, email: email_reg}).skip(pager.startIndex).limit(pageSize).toArray();
            }
            res.send({data: tmp, pages: pager})
        }
        async function getAllDocuments() {
            try {
                const documents = await collection.countDocuments();
                let pager = await pagination(documents, pageSize, currentPage);
                let tmp;
                if(pager.startIndex==0){
                    tmp = await collection.find().limit(pageSize).toArray();
                }else{
                    tmp = await collection.find().skip(pager.startIndex).limit(pageSize).toArray();
                }
                res.send({data: tmp, pages: pager})
            }catch(err) {
                console.log(err);
            }
        }
    });

    app.post('/trainers_page/filter', (req, res) => {
        const programm = req.body.programm;
        const trainer = req.body.trainer;

        const pageSize = Number(req.body.pageSize);
        const currentPage = Number(req.body.currentPage);
    
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
            const documents = await collection.find({$and:[{programm: programm_reg},{FIO: trainer_reg}]}).count();   
            let pager = await pagination(documents, pageSize, currentPage);
            let tmp;
            if(pager.startIndex==0){
                tmp = await collection.find({$and:[{programm: programm_reg},{FIO: trainer_reg}]}).limit(pageSize).toArray();
            }else{
                tmp = await collection.find({$and:[{programm: programm_reg},{FIO: trainer_reg}]}).skip(pager.startIndex).limit(pageSize).toArray();
            }
            res.send({data: tmp, pages: pager}) 
        }
        
        async function getAllDocuments() {
            try {
                const documents = await collection.countDocuments();
                let pager = await pagination(documents, pageSize, currentPage);
                let tmp;
                if(pager.startIndex==0){
                    tmp = await collection.find().limit(pageSize).toArray();
                }else{
                    tmp = await collection.find().skip(pager.startIndex).limit(pageSize).toArray();
                }
                res.send({data: tmp, pages: pager})
            }catch(err) {
                console.log(err);
            }
        }

        async function filterOnlyOne() {
            const documents = await collection.find({$or:[{programm: programm_reg},{FIO: trainer_reg}]}).count();   
            let pager = await pagination(documents, pageSize, currentPage);
            let tmp;
            if(pager.startIndex==0){
                tmp = await collection.find({$or:[{programm: programm_reg},{FIO: trainer_reg}]}).limit(pageSize).toArray();
            }else{
                tmp = await collection.find({$or:[{programm: programm_reg},{FIO: trainer_reg}]}).skip(pager.startIndex).limit(pageSize).toArray();
            }
            res.send({data: tmp, pages: pager}) 
        }

    });

}