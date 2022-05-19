// Stylesheet
import styles from "@styles/Post/Post.module.scss";
// MongoDB
import clientPromise from "@lib/mongodb.js";
import { ObjectId } from "mongodb";

const Post = ({ post }) => {
    // Format timestamp to MM/DD/YYYY
    const formatDate = () => {
        let date = new Date(post.timestamp);
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, "0");
        let day = date.getDate().toString().padStart(2, "0");
        return month + "/" + day + "/" + year;
    };

    // Create tag skeleton to render post in order
    const generateSkeleton = () => {
        // Indices for content/image arrays
        let pNum = 0,
            iNum = 0;
        let skeleton = [];
        for (let ind in post.skeleton) {
            // Handle paragraph element
            if (post.skeleton[ind] === "p") {
                skeleton.push(
                    <p className={styles["post-text"]} key={ind}>
                        {post.content[pNum]}
                    </p>
                );
                pNum++;
            }
        }
        return skeleton;
    };

    return (
        <div id={styles.post}>
            <div id={styles["post-container"]}>
                <div id={styles.tape} />
                <h1 id={styles["post-title"]}>{post.title}</h1>
                <p id={styles["post-timestamp"]}>{formatDate()}</p>
                {generateSkeleton().map((element, i) => {
                    return element;
                })}
            </div>
        </div>
    );
};

// Fetch post
export async function getServerSideProps(context) {
    // Get ID from route
    const { pid } = context.query;
    // Fetch from MongoDB
    const client = await clientPromise;
    const db = client.db("VickyDelk");
    let post = await db
        .collection("posts")
        .find({ _id: new ObjectId(pid) })
        .toArray();
    post = JSON.parse(JSON.stringify(post))[0];
    return {
        props: { post },
    };
}

export default Post;
