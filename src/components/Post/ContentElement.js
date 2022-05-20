// Stylesheet
import styles from "@styles/Post/ContentElement.module.scss";
// Import local component
import DeleteElementButton from "@components/Post/DeleteElementButton.js";

const ContentElement = ({ ind, text, onUpdate, onDelete }) => {
    return (
        <div className={styles["content-element"]}>
            <textarea
                className={styles["content-input"]}
                name={ind}
                value={text}
                onChange={(event) => onUpdate(event)}
                required
            />
            <DeleteElementButton ind={ind} onClick={onDelete} />
        </div>
    );
};

export default ContentElement;
