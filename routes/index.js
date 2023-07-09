const express = require("express").Router;
const swaggerUi = require("swagger-ui-express");






router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(require("./documentation/swagger-ethnic.json")));

