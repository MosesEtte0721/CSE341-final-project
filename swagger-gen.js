const swaggerAutogen = require("swagger-autogen")();


const doc = {
     Info: {
        title: "API",
        Description: "Returns popular delicacies based on ethnicity in Nigeria"
    },
    Host: "localhost:8080",
    Schemes: ["http", "https"]
}




 swaggerAutogen(endPoint, outPoint, doc)