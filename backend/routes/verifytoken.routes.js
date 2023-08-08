const {Router} = require('express');
const { verifyToken } = require('../controllers/verifytoken.controllers.js');
const { validateDocuments } = require('../middlewares/validate.documents.js');
const {validateJWT} = require('../middlewares/validate.jwt.js')

const router = Router();

router.post("/verify",[
    validateJWT,
    validateDocuments
] , verifyToken );


module.exports = router;