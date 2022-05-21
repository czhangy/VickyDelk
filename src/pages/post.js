// Stylesheet
import styles from "@styles/Post/Post.module.scss";
// NextJS
import Head from "next/head";
import Image from "next/image";
// React
import { useState } from "react";
// Local components
import AddModal from "@components/Post/AddModal.js";
import DeleteModal from "@components/Post/DeleteModal.js";
import SubmitModal from "@components/Post/SubmitModal.js";
import ContentElement from "@components/Post/ContentElement.js";
import ImageElement from "@components/Post/ImageElement.js";
// Axios
import axios from "axios";

const Post = () => {
    // Form control
    const [formData, setFormData] = useState({
        title: "",
        skeleton: [],
        content: [],
        images: [],
    });
    const updateTitle = (event) => {
        setFormData({
            ...formData,
            title: event.target.value,
        });
    };
    const updateSkeleton = (element) => {
        setFormData({
            ...formData,
            skeleton: formData.skeleton.concat([element]),
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
        // Fetch from backend route
        let response = await fetch("/api/posts", {
            method: "POST",
            body: JSON.stringify(post),
        });
        // Get the data
        let data = await response.json();
        if (data.success) {
            confirmSubmit();
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
    };

    // Content element control
    const updateContent = (event) => {
        let ind = parseInt(getElementInd("p", event.target.name));
        // Update the content array
        let newContent = formData.content.slice();
        newContent[ind] = event.target.value;
        setFormData({
            ...formData,
            content: newContent,
        });
    };
    const deleteContentField = (ind) => {
        let contentInd = getElementInd("p", ind);
        // Clear from content and skeleton arrays
        setFormData({
            ...formData,
            content: formData.content.filter((_, i) => i !== contentInd),
            skeleton: formData.skeleton.filter((_, i) => i !== ind),
        });
    };

    // Image element control
    const updateImages = (ind, file) => {
        let imagesInd = parseInt(getElementInd("i", ind));
        // Update the images array
        let newImages = formData.images.slice();
        newImages[imagesInd] = file;
        setFormData({
            ...formData,
            images: newImages,
        });
    };
    const deleteImageField = (ind) => {
        let imagesInd = getElementInd("i", ind);
        // Clear from image and skeleton arrays
        setFormData({
            ...formData,
            content: formData.images.filter((_, i) => i !== imagesInd),
            skeleton: formData.skeleton.filter((_, i) => i !== ind),
        });
    };

    // S3 Upload
    const handleAWSUpload = async () => {
        let urls = [];
        const imgs = Array.from(formData.images);
        // Upload all files to AWS
        for (let i = 0; i < imgs.length; i++) {
            let { data } = await axios.post("/api/s3/upload", {
                name: `${formData.title}/${imgs[i].name}`,
                type: imgs[i].type,
            });
            const url = data.url;
            let { data: newData } = await axios.put(url, imgs[i], {
                headers: {
                    "Content-type": imgs[i].type,
                    "Access-Control-Allow-Origin": "*",
                },
            });
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
            />
            <SubmitModal
                open={submitModalOpen}
                onClose={closeSubmitModal}
                isSubmitted={isSubmitted}
                isError={isError}
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
