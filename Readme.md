<h1 align = "center">Система учета и отслеживания IoT-устройств</h1>
	<p>
		<img src="html/img/iot-icon.svg" alt="" >
	</p>
myIoTServer - система, служащая для приема, хранения и визуализации клиенту-администратору полученных от IoT-устройств данных.<br>
Сервер.<br>
Сервер представляет собой удаленную виртутальную машину с Linux дистрибутивом Ubuntu, на котором запущена демон-программа, на писанная на языке Node.js, представляющая собой node.js модуль EXPRES XXXXXXXXXX . Программа осуществяет возжножность приема POST-запросов от IoT устройств в формате JSON, GET-запросов от клиента-администратора, и реализует ответ в виде кодов состояний запросов и html-страницы графической панели. Также, это программа обеспечивает взаимодействие с базой данных при помощи node.js модуля mysql2.<br>
База данных.<br>
Хранение данных, полученных от IoT-устройств, реализовано в виде реляционной базы данных, модификация и управление которой осуществляется при помощи системы MySQL. База данных представляет собой таблицу, содержащую в себе имена устройств, от которых были полученны данные, типы их измерений, значения показаний, даты выполения измерений, GPS-координаты устройств, состояния источников питания и комментарии.<br>
СУиМ.<br>
CУиМ - это система учета и мониторинга устройств, представляющая собой графическую панель и служащая для визуализации полученных от IoT-устройств данных, содержащих в себе информацию об этих устройствах, их соотояния и переданные ими данные.
