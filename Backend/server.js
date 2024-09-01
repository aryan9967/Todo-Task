import express from "express"
import { MongoClient, ServerApiVersion } from 'mongodb';
import cors from "cors"
import dotenv from "dotenv"
import { ObjectId } from 'mongodb';

dotenv.config()
const uri = `mongodb+srv://aryan:${process.env.password}@cluster0.0xmkz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const app = express()


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

app.use(cors())
app.use(express.json())

const myDB = client.db("First");
const myColl = myDB.collection("Tasks");

app.get("/get-todo", async (req, res) => {
    try {
        // Fetch all documents from the collection
        const documents = await myColl.find({}).toArray();
      
        console.log('All documents:', documents);
        res.status(200).send(documents)
      } catch (error) {
        console.error('Error fetching documents:', error);
        res.status(500).send("Internal server error")
      }
})

app.post("/create-todo", async (req, res) => {
    const { name, description } = req.body

    if (name && description) {
        try {
            const doc = { name, description, status: "pending" };
            const result = await myColl.insertOne(doc);
            res.status(200).send("Todo created successfully")
        }
        catch (err) {
            console.error(err)
            res.status(500).send("Internal server error")
        }
    }
    else {
        return res.status(400).send("Invalid data")
    }

})

app.post("/complete-todo", async (req, res) => {
    const { _id } = req.body;

    try {
        // Ensure that _id is a valid ObjectId
        const objectId = new ObjectId(_id);

        const updateDocument = {
            $set: {
                status: "complete"
            },
        };

        // Perform the update operation
        const result = await myColl.updateOne({ _id: objectId }, updateDocument);

        if (result.modifiedCount === 1) {
            res.status(200).send('Document updated successfully');
        } else {
            res.status(404).send('Document not found');
        }
    } catch (error) {
        console.error('Error updating document:', error);
        res.status(500).send('Error updating document');
    }
});

app.post("/update-todo", async (req, res) => {
    const { name, description, _id } = req.body;
    console.log("id from request", _id)

    try {
        // Ensure that _id is a valid ObjectId
        const objectId = new ObjectId(_id);
        console.log("object id", objectId)
        const updateDocument = {
            $set: {
                name,
                description
            },
        };

        // Perform the update operation
        const result = await myColl.updateOne({ _id:objectId }, updateDocument);
        console.log(result)

        if (result.modifiedCount === 1) {
            res.status(200).send('Document updated successfully');
        } else {
            res.status(404).send('Document not found');
        }
    } catch (error) {
        console.error('Error updating document:', error);
        res.status(500).send('Error updating document');
    }
});

app.post("/delete-todo", async (req, res) => {
    const { _id } = req.body;

    try {
        // Ensure that _id is a valid ObjectId
        const objectId = new ObjectId(_id);

        // Perform the delete operation
        const result = await myColl.deleteOne({ _id: objectId });

        if (result.deletedCount === 1) {
            res.status(200).send('Document deleted successfully');
        } else {
            res.status(404).send('Document not found');
        }
    } catch (error) {
        console.error('Error deleting document:', error);
        res.status(500).send('Error deleting document');
    }
});

app.listen("3000", () => {
    console.log("server is running")
})