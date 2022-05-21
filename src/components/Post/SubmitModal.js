// Stylesheet
import styles from "@styles/Post/SubmitModal.module.scss";
// NextJS
import Image from "next/image";
import Link from "next/link";

const SubmitModal = ({ open, onClose, isSubmitted, isError }) => {
    // Stops click on content from closing modal
    const contentClick = (e) => {
        e.stopPropagation();
    };

    // Check modal state before closing
    const closeModal = () => {
        if (isError) onClose();
    };

    return (
        <div
            id={styles["submit-modal"]}
            className={open ? styles["show-overlay"] : ""}
            onClick={closeModal}
        >
            {(() => {
                if (isSubmitted) {
                    return (
                        <div id={styles["submit-modal-content"]}>
                            <h2 id={styles["submit-header"]}>Posted!</h2>
                            <div id={styles["submit-icon"]}>
                                <Image
                                    src="/icons/success.gif"
                                    alt=""
                                    height={160}
                                    width={160}
                                />
                            </div>
                            <Link href="/blog">
                                <a id={styles["blog-link"]}>Go to Blog</a>
                            </Link>
                        </div>
                    );
                } else if (isError) {
                    return (
                        <div id={styles["submit-modal-content"]}>
                            <h2 id={styles["submit-header"]}>
                                Something went wrong...
                                <br />
                                Go yell at Charles
                            </h2>
                            <div id={styles["submit-icon"]}>
                                <Image
                                    src="/icons/error.gif"
                                    alt=""
                                    height={160}
                                    width={260}
                                />
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div id={styles["submit-modal-content"]}>
                            <h2 id={styles["submit-header"]}>Submitting...</h2>
                            <div
                                id={styles["submit-icon"]}
                                className={styles.invert}
                            >
                                <Image
                                    src="/icons/loading.gif"
                                    alt=""
                                    height={160}
                                    width={160}
                                />
                            </div>
                        </div>
                    );
                }
            })()}
        </div>
    );
};

export default SubmitModal;
