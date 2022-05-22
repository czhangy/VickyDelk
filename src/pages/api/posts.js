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

const deletePost = async (req, res) => {
    try {
        // Connect to the database
        let { db } = await connectToDatabase();
        // Delete the post using _id
        await db.collection("posts").deleteOne({ _id: ObjectId(req.body.id) });
        // Return a message
        return res.json({
            message: "Post deleted successfully",
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

const updatePost = async (req, res) => {
    try {
        // Connect to the database
        let { db } = await connectToDatabase();
        // Update the post using _id
        await db
            .collection("posts")
            .updateOne(
                { _id: ObjectId(req.query.id) },
                { $set: JSON.parse(req.body) }
            );
        // Return a message
        return res.json({
            message: "Post updated successfully",
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
    // Handle method
    switch (req.method) {
        case "POST": {
            return addPost(req, res);
        }
        case "DELETE": {
            return deletePost(req, res);
        }
        case "PUT": {
            return updatePost(req, res);
        }
    }
}
