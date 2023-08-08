const {Router} = require('express');
const { getTrade} = require('../controllers/trades.controllers.js');
const { validateDocuments } = require('../middlewares/validate.documents.js');
const {validateJWT,getTrades} = require('../middlewares/validate.jwt.js')

const router = Router();

router.get("/trades",[
    getTrades,
    validateDocuments
] , getTrade );


module.exports = router;