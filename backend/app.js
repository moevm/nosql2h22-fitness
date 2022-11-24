// подключение express
const express = require("express");
// создаем объект приложения
const app = express();

const fs = require("fs");
const port = 3001;
let test_route = require('./routes/test');

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

app.use('/', test_route);
 
app.get("/", function(request, response){
    response.send("<h1>Главная страница сервера</h1>");
});

// начинаем прослушивать подключения на 3000 порту
app.listen(port, ()=>{
    console.log("Server started at http://localhost:3001");
});