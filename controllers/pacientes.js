module.exports = function(app){
	var Usuario = app.models.usuario;

	var PacientesController = {
		index: function(req, res) {
			var _id = req.session.usuario._id;
			Usuario.findById(_id, function(erro,usuario){
				var pacientes = usuario.pacientes;
				var resultado = { pacientes: pacientes };
				res.render('pacientes/index', resultado);
			});
		},

		create :function(req, res) {
			var usuario = req.session.usuario,
				_id = usuario._id;

			Usuario.findById(_id, function(erro, usuario){
				if(erro) {
					console.error(erro);
					res.write('Usuario nao encontrado!');
				} else {
					var paciente = req.body.paciente;
					usuario.pacientes.push(paciente);

					usuario.save(function() {
						res.redirect('/pacientes');
					});
				}
			});
		},


		show :function(req, res){
			var _id = req.session.usuario._id;
			Usuario.findById(_id, function(erro, usuario) {
				var pacienteID = req.params.id;
				var paciente = usuario.pacientes.id(pacienteID);
				var resultado = { paciente: paciente };

				res.render('pacientes/show', resultado);
			});
		},

		edit: function(req, res){
			var _id = req.session.usuario._id;
			Usuario.findById(_id, function(erro, usuario) {
				var pacienteID = req.params.id;
				var paciente = usuario.pacientes.id(pacienteID);
				var resultado = { paciente: paciente };
				res.render('pacientes/edit', resultado);
			});
		},


		update: function(req, res){
			var _id = req.session.usuario._id;
			Usuario.findById(_id, function(erro, usuario) {
				var pacienteID = req.params.id;
				var paciente = usuario.pacientes.id(pacienteID);
				paciente.nome = req.body.paciente.nome;
				paciente.email = req.body.paciente.email;
				usuario.save(function() {
					res.redirect('/pacientes');
				});
			});
		},


		destroy: function(req, res) {
			var _id = req.session.usuario._id;
			Usuario.findById(_id, function(erro, usuario){
				var pacienteID = req.params.id;
				usuario.pacientes.id(pacienteID).remove();
				usuario.save(function() {
					res.redirect('/pacientes');
				});
			});
		}
	};
	return PacientesController
};
