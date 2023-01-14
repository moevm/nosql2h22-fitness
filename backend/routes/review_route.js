var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, collection) {

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

    // Сначала новые
    app.post('/review/new', (req, res) => {
        const pageSize = Number(req.body.pageSize);
        const currentPage = Number(req.body.currentPage);
        async function filter() {
            try {
                const documents = await collection.countDocuments();
                let pager = await pagination(documents, pageSize, currentPage);
                let tmp;
                if(pager.startIndex==0){
                    tmp = await collection.find().sort({"date": -1}).limit(pageSize).toArray();
                }else{
                    tmp = await collection.find().sort({"date": -1}).skip(pager.startIndex).limit(pageSize).toArray();
                }
                res.send({data: tmp, pages: pager})
            }catch(err) {
                console.log(err);
            }
        }
        filter()
    });

    // Сначала старые
    app.post('/review/old', (req, res) => {
        const pageSize = Number(req.body.pageSize);
        const currentPage = Number(req.body.currentPage);
        async function getAllDocuments() {
            try {
                const documents = await collection.countDocuments();
                let pager = await pagination(documents, pageSize, currentPage);
                let tmp;
                if(pager.startIndex==0){
                    tmp = await collection.find().sort({'date': 1}).limit(pageSize).toArray();
                }else{
                    tmp = await collection.find().sort({'date': 1}).skip(pager.startIndex).limit(pageSize).toArray();
                }
                res.send({data: tmp, pages: pager})
            }catch(err) {
                console.log(err);
            }
        }
        getAllDocuments();
    });

    //По дате формата 2023-01-15
    app.post('/review/date', (req, res) => {
        const date = Date.parse(`${req.body.date}T00:00:00Z`);
        const date2 = date+86400000;
        const pageSize = Number(req.body.pageSize);
        const currentPage = Number(req.body.currentPage);

        async function getAllDocuments() {
            
            try {
                const documents = await collection.find({date: {$gte : date, $lt: date2}}).count();
                let pager = await pagination(documents, pageSize, currentPage);
                let tmp;
                if(pager.startIndex==0){
                    tmp = await collection.find({date:  {$gte : date, $lt: date2}}).sort({"date": -1}).limit(pageSize).toArray();
                }else{
                    tmp = await collection.find({date:  {$gte : date, $lt: date2}}).sort({"date": -1}).skip(pager.startIndex).limit(pageSize).toArray();
                }
                res.send({data: tmp, pages: pager})
            }catch(err) {
                console.log(err);
            }
        }
        getAllDocuments();
    });

    //Добавление отзыва
    app.post('/review/add', (req, res) => {
        const note = {date: Date.parse(`${req.body.date}`), author: req.body.author, review: req.body.review};
        const pageSize = Number(req.body.pageSize);
        const currentPage = Number(req.body.currentPage);
        collection.insertOne(note, (err, result)=>{
        if(err){ 
            res.send({ 'error': 'An error has occurred review' }); 
        }else{
            console.log(`\n`);
            async function filter() {
                try {
                    const documents = await collection.countDocuments();
                    let pager = await pagination(documents, pageSize, currentPage);
                    let tmp;
                    if(pager.startIndex==0){
                        tmp = await collection.find().sort({"date": -1}).limit(pageSize).toArray();
                    }else{
                        tmp = await collection.find().sort({"date": -1}).skip(pager.startIndex).limit(pageSize).toArray();
                    }
                    res.send({data: tmp, pages: pager})
                }catch(err) {
                    console.log(err);
                }
            }
            filter();
        }
        });
    });

}