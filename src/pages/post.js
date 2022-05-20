// Stylesheet
import styles from "@styles/Post/Post.module.scss";
// NextJS
import Head from "next/head";
import Image from "next/image";
// React
import { useState } from "react";

const Post = () => {
    // Hold form data
    const [formData, setFormData] = useState({
        title: "",
        content: [],
        skeleton: [],
    });

    // Change form data on change
    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    // Clear all form data
    const clearForm = () => {
        setFormData({
            title: "",
        });
    };

    // Submit form data
    const handleSubmit = async (event) => {
        // Prevents the submit button from refreshing the page
        event.preventDefault();
        // Build post
        const post = {
            title: formData.title,
            content: [],
            skeleton: [],
            timestamp: new Date(),
        };
        // Fetch from backend route
        let response = await fetch("/api/posts", {
            method: "POST",
            body: JSON.stringify(post),
        });
        // Get the data
        let data = await response.json();
        if (data.success) {
            clearForm();
        } else console.log(data.message);
    };

    return (
        <div id={styles["post"]}>
            <Head>
                <title>Make a Post | Vicky Delk&apos;s Blog</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <form id={styles["post-form"]} onSubmit={handleSubmit}>
                <div id={styles.tape} />
                <label htmlFor="title" className={styles["form-label"]}>
                    Title:
                </label>
                <input
                    className={styles["form-input"]}
                    name="title"
                    placeholder="Write title here"
                    value={formData.title}
                    onChange={(event) => handleChange(event)}
                />
                <div id={styles["form-buttons"]}>
                    <button
                        id={styles["delete-button"]}
                        className={styles["form-button"]}
                        type="button"
                        onClick={clearForm}
                    >
                        <Image
                            src="/icons/delete.svg"
                            alt=""
                            height={16}
                            width={16}
                        />
                        <p className={styles["button-text"]}>Delete</p>
                    </button>
                    <button
                        id={styles["add-button"]}
                        className={styles["form-button"]}
                        type="button"
                        onClick={clearForm}
                    >
                        <Image
                            src="/icons/add.svg"
                            alt=""
                            height={16}
                            width={16}
                        />
                        <p className={styles["button-text"]}>Add</p>
                    </button>
                    <button
                        id={styles["submit-button"]}
                        className={styles["form-button"]}
                    >
                        <Image
                            src="/icons/submit.svg"
                            alt=""
                            height={16}
                            width={16}
                        />
                        <p className={styles["button-text"]}>Submit</p>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Post;
