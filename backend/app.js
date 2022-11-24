// подключение express
const express = require("express");
// создаем объект приложения
const app = express();

const fs = require("fs");

// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = express.urlencoded({extended: false});


// Обработчик перед отправкой ответа клиенту.
app.use(function(request, response, next){
     
    let now = new Date();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let data = `${hour}:${minutes}:${seconds} ${request.method} ${request.url}`;
    console.log(data);
    // fs.appendFile("server.log", data + "\n", function(){});
    next();
});

app.use("/public", express.static(__dirname + "/public"));
app.use("/view",express.static(__dirname + "/view"))
 
app.get("/", function(request, response){
    response.send("<h1>Главная страница</h1>");
});

app.get("/form", function(request, response){
    response.sendFile(__dirname + "/view/form.html")
});

app.post("/form", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    response.send(`${request.body.userName} - ${request.body.userAge}`);
});


// начинаем прослушивать подключения на 3000 порту
app.listen(3000, ()=>{
    console.log("Server started at http://localhost:3000");
});