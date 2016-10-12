module.exports = function(app) {
	var autenticar = require('./../middlewares/autenticador')
    , usuarios = app.controllers.usuarios;

  app.get('/usuarios', autenticar, usuarios.index);
  app.get('/contato/:id', autenticar, usuarios.show);
  app.post('/usuarios', autenticar, usuarios.create);
  app.get('/contato/:id/editar', autenticar, usuarios.edit);
  app.put('/contato/:id', autenticar, usuarios.update);
  app.delete('/contato/:id', autenticar, usuarios.destroy);
};
