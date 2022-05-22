// Stylesheet
import styles from "@styles/Post/Post.module.scss";
// NextJS
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
// React
import { useState, useEffect } from "react";
// Local components
import AddModal from "@components/Post/AddModal.js";
import SubmitModal from "@components/Post/SubmitModal.js";
import ContentElement from "@components/Post/ContentElement.js";
import ImageElement from "@components/Post/ImageElement.js";
// Global component
import DeleteModal from "@components/Global/DeleteModal.js";
// Axios
import axios from "axios";

const Post = () => {
    // Guard route
    const router = useRouter();
    useEffect(() => {
        if (process.env.NODE_ENV === "production") router.push("/blog");
    });

    // Prevent Enter key from submitting
    const checkKeyDown = (e) => {
        if (e.code === "Enter") e.preventDefault();
    };

    // Form control
    const [formData, setFormData] = useState({
        title: "",
        skeleton: [],
        content: [],
        images: [],
    });
    useEffect(() => {
        let persistData = { ...formData };
        if (localStorage.getItem("title") !== null)
            persistData["title"] = localStorage.getItem("title");
        if (localStorage.getItem("skeleton") !== null)
            persistData["skeleton"] = JSON.parse(
                localStorage.getItem("skeleton")
            );
        if (localStorage.getItem("content") !== null)
            persistData["content"] = JSON.parse(
                localStorage.getItem("content")
            );
        if (localStorage.getItem("images") !== null)
            persistData["images"] = JSON.parse(localStorage.getItem("images"));
        setFormData(persistData);
    }, []);
    const updateTitle = (event) => {
        const newTitle = event.target.value;
        localStorage.setItem("title", newTitle);
        setFormData({
            ...formData,
            title: newTitle,
        });
    };
    const updateSkeleton = (element) => {
        const newSkeleton = formData.skeleton.concat([element]);
        localStorage.setItem("skeleton", JSON.stringify(newSkeleton));
        setFormData({
            ...formData,
            skeleton: newSkeleton,
        });
        closeAddModal();
    };
    const getElementInd = (symbol, ind) => {
        let res = 0;
        // Find number of corresponding symbols prior to ind
        for (let i = 0; i < ind; i++)
            res += formData.skeleton[i] === symbol ? 1 : 0;
        return res;
    };
    const handleSubmit = async (event) => {
        // Prevents the submit button from refreshing the page
        event.preventDefault();
        resetError();
        openSubmitModal();
        // Build post
        const post = {
            ...formData,
            images: await handleAWSUpload(),
            timestamp: new Date(),
        };
        const route = router.query.edit
            ? `/api/posts?id=${router.query.edit}`
            : "/api/posts";
        // Fetch from backend route
        let response = await fetch(route, {
            method: router.query.edit ? "PUT" : "POST",
            body: JSON.stringify(post),
        });
        // Get the data
        let data = await response.json();
        if (data.success) {
            confirmSubmit();
            localStorage.clear();
        } else {
            console.log(data.message);
            setError();
        }
    };
    const clearForm = () => {
        setFormData({
            title: "",
            skeleton: [],
            content: [],
            images: [],
        });
        setDeleteModalOpen(false);
        localStorage.clear();
    };

    // Content element control
    const updateContent = (event) => {
        const ind = parseInt(getElementInd("p", event.target.name));
        // Update the content array
        let newContent = formData.content.slice();
        newContent[ind] = event.target.value;
        localStorage.setItem("content", JSON.stringify(newContent));
        setFormData({
            ...formData,
            content: newContent,
        });
    };
    const deleteContentField = (ind) => {
        const contentInd = getElementInd("p", ind);
        const newContent = formData.content.filter((_, i) => i !== contentInd);
        const newSkeleton = formData.skeleton.filter((_, i) => i !== ind);
        localStorage.setItem("content", JSON.stringify(newContent));
        localStorage.setItem("skeleton", JSON.stringify(newSkeleton));
        // Clear from content and skeleton arrays
        setFormData({
            ...formData,
            content: newContent,
            skeleton: newSkeleton,
        });
    };

    // Image element control
    const updateImages = (ind, file) => {
        const imagesInd = parseInt(getElementInd("i", ind));
        // Update the images array
        let newImages = formData.images.slice();
        newImages[imagesInd] = file;
        localStorage.setItem("images", JSON.stringify(newImages));
        setFormData({
            ...formData,
            images: newImages,
        });
    };
    const deleteImageField = (ind) => {
        const imagesInd = getElementInd("i", ind);
        const newImages = formData.images.filter((_, i) => i !== imagesInd);
        const newSkeleton = formData.skeleton.filter((_, i) => i !== ind);
        localStorage.setItem("images", JSON.stringify(newImages));
        localStorage.setItem("skeleton", JSON.stringify(newSkeleton));
        // Clear from image and skeleton arrays
        setFormData({
            ...formData,
            images: newImages,
            skeleton: newSkeleton,
        });
    };

    // S3 Upload
    const handleAWSUpload = async () => {
        let urls = [];
        const imgs = Array.from(formData.images);
        // Upload all files to AWS
        for (let i = 0; i < imgs.length; i++) {
            let { data } = await axios
                .post("/api/s3/upload", {
                    name: `${formData.title}/${imgs[i].name}`,
                    type: imgs[i].type,
                })
                .catch(() => setError());
            const url = data.url;
            await axios
                .put(url, imgs[i], {
                    headers: {
                        "Content-type": imgs[i].type,
                        "Access-Control-Allow-Origin": "*",
                    },
                })
                .catch(() => setError());
            // Update URL
            urls.push(
                `https://vickydelk.s3.us-west-1.amazonaws.com/${formData.title}/${imgs[i].name}`
            );
        }
        return urls;
    };

    // Add modal control
    const [addModalOpen, setAddModalOpen] = useState(false);
    const openAddModal = () => {
        setAddModalOpen(true);
    };
    const closeAddModal = () => {
        setAddModalOpen(false);
    };

    // Delete modal control
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const openDeleteModal = () => {
        setDeleteModalOpen(true);
    };
    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
    };

    // Submit modal control
    const [submitModalOpen, setSubmitModalOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isError, setIsError] = useState(false);
    const openSubmitModal = () => {
        setSubmitModalOpen(true);
    };
    const closeSubmitModal = () => {
        setSubmitModalOpen(false);
    };
    const confirmSubmit = () => {
        setIsSubmitted(true);
    };
    const setError = () => {
        setIsError(true);
    };
    const resetError = () => {
        setIsError(false);
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
            <DeleteModal
                open={deleteModalOpen}
                onClose={closeDeleteModal}
                onSelect={clearForm}
                isLoading={false}
            />
            <SubmitModal
                open={submitModalOpen}
                onClose={closeSubmitModal}
                isSubmitted={isSubmitted}
                isError={isError}
            />
            <form
                id={styles["post-form"]}
                onSubmit={handleSubmit}
                onKeyDown={(e) => checkKeyDown(e)}
            >
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
                            <ContentElement
                                ind={i}
                                key={i}
                                text={formData.content[getElementInd("p", i)]}
                                onUpdate={updateContent}
                                onDelete={deleteContentField}
                            />
                        );
                    else if (element === "i")
                        return (
                            <ImageElement
                                key={i}
                                ind={i}
                                onUpdate={updateImages}
                                onDelete={deleteImageField}
                            />
                        );
                })}
                <div id={styles["form-buttons"]}>
                    <button
                        id={styles["delete-button"]}
                        className={styles["form-button"]}
                        type="button"
                        onClick={openDeleteModal}
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
                            src="/icons/add-invert.svg"
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
