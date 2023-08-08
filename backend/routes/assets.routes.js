const {Router} = require('express');
const { getDataforPie } = require('../controllers/assest.controllers.js');
const { validateDocuments } = require('../middlewares/validate.documents.js');
const {validateJWT, getDataUser} = require('../middlewares/validate.jwt.js')

const router = Router();

router.get("/assets",[
    validateJWT,
    getDataUser,
    validateDocuments
] , getDataforPie );


module.exports = router;