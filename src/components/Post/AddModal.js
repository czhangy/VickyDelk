// Stylesheet
import styles from "@styles/Post/AddModal.module.scss";
// NextJS
import Image from "next/image";

const AddModal = ({ open, onClose, onSelect }) => {
    // Stops click on content from closing modal
    const contentClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div
            id={styles["add-modal"]}
            className={open ? styles["show-overlay"] : ""}
            onClick={onClose}
        >
            <div id={styles["add-modal-content"]} onClick={contentClick}>
                <h2 id={styles["add-header"]}>Add an Element</h2>
                <button
                    className={styles["add-button"]}
                    onClick={() => onSelect("p")}
                >
                    <Image
                        src="/icons/paragraph.svg"
                        alt=""
                        height={80}
                        width={80}
                    />
                    <p className={styles["add-text"]}>Paragraph</p>
                </button>
                <button
                    className={styles["add-button"]}
                    onClick={() => onSelect("i")}
                >
                    <Image
                        src="/icons/image.svg"
                        alt=""
                        height={80}
                        width={90}
                    />
                    <p className={styles["add-text"]}>Image</p>
                </button>
            </div>
        </div>
    );
};

export default AddModal;
