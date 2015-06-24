var models = require('../models/models.js');
var strUtl = require('string');
var strUtl2 = require('change-case')

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
exports.index = function(req, res, next) {
	var search = "";
	
	if(req.query.search!=undefined) {
		search = strUtl(req.query.search).trim().replaceAll(" ", "%").s;
	}
	
	models.Quiz.findAll({where: ["lower(pregunta) like lower(?)", "%"+search+"%"]}).then(function(quizes) {
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
		
	if(strUtl2.upperCase(strUtl(req.query.respuesta).trim().s) === strUtl2.upperCase(req.quiz.respuesta)) {
		rsp = "Correcto";
	}
		
	res.render('quizes/answer', {quiz: req.quiz, respuesta : rsp});
};