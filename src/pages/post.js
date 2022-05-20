// Stylesheet
import styles from "@styles/Post/Post.module.scss";
// NextJS
import Head from "next/head";
import Image from "next/image";
// React
import { useState } from "react";
// Local components
import AddModal from "@components/Post/AddModal.js";

const Post = () => {
    // Find index of element in content array
    const getContentInd = (ind) => {
        let res = 0;
        // Find number of ps prior to ind
        for (let i = 0; i < ind; i++)
            res += formData.skeleton[i] === "p" ? 1 : 0;
        return res;
    };
    // Hold form data
    const [formData, setFormData] = useState({
        title: "",
        content: [],
        skeleton: [],
    });
    // Change title
    const updateTitle = (event) => {
        setFormData({
            ...formData,
            title: event.target.value,
        });
    };
    // Change content
    const updateContent = (event) => {
        let ind = parseInt(getContentInd(event.target.name));
        // Update the content array
        let newContent = formData.content.slice();
        newContent[ind] = event.target.value;
        setFormData({
            ...formData,
            content: newContent,
        });
    };
    const deleteContentField = (ind) => {
        let contentInd = getContentInd(ind);
        // Clear from content and skeleton arrays
        setFormData({
            ...formData,
            content: formData.content.filter((_, i) => i !== contentInd),
            skeleton: formData.skeleton.filter((_, i) => i !== ind),
        });
    };
    // Add to skeleton
    const updateSkeleton = (element) => {
        setFormData({
            ...formData,
            skeleton: formData.skeleton.concat([element]),
        });
        closeAddModal();
    };
    // Submit form data
    const handleSubmit = async (event) => {
        // Prevents the submit button from refreshing the page
        event.preventDefault();
        // Disable the button
        document.getElementById(styles["submit-button"]).disabled = true;
        document.getElementById("submit-text").innerHTML = "Submitting...";
        // Build post
        const post = {
            ...formData,
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
            document.getElementById("submit-text").innerHTML = "Submitted!";
        } else {
            console.log(data.message);
            // Re-enable the button
            document.getElementById("submit-text").innerHTML = "Submit";
            document.getElementById(styles["submit-button"]).disabled = true;
        }
    };
    // Clear all form data
    const clearForm = () => {
        setFormData({
            title: "",
            content: [],
            skeleton: [],
        });
    };
    // Add modal state
    const [addModalOpen, setAddModalOpen] = useState(false);
    // Open the add modal
    const openAddModal = () => {
        setAddModalOpen(true);
    };
    // Close the add modal
    const closeAddModal = () => {
        setAddModalOpen(false);
    };

    return (
        <div id={styles["post"]}>
            <Head>
                <title>Make a Post | Vicky Delk&apos;s Blog</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AddModal
                open={addModalOpen}
                onClose={closeAddModal}
                onSelect={updateSkeleton}
            />
            <form id={styles["post-form"]} onSubmit={handleSubmit}>
                <div id={styles.tape} />
                <input
                    id={styles["form-title"]}
                    placeholder="Write title here"
                    value={formData.title}
                    onChange={(event) => updateTitle(event)}
                    required
                />
                {formData.skeleton.map((element, i) => {
                    // Render paragraph element
                    if (element === "p")
                        return (
                            <div
                                className={styles["form-content-container"]}
                                key={i}
                            >
                                <textarea
                                    className={styles["form-content"]}
                                    name={i}
                                    value={formData.content[getContentInd(i)]}
                                    onChange={(event) => updateContent(event)}
                                    required
                                ></textarea>
                                <button
                                    className={styles["form-content-delete"]}
                                    type="button"
                                    onClick={() => deleteContentField(i)}
                                >
                                    <Image
                                        src="/icons/delete.svg"
                                        alt=""
                                        height={16}
                                        width={16}
                                    />
                                </button>
                            </div>
                        );
                })}
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
                        onClick={openAddModal}
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
                        <p id="submit-text" className={styles["button-text"]}>
                            Submit
                        </p>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Post;
