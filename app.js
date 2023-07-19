const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const oauth = require("./utility/auth");
const logout = require("./utility/jwt");
const env = require("dotenv").config();


// generates a random code for secret
// console.log(require('crypto').randomBytes(256).toString('base64'));

app = express();

// allows the application to read static files (html, css, js)
app.use("/public", express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));
// 
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true
}));

// allows the application read and store cookie
app.use(cookieParser());
// allows the application to read json files
app.use(express.json());

const port = process.env.PORT || 6060;

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(require("./documentation/swagger-ethnic.json")));
app.use(require("./routes/index"));

app.get("/home", (req, res) => {
    res.render("home")
});

app.get("/login-page", (req, res) => {
    res.render("login")
});

app.get("/logout", logout.logout);

app.get("/register", (req, res) => {
    res.render("register")
});

app.get("/welcome", logout.jwtAuthVerify, (req, res) => {
    res.render("welcome")
})



app.get("/githubOauth", oauth.oauthAuthorization);
app.get("/success", logout.jwtAuthVerify, oauth.oauthAuthorization)


app.listen(port, ()=> {
    console.log(`Server running on: ${port}`)
    
});
