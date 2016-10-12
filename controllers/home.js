module.exports = function (app) {

	var Usuario = app.models.usuario;

	var HomeController = {
		index: function (req, res) {
			res.render('home/index');
		},
		login: function(req, res){
			var query = {email: req.body.usuario.email};
			Usuario.findOne(query)
			.select('nome email pacientes')
			.exec(function(erro, usuario){
				if (usuario) {
					req.session.usuario = usuario;
					res.redirect('/pacientes');
				} else {
					var usuario = req.body.usuario;
					usuario.pacientes = [];
					Usuario.create(usuario, function(erro, usuario){
						if(erro){
							console.error(erro);
							res.redirect('/');
						} else {
							req.session.usuario = usuario;
							res.redirect('/pacientes');
						}
					});
				}
			});
		},
		logout: function(req, res) {
			req.session.destroy();
			res.redirect('/');
		}
	};

	return HomeController;
};
