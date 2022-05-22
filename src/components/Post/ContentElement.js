// Stylesheet
import styles from "@styles/Post/ContentElement.module.scss";
// Gocal component
import DeleteElementButton from "@components/Global/DeleteElementButton.js";

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
