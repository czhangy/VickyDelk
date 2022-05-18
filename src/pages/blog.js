// Stylesheet
import styles from "@styles/Blog/Blog.module.scss";
// NextJS
import Head from "next/head";
// Local components
import BlogPost from "@components/Blog/BlogPost.js";
// MongoDB
import clientPromise from "@lib/mongodb.js";

const Blog = (props) => {
    const testPost = {
        id: 1,
        title: "Test Post :)",
        timestamp: "4/4/2022",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    };

    return (
        <div id={styles.blog}>
            <Head>
                <title>Blog | Vicky Delk&apos;s Blog</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ul id={styles.posts}>
                {props.posts.map(function (post, i) {
                    return (
                        <li key={i}>
                            <BlogPost post={post} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export async function getServerSideProps() {
    const client = await clientPromise;
    const db = client.db("VickyDelk");
    let posts = await db.collection("posts").find({}).toArray();
    posts = JSON.parse(JSON.stringify(posts)).slice(0, 5);
    return {
        props: { posts },
    };
}

export default Blog;
