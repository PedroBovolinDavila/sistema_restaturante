const router = require('express').Router();
const path = require('path');
const multer = require('multer');

const AppController = require('./controllers/AppController');
const UserController = require('./controllers/UserController');
const RequestController = require('./controllers/RequestController');
const FinishedController = require('./controllers/FinishedController');
const ProductController = require('./controllers/ProductController');
const CategoryController = require('./controllers/CategoryController');

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', '/public/images'))
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname);
  }
})

const upload = multer({
  storage: storageConfig
}).single('image');

// App routes

router.get('/logoff', AppController.logoff);
router.get('/gestao/:view', AppController.gestao);
router.get('/add/:view', AppController.add);
router.get('/login', AppController.login);
router.get('/', AppController.index);

// User routes 

router.post('/users/validate/:id', UserController.validate);
router.post('/users/login', UserController.login);

// Request routes 

router.get('/pedidos', RequestController.findAll);
router.get('/pedidos/:id', RequestController.findById);

router.post('/pedidos/create', RequestController.create);
router.post('/pedidos/update/:id', RequestController.update);

// Finished routes

router.get('/finalizar', FinishedController.finishDay);

router.post('/finalizar/concluir/:reqId', FinishedController.addConcluida);
router.post('/finalizar/cancelar/:reqId', FinishedController.addCancelada);

// Product routes 

router.get('/produtos/:id', ProductController.findById);

router.post('/produtos/create', upload, ProductController.create);

// Category routes 

router.get('/categorias', CategoryController.getAll)

router.post('/categorias/create', CategoryController.add);

module.exports = router;