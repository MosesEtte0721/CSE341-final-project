const router = require("express").Router();
const ethnic = require("../controller/ethnic");
const {checkSchema} = require("express-validator")

const validator = require("../validation/validator-ethnic").scheme;

router.use("/ethnics",  ethnic.ethnics);
router.use("/ethnic/:id",  ethnic.ethnicSingle);
router.use("/ethnic-post", checkSchema(validator), ethnic.ethnicPost);
router.use("/ethnic-put/:id", checkSchema(validator), ethnic.ethnicPutId);
router.use("/ethnic-del/:id", ethnic.ethnicDel)

module.exports = router;





