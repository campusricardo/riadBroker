const {Router} = require('express');
const {check} = require('express-validator');
const {existEmail, existUsername} = require('../helpers/db.validators.js');

const {validateDocuments} = require('../middlewares/validate.documents.js');

const {postUsers} = require('../controllers/users.controllers.js');
const router = Router();
router.post("/user",[
        check('username', 'username is not valid and it cannot be up to 20 characteres').custom(existUsername).isLength({max: 20}),
        check('email', 'This is not an email').isEmail(),
        check('email').custom(existEmail),
        check('password', 'the password lengrh must be greater than 8 or 8').isLength({min :8}),
        validateDocuments
] ,postUsers);
module.exports = router;