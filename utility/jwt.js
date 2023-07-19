const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();


const jwtAuthSign = async (param) => {

    const jwtSigned = await jwt.sign({
        expIn: "7d",
        data: param,
        algorithm: 'RS256'
    }, process.env.SECRET_KEY);

    return jwtSigned;

};

const jwtAuthVerify = async (req, res, next) => {
    const jwtCookie = req.cookies.jwtKey;
    if(jwtCookie == null) {
        return res.status(402).redirect("/home");
    }
    else {
        jwt.verify(jwtCookie, process.env.GITHUB_CLIENT_SECRET, function(err, user) {
            if(err) {
                res.status(400).redirect("/login-page");
            } 
            else {
                req.user = user;
                next();
            }
            
        });
    }
    

    
};

const logout = (res, req, next) => {
    req.cookie("jwtKey", "", { maxAge: "1" }).redirect("/welcome");

}





module.exports = {
    jwtAuthSign,
    jwtAuthVerify,
    logout
}