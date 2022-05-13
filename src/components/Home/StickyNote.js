// Stylesheet
import styles from "@styles/Home/StickyNote.module.scss";

const StickyNote = ({ title }) => {
    return (
        <div className={styles["sticky-note"]}>
            <p className={styles["note-title"]}>{title}</p>
        </div>
    );
};

export default StickyNote;
