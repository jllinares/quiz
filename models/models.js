var path = require('path');

/* Carga de parametros de conexion a la BD */
var url 		= process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\/(.*)/);
var DB_name 	= (url[6]||null);
var user 		= (url[2]||null);
var pwd 		= (url[3]||null);
var protocol 	= (url[1]||null);
var dialect 	= (url[1]||null);
var port 		= (url[5]||null);
var host 		= (url[4]||null);
var storage 	= process.env.DATABASE_STORAGE;

/* Carga Modelo ORM */
var Sequelize = require('sequelize');

/* Usar BD SQLite */
var sequelize = new Sequelize(DB_name, user, pwd, {dialect: dialect, protocol: protocol, port: port, host: host, storage: storage, omitNull: true});

/* Importar la definicion de la tabla Quiz en quiz.js */
var quiz_path = path.join(__dirname, 'quiz');
var Quiz = sequelize.import(quiz_path);

/* Exportar definicion de la tabla Quiz */
exports.Quiz = Quiz;

/* Se crea e inicializa la BD */
sequelize.sync().then(function(){
		Quiz.count().then(function(count){
			/* Se inicializa la tabla */
			if(count===0) {
				Quiz.create({pregunta: 'Capital de Italia', respuesta: 'Roma'}
				).then(function(){
					console.log("Base de datos inicializada");
				});
			}
		});
});