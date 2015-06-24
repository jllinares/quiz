var path = require('path');

/* Carga Modelo ORM */
var Sequelize = require('sequelize');

/* Usar BD SQLite */
var sequelize = new Sequelize(null, null, null, {dialect: "sqlite", storage: "quiz.sqlite"});

/* Importar la definicion de la tabla Quiz en quiz.js */
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

/* Exportar definicion de la tabla Quiz */
exports.Quiz = Quiz;

console.log(sequelize.sync());

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