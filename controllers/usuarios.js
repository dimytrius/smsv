module.exports = function(app){
	var Usuario = app.models.usuario;

	var UsuariosController = {
		index: function(req, res){
		},

		create :function(req, res){
			console.log(req);
			var usuario = new Usuario(req.body.usuario);
			usuario.save(function(err) {
				if(!err) {
					console.log('usuario n criado');
					res.write('usuario n criado');
				}
				res.write('Usuário criado!');
			});
		},


		show :function(req, res){
			var _id = req.session.usuario._id;
			Usuario.findById(_id, function(erro, usuario) {
				var contatoID = req.params.id;
				var contato = usuario.contatos.id(contatoID);
				var resultado = { contato: contato };

				res.render('contatos/show', resultado);
			});
		},

		edit: function(req, res){
			var _id = req.session.usuario._id;
			Usuario.findById(_id, function(erro, usuario) {
				var contatoID = req.params.id;
				var contato = usuario.contatos.id(contatoID);
				var resultado = { contato: contato };
				res.render('contatos/edit', resultado);
			});
		},


		update: function(req, res){
			var _id = req.session.usuario._id;
			Usuario.findById(_id, function(erro, usuario) {
				var contatoID = req.params.id;
				var contato = usuario.contatos.id(contatoID);
				contato.nome = req.body.contato.nome;
				contato.email = req.body.contato.email;
				usuario.save(function() {
					res.redirect('/contatos');
				});
			});
		},


		destroy: function(req, res) {
			var _id = req.session.usuario._id;
			Usuario.findById(_id, function(erro, usuario){
				var contatoID = req.params.id;
				usuario.contatos.id(contatoID).remove();
				usuario.save(function() {
					res.redirect('/contatos');
				});
			});
		}
	};
	return UsuariosController
};
