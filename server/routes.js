const router = require('express').Router();
const AppController = require('./controllers/AppController');
const UserController = require('./controllers/UserController');

// App routes

router.get('/', AppController.index);
router.get('/login', AppController.login);

// User routes 

router.post('/users/validate/:id', UserController.validate);

module.exports = router;