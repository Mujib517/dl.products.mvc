const router = require('express').Router();
const bookCtrl = require('../controllers/book.ctrl');

router.get('/', bookCtrl.get);
router.get('/new', bookCtrl.new);
router.get('/:id', bookCtrl.getById);
router.post('/', bookCtrl.save); //http post domain.com/books
router.post('/delete/:id', bookCtrl.delete);


module.exports = router;