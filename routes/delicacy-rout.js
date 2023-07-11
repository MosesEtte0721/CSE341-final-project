const express = require("express");
const router = express.Router()
const delicacy = require("../controller/delicacy");
const {checkSchema} = require("express-validator");
const validate = require("../validation/validator-delicacy").scheme;

router.use("/delicacies", delicacy.delicacies);
router.use("/delicacy/:id", delicacy.delicacySingle);

router.use("/delicacy-post", checkSchema(validate), delicacy.delicacyPost);

router.use("/delicacy-del/:id", delicacy.delicacyDel);
router.use("/delicacy-put/:id", checkSchema(validate), delicacy.delicacyPut)


module.exports = router
