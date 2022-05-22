// Stylesheet
import styles from "@styles/Blog/Blog.module.scss";
// NextJS
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
// Local components
import BlogPostCard from "@components/Blog/BlogPostCard.js";
import FilterMenu from "@components/Blog/FilterMenu.js";
import SortMenu from "@components/Blog/SortMenu.js";
// MongoDB
import clientPromise from "@lib/mongodb.js";
// React
import { useEffect, useState } from "react";

const Blog = (props) => {
    // Posts state
    const [posts, setPosts] = useState(Array.from(props.posts));
    const refreshPosts = () => {
        let newPosts = Array.from(props.posts);
        if (!sort) newPosts.reverse();
        setPosts(newPosts);
    };

    // Control state
    const [sort, setSort] = useState(true);
    const [filter, setFilter] = useState([]);
    const selectSort = (option) => {
        setSort(option);
        closeSortMenu();
        console.log(option);
    };
    // Listen for state changes
    useEffect(() => refreshPosts(), [sort]);

    // Sort menu state
    const [sortMenuOpen, setSortMenuOpen] = useState(false);
    const openSortMenu = (event) => {
        event.target.focus();
        setSortMenuOpen(true);
    };
    const closeSortMenu = () => {
        setTimeout(() => setSortMenuOpen(false), 50);
    };

    // Filter menu state
    const [filterMenuOpen, setFilterMenuOpen] = useState(false);
    const openFilterMenu = (event) => {
        event.target.focus();
        setFilterMenuOpen(true);
    };
    const closeFilterMenu = () => {
        setFilterMenuOpen(false);
        setTimeout(() => setSortMenuOpen(false), 50);
    };

    // Calculate total number of pages
    const getNumPages = () => {
        return Math.floor(props.posts.length / 5) + 1;
    };

    return (
        <div id={styles.blog}>
            <Head>
                <title>Blog | Vicky Delk&apos;s Blog</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div id={styles.control}>
                <p id={styles["page-num"]}>Page 1 of {getNumPages()}</p>
                <div id={styles["control-buttons"]}>
                    {process.env.NODE_ENV === "development" && (
                        <Link href="/post">
                            <a className={styles["control-button"]}>
                                <Image
                                    src="/icons/add.svg"
                                    alt=""
                                    height={16}
                                    width={16}
                                />
                                <p className={styles["button-text"]}>
                                    New Post
                                </p>
                            </a>
                        </Link>
                    )}
                    <button
                        id="sort-button"
                        className={styles["control-button"]}
                        onClick={(event) => openSortMenu(event)}
                        onBlur={closeSortMenu}
                    >
                        <Image
                            src="/icons/sort.svg"
                            alt=""
                            height={16}
                            width={16}
                        />
                        <p className={styles["button-text"]}>Sort By</p>
                        <SortMenu open={sortMenuOpen} onClick={selectSort} />
                    </button>
                    <button
                        className={styles["control-button"]}
                        onClick={(event) => openFilterMenu(event)}
                        onBlur={closeFilterMenu}
                    >
                        <Image
                            src="/icons/filter.svg"
                            alt=""
                            height={16}
                            width={16}
                        />
                        <p className={styles["button-text"]}>Filter</p>
                        <FilterMenu open={filterMenuOpen} />
                    </button>
                </div>
            </div>
            <ul id={styles.posts}>
                {posts.map((post, i) => {
                    return (
                        <li className={styles["blog-post"]} key={i}>
                            <BlogPostCard post={post} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

// Fetch all posts, sorted from most recent -> least recent
export async function getStaticProps() {
    // Fetch from MongoDB
    const client = await clientPromise;
    const db = client.db("VickyDelk");
    let posts = await db
        .collection("posts")
        .find({})
        .sort({ timestamp: -1 })
        .toArray();
    posts = JSON.parse(JSON.stringify(posts));
    return {
        props: { posts },
    };
}

export default Blog;
