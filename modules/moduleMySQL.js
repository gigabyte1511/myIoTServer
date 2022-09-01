
const mysql = require("mysql2");

const connection = mysql.createConnection({
	host: "127.0.0.1",
	user: "test",
	database: "Test",
	password: "123"
}).promise();

var read= async () => {
	//async
	console.log("Запущен модуль чтения для MySQL");
	await connection.connect()
	.then(res=>{
	 console.log('Успешно подключено')
	})
	.catch(err=>{
	 console.log('Возникла ошибка')
	})
   
	 //--Чтение данных из базы
	await connection.query("SELECT * FROM dataFromSensors")
	.then(res=>{
	 results = res
	})
	.catch(err=>{
		console.log(err)
	   })
   
	//console.log(results);
	return results;
   }
  

let write = (clientID,date,value,measureType,voltage,gps,comment) => {
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
	const user = [clientID, measureType, value, date, voltage, gps, comment];
	const sql = "INSERT INTO dataFromSensors(ClientID, MeasureType, Value, Date, Comment) VALUES(?, ?, ?, ?, ?)";
	connection.query(sql, user, function(err, results) {
    	if(err) console.log(err);
    	else console.log("Данные добавлены");
	});

}

module.exports = {
	read,
	write,

} 
