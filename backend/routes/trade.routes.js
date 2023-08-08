const {Router} = require('express');
const { buy, sell} = require('../controllers/trade.controller.js');
const { validateDocuments } = require('../middlewares/validate.documents.js');
const {validateJWT, putDataUser} = require('../middlewares/validate.jwt.js')

const router = Router();

router.post("/buy",[
    putDataUser,
    validateDocuments
] , buy );

router.post("/sell",[
    validateJWT,
    putDataUser,
    validateDocuments
] , sell );

module.exports = router;