const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("../documentation/swagger-ethnic.json");


router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
// router.get("/api-docs", swaggerUi.setup(swaggerDoc));

// router.use("/api-docs", swaggerUi.serve);
// router.get("/api-docs", swaggerUi.setup(swaggerDoc));

module.exports = router;