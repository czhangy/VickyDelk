// Stylesheet
import styles from "@styles/Blog/Blog.module.scss";
// NextJS
import Head from "next/head";
// Local components
import SearchBar from "@components/Blog/SearchBar.js";

const Blog = () => {
    return (
        <div id={styles.blog}>
            <Head>
                <title>Blog | Vicky Delk&apos;s Blog</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div id={styles.filters}>
                <div id={styles.tape} />
                <SearchBar />
            </div>
        </div>
    );
};

export default Blog;
