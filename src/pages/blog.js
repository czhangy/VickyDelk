// Stylesheet
import styles from "@styles/Blog/Blog.module.scss";
// NextJS
import Head from "next/head";
// Local components
import BlogPost from "@components/Blog/BlogPost.js";

const Blog = () => {
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
                <li>
                    <BlogPost post={testPost} />
                </li>
            </ul>
        </div>
    );
};

export default Blog;
