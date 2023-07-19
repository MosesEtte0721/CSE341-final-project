const axios = require("axios");
const dotenv = require("dotenv").config();

const oauthAuthorization = (req, res) => {
    const urlEndPoint = process.env.ISSUER_URL;
    // const queryParam = new newURLSearchParams({
    //     response_type: "code",
    //     client_id: process.env.GITHUB_CLIENT_ID,
    //     secret: process.env.BASE_URL 
    // });
    // const url = `${urlEndPoint}?client_id=${process.env.GITHUB_CLIENT_ID}&prompt=consent`;

    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&prompt=consent`);
};

 const oauthAuthentication =  (req, res, next) => {
    const urlEndPoint = process.env.REDIRECT_URL
    const authToken = req.query.code;
    const client_secret = process.env.GITHUB_CLIENT_SECRET;

    const body = {
        // make a POST request
        method: "post",
        grant_type: "authorization code",
        // to the Github authentication API, with the client ID, client secret
        // and request token
        url: `${urlEndPoint}client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${client_secret}&access_token=${authToken}`,
        // Set the content type header, so that we get the response in JSOn
        headers: {
            accept: "application/json"
        }
        
    };

    axios({body}).then((res) => {
        // Once we get the response, extract the access token from
        // the response body
        const accessToken = res.data.access_token;
        // redirect the user to the welcome page, along with the access token
        res.redirect(`../views/home.ejs?access_token=${accessToken}`);
       
    });

    next();
};

module.exports = {
    oauthAuthentication,
    oauthAuthorization
}


