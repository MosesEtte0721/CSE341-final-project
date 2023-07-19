// imports database connection
const mongodb = require("../db/mongoDB").mongoDb();
const objectId = require("mongodb").ObjectId;
const { error } = require("console");
const { validationResult}  = require("express-validator");
const jwtSign = require("../utility/jwt");
const dotenv = require("dotenv").config();




// Returns all the documents in the collection
const ethnics = async (req, res) => {
    const mongoDB = await mongodb;
    const collection = mongoDB.db("final-project").collection("ethnic-collection");
    try {
     // query the collection
         collection.find({}).toArray().then((x) => {
            res.setHeader("Content-Type", "application/json");
        if(mongoDB) {
            console.log("This works")
            res.status(200).json(x)
        } else {
            res.status(404).json({message: "NOT FOUND"})
        }
    })

    } catch(error) {
        res.status(500).json({message: error.message})
    }

}

const ethnicSingle = async (req, res) => {
    // extracts the _id from a document in the collection
    const objId = new objectId(req.params.id);
    // connects to the database
    const mongoDB = await mongodb;
    // access the collection
    const collection = mongoDB.db("final-project").collection("ethnic-collection");
   try {
    // query the collection
        collection.find({_id: objId }).toArray().then((x) => {
            res.setHeader("Content-Type", "application/json");
            if(mongoDB) {
                res.status(200).json(x)
            } else {
                res.status(404).send("NOT FOUND")
            }
        })

   } catch(error) {
        res.status(500).json({message: error.message})
   }
}

// const ethnicPost = async (req, res) => {
//     const parameters = {
//         ethnic: req.body.ethnic,
//         states: req.body.states,
//         country: req.body.country,
//         region: req.body.region,
//         language: req.body.language,
//         image: req.body.image,
//         delicacies: req.body.delicacies
//     };
    
//     const validateData = validationResult(req);

//     function errors(){
//         const errorMessages = validateData.errors.map((x) => x.msg);
//         const errorPath = validateData.errors.map((x) => x.path);
//         return errorMessages
//     }

//     if(validateData.errors.length > 0) {
//         res.status(401).send(errors())
//     };

//     const mongoDB = await mongodb;
//     // res.setHeader("Content-Type", "application/json");
//     const collection =  mongoDB.db("final-project").collection("ethnic-collection");
//     try {
//         collection.insertOne(parameters);

//         res.setHeader("Content-Type", "application/json");

//         if(collection.acknowledged) {
//             const sign = await jwtSign(parameters, process.env.SECRET_KEY);
//             res.cookie("jwtkey", sign)
//              res.status(201);
//              return;
//         } 
//         else {
//              res.status(404).send("NOT FOUND")
//              return;
//         }

//     } catch(error) {
//          res.status(500).json(error.message)
//         return
//     }
// }

const ethnicPost = async (req, res) => {
    const parameters = {
        ethnic: req.body.ethnic,
        states: req.body.states,
        country: req.body.country,
        region: req.body.region,
        language: req.body.language,
        image: req.body.image,
        delicacies: req.body.delicacies
    };

    const validateData = validationResult(req);

    function errors(){
        const errorMessages = validateData.errors.map((x) => x.msg);
        const errorPath = validateData.errors.map((x) => x.path);
        return errorMessages
    };

    if(validateData.errors.length > 0) {
        res.status(401).send(errors())
        return;
    };

    // const objId = new objectId(req.params.id)
    const mongoDB = await mongodb;
    const collection =  mongoDB.db("final-project").collection("ethnic-collection");

    try {
        collection.insertOne(parameters);
        res.setHeader("Content-Type", "application/json")
        if(collection) {
            const sign = await jwtSign.jwtAuthSign(parameters);
            res.cookie("jwtkey", sign);
            res.status(201).send(`Document was inserted`)
            return;
        } else {
            res.status(404).send("NOT FOUND")
            return;
        }

    } catch(error) {
        res.status(500).json(error.message)
    }
}

const ethnicPutId = async (req, res, next) => {
    // parameters 
    const parameters = {
        ethnic: req.body.ethnic,
        states: req.body.states,
        country: req.body.country,
        region: req.body.region,
        language: req.body.language,
        image: req.body.image,
        delicacies: req.body.delicacies
    }

    const validateData = validationResult(req);

    function errors(){
        const errorMessages = validateData.errors.map((x) => x.msg);
        const errorPath = validateData.errors.map((x) => x.path);
        return errorMessages
    }
    


    if(validateData.errors.length > 0) {
       
        res.status(401).json({errorMessage: errors()})
        return;
    };

    // extracts _id from the collection
    const objId = new objectId(req.params.id);
    // connects to the database
    const mongoDB = await mongodb;
    const collection = await mongoDB.db("final-project").collection("ethnic-collection");

    try {
        collection.replaceOne({_id: objId}, parameters);

        if(collection) {
            const sign = await jwtSign.jwtAuthSign(parameters, process.env.SECRET_KEY);
            res.cookie("jwtkey", sign);
            res.status(202).send("Updated! successfully updated the document")
        } else {
            res.status(401).send("<h2>Not allowed</h2>")
        }
    } catch(error) {
        res.status(500).send(error.message)
    }

}

const ethnicDel = async (req, res, next) => {
    const objId = new objectId(req.params.id);
    const mongoDB = await mongodb;
    const collection = mongoDB.db("final-project").collection("ethnic-collection");
    collection.deleteOne({ _id: objId}, true)
    try {
        if(collection.acknowledged) {
            res.status(200).send("Deleted! Document has been deleted permanently")
        } else {
            res.status(403).send("<h2>Not Deleted</h2>")
        }
       

    } catch(error) {
        res.status(500).send(`<h2>error.message</h2>`)
    }
}

module.exports = {
    ethnicDel,
    ethnicPutId,
    ethnicPost,
    ethnicSingle,
    ethnics
}