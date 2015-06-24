var models = require('../models/models.js');

/* Obtener Pregunta */
exports.question = function(req, res) {
	models.Quiz.findAll().then(function(quiz){
		res.render('quizes/question', {pregunta : quiz[0].pregunta});
	});
};

/* Obtener Respuesta */
exports.answer = function(req, res) {
	models.Quiz.findAll().then(function(quiz){
		var rsp = "Incorrecto";
		
		if(req.query.respuesta === quiz[0].respuesta) {
			console.log("Respuesta Correcta");
			rsp = "Correcto";
		}
		
		res.render('quizes/answer', {respuesta : rsp});
	});
};