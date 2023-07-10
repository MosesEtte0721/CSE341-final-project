const mongodb = require("../db/mongoDB").mongoDb();
const objectId = require("mongodb").ObjectId;

const delicacies = async (req, res) => {
    const mongoDB = await mongodb;
    try {

        const collection = mongoDB.db("final-project").collection("delicacy-collection");
        collection.find({}).toArray().then((x) => {
        
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
        collection.find({ _id: objId}).toArray().then((x) => {

        if(collection) {

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
        ethnics: req.body.ethnics,
        states: req.body.states,
        ingredients: req.body.ingredients,
        method: req.body.method

    }

    const mongoDB = await mongodb;
    try {
        const collection = mongoDB.db("final-project").collection("delicacy-collection");
        collection.insertOne(parameters);

        if(collection) {
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
        ethnics: req.body.ethnics,
        ingredients: req.body.ingredients,
        method: req.body.method,
        states: req.body.states

    }

    const objId = new objectId(req.params.id)
    const mongoDB = await mongodb;
    const collection = await mongoDB.db("final-project").collection("delicacy-collection");

    try {
       collection.replaceOne({ _id: objId}, parameters);
       if(collection){
        res.status(200).send("Updated!")
       } else {
        res.status(403).send("Failed! Operation Failed")
       }


    } 
    catch(error) {
        res.status(500).json({message: error.message})
    }
};

const delicacyDel = async (req, res) => {
    const objId = new objectId(req.params.id);
    console.log(objId)
    const mongoDB = await mongodb;
    const collection = mongoDB.db("final-project").collection("delicacy-collection");
    try {
        // deletes document that the provided _id
        collection.deleteOne({ _id: objId}, true);
        if(collection) {
            res.status(200).send("Deleted! Document has been deleted permanently")
        }
        else {
            res.status(403).send("<h2>Not Deleted</h2>")
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

