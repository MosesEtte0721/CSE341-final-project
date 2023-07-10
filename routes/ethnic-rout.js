const router = require("express").Router();
const ethnic = require("../controller/ethnic");




router.use("/ethnics", ethnic.ethnics);
router.use("/ethnic/:id", ethnic.ethnicSingle);
router.use("/ethnic-post", ethnic.ethnicPost);
router.use("/ethnic-put/:id", ethnic.ethnicPutId);
router.use("/ethnic-del/:id", ethnic.ethnicDel)

module.exports = router;





