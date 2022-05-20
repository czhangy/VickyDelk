const { connectToDatabase } = require("@lib/mongodb");
const ObjectId = require("mongodb").ObjectId;

const addPost = async (req, res) => {
    try {
        // Connect to the database
        let { db } = await connectToDatabase();
        // Add the post
        await db.collection("posts").insertOne(JSON.parse(req.body));
        // Return a message
        return res.json({
            message: "Post added successfully",
            success: true,
        });
    } catch (error) {
        // Return an error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
};

export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case "POST": {
            return addPost(req, res);
        }
    }
}
