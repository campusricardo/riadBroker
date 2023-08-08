const {Router} = require('express');
const {check} = require ('express-validator');

const { login } = require('../controllers/auth.controllers.js');
const { validateDocuments } = require('../middlewares/validate.documents.js');

const router = Router();

router.post("/login",[
    check('username', 'The username is required').not().isEmpty(),
    check('password', 'The password is required').not().isEmpty(),
    validateDocuments
] , login );


module.exports = router;