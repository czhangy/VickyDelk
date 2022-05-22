// Stylesheet
import styles from "@styles/Global/DeleteModal.module.scss";
// NextJS
import Image from "next/image";

const DeleteModal = ({ open, onClose, onSelect, isLoading }) => {
    // Stops click on content from closing modal
    const contentClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div
            id={styles["delete-modal"]}
            className={open ? styles["show-overlay"] : ""}
            onClick={onClose}
        >
            {isLoading ? (
                <div id={styles["delete-modal-content"]}>
                    <h2 id={styles["delete-header"]}>Deleting...</h2>
                    <div id={styles["delete-icon"]}>
                        <Image
                            src="/icons/loading.gif"
                            alt=""
                            height={160}
                            width={160}
                        />
                    </div>
                </div>
            ) : (
                <div id={styles["delete-modal-content"]} onClick={contentClick}>
                    <h2 id={styles["delete-header"]}>Are you sure?</h2>
                    <button
                        id={styles["no-button"]}
                        className={styles["delete-button"]}
                        onClick={() => onClose()}
                    >
                        <Image
                            src="/icons/no.svg"
                            alt=""
                            height={40}
                            width={40}
                        />
                    </button>
                    <button
                        className={styles["delete-button"]}
                        id={styles["yes-button"]}
                        onClick={() => onSelect()}
                    >
                        <Image
                            src="/icons/yes.svg"
                            alt=""
                            height={40}
                            width={40}
                        />
                    </button>
                </div>
            )}
        </div>
    );
};

export default DeleteModal;
