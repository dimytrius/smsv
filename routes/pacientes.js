module.exports = function(app) {
	var autenticar = require('./../middlewares/autenticador')
    , pacientes = app.controllers.pacientes;

  app.get('/pacientes', autenticar, pacientes.index);
  app.get('/paciente/:id', autenticar, pacientes.show);
  app.post('/paciente', autenticar, pacientes.create);
  app.get('/paciente/:id/editar', autenticar, pacientes.edit);
  app.put('/paciente/:id', autenticar, pacientes.update);
  app.delete('/paciente/:id', autenticar, pacientes.destroy);
};
