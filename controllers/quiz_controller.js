var models = require('../models/models.js');

/* Autoload */
exports.load = function(req, res, next, quizId) {
	models.Quiz.findById(quizId).then(function(quiz) {
		if(quiz) {
			req.quiz = quiz;
			next();
		}
		
		else {
			next(new Error("No existe el quizId=" + quizId));
		}
	}).catch(function(error) { 
		next(error);
	});
};

/* GET /quizes */
exports.index = function(req, res) {
	models.Quiz.findAll().then(function(quizes) {
		res.render('quizes/index.ejs', {quizes: quizes});
	}).catch(function(error){
		next(error);
	});
};

/* GET /quizes/:quizId */
exports.show = function(req, res) {
	res.render('quizes/show', {quiz : req.quiz});
};

/* GET /quizes/:quizId/answer */
exports.answer = function(req, res) {
	var rsp = "Incorrecto";
		
	if(req.query.respuesta === req.quiz.respuesta) {
		rsp = "Correcto";
	}
		
	res.render('quizes/answer', {quiz: req.quiz, respuesta : rsp});
};