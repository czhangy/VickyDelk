// Stylesheet
import styles from "@styles/Blog/Blog.module.scss";
// NextJS
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
// Local components
import BlogPostCard from "@components/Blog/BlogPostCard.js";
import SortMenu from "@components/Blog/SortMenu.js";
import FilterMenu from "@components/Blog/FilterMenu.js";
// Global components
import DeleteModal from "@components/Global/DeleteModal.js";
import DeleteElementButton from "@components/Global/DeleteElementButton.js";
// MongoDB
import clientPromise from "@lib/mongodb.js";
// React
import { useEffect, useState } from "react";
import EditPostButton from "@components/Post/EditPostButton";

const Blog = ({ posts }) => {
    // Set up router for refresh/redirect
    const router = useRouter();

    // Control state
    const [sort, setSort] = useState(true);
    const [filter, setFilter] = useState([]);
    const [page, setPage] = useState(1);
    const selectSort = (option) => {
        localStorage.setItem("sort", option);
        setSort(option);
        closeSortMenu();
    };
    const selectPage = (num) => {
        setPage(num);
    };
    // Pull from local storage if possible
    useEffect(() => {
        if (localStorage.getItem("sort") !== null)
            setSort(JSON.parse(localStorage.getItem("sort")));
    });

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

    // Delete modal state
    const [isLoading, setIsLoading] = useState(false);
    const [deleteID, setDeleteID] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const openDeleteModal = (id) => {
        setDeleteModalOpen(true);
        setDeleteID(id);
    };
    const closeDeleteModal = () => setDeleteModalOpen(false);
    const toggleIsLoading = () => setIsLoading(!isLoading);

    // Delete post
    const deletePost = async () => {
        toggleIsLoading();
        // Send request to backend route
        let response = await fetch("/api/posts", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: deleteID,
            }),
        });
        // Get the response
        let data = await response.json();
        // Refresh props on success
        if (data.success) {
            router.replace(router.asPath);
        } else console.log(data.message);
        toggleIsLoading();
        closeDeleteModal();
    };

    // Calculate total number of pages
    const getNumPages = () => {
        return Math.max(1, Math.ceil(posts.length / 5));
    };

    // Apply control to posts
    const getVisiblePosts = () => {
        let visiblePosts = Array.from(posts);
        if (!sort) visiblePosts.reverse();
        visiblePosts = visiblePosts.slice(5 * (page - 1), 5 * page);
        return visiblePosts;
    };

    // Redirect to edit page
    const goToEdit = (id) => {
        router.push({
            pathname: "/post",
            query: { edit: id },
        });
    };

    return (
        <div id={styles.blog}>
            <Head>
                <title>Blog | Vicky Delk&apos;s Blog</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <DeleteModal
                open={deleteModalOpen}
                onSelect={deletePost}
                onClose={closeDeleteModal}
                isLoading={isLoading}
            />
            <div id={styles["blog-container"]}>
                <div id={styles.control}>
                    <p id={styles["page-num"]}>
                        Page {page} of {getNumPages()}
                    </p>
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
                            <SortMenu
                                open={sortMenuOpen}
                                onClick={selectSort}
                            />
                        </button>
                        {/* <button
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
                        </button> */}
                    </div>
                </div>
                <ul id={styles.posts}>
                    {getVisiblePosts().map((post, i) => {
                        return (
                            <li className={styles["blog-post"]} key={i}>
                                <BlogPostCard post={post} />
                                {process.env.NODE_ENV === "development" && (
                                    <DeleteElementButton
                                        ind={-1}
                                        onClick={() =>
                                            openDeleteModal(post._id)
                                        }
                                    />
                                )}
                                {process.env.NODE_ENV === "development" && (
                                    <EditPostButton
                                        onClick={() => goToEdit(post._id)}
                                    />
                                )}
                            </li>
                        );
                    })}
                </ul>
                <div id={styles["nav-container"]}>
                    <button
                        className={`${styles["nav-button"]} ${
                            page > 1 ? "" : styles["hidden"]
                        }`}
                        onClick={() => selectPage(page - 1)}
                    >
                        &lt; Back
                    </button>
                    <button
                        className={`${styles["nav-button"]} ${
                            page < getNumPages() ? "" : styles["hidden"]
                        }`}
                        onClick={() => selectPage(page + 1)}
                    >
                        Next &gt;
                    </button>
                </div>
            </div>
        </div>
    );
};

// Fetch all posts, sorted from most recent -> least recent
export async function getServerSideProps() {
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
