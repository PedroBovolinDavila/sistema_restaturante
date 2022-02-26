const router = require('express').Router();
const AppController = require('./controllers/AppController');
const UserController = require('./controllers/UserController');

// App routes

router.get('/', AppController.index);
router.get('/login', AppController.login);
router.get('/gestao/:view', AppController.gestao);

// User routes 

router.post('/users/validate/:id', UserController.validate);
router.post('/users/login', UserController.login);

module.exports = router;