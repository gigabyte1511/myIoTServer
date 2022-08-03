
const http = require("http");
const host = 'localhost';
const port = 8000;

const mysql = require("mysql2");

const fs = require('fs').promises;

let mySQL= require('./modules/moduleMySQL');
  
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
		var body = [];
  		request.on('error', (err) => { console.error(err)});
  		request.on('data', (chunk) => { body.push(chunk) });
  		request.on('end', () => {
  			body = Buffer.concat(body).toString();
  			console.log(body);
  			var parseBody = JSON.parse(body);
  			mySQL.write(parseBody.clientID, parseBody.date, parseBody.value, 
  							parseBody.measureType, parseBody.comment);
    		console.log(parseBody.type);

  			
  		});
        
    //console.log("Полученные данные:" + body); 
    response.writeHead(200);
    response.end("POST data received");
    //console.log(body1);
	}
	
	//const { headers, method, url } = request;
	//console.log("Url: " + request.url);
	//console.log("IP: " + request.ip);
    //console.log("Тип запроса: " + request.method);
    //console.log("User-Agent: " + request.headers["user-agent"]);
    //console.log("Все заголовки");
    //console.log(request.headers);
    
	
};

const server = http.createServer(requestListener);
server.listen(port, host, 511, console.log(`Server is running on http://${host}:${port}`));

// ---------- >mySQL.read();
// ---------- >mySQL.write();
