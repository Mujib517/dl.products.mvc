const router = require('express').Router();
const bookCtrl = require('../controllers/book.ctrl');

router.get('/', bookCtrl.get);


module.exports = router;