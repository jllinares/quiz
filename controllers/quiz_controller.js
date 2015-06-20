/* Obtener Pregunta */
exports.question = function(req, res) {
	res.render('quizes/question', {pregunta : 'Capital de Italia'});
};

/* Obtener Respuesta */
exports.answer = function(req, res) {
	var rsp = "Incorrecto";
	
	if(req.query.respuesta === "Roma") {
		rsp = "Correcto";
	}
	
	res.render('quizes/answer', {respuesta : rsp});
};