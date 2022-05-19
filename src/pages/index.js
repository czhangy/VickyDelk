// NextJS
import Head from "next/head";
// Stylesheet
import styles from "@styles/Home/Home.module.scss";
// Local components
import Polaroid from "@components/Home/Polaroid.js";
import StickyNote from "@components/Home/StickyNote.js";
// MongoDB
import clientPromise from "@lib/mongodb.js";

const Home = (props) => {
    return (
        <div id={styles.home}>
            <Head>
                <title>Home | Vicky Delk&apos;s Blog</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.container}>
                <Polaroid />
            </div>
            <ul id={styles["recent-posts"]} className={styles.container}>
                <h2 id={styles["recent-posts-header"]}>Recent Posts</h2>
                {props.posts.map((post, i) => {
                    return (
                        <li className={styles["recent-post"]} key={i}>
                            <StickyNote post={post} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

// Fetch most recent 3 posts
export async function getServerSideProps() {
    // Fetch from MongoDB
    const client = await clientPromise;
    const db = client.db("VickyDelk");
    let posts = await db
        .collection("posts")
        .find({})
        .sort({ timestamp: -1 })
        .limit(3)
        .toArray();
    posts = JSON.parse(JSON.stringify(posts));
    return {
        props: { posts },
    };
}

export default Home;
