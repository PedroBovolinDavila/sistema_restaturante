const router = require('express').Router();
const AppController = require('./controllers/AppController');
const UserController = require('./controllers/UserController');
const RequestController = require('./controllers/RequestController');

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



module.exports = router;