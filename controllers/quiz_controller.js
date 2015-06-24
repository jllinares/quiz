var models = require('../models/models.js');

/* GET /quizes */
exports.index = function(req, res) {
	models.Quiz.findAll().then(function(quizes) {
		res.render('quizes/index.ejs', {quizes: quizes});
	});
};

/* GET /quizes/:quizId */
exports.show = function(req, res) {
	models.Quiz.findById(req.params.quizId).then(function(quiz){
		res.render('quizes/show', {quiz : quiz});
	});
};

/* GET /quizes/:quizId/answer */
exports.answer = function(req, res) {
	models.Quiz.findById(req.params.quizId).then(function(quiz){
		var rsp = "Incorrecto";
		
		if(req.query.respuesta === quiz.respuesta) {
			rsp = "Correcto";
		}
		
		res.render('quizes/answer', {quiz: quiz, respuesta : rsp});
	});
};