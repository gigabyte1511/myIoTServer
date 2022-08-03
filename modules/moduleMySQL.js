
const mysql = require("mysql2");

const connection = mysql.createConnection({
	host: "127.0.0.1",
	user: "test",
	database: "Test",
	password: "123"
});

let read = () => {
	console.log("Запущен модуль чтения для MySQL");
	
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
	
	connection.end(function(err) {
		if (err) {
    		return console.log("Ошибка: " + err.message);
  		}
  		console.log("Подключение закрыто");
	});
	
}
let write = (clientID,date,value,measureType,comment) => {
	console.log("Запущен модуль записи для MySQL");
	
	connection.connect(function(err){
		if (err) {
			return console.error("Ошибка: " + err.message);
    	}
    	else{
    		console.log("Подключение к серверу MySQL успешно установлено");
    	}
	});
	
	//--Запись данных в базу
	const user = [clientID, measureType, value, date, comment];
	const sql = "INSERT INTO dataFromSensors(ClientID, MeasureType, Value, Date, Comment) VALUES(?, ?, ?, ?, ?)";
	connection.query(sql, user, function(err, results) {
    	if(err) console.log(err);
    	else console.log("Данные добавлены");
	});
	//-----

	//connection.end(function(err) {
	//	if (err) {
    //		return console.log("Ошибка: " + err.message);
  	//	}
  	//	console.log("Подключение закрыто");
  //});
	//-----------------------
	
}

module.exports = {
	read,
	write,
} 
