// imports database connection
const mongodb = require("../db/mongoDB");
const objectId = require("../db/mongoDB").ObjectId;

// Returns all the documents in the collection
const ethnics = async (req, res) => {
    const mongoDB = await mongodb;
    const collection = mongoDB.db("final-Project").collection("ethnic-collection");
    try {
        const query = collection.find({}).toArray()
        .then((x) => {
        res.setHeader("Content-Type", "application/json");
        if(mongoDB) {
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

const ethnicPost = async (req, res) => {
    const parameters = {
        name: req.body.ethnic,
        tribe: req.body.tribe,
        state: req.body.state,
        country: req.body.country,
        region: req.body.region,
        language: req.body.language,
        image: req.body.image,
        delicacies: req.body.delicacies
    }

    const mongoDB = await mongodb;
    const collection =  mongoDB.db("final-project").collection("ethnic-collection");
    try {
        collection.insertOne(parameters);
        res.setHeader("Content-Type", "application/json")
        if(data.acknowledged) {
            res.status(201).send(`Document was inserted with _id ${data.insertedId}`)
        } else {
            res.status(404).send("NOT FOUND")
        }

    } catch(error) {
        res.status(500).json(error.message)
    }

}

const ethnicPostId = async (req, res) => {
    const parameters = {
        name: req.body.ethnic,
        tribe: req.body.tribe,
        state: req.body.state,
        country: req.body.country,
        region: req.body.region,
        language: req.body.language,
        image: req.body.image,
        delicacies: req.body.delicacies
    }
    const objId = new objectId(req.params.id)
    const mongoDB = await mongodb;
    const collection =  mongoDB.db("final-project").collection("ethnic-collection");

    try {
        collection.insertOne(objId);
        res.setHeader("Content-Type", "application/json")
        if(data.acknowledged) {
            res.status(201).send(`Document was inserted with _id ${data.insertedId}`)
        } else {
            res.status(404).send("NOT FOUND")
        }

    } catch(error) {
        res.status(500).json(error.message)
    }
}

const ethnicPutId = async (req, res, next) => {
    // parameters 
    const parameters = {
        name: req.body.ethnic,
        tribe: req.body.tribe,
        state: req.body.state,
        country: req.body.country,
        region: req.body.region,
        language: req.body.language,
        image: req.body.image,
        delicacies: req.body.delicacies
    }
    // extracts _id from the collection
    const objId = new objectId(req.params.id);
    // connects to the database
    const mongoDB = await mongdb;
    const collection = mongoDB.db("final-project").collection("ethnic-collection");

    try {
        collection.replaceOne({_id:objId, parameters});

        if(collection.modifiedCounted > 0) {
            res.status(202).send("successful")
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
        if(collection.deletedCount > 0) {
            res.status(200).send(`<h2>deleted</h2>`)
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
    ethnicPostId,
    ethnicPost,
    ethnicSingle,
    ethnics
}