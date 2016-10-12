module.exports = function(app) {
	var Schema = require('mongoose').Schema;

	var ecg = Schema({
		x: Number,
		y: Number
	});

	var paciente = Schema({
		nome: String,
		email: String,
		ecg: [ecg]
	});

	var usuario = Schema({
		nome: {type: String, required:true},
		email: {type: String, required:true},
		senha: {type: String, required:true},
		pacientes: [paciente]
	});

	return db.model('usuarios',usuario);
};
