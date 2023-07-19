
const database = require("../db/mongoDB").mongoDb();
const jwt = require("jsonwebtoken");
const env = require("dotenv").config()
const bcrypt = require("bcryptjs");
const {validationResult} = require("express-validator");
const paramId = require("mongodb").ObjectId;




const allUsers = async (req, res, next) => {
    const dbase = await database; // mongodb connection
    // finds collection from the profile database and converts the data to an array
    dbase
      .db("final-project")
      .collection("user-collection")
      .find()
      .toArray()
      .then((list) => {
        // sets the data type of the data retrieved

        // send the successful status code and converts the data to JSON
        if (dbase) {
          res.status(200).json(list);
        } else {
          res.status(404).send("<h4>Documents not found</h4>");
        }
        // database.close();
      });
  };
  
  // retrieve a single document from a collection
  const user = async (req, res, next) => {
    const param_id = new paramId(req.params.id);
  
    const dbase = await database;
   const collection = dbase
      .db("final-project")
      .collection("user-collection")
      .find({ _id: param_id })
      // .find({_id: new ObjectId(req.params.id)});
      .toArray()
      .then((doc) => {
        res.setHeader("Content-Type", "application/json");
        // checks if the connection was successful
        if (collection) {
          // console.log("This is a doucment from a collection")
          res.status(200).json(doc);
        } else {
          res.status(404).send("<h4>Document not found</h4>");
        }
        // database.close();
      });
  };


const login = async (req, res) => {
    // implements data validation from express-validator
    const validation = validationResult(req);
    // sends error messages resulting in wrong input by the user
    if(validation.errors.length > 0) {
        res.status(400).json({message: validation.errors});
        return;
    }
    // user inputs or data
    const coll = {
                email: req.body.email,
                password: req.body.password,
    }

        try {
            // mongoClient
            const dbase = await database;
            // loops through the collection in the database and returns  
            const dbColl = await dbase.db("final-project").collection("user-collection").find().toArray().then((list) => {
                const loop = list.filter((x)=> { return x.email, x.password})
                return loop; 
            })
            // 
            // gets all documents in the collection
            const documents = dbColl.filter((emel) => {return emel}); 
            // compares and returns email that matches with the user input
            const userEmail = documents.find((x) => {return x.email === coll.email});
            if(userEmail) {
                // the user hashed password
                const hashedPassword = userEmail.password
                // compares new password to the hashed password in the database
                const auth = await bcrypt.compare(coll.password, hashedPassword)
                if(auth){
                    // deletes password after successfull comparison
                    delete hashedPassword
                    // signs with JWT 
                    const signJwt = jwt.sign(userEmail, process.env.GITHUB_CLIENT_SECRET)
                    // stores in the cookies
                    res.cookie("jwtKey", signJwt)
                    // redirects to the home page
                    res.status(200).redirect("/home")
                    // return userEmail;
                } 
                else { 
                    res.status(400).redirect("/register")
                    throw Error("Invalid password. Please enter correct password")
                } 
            } 
            else {
                res.status(404).redirect("/register")
                throw Error("Incorrect Email")
            }
        } catch(error) {
            res.status(500).json({message: error.message})
        }
}

// validate data, hash password,signs with JWT, and insert data into the database
const register = async (req, res) => {
    // executes data validation
    let result = validationResult(req);
    // returns error message if the data does not match the requirement
    if(result.errors.length > 0){
      res.status(444).send(result.errors)
        return;
    }
    // uses bcryptjs to hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 15);

    const data = {
        email: req.body.email,
        password: hashedPassword,
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        profession: req.body.profession,
        country: req.body.country,
        phone: req.body.phone
    }

    const env = process.env.GITHUB_CLIENT_SECRET;
    // handles error
    try{
        // connects to the mongDb
        const dbase = await database;
        // inserts into the database and collection in mongoDb
        const dbCollection = await dbase.db("final-project").collection("user-collection").insertOne(data);
        
        // checks if insertion was successfull
        if(dbCollection.acknowledged){
            // uses jsonwebtoken to sign the data inserted
            const sign = await jwtSign(data, env);
            res.cookie("jwtKey", sign);
            // res.setHeader("Content-Type", "application/json")

            // return the status and redirect to login page , {maxAge: 300 * 24 * 60 * 60 * 30000}
            res.status(201).redirect("/login-page");
            
        }
         else {
            // sends status code for unsuccessful insertion
            res.status(400).redirect("/register")
            throw new Error("Error occurred while creating new user")
            
        }
    } catch(error) {
        res.status(500).json({message: error.message})
    }
};

const updateUser = async (req, res, next) => {
    // uses bcryptjs to hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 15);
    const data = {

        password: hashedPassword,
        email: req.body.email,
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        profession: req.body.profession,
        country: req.body.country,
        state: req.body.state,
        ethnic: req.body.ethnic,
        phone: req.body.phone
    };
   try {

    const param_id = new paramId(req.params.id)
    const dbase = await database;
    const collection = dbase
        .db("final-project")
        .collection("user-collection")
        .replaceOne({ _id: param_id }, data);

    if(collection) {
        res.status(201).send("successful");
    } else {
        res.status(404).send("Failed to update record")
    }

   } catch(error) {
    res.status(500).redirect("/home")
   }
}

function jwtSign(data, secret) {
    const sign = jwt.sign(data, secret);
    return sign;
}


const eraseUser =  async (req, res, next) => {
    
    const param_id = new paramId(req.params.id);

    try {
        const dbase = await database;
        const collection = dbase.db("final-project").collection("user-collection").deleteOne({_id: param_id}, true);
        res.setHeaders("Content-Type", "application/json")
        if(collection) {
            req.cookie("jwt", "", { maxAge: "1" });
            res.status(200).redirect("/register");
        } else {
            res.status(400).redirect("/home")
        }

    } catch(err) {
        res.status(500).redirect("/home")
    }
}

module.exports = {
    login,
    register,
    eraseUser,
    updateUser,
    user,
    allUsers
}