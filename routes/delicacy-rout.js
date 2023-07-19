const express = require("express");
const router = express.Router();
const delicacy = require("../controller/delicacy");
const {checkSchema} = require("express-validator");
const validateUpdate = require("../validation/validator-delicacy-update").scheme;
const validate = require("../validation/validator-delicacy").scheme;
const oauth = require("../utility/auth");
const jwt = require("../utility/jwt");


router.get("/delicacies",  delicacy.delicacies);
router.get("/delicacy/:id", delicacy.delicacySingle);

router.post("/delicacy-post", checkSchema(validate), jwt.jwtAuthVerify, delicacy.delicacyPost);

router.delete("/delicacy-del/:id", jwt.jwtAuthVerify, delicacy.delicacyDel);
router.put("/delicacy-put/:id",  jwt.jwtAuthVerify,delicacy.delicacyPut)


module.exports = router
