const express = require("express");
const router = express.Router()
const swaggerUi = require("swagger-ui-express");







router.use("/", require("./swagger-rout"));


router.use("/", require("./delicacy-rout"))
router.use("/", require("./ethnic-rout"));

module.exports = router

