
const http = require("http");
const host = 'localhost';
const port = 8000;

const mysql = require("mysql2");

const fs = require('fs').promises;
  
const connection = mysql.createConnection({
	host: "127.0.0.1",
	user: "test",
	database: "Test",
	password: "123"
});

const requestListener = function (request, response) {

	if (request.url == "/" && request.method == "GET"){
		console.log("Есть запрос на Url: " + request.url + "методом GET");
			
		fs.readFile(__dirname + "/html/index.html").then(contents => {
        	response.setHeader("Content-Type", "text/html");
        	response.writeHead(200);
        	response.end(contents);
        	console.log("Содержимое html отправлено клиенту");
        });

	}
	if (request.url == "/api/write" && request.method == "POST"){
		console.log("Есть запрос на Url: " + request.url + "методом POST");
		console.log("Url: " + request.url);
		
		var body = [];
  		request.on('error', (err) => { console.error(err)});
  		request.on('data', (chunk) => { body.push(chunk) });
  		request.on('end', () => {
  			body = Buffer.concat(body).toString();
  			console.log(body);
  		});
        
    console.log("Полученные данные:" + body);
     
    response.writeHead(200);
    response.end("POST data received");
    
    //--БАЗА ДАННЫХ SQL-----------------------------
	connection.connect(function(err){
		if (err) {
			return console.error("Ошибка: " + err.message);
    	}
    	else{
    		console.log("Подключение к серверу MySQL успешно установлено");
    	}
	});
 	//--Чтение данных из базы
	connection.query("SELECT * FROM dataFromSensors", function(err, results, fields) {
    	console.log(err);
    	console.log(results); // собственно данные
    	//console.log(fields); // мета-данные полей 
	}); 
	//------

	//--Запись данных в базу
	const user = ["Supercomputer", "Temperature", 26, "2022-08-01 00:26:00", "Test BD"];
	const sql = "INSERT INTO dataFromSensors(ClientID, MeasureType, Value, Date, Comment) VALUES(?, ?, ?, ?, ?)";
	connection.query(sql, user, function(err, results) {
    	if(err) console.log(err);
    	else console.log("Данные добавлены");
	});
	//-----

	connection.end(function(err) {
		if (err) {
    		return console.log("Ошибка: " + err.message);
  		}
  		console.log("Подключение закрыто");
	});
	//----------------------------------------------
		
	}
	
	const { headers, method, url } = request;
	//console.log("Url: " + request.url);
	//console.log("IP: " + request.ip);
    //console.log("Тип запроса: " + request.method);
    //console.log("User-Agent: " + request.headers["user-agent"]);
    //console.log("Все заголовки");
    //console.log(request.headers);
    
	
};

const server = http.createServer(requestListener);
server.listen(port, host, 511, console.log(`Server is running on http://${host}:${port}`));