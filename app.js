const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const env = require("dotenv").config();




app = express();

// 
app.use(session({
    secret: process.env.GITHUB_CLIENT_SECRET,
    resave: false,
    saveUninitialized: true,
}));
// allows the application read and store cookie
app.use(cookieParser());
// allows the application to read json files
app.use(express.json());
// allows the application to read static files (html, css, js)
app.use("/public", express.static("public"));
const port = 6060;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(require("./documentation/swagger-ethnic.json")));


app.get("/", (req, res)=> {
    res.send("<h1>Welcome to my home page</h1>")
});

app.listen(port, (req, res)=> {
    console.log(`Server running on: ${port}`)
})
