const mongodb = require("../db/mongoDB").mongoDb();
const objectId = require("mongodb").ObjectId;

const delicacies = async (req, res) => {
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

const delicacySingle = async (req, res) => {
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
    
};

const delicacyPost = async (req, res) => {
    const parameters = {
        name: req.body.name,
        ethnic: req.body.ethnic,
        tribe: req.body.tribe,
        ingredients: req.body.ingredients,
        method: req.body.method

    }

    const mongoDB = await mongodb;
    try {
        const collection = mongoDB.db("final-project").collection("delicacy-collection");
        collection.insertOne(parameters);
        if(collection.acknowledged) {
            res.status(202).send("successful")
        } 
        else {
            res.status(401).send("Failed! Document not created")
        }

    } catch(error) {
        res.status(500).json({message: error.message})
    }
};

const delicacyPut = async (req, res) => {
    const parameters = {
        name: req.body.name,
        ethnic: req.body.ethnic,
        tribe: req.body.tribe,
        ingredients: req.body.ingredients,
        method: req.body.method

    }

    const objId = new objectId(req.params.id)
    const mongoDB = await mongodb;

    try {
        const collection = await mongoDB.db("final-project").collection("delicacy-collection");

        collection.replaceOne({ _id: objId}, parameters);

        if(collection.modifyCounted > 0) {
            res.status(202).send("successful")
        } 
        else {
            res.status(401).send("Failed! Document not updated")
        }

    } 
    catch(error) {
        res.status(500).json({message: error.message})
    }
};

const delicacyDel = async(req, res) => {
    const objId = new objectId(req.params.id);
    const mongoDB = await mongodb;

    try{

        const collection = mongoDB.db("final-project").collection("delicacy-collection");
        collection.deleteOne({_id: objId}, true);

        if(collection.deletedCount > 0) {
            res.status(200).send("Deleted! Document is permanently deleted");
        } 
        else {
            res.status(401).send("Failed! Document was not deleted")
        }

    }
    catch(error) {
        res.status(500).json({message: error.message})
    }
    

};


module.exports = {
    delicacies,
    delicacySingle,
    delicacyPut,
    delicacyDel,
    delicacyPost
}

