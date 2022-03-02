const router = require('express').Router();
const AppController = require('./controllers/AppController');
const UserController = require('./controllers/UserController');
const RequestController = require('./controllers/RequestController');
const FinishedController = require('./controllers/FinishedController');

// App routes

router.get('/', AppController.index);
router.get('/login', AppController.login);
router.get('/gestao/:view', AppController.gestao);
router.get('/logoff', AppController.logoff);

// User routes 

router.post('/users/validate/:id', UserController.validate);
router.post('/users/login', UserController.login);

// Request routes 

router.get('/pedidos', RequestController.findAll);
router.get('/pedidos/:id', RequestController.findById);

router.post('/pedidos/create', RequestController.create);

// Finished routes

router.get('/finalizar', FinishedController.finishDay);

router.post('/finalizar/concluir/:reqId', FinishedController.addConcluida);
router.post('/finalizar/cancelar/:reqId', FinishedController.addCancelada);

module.exports = router;