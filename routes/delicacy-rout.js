const express = require("express");
const router = express.Router()
const delicacy = require("../controller/delicacy")

router.use("/delicacies", delicacy.delicacies);
router.use("/delicacy/:id", delicacy.delicacySingle);
router.use("/delicacy-post", delicacy.delicacyPost);
router.use("/delicacy-del", delicacy.delicacyDel);
router.use("/delicacy-put", delicacy.delicacyPut)


module.exports = router
