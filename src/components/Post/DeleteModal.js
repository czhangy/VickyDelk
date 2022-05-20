// Stylesheet
import styles from "@styles/Post/DeleteModal.module.scss";
// React
import { useEffect } from "react";
// NextJS
import Image from "next/image";

const DeleteModal = ({ open, onClose, onSelect }) => {
    // Prevent scroll on open
    useEffect(() => {
        open && (document.body.style.overflow = "hidden");
        !open && (document.body.style.overflow = "unset");
    }, [open]);

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
            <div id={styles["delete-modal-content"]} onClick={contentClick}>
                <h2 id={styles["delete-header"]}>Are you sure?</h2>
                <button
                    id={styles["no-button"]}
                    className={styles["delete-button"]}
                    onClick={() => onClose()}
                >
                    <Image src="/icons/no.svg" alt="" height={40} width={40} />
                </button>
                <button
                    className={styles["delete-button"]}
                    id={styles["yes-button"]}
                    onClick={() => onSelect()}
                >
                    <Image src="/icons/yes.svg" alt="" height={40} width={40} />
                </button>
            </div>
        </div>
    );
};

export default DeleteModal;
