const router = require("express").Router();
const loginReg = require("../controller/log-reg");
const {checkSchema} = require("express-validator");
const validateUpdate = require("../validation/validation-update");



router.get("/allusers", loginReg.allUsers);
router.get("/oneuser/:id", loginReg.user);
router.delete("/deleteuser/:id",   loginReg.eraseUser);
router.put("/updateuser/:id",  loginReg.updateUser);
// 

router.post("/registeruser", checkSchema(validateUpdate.schema), loginReg.register);
router.post("/login", loginReg.login);

module.exports = router;

