const router = require("express").Router();
const ethnic = require("../controller/ethnic");
const {checkSchema} = require("express-validator")
const jwt = require("../utility/jwt")


const validator = require("../validation/validator-ethnic").scheme;
const validatorUpdate = require("../validation/validator-ethnic-update").scheme;

router.get("/ethnics",  ethnic.ethnics);
router.get("/ethnic/:id",  ethnic.ethnicSingle);
router.post("/ethnic-post", checkSchema(validator), jwt.jwtAuthVerify, ethnic.ethnicPost);
router.put("/ethnic-put/:id",  jwt.jwtAuthVerify, ethnic.ethnicPutId);
router.delete("/ethnic-del/:id", ethnic.ethnicDel)

module.exports = router;





