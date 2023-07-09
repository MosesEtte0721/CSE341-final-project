const mongodb = require("../db/mongoDB");
const objectId = require("../db/mongDB").ObjectId;

const delicacies = async (req, res, next) => {
    const mongoDB = await mongodb;
    try {

        const collection = mongoDB.db("final-project").collection("delicacy-collection");
        collection.find({}).toArray().then((x) => {
        res.setHeaders("Content-Type", "application/json");
        if(mongoDB) {
            res.status(200).json(x)
        } else {
            res.status(401).send("Bad request")
        }
    })

    } catch(error) {
        res.status(500).json({message: error.message})
    }
    
};

const delicacySingle = async (req, res, next) => {
    const mongoDB = await mongodb;
    const objId = new objectId(req.params.id)

    try {

        const collection = mongoDB.db("final-project").collection("delicacy-collection");
        collection.find({_id: objId}).toArray().then((x) => {
        res.setHeaders("Content-Type", "application/json");
        if(mongoDB) {
            res.status(200).json(x)
        } else {
            res.status(401).send("Bad request")
        }
    })

    } catch(error) {
        res.status(500).json({message: error.message})
    }
    
}


